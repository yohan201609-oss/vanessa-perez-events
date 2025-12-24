import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

export async function POST(request) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Token no proporcionado' },
        { status: 400 }
      );
    }

    const result = verifyToken(token);

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: 'Token inválido' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      user: result.user
    });

  } catch (error) {
    console.error('Verify error:', error);
    return NextResponse.json(
      { success: false, message: 'Error al verificar token' },
      { status: 500 }
    );
  }
}

