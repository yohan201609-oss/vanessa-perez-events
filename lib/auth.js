// Sistema de autenticación
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Credenciales por defecto
// Email: admin@vanessaperez.com
// Password: admin123 (hash generado)
const ADMIN_CREDENTIALS = {
  email: 'admin@vanessaperez.com',
  // Hash de "admin123" generado con bcrypt
  // Para generar un nuevo hash: bcrypt.hashSync('tu_password', 10)
  passwordHash: '$2b$10$yTz8n6DYSIQVtijSDYHyGeeFkYe2ecvA4RfhH9hihSBebk27GgB8C'
};

// Generar hash de contraseña (usar solo una vez para generar el hash)
export function generatePasswordHash(password) {
  return bcrypt.hashSync(password, 10);
}

// Verificar credenciales de login
export async function verifyLogin(email, password) {
  if (email !== ADMIN_CREDENTIALS.email) {
    return { success: false, message: 'Credenciales inválidas' };
  }
  
  try {
    const isValid = await bcrypt.compare(password, ADMIN_CREDENTIALS.passwordHash);
    
    if (!isValid) {
      return { success: false, message: 'Credenciales inválidas' };
    }
    
    // Generar token JWT
    const token = jwt.sign(
      { email: ADMIN_CREDENTIALS.email },
      process.env.JWT_SECRET || 'tu-secret-key-cambiar-en-produccion',
      { expiresIn: '7d' }
    );
    
    return { 
      success: true, 
      user: { email: ADMIN_CREDENTIALS.email },
      token
    };
  } catch (error) {
    console.error('Error verifying login:', error);
    return { success: false, message: 'Error al verificar credenciales' };
  }
}

// Verificar token JWT
export function verifyToken(token) {
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'tu-secret-key-cambiar-en-produccion'
    );
    return { success: true, user: decoded };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

