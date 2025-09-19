// Configuración de enlaces de redes sociales
// Actualiza estos valores con tus enlaces reales

export const socialLinks = {
  whatsapp: {
    number: '1234567890', // Reemplaza con tu número real (sin +, espacios o guiones)
    message: '¡Hola! Me interesa conocer más sobre sus servicios de eventos. ¿Podrían ayudarme?',
    quickMessages: {
      quote: 'Hola, me interesa cotizar un evento',
      portfolio: 'Hola, quiero ver su portafolio de trabajos',
      questions: 'Hola, tengo dudas sobre sus servicios'
    }
  },
  instagram: 'vanessaperez_events', // Reemplaza con tu usuario real
  email: 'info@vanessaperez.com', // Reemplaza con tu email real
  facebook: '', // Opcional: agrega tu página de Facebook
  twitter: '', // Opcional: agrega tu cuenta de Twitter
};

// Función para generar URL de WhatsApp
export const getWhatsAppUrl = (message = socialLinks.whatsapp.message) => {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${socialLinks.whatsapp.number}?text=${encodedMessage}`;
};

// Función para generar URL de Instagram
export const getInstagramUrl = () => {
  return `https://instagram.com/${socialLinks.instagram}`;
};

// Función para generar URL de email
export const getEmailUrl = (subject = '') => {
  const encodedSubject = encodeURIComponent(subject);
  return `mailto:${socialLinks.email}${subject ? `?subject=${encodedSubject}` : ''}`;
};
