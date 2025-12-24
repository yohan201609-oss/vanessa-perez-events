# Vanessa Perez Event Planner - Next.js 14

Sitio web profesional de planificación de eventos migrado a Next.js 14 con App Router.

## 🚀 Características

- ✅ **Next.js 14** con App Router
- ✅ **TypeScript**: No (JavaScript puro)
- ✅ **CSS Modules** para estilos modulares
- ✅ **Framer Motion** para animaciones suaves
- ✅ **Google Analytics** integrado
- ✅ **EmailJS** para formularios de contacto
- ✅ **Optimización de imágenes** con next/image
- ✅ **SEO optimizado** con metadata completa
- ✅ **Responsive design** completo
- ✅ **WhatsApp** flotante con opciones rápidas

## 📋 Requisitos Previos

- Node.js 18.0 o superior
- npm o yarn

## 🛠️ Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/vanessa-perez-events.git
cd vanessa-perez-events
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```bash
cp env.example .env.local
```

Edita `.env.local` con tus valores reales:

```env
# EmailJS Configuration (Servidor - no exponer al cliente)
EMAILJS_SERVICE_ID=tu_service_id
EMAILJS_TEMPLATE_ID=tu_template_id
EMAILJS_PUBLIC_KEY=tu_public_key

# Google Analytics (Público)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Social Media Links (Público)
NEXT_PUBLIC_WHATSAPP_NUMBER=1234567890
NEXT_PUBLIC_INSTAGRAM_USERNAME=vanessaperez_events
NEXT_PUBLIC_EMAIL=info@vanessaperez.com

# App Configuration (Opcional)
NEXT_PUBLIC_PHONE=+1 (555) 123-4567
NEXT_PUBLIC_LOCATION=Ciudad, Estado, País
NEXT_PUBLIC_WEBSITE_URL=https://vanessaperez-events.com
```

## 🎯 Uso

### Desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### Producción

```bash
# Construir la aplicación
npm run build

# Iniciar servidor de producción
npm start
```

### Linting

```bash
npm run lint
```

## 📁 Estructura del Proyecto

```
vanessa-perez-events/
├── app/
│   ├── api/
│   │   └── send-email/
│   │       └── route.js          # API route para EmailJS
│   ├── layout.js                  # Layout principal con metadata
│   ├── page.js                    # Página principal (home)
│   └── globals.css                # Estilos globales
├── components/
│   ├── Header/
│   │   ├── Header.js
│   │   └── Header.module.css
│   ├── Hero/
│   │   ├── Hero.js
│   │   └── Hero.module.css
│   ├── Services/
│   │   ├── Services.js
│   │   └── Services.module.css
│   ├── Gallery/
│   │   ├── Gallery.js
│   │   └── Gallery.module.css
│   ├── Testimonials/
│   │   ├── Testimonials.js
│   │   └── Testimonials.module.css
│   ├── Contact/
│   │   ├── Contact.js
│   │   └── Contact.module.css
│   ├── Footer/
│   │   ├── Footer.js
│   │   └── Footer.module.css
│   ├── WhatsAppButton/
│   │   ├── WhatsAppButton.js
│   │   └── WhatsAppButton.module.css
│   └── OptimizedImage/
│       ├── OptimizedImage.js
│       └── OptimizedImage.module.css
├── config/
│   ├── socialLinks.js             # Configuración de redes sociales
│   └── images.js                  # Configuración de imágenes
├── utils/
│   └── analytics.js               # Utilidades de Google Analytics
├── public/
│   └── images/                    # Imágenes estáticas
│       └── events/                # Imágenes de eventos
├── next.config.js                 # Configuración de Next.js
├── jsconfig.json                  # Configuración de alias (@/*)
├── package.json
└── README.md
```

## 🎨 Componentes Principales

### Header
- Navegación fija con scroll
- Menú móvil responsive
- Logo optimizado con next/image

### Hero
- Sección principal con animaciones
- Estadísticas destacadas
- Enlaces a redes sociales

### Services
- Grid de servicios interactivos
- Detalles expandibles
- Imágenes optimizadas

### Gallery
- Filtros por categoría
- Modal de imágenes
- Soporte para swipe en móvil

### Testimonials
- Carrusel automático
- Navegación manual
- Calificaciones con estrellas

### Contact
- Formulario multi-paso (4 pasos)
- Validación completa
- Integración con EmailJS

### WhatsAppButton
- Botón flotante
- Opciones rápidas expandibles
- Tracking de analytics

## 🔧 Configuración

### EmailJS

