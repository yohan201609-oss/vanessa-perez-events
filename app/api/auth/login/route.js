import { NextResponse } from 'next/server';
import { verifyLogin } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function POST(request) {
  try {
    const { email, password, customPasswordHash } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email y contraseña son requeridos' },
        { status: 400 }
      );
    }

    // Si el cliente envía un hash de contraseña personalizada, verificar contra ese hash primero
    let result;
    if (customPasswordHash) {
      // Verificar contra la contraseña personalizada
      const bcrypt = (await import('bcryptjs')).default;
      const isValid = await bcrypt.compare(password, customPasswordHash);
      
      if (isValid) {
        // Contraseña personalizada correcta, generar token
        const jwt = (await import('jsonwebtoken')).default;
        const token = jwt.sign(
          { email },
          process.env.JWT_SECRET || 'tu-secret-key-cambiar-en-produccion',
          { expiresIn: '7d' }
        );
        result = { success: true, user: { email }, token };
      } else {
        // Intentar con contraseña por defecto
        result = await verifyLogin(email, password);
      }
    } else {
      // Verificar contra contraseña por defecto
      result = await verifyLogin(email, password);
    }

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.message },
        { status: 401 }
      );
    }

    // Guardar token en cookie
    const cookieStore = cookies();
    cookieStore.set('admin-token', result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7 // 7 días
    });

    return NextResponse.json({
      success: true,
      user: result.user,
      token: result.token
    });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: 'Error al procesar el login' },
      { status: 500 }
    );
  }
}

