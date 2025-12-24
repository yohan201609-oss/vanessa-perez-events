# 🔐 Guía: Sistema de Autenticación del Panel Admin

## Resumen

El panel de administración usa autenticación basada en **JWT (JSON Web Tokens)** con verificación de credenciales usando **bcrypt** para hashear contraseñas.

---

## 📋 Componentes del Sistema

### 1. **Credenciales por Defecto** (`lib/auth.js`)

```javascript
// Credenciales hardcodeadas en el código
ADMIN_CREDENTIALS = {
  email: 'vanessaperezeventsplanner@gmail.com',
  passwordHash: '$2b$10$yTz8n6DYSIQVtijSDYHyGeeFkYe2ecvA4RfhH9hihSBebk27GgB8C', // hash de "admin123"
}
```

**⚠️ IMPORTANTE:** Estas credenciales están hardcodeadas en el código. Para producción, deberías:

- Cambiar el hash de la contraseña
- O usar variables de entorno para las credenciales
- O usar una base de datos para múltiples usuarios

### 2. **Flujo de Autenticación**

```
┌─────────────┐
│ Usuario     │
│ (Login Page)│
└──────┬──────┘
       │
       │ 1. Ingresa email/password
       ▼
┌─────────────────────┐
│ /api/auth/login     │
│ (Server Route)      │
└──────┬──────────────┘
       │
       │ 2. Verifica con bcrypt
       │    - Compara email
       │    - Compara password hash
       │
       │ 3. Genera JWT token
       │    (expira en 7 días)
       ▼
┌─────────────────────┐
│ Respuesta con Token │
└──────┬──────────────┘
       │
       │ 4. Guarda en localStorage:
       │    - admin-auth: "true"
       │    - admin-token: "jwt_token..."
       │
       │ 5. También guarda en cookie
       │    (httpOnly, seguro)
       ▼
┌─────────────────────┐
│ Redirige a /admin   │
└─────────────────────┘
```

### 3. **Protección de Rutas** (`components/admin/ProtectedRoute.js`)

Todas las páginas del panel admin están protegidas por el componente `ProtectedRoute`:

```javascript
// Flujo de verificación:
1. Usuario intenta acceder a /admin/*
2. ProtectedRoute verifica:
   - ¿Existe 'admin-auth' === 'true' en localStorage?
   - ¿Existe 'admin-token' en localStorage?
3. Si existe, envía token a /api/auth/verify
4. Servidor verifica el token JWT
5. Si es válido → muestra el contenido
6. Si no es válido → redirige a /admin/login
```

### 4. **APIs de Autenticación**

#### **POST /api/auth/login**

- **Entrada:** `{ email, password }`
- **Proceso:**
  1. Verifica que email coincida con `ADMIN_CREDENTIALS.email`
  2. Compara password con hash usando `bcrypt.compare()`
  3. Genera JWT token con `jwt.sign()`
  4. Guarda token en cookie (httpOnly, 7 días)
- **Salida:** `{ success: true, user: {...}, token: "..." }`

#### **POST /api/auth/verify**

- **Entrada:** `{ token }`
- **Proceso:**
  1. Verifica el token JWT usando `jwt.verify()`
  2. Valida que no haya expirado
  3. Verifica la firma con `JWT_SECRET`
- **Salida:** `{ success: true, user: {...} }` o `{ success: false }`

#### **POST /api/auth/logout**

- **Proceso:**
  1. Elimina cookie del token
  2. Retorna éxito
- **Nota:** El cliente también debe limpiar localStorage

---

## 🔑 Variables de Entorno Necesarias

### `JWT_SECRET` (Requerida)

**Ubicación:** Variables de entorno en Vercel o `.env.local`

**Propósito:** Se usa para firmar y verificar los tokens JWT

**Generación:**

```bash
# En Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# O usar cualquier string largo y aleatorio
```

**⚠️ IMPORTANTE:**

- Debe ser un string largo y aleatorio (mínimo 32 caracteres)
- **NUNCA** commits este valor al repositorio
- Usa diferentes valores para desarrollo y producción

---

## 🔒 Seguridad

### ✅ Lo que SÍ está implementado:

1. **Contraseñas hasheadas** con bcrypt (10 rounds)
2. **Tokens JWT** con expiración (7 días)
3. **Cookies httpOnly** (no accesibles desde JavaScript)
4. **Verificación del token** en cada carga de página
5. **HTTPS en producción** (secure cookies)

### ⚠️ Limitaciones y Mejoras Recomendadas:

1. **Credenciales hardcodeadas**

   - ❌ Actualmente están en el código fuente
   - ✅ **Recomendación:** Mover a variables de entorno o base de datos

2. **Un solo usuario**

   - ❌ Solo hay un usuario admin
   - ✅ **Recomendación:** Base de datos para múltiples usuarios