1. Crea una cuenta en [EmailJS](https://www.emailjs.com/)
2. Configura tu servicio de email (Gmail, Outlook, etc.)
3. Crea un template para el formulario de contacto
4. Actualiza las variables en `.env.local`:
   - `EMAILJS_SERVICE_ID`
   - `EMAILJS_TEMPLATE_ID`
   - `EMAILJS_PUBLIC_KEY`

**Template Variables del Formulario:**
- `from_name`: Nombre del cliente
- `from_email`: Email del cliente
- `phone`: Teléfono
- `event_type`: Tipo de evento
- `event_date`: Fecha del evento
- `guest_count`: Número de invitados
- `budget`: Presupuesto
- `message`: Mensaje adicional
- `register`: Registro para ofertas
- `to_name`: Vanessa Pérez

### Google Analytics

1. Crea una propiedad en [Google Analytics](https://analytics.google.com/)
2. Obtén tu Measurement ID (formato: `G-XXXXXXXXXX`)
3. Actualiza `NEXT_PUBLIC_GA_MEASUREMENT_ID` en `.env.local`

### Redes Sociales

Actualiza las variables en `.env.local` o edita `config/socialLinks.js`:

- `NEXT_PUBLIC_WHATSAPP_NUMBER`: Número sin +, espacios o guiones
- `NEXT_PUBLIC_INSTAGRAM_USERNAME`: Usuario de Instagram
- `NEXT_PUBLIC_EMAIL`: Email de contacto

## 🖼️ Imágenes

### Imágenes Locales

Coloca las imágenes en `public/images/`:
- Logo: `public/images/logo-vanessa-perez.svg`
- Eventos: `public/images/events/*.jpg`

### Imágenes Externas

Las URLs externas (como Unsplash) funcionan directamente. Agrega dominios adicionales en `next.config.js`:

```javascript
images: {
  domains: ['images.unsplash.com', 'tu-dominio.com'],
}
```

### Optimización

- Las imágenes locales usan `next/image` automáticamente
- Formatos WebP y AVIF se generan automáticamente
- Lazy loading habilitado por defecto

## 📱 Responsive Design

El sitio está completamente optimizado para:
- 📱 **Mobile** (320px - 768px)
- 📱 **Tablet** (768px - 1024px)
- 💻 **Desktop** (1024px+)

## 🎭 Animaciones

Todas las animaciones usan **Framer Motion**:
- Entrada de componentes al hacer scroll
- Transiciones suaves
- Carrusel de testimonios
- Modal de galería

## 🔍 SEO

### Metadata Implementada

- ✅ Título y descripción optimizados
- ✅ Open Graph para redes sociales
- ✅ Twitter Cards
- ✅ Keywords relevantes
- ✅ Canonical URLs
- ✅ Robots meta tags

### Mejoras Adicionales

- Imágenes con alt text descriptivo
- Estructura semántica HTML5
- URLs limpias
- Sitemap (puede agregarse)

## 🚀 Despliegue

### Vercel (Recomendado)

1. Conecta tu repositorio a [Vercel](https://vercel.com)
2. Agrega las variables de entorno en el dashboard
3. Vercel detectará Next.js automáticamente

### Netlify

1. Conecta tu repositorio a [Netlify](https://netlify.com)
2. Configura:
   - Build command: `npm run build`
   - Publish directory: `.next`
3. Agrega las variables de entorno

### Otros Servicios

Cualquier servicio que soporte Node.js puede ejecutar Next.js:
- AWS Amplify
- DigitalOcean App Platform
- Railway
- Render

## 🐛 Troubleshooting

### Error: "Module not found"

```bash
# Limpia node_modules y reinstala
rm -rf node_modules package-lock.json
npm install
```

### Imágenes no cargan

1. Verifica que las imágenes estén en `public/images/`
2. Para URLs externas, agrega el dominio en `next.config.js`
3. Verifica que las rutas sean correctas (empiezan con `/`)

### EmailJS no funciona

1. Verifica que las variables de entorno estén en `.env.local`
2. Asegúrate de que las credenciales sean correctas
3. Revisa la consola del servidor para errores
4. Verifica que el template de EmailJS tenga las variables correctas

### Google Analytics no carga

1. Verifica `NEXT_PUBLIC_GA_MEASUREMENT_ID` en `.env.local`
2. Asegúrate de que el ID tenga el formato `G-XXXXXXXXXX`
3. Revisa la consola del navegador para errores

### Build falla

```bash
# Limpia el caché de Next.js
rm -rf .next
npm run build
```

## 📝 Scripts Disponibles

- `npm run dev` - Inicia servidor de desarrollo
- `npm run build` - Construye para producción
- `npm start` - Inicia servidor de producción
- `npm run lint` - Ejecuta ESLint

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 👤 Autor

**Vanessa Perez**
- Website: [vanessaperez-events.com](https://vanessaperez-events.com)
- Email: info@vanessaperez.com

## 🙏 Agradecimientos

- [Next.js](https://nextjs.org/) - Framework React
- [Framer Motion](https://www.framer.com/motion/) - Animaciones
- [React Icons](https://react-icons.github.io/react-icons/) - Iconos
- [EmailJS](https://www.emailjs.com/) - Servicio de emails

---

Hecho con ❤️ para crear momentos únicos
