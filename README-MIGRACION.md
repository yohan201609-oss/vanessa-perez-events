# Guía de Migración a Next.js 14

## ✅ Migración Completada

El sitio web ha sido migrado exitosamente de React a Next.js 14 con App Router.

## 📋 Cambios Realizados

### 1. Estructura de Archivos
- ✅ Creada estructura de App Router (`app/` directory)
- ✅ Componentes migrados a `components/` con CSS Modules
- ✅ Configuración movida a `config/`
- ✅ Utilidades movidas a `utils/`

### 2. Componentes Migrados
Todos los componentes han sido migrados con:
- ✅ `'use client'` donde es necesario (hooks, eventos, animaciones)
- ✅ CSS Modules (`Component.module.css`)
- ✅ `next/image` para imágenes locales
- ✅ Framer Motion funcionando correctamente

**Componentes con "use client":**
- Header (menú móvil)
- Hero (animaciones)
- Services (interactividad)
- Gallery (filtros y modal)
- Testimonials (carrusel)
- Contact (formulario multi-paso)
- WhatsAppButton (estado)
- OptimizedImage (carga de imágenes)

### 3. Optimización de Imágenes
- ✅ `next/image` implementado para imágenes locales
- ✅ Lazy loading mantenido
- ✅ Width y height especificados
- ✅ Soporte para URLs externas (Unsplash)

### 4. API Route para EmailJS
- ✅ Creada `/app/api/send-email/route.js`
- ✅ Usa `NextResponse` de Next.js
- ✅ Variables de entorno del servidor (no expuestas al cliente)
- ✅ Validación de parámetros

### 5. Variables de Entorno
Crea un archivo `.env.local` basado en `env.example`:

```env
# EmailJS (Servidor - no exponer al cliente)
EMAILJS_SERVICE_ID=tu_service_id
EMAILJS_TEMPLATE_ID=tu_template_id
EMAILJS_PUBLIC_KEY=tu_public_key

# Google Analytics (Público)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Social Media (Público)
NEXT_PUBLIC_WHATSAPP_NUMBER=1234567890
NEXT_PUBLIC_INSTAGRAM_USERNAME=vanessaperez_events
NEXT_PUBLIC_EMAIL=info@vanessaperez.com
```

### 6. Google Analytics
- ✅ Implementado con `next/script`
- ✅ Strategy `afterInteractive` para mejor rendimiento
- ✅ Variables de entorno configuradas
- ✅ Analytics.js actualizado para usar variables de entorno

### 7. Framer Motion
- ✅ Todas las animaciones funcionando
- ✅ `AnimatePresence` optimizado para Next.js
- ✅ Componentes marcados como `'use client'`

## 🚀 Instalación y Uso

### 1. Instalar Dependencias
```bash
npm install
```

### 2. Configurar Variables de Entorno
```bash
cp env.example .env.local
# Edita .env.local con tus valores reales
```

### 3. Ejecutar en Desarrollo
```bash
npm run dev
```

### 4. Construir para Producción
```bash
npm run build
npm start
```

## 📝 Notas Importantes

### Imágenes
- Las imágenes locales deben estar en `public/images/`
- Las URLs externas (Unsplash) funcionan directamente
- Next.js Image se usa automáticamente para rutas locales

### EmailJS
- Las credenciales se manejan en el servidor (API route)
- No se exponen al cliente
- El formulario Contact envía solo `templateParams` a la API

### Google Analytics
- Se carga automáticamente si `NEXT_PUBLIC_GA_MEASUREMENT_ID` está configurado
- Los eventos se trackean usando `analytics.js`

### CSS Modules
- Todos los estilos están en archivos `.module.css`
- Los estilos globales están en `app/globals.css`
- Las clases se importan como `styles.className`

## 🔧 Troubleshooting

### Error: "Module not found"
- Verifica que todas las rutas de importación usen `@/` para alias
- Ejecuta `npm install` para asegurar dependencias

### Imágenes no cargan
- Verifica que las imágenes estén en `public/images/`
- Para URLs externas, agrega el dominio a `next.config.js`

### EmailJS no funciona
- Verifica que las variables de entorno estén en `.env.local`
- Asegúrate de que las credenciales sean correctas
- Revisa la consola del servidor para errores

### Google Analytics no carga
- Verifica `NEXT_PUBLIC_GA_MEASUREMENT_ID` en `.env.local`
- Asegúrate de que el ID tenga el formato `G-XXXXXXXXXX`

## 📚 Recursos

- [Next.js 14 Documentation](https://nextjs.org/docs)
- [App Router Guide](https://nextjs.org/docs/app)
- [Image Optimization](https://nextjs.org/docs/pages/api-reference/components/image)
- [CSS Modules](https://nextjs.org/docs/app/building-your-application/styling/css-modules)