3. **No hay renovación de tokens**

   - ❌ El token expira en 7 días, no se renueva automáticamente
   - ✅ **Recomendación:** Implementar refresh tokens

4. **localStorage para tokens**

   - ⚠️ Vulnerable a XSS attacks
   - ✅ **Actual:** También se usa cookie httpOnly (más seguro)
   - ✅ **Recomendación:** Usar solo cookies httpOnly

5. **Sin rate limiting**
   - ❌ No hay protección contra ataques de fuerza bruta
   - ✅ **Recomendación:** Implementar rate limiting en `/api/auth/login`

---

## 📝 Cambiar Credenciales

### Opción 1: Cambiar el Hash en el Código

```javascript
// En lib/auth.js
// 1. Genera un nuevo hash para tu contraseña
const newHash = bcrypt.hashSync('tu_nueva_contraseña', 10)
console.log(newHash) // Copia este hash

// 2. Reemplaza passwordHash en ADMIN_CREDENTIALS
passwordHash: 'tu_nuevo_hash_aqui'

// 3. También cambia el email si quieres
email: 'tu_nuevo_email@ejemplo.com'
```

### Opción 2: Usar Variables de Entorno (Recomendado)

```javascript
// En lib/auth.js
const ADMIN_CREDENTIALS = {
  email: process.env.ADMIN_EMAIL || 'vanessaperezeventsplanner@gmail.com',
  passwordHash: process.env.ADMIN_PASSWORD_HASH || '$2b$10$...',
}
```

Luego agrega en `.env.local` y Vercel:

```
ADMIN_EMAIL=tu_email@ejemplo.com
ADMIN_PASSWORD_HASH=tu_hash_generado
```

---

## 🧪 Probar la Autenticación

### Credenciales por Defecto:

- **Email:** `vanessaperezeventsplanner@gmail.com`
- **Password:** `admin123`

### Flujo de Prueba:

1. **Acceder sin autenticación:**

   ```
   http://localhost:3000/admin
   → Redirige a /admin/login
   ```

2. **Login incorrecto:**

   ```
   Email: incorrecto@ejemplo.com
   Password: cualquier
   → Error: "Credenciales inválidas"
   ```

3. **Login correcto:**

   ```
   Email: vanessaperezeventsplanner@gmail.com
   Password: admin123
   → Redirige a /admin (dashboard)
   → Token guardado en localStorage
   ```

4. **Acceder con token válido:**

   ```
   → Abre /admin directamente
   → ProtectedRoute verifica token
   → Si es válido, muestra contenido
   ```

5. **Token expirado:**
   ```
   → Modifica el token en localStorage
   → ProtectedRoute detecta token inválido
   → Redirige a /admin/login
   ```

---

## 🐛 Troubleshooting

### Error: "JWT_SECRET is not defined"

**Causa:** La variable de entorno `JWT_SECRET` no está configurada.

**Solución:**

1. Agrega `JWT_SECRET` en Vercel Dashboard → Environment Variables
2. O agrega en `.env.local` localmente
3. Reinicia el servidor

### Error: "Token inválido" después de desplegar

**Causa:** El `JWT_SECRET` en producción es diferente al de desarrollo.

**Solución:**

- Asegúrate de que `JWT_SECRET` en Vercel sea el mismo (o genera nuevos tokens)
- Los tokens generados con un secret no funcionan con otro secret

### No puedo iniciar sesión

**Verifica:**

1. ¿El servidor está corriendo?
2. ¿Las credenciales son correctas?
3. ¿Hay errores en la consola del navegador?
4. ¿Hay errores en los logs del servidor?

### Se cierra la sesión frecuentemente

**Causa:** El token expira o hay un error en la verificación.

**Solución:**

- El token dura 7 días, si expira necesitas hacer login nuevamente
- Verifica que `JWT_SECRET` esté configurado correctamente

---

## 📚 Recursos Adicionales

- [JWT.io](https://jwt.io/) - Para entender y debuggear tokens JWT
- [bcrypt.js](https://github.com/dcodeIO/bcrypt.js) - Documentación de bcrypt
- [Next.js Authentication](https://nextjs.org/docs/app/building-your-application/authentication) - Guía oficial

---

## 🔄 Próximas Mejoras Sugeridas

1. **Base de datos para usuarios**

   - Soporte para múltiples administradores
   - Gestión de roles y permisos

2. **Refresh Tokens**

   - Renovación automática de tokens
   - Mejor experiencia de usuario

3. **Autenticación de dos factores (2FA)**

   - Mayor seguridad para el panel admin

4. **Rate Limiting**

   - Protección contra ataques de fuerza bruta

5. **Sesiones más seguras**
   - Usar solo cookies httpOnly
   - Eliminar localStorage para tokens

---

**¿Tienes preguntas?** Revisa los logs del servidor o la consola del navegador para más detalles sobre errores de autenticación.
