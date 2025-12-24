import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  try {
    const cookieStore = cookies();
    cookieStore.delete('admin-token');

    return NextResponse.json({
      success: true,
      message: 'Sesión cerrada exitosamente'
    });

  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { success: false, message: 'Error al cerrar sesión' },
      { status: 500 }
    );
  }
}

