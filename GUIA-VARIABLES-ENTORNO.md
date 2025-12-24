# Guía: Configurar Variables de Entorno en Hosting

Esta guía te explica cómo configurar las variables de entorno en diferentes proveedores de hosting para que tu panel admin funcione correctamente.

## Variables Necesarias

Basándote en tu archivo `env.example`, necesitas configurar estas variables:

### Variables del Cliente (NEXT_PUBLIC_*)
- `NEXT_PUBLIC_WHATSAPP_NUMBER` - Número de WhatsApp
- `NEXT_PUBLIC_INSTAGRAM_USERNAME` - Usuario de Instagram
- `NEXT_PUBLIC_EMAIL` - Email de contacto
- `NEXT_PUBLIC_PHONE` - Teléfono de contacto
- `NEXT_PUBLIC_LOCATION` - Ubicación
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` - ID de Google Analytics (opcional)

### Variables del Servidor (Solo para EmailJS)
- `EMAILJS_SERVICE_ID` - ID del servicio de EmailJS
- `EMAILJS_TEMPLATE_ID` - ID del template de EmailJS
- `EMAILJS_PUBLIC_KEY` - Clave pública de EmailJS

### Variable de Seguridad (IMPORTANTE)
- `JWT_SECRET` - Clave secreta para tokens JWT (genera una aleatoria)

---

## 🔷 Configurar en Vercel

Vercel es la plataforma recomendada para Next.js. Sigue estos pasos:

### Paso 1: Accede a tu Proyecto
1. Ve a [vercel.com](https://vercel.com) e inicia sesión
2. Selecciona tu proyecto "vanessa-perez-events"

### Paso 2: Agregar Variables de Entorno
1. Ve a **Settings** (Configuración) en el menú superior
2. Haz clic en **Environment Variables** en el menú lateral
3. Haz clic en **Add New** (Agregar Nueva)

### Paso 3: Agregar Cada Variable
Para cada variable:
1. **Name**: Ingresa el nombre (ej: `NEXT_PUBLIC_WHATSAPP_NUMBER`)
2. **Value**: Ingresa el valor (ej: `+1 (849) 856-3436`)
3. **Environment**: Selecciona dónde aplicará:
   - ✅ Production (Producción)
   - ✅ Preview (Previsualización)
   - ✅ Development (Desarrollo)
4. Haz clic en **Save**

### Paso 4: Generar JWT_SECRET
Para la variable `JWT_SECRET`, genera una clave aleatoria segura:

```bash
# En tu terminal local, ejecuta:
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copia el resultado y úsalo como valor para `JWT_SECRET`.

### Paso 5: Redesplegar
1. Ve a la pestaña **Deployments**
2. Haz clic en los tres puntos (⋯) del último deployment
3. Selecciona **Redeploy**
4. Confirma el redespliegue

**¡Listo!** Las variables estarán disponibles en tu aplicación.

---

## 🔶 Configurar en Netlify

Si estás usando Netlify, sigue estos pasos:

### Paso 1: Accede a tu Sitio
1. Ve a [app.netlify.com](https://app.netlify.com) e inicia sesión
2. Selecciona tu sitio

### Paso 2: Agregar Variables de Entorno
1. Ve a **Site configuration** → **Environment variables**
2. Haz clic en **Add a variable**

### Paso 3: Agregar Cada Variable
Para cada variable:
1. **Key**: Ingresa el nombre (ej: `NEXT_PUBLIC_WHATSAPP_NUMBER`)
2. **Value**: Ingresa el valor (ej: `+1 (849) 856-3436`)
3. **Scopes**: Selecciona:
   - ✅ All deploys (Todos los despliegues)
   - O selecciona específicamente: Production, Deploy previews, Branch deploys
4. Haz clic en **Save**

### Paso 4: Generar JWT_SECRET
Usa el mismo comando que en Vercel para generar una clave segura.

### Paso 5: Redesplegar
1. Ve a **Deploys**
2. Haz clic en **Trigger deploy** → **Deploy site**
3. O haz un push a tu repositorio para desplegar automáticamente

---

## 🔷 Configurar en Otros Proveedores

### Railway
1. Ve a tu proyecto → **Variables**
2. Agrega cada variable con su valor
3. Reinicia el servicio

### Render
1. Ve a tu servicio → **Environment**
2. Agrega cada variable
3. Reinicia el servicio

### Heroku
1. Ve a tu aplicación → **Settings**
2. Haz clic en **Reveal Config Vars**
3. Agrega cada variable
4. La aplicación se reiniciará automáticamente

---

## ⚠️ Importante: Seguridad

### ❌ NUNCA hagas esto:
- ❌ Subir el archivo `.env` a Git
- ❌ Compartir variables de entorno públicamente
- ❌ Usar la misma `JWT_SECRET` en desarrollo y producción

### ✅ SIEMPRE haz esto:
- ✅ Usa valores diferentes para producción y desarrollo
- ✅ Regenera `JWT_SECRET` para producción
- ✅ Mantén tus variables seguras y privadas

---

## 🧪 Verificar que Funciona

Después de configurar las variables y redesplegar:

1. **Verifica en el navegador:**
   - Abre las herramientas de desarrollador (F12)
   - Ve a la pestaña Console
   - Ejecuta: `console.log(process.env.NEXT_PUBLIC_EMAIL)`
   - Debería mostrar el valor configurado

2. **Verifica en el código:**
   - Las variables `NEXT_PUBLIC_*` estarán disponibles en el cliente
   - Las variables sin `NEXT_PUBLIC_` solo en el servidor

---

## 📝 Nota sobre el Panel Admin

El panel admin **NO requiere** estas variables para funcionar, pero:

- Si configuras las variables de entorno → El sitio usará esos valores
- Si NO configuras las variables → El sitio usará los valores guardados en el almacenamiento local del panel admin

**Recomendación:** Configura las variables de entorno para producción, así tienes control centralizado de la configuración.

---

## 🆘 Solución de Problemas

### Las variables no se aplican
- ✅ Verifica que las variables tengan el prefijo `NEXT_PUBLIC_` para variables del cliente
- ✅ Asegúrate de haber redesplegado después de agregar las variables
- ✅ Limpia la caché del navegador

### Error de JWT_SECRET
- ✅ Verifica que `JWT_SECRET` esté configurada
- ✅ Usa una cadena larga y aleatoria (mínimo 32 caracteres)
- ✅ No la compartas públicamente

---

¿Necesitas ayuda con algún proveedor específico? Avísame y te ayudo paso a paso.

