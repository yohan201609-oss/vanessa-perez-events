# 📦 Guía de Despliegue en Vercel

## Pre-requisitos

- ✅ Cuenta en GitHub
- ✅ Cuenta en Vercel (gratis)
- ✅ Variables de entorno configuradas

## Pasos para Desplegar

### 1. Subir a GitHub

```bash
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

### 2. Conectar con Vercel

1. Ve a [https://vercel.com](https://vercel.com)
2. Haz login con GitHub
3. Click **"Add New Project"**
4. Selecciona tu repositorio `vanessa-perez-events`
5. Vercel detectará Next.js automáticamente

### 3. Configurar Variables de Entorno

En Vercel Dashboard:

- Ve a **Settings** → **Environment Variables**
- Agrega cada variable de `env.example`:

#### Variables del Servidor (sin NEXT*PUBLIC*)

```
EMAILJS_SERVICE_ID=tu_service_id
EMAILJS_TEMPLATE_ID=tu_template_id
EMAILJS_PUBLIC_KEY=tu_public_key
```

#### Variables Públicas (con NEXT*PUBLIC*)

```
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_WHATSAPP_NUMBER=1234567890
NEXT_PUBLIC_INSTAGRAM_USERNAME=vanessaperez_events
NEXT_PUBLIC_EMAIL=info@vanessaperez.com
NEXT_PUBLIC_PHONE=+1 (555) 123-4567
NEXT_PUBLIC_LOCATION=Ciudad, Estado, País
NEXT_PUBLIC_WEBSITE_URL=https://tu-dominio.vercel.app
NEXT_PUBLIC_SITE_URL=https://tu-dominio.vercel.app
```

**Importante:**

- Marca todas las variables para: **Production**, **Preview**, y **Development**
- Click **"Save"** después de agregar cada variable

### 4. Deploy

1. Click **"Deploy"**
2. Espera 2-3 minutos mientras Vercel construye tu proyecto
3. ¡Tu sitio está live! 🎉

## URL Final

Tu sitio estará disponible en:

- **Producción**: `https://vanessa-perez-events.vercel.app`
- **Preview**: Cada push a una rama crea un preview URL único

## Configurar Dominio Personalizado

1. Ve a **Settings** → **Domains**
2. Click **"Add Domain"**
3. Ingresa tu dominio (ej: `vanessaperez-events.com`)
4. Sigue las instrucciones DNS que Vercel te proporciona
5. Espera a que se verifique (puede tomar hasta 24 horas)

## Verificar el Deploy

Después del deploy, verifica:

- ✅ El sitio carga correctamente
- ✅ Las imágenes se muestran
- ✅ El formulario de contacto funciona
- ✅ Google Analytics está activo
- ✅ Los enlaces de WhatsApp e Instagram funcionan
- ✅ El sitio es responsive en móvil

## Troubleshooting

### Error: "Build failed"

- Verifica que todas las variables de entorno estén configuradas
- Revisa los logs de build en Vercel Dashboard
- Asegúrate de que `npm run build` funciona localmente

### Error: "Environment variables not found"

- Verifica que las variables estén marcadas para el ambiente correcto
- Asegúrate de que los nombres coincidan exactamente con `env.example`

### Error: "Module not found"

- Ejecuta `npm install` localmente
- Verifica que `package.json` tenga todas las dependencias
- Haz push de `package-lock.json`

### El sitio muestra página en blanco

- Abre la consola del navegador (F12)
- Revisa errores de JavaScript
- Verifica que las variables `NEXT_PUBLIC_*` estén configuradas

## Actualizaciones Futuras

Cada vez que hagas push a `main`:

- Vercel automáticamente creará un nuevo deploy
- Los previews se crean para cada pull request
- Puedes hacer rollback a versiones anteriores desde el dashboard

## Recursos

- [Documentación de Vercel](https://vercel.com/docs)
- [Next.js en Vercel](https://vercel.com/docs/frameworks/nextjs)
- [Variables de Entorno en Vercel](https://vercel.com/docs/environment-variables)

---

**¿Necesitas ayuda?** Revisa los logs de build en Vercel Dashboard o consulta la documentación oficial.

