# 🚀 Guía: Actualizar Cambios a Producción en Vercel

## Pasos para Desplegar los Cambios

### 1. Preparar los Cambios

```bash
# Ver qué archivos han cambiado
git status
```

### 2. Agregar todos los Cambios

```bash
# Agregar todos los archivos modificados y nuevos
git add .
```

**Nota:** Esto incluirá:
- ✅ Panel de administración completo (`app/admin/`)
- ✅ API routes (`app/api/`)
- ✅ Componentes actualizados
- ✅ Sistema de almacenamiento (`lib/`)
- ✅ Nuevas dependencias (`package.json`)

### 3. Hacer Commit de los Cambios

```bash
# Crear un commit con un mensaje descriptivo
git commit -m "feat: Agregar panel de administración completo

- Panel admin con autenticación
- Editor para Hero, Servicios, Galería, Testimonios
- Configuración de información de contacto
- Sistema de almacenamiento en localStorage
- Compresión automática de imágenes
- Componentes actualizados para usar contenido dinámico"
```

### 4. Subir a GitHub

```bash
# Subir los cambios a la rama main
git push origin main
```

### 5. Vercel Desplegará Automáticamente

Una vez que hagas `git push`:

1. ✅ Vercel detectará automáticamente el push
2. ✅ Iniciará un nuevo build
3. ✅ Puedes ver el progreso en: https://vercel.com/dashboard
4. ✅ El deployment tomará 2-5 minutos

## ⚠️ Importante: Variables de Entorno

Antes de que el sitio funcione correctamente, asegúrate de que **todas las variables de entorno** estén configuradas en Vercel:

### En Vercel Dashboard:

1. Ve a tu proyecto → **Settings** → **Environment Variables**
2. Verifica/Agrega estas variables:

#### Variables del Servidor (sin NEXT_PUBLIC_)
```
EMAILJS_SERVICE_ID=tu_service_id
EMAILJS_TEMPLATE_ID=tu_template_id
EMAILJS_PUBLIC_KEY=tu_public_key
JWT_SECRET=tu_secret_jwt_muy_seguro
```

#### Variables Públicas (con NEXT_PUBLIC_)
```
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_WHATSAPP_NUMBER=+1 (849) 856-3436
NEXT_PUBLIC_INSTAGRAM_USERNAME=vanessaperez_events
NEXT_PUBLIC_EMAIL=info@vanessaperez.com
NEXT_PUBLIC_PHONE=+1 (555) 123-4567
NEXT_PUBLIC_LOCATION=Ciudad, Estado, País
NEXT_PUBLIC_WEBSITE_URL=https://tu-dominio.vercel.app
NEXT_PUBLIC_SITE_URL=https://tu-dominio.vercel.app
```

**Importante:** Marca todas para **Production**, **Preview**, y **Development**.

### Nueva Variable Requerida: JWT_SECRET

El panel de administración necesita `JWT_SECRET` para la autenticación:

1. Genera un secret seguro (puedes usar: `openssl rand -base64 32`)
2. O usa cualquier string largo y aleatorio
3. Agrégalo en Vercel Dashboard → Environment Variables

## 📋 Checklist Pre-Deploy

Antes de hacer push, verifica:

- [ ] Todas las variables de entorno están configuradas en Vercel
- [ ] `JWT_SECRET` está configurado (nueva variable requerida)
- [ ] El build local funciona: `npm run build`
- [ ] No hay errores de lint: `npm run lint` (si existe)
- [ ] Has probado el panel admin localmente: `/admin`

## 🔍 Verificar el Deployment

Después del deploy, verifica:

1. **Sitio Principal:**
   - ✅ El sitio carga correctamente
   - ✅ Las secciones muestran contenido
   - ✅ El formulario de contacto funciona

2. **Panel de Administración:**
   - ✅ Accede a: `https://tu-dominio.vercel.app/admin`
   - ✅ Puedes iniciar sesión (credenciales por defecto: admin/admin123)
   - ✅ Puedes editar contenido en cada sección
   - ✅ Los cambios se guardan correctamente

3. **Funcionalidades:**
   - ✅ Imágenes se suben y comprimen correctamente
   - ✅ Información de contacto se actualiza
   - ✅ Cambios se reflejan en el sitio público

## 🐛 Si Algo Sale Mal

### El build falla:

1. Revisa los logs en Vercel Dashboard
2. Verifica que todas las variables de entorno estén configuradas
3. Prueba el build localmente: `npm run build`

### Error: "JWT_SECRET is not defined"

- Agrega `JWT_SECRET` en Vercel Dashboard → Environment Variables
- Usa un string largo y seguro (mínimo 32 caracteres)

### El panel admin no carga:

- Verifica que `JWT_SECRET` esté configurado
- Revisa la consola del navegador para errores
- Verifica que la ruta `/admin` esté accesible

### Los cambios no se guardan:

- Esto es normal: el almacenamiento es en `localStorage` del navegador
- Cada usuario tiene su propio almacenamiento local
- En producción, considera migrar a una base de datos

## 📝 Notas Importantes

### ⚠️ Almacenamiento Local

- El panel admin guarda contenido en `localStorage` del navegador
- Esto significa que **cada usuario/navegador tiene su propia copia**
- Para uso en producción real, deberías considerar:
  - Base de datos (MongoDB, PostgreSQL, etc.)
  - CMS (Contentful, Strapi, etc.)
  - API externa para almacenar contenido

### 🔒 Credenciales por Defecto

Las credenciales por defecto del panel admin son:
- **Usuario:** `admin`
- **Contraseña:** `admin123`

**⚠️ IMPORTANTE:** Cambia estas credenciales antes de usar en producción. Puedes:
1. Cambiar el hash en `lib/auth.js`
2. O usar variables de entorno para las credenciales

## 🎉 ¡Listo!

Una vez completado el deployment:

1. Tu sitio estará disponible en tu dominio de Vercel
2. El panel admin estará en: `https://tu-dominio.vercel.app/admin`
3. Podrás editar contenido sin tocar código

---

**¿Necesitas ayuda?** Revisa los logs de build en Vercel Dashboard o consulta la documentación.

