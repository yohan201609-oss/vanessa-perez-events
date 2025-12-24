// Sistema de autenticación
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Credenciales por defecto
// Email: vanessaperezeventsplanner@gmail.com
// Password: admin123 (hash generado)
const ADMIN_CREDENTIALS = {
  email: 'vanessaperezeventsplanner@gmail.com',
  // Hash de "admin123" generado con bcrypt
  // Para generar un nuevo hash: bcrypt.hashSync('tu_password', 10)
  passwordHash: '$2b$10$yTz8n6DYSIQVtijSDYHyGeeFkYe2ecvA4RfhH9hihSBebk27GgB8C'
};

// Generar hash de contraseña (usar solo una vez para generar el hash)
export function generatePasswordHash(password) {
  return bcrypt.hashSync(password, 10);
}

// Obtener hash de contraseña (personalizada o por defecto)
export async function getPasswordHash() {
  // En el servidor, siempre usar la por defecto
  if (typeof window === 'undefined') {
    return ADMIN_CREDENTIALS.passwordHash;
  }
  
  try {
    // Intentar obtener contraseña personalizada de localStorage
    const customPasswordHash = localStorage.getItem('admin-password-hash');
    if (customPasswordHash) {
      return customPasswordHash;
    }
  } catch (error) {
    console.error('Error getting custom password:', error);
  }
  
  // Si no hay contraseña personalizada, usar la por defecto
  return ADMIN_CREDENTIALS.passwordHash;
}

// Guardar hash de contraseña personalizada
export async function savePasswordHash(passwordHash) {
  if (typeof window === 'undefined') {
    return { success: false, message: 'Solo disponible en el cliente' };
  }
  
  try {
    localStorage.setItem('admin-password-hash', passwordHash);
    return { success: true };
  } catch (error) {
    console.error('Error saving password hash:', error);
    return { success: false, message: 'Error al guardar contraseña' };
  }
}

// Verificar credenciales de login
export async function verifyLogin(email, password) {
  if (email !== ADMIN_CREDENTIALS.email) {
    return { success: false, message: 'Credenciales inválidas' };
  }
  
  try {
    // Obtener hash de contraseña (personalizada o por defecto)
    const passwordHash = getPasswordHash();
    const isValid = await bcrypt.compare(password, passwordHash);
    
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

