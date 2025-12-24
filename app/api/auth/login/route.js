import { NextResponse } from 'next/server';
import { verifyLogin } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email y contraseña son requeridos' },
        { status: 400 }
      );
    }

    const result = await verifyLogin(email, password);

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

