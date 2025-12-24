import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { verifyLogin } from '@/lib/auth';

// Hash de contraseña por defecto (mismo que en lib/auth.js)
const DEFAULT_PASSWORD_HASH = '$2b$10$yTz8n6DYSIQVtijSDYHyGeeFkYe2ecvA4RfhH9hihSBebk27GgB8C';

export async function POST(request) {
  try {
    const { currentPassword, newPassword, currentPasswordHash } = await request.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { success: false, message: 'Contraseña actual y nueva contraseña son requeridas' },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { success: false, message: 'La nueva contraseña debe tener al menos 6 caracteres' },
        { status: 400 }
      );
    }

    // Verificar contraseña actual
    // El cliente envía el hash actual (de localStorage o por defecto)
    // Si no se envía, usamos el hash por defecto
    const passwordHashToCheck = currentPasswordHash || DEFAULT_PASSWORD_HASH;
    const isValid = await bcrypt.compare(currentPassword, passwordHashToCheck);

    if (!isValid) {
      return NextResponse.json(
        { success: false, message: 'La contraseña actual es incorrecta' },
        { status: 401 }
      );
    }

    // Generar hash de la nueva contraseña
    const newPasswordHash = await bcrypt.hash(newPassword, 10);

    // Guardar el nuevo hash
    // Nota: savePasswordHash funciona en el cliente, pero aquí estamos en el servidor
    // Necesitamos que el cliente guarde el hash en localStorage
    // Por ahora, retornamos el hash para que el cliente lo guarde

    return NextResponse.json({
      success: true,
      message: 'Contraseña cambiada exitosamente',
      passwordHash: newPasswordHash // El cliente debe guardar esto
    });

  } catch (error) {
    console.error('Change password error:', error);
    return NextResponse.json(
      { success: false, message: 'Error al cambiar contraseña' },
      { status: 500 }
    );
  }
}

