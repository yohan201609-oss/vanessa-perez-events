# 🎉 Vanessa Perez - Event Planner Website

Una página web profesional y moderna para el negocio de eventos de Vanessa Perez, diseñada para promocionar servicios y facilitar el contacto con clientes potenciales.

![Vanessa Perez Events](https://img.shields.io/badge/React-18-blue) ![License](https://img.shields.io/badge/License-MIT-green) ![Status](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)

## 🎯 Características Principales

### ✨ Diseño Moderno y Elegante
- 🎨 Diseño limpio con colores dorados que reflejan elegancia y energía
- 📝 Tipografías elegantes (Playfair Display + Inter)
- 🎬 Animaciones suaves con Framer Motion
- 📱 Totalmente responsive para todos los dispositivos
- 🖼️ Imágenes optimizadas con lazy loading

### 🎉 Catálogo de Servicios
- 💒 **Bodas**: Decoración elegante y coordinación completa
- 🎂 **Cumpleaños**: Infantiles, adolescentes y adultos
- 🏢 **Eventos Corporativos**: Reuniones, conferencias y galas
- 🎓 **Graduaciones**: Celebración de logros académicos
- 👶 **Baby Showers**: Tradicionales y modernos
- ⭐ **Eventos Especiales**: Diseño personalizado

### 📸 Galería/Portafolio
- 🔍 Filtros por categoría de evento
- 🖼️ Modal con navegación entre imágenes
- 📹 Soporte para fotos y videos
- 📱 Diseño tipo masonry responsive
- ⚡ Carga optimizada con lazy loading

### 📝 Formulario Inteligente
- 📋 **Paso 1**: Información personal (nombre, email, teléfono)
- 📅 **Paso 2**: Detalles del evento (tipo, fecha, invitados)
- 💰 **Paso 3**: Presupuesto y mensaje adicional
- ✅ **Paso 4**: Resumen y confirmación
- 📧 Integración con EmailJS para envío real de emails
- 📊 Tracking de Google Analytics

### 💬 Integración Social
- 💬 Botón flotante de WhatsApp con opciones rápidas
- 📸 Enlaces directos a Instagram
- 📞 Botones de contacto inmediato
- 💌 Mensajes predefinidos para facilitar la comunicación

### ⭐ Testimonios
- 🗣️ Carrusel de testimonios de clientes
- ⭐ Sistema de calificaciones con estrellas
- 📱 Navegación táctil para móviles
- 🎬 Animaciones suaves entre testimonios

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js (versión 14 o superior)
- npm o yarn

### Instalación
```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/vanessa-perez-events.git
cd vanessa-perez-events

# Instalar dependencias
npm install

# Copiar archivo de configuración
cp env.example .env

# Iniciar el servidor de desarrollo
npm start
```

### Configuración de Variables de Entorno
Copia el archivo `env.example` a `.env` y configura las siguientes variables:

```bash
# EmailJS Configuration
REACT_APP_EMAILJS_SERVICE_ID=tu_service_id
REACT_APP_EMAILJS_TEMPLATE_ID=tu_template_id
REACT_APP_EMAILJS_PUBLIC_KEY=tu_public_key

# Google Analytics
REACT_APP_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Social Media Links
REACT_APP_WHATSAPP_NUMBER=1234567890
REACT_APP_INSTAGRAM_USERNAME=vanessaperez_events
REACT_APP_EMAIL=info@vanessaperez.com
```

### Configuración de EmailJS
Para habilitar el envío de emails:

1. Crea una cuenta en [EmailJS](https://www.emailjs.com/)
2. Configura tu servicio de email (Gmail, Outlook, etc.)
3. Crea un template para el formulario
4. Actualiza las variables en tu archivo `.env`

### Configuración de Google Analytics
Para habilitar el tracking:

1. Crea una cuenta en [Google Analytics](https://analytics.google.com/)
2. Crea una nueva propiedad GA4
3. Copia tu Measurement ID
4. Actualiza `REACT_APP_GA_MEASUREMENT_ID` en tu archivo `.env`

### Personalización
- **Configuración centralizada**: Edita `src/config/socialLinks.js` para cambiar todos los enlaces
- **Imágenes**: Reemplaza las URLs en `src/config/images.js` con tus fotos reales
- **Colores**: Modifica las variables CSS en `src/index.css`
- **Contenido**: Actualiza textos en cada componente según tus necesidades

## 📱 Características Técnicas

### Tecnologías Utilizadas
- ⚛️ **React 18**: Framework principal
- 🧭 **React Router**: Navegación
- 🎬 **Framer Motion**: Animaciones
- 🎨 **React Icons**: Iconografía
- 📧 **EmailJS**: Envío de emails
- 📊 **Google Analytics**: Tracking de usuarios
- 🖼️ **Optimized Images**: Lazy loading y manejo de errores
- 🎨 **CSS3**: Estilos personalizados

### Estructura del Proyecto
```
src/
├── components/
│   ├── Header.js & Header.css
│   ├── Hero.js & Hero.css
│   ├── Services.js & Services.css
│   ├── Gallery.js & Gallery.css
│   ├── Testimonials.js & Testimonials.css
│   ├── Contact.js & Contact.css
│   ├── Footer.js & Footer.css
│   ├── WhatsAppButton.js & WhatsAppButton.css
│   └── OptimizedImage.js & OptimizedImage.css
├── config/
│   ├── socialLinks.js
│   └── images.js
├── utils/
│   └── analytics.js
├── App.js & App.css
├── index.js & index.css
└── README.md
```

### Responsive Design
- Mobile First approach
- Breakpoints: 768px, 480px
- Grid layouts adaptativos
- Navegación móvil optimizada

## 🎨 Paleta de Colores
- **Dorado Principal**: #d4af37
- **Dorado Secundario**: #f4e4bc
- **Texto Oscuro**: #333
- **Texto Claro**: #666
- **Fondo Claro**: #fafafa
- **Blanco**: #ffffff

## 📞 Información de Contacto
- **Email**: info@vanessaperez.com
- **Teléfono**: +1 (555) 123-4567
- **Instagram**: @vanessaperez_events
- **WhatsApp**: +1 (555) 123-4567

## 🚀 Despliegue
Para desplegar en producción:

```bash
# Crear build de producción
npm run build

# Los archivos estáticos estarán en la carpeta 'build'
```

### Plataformas Recomendadas
- **Netlify**: Fácil despliegue con drag & drop
- **Vercel**: Integración perfecta con React
- **GitHub Pages**: Gratuito para proyectos públicos

## 📝 Próximas Mejoras
- [ ] Integración con CMS para gestión de contenido
- [ ] Sistema de reservas online
- [ ] Chat en vivo
- [ ] Blog de eventos
- [ ] Calculadora de presupuestos
- [ ] Integración con calendario
- [ ] Sistema de pagos online
- [ ] Múltiples idiomas
- [ ] PWA (Progressive Web App)

## 🤝 Contribuciones
Las contribuciones son bienvenidas. Por favor, abre un issue o pull request para sugerir mejoras.

## 📄 Licencia
Este proyecto está bajo la Licencia MIT. Ver el archivo LICENSE para más detalles.

---

**Desarrollado con ❤️ para Vanessa Perez Event Planner**
