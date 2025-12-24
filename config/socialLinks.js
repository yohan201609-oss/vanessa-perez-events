// Configuración de enlaces de redes sociales
// Usa variables de entorno si están disponibles, sino usa valores por defecto

// Función para limpiar el número de WhatsApp (remover espacios, paréntesis, guiones y +)
const cleanWhatsAppNumber = (number) => {
  if (!number) return '1234567890';
  // Remover espacios, paréntesis, guiones y el símbolo +
  return number.replace(/[\s()\-+]/g, '');
};

export const socialLinks = {
  whatsapp: {
    number: cleanWhatsAppNumber(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '1234567890'),
    message: '¡Hola! Me interesa conocer más sobre sus servicios de eventos. ¿Podrían ayudarme?',
    quickMessages: {
      quote: 'Hola, me interesa cotizar un evento',
      portfolio: 'Hola, quiero ver su portafolio de trabajos',
      questions: 'Hola, tengo dudas sobre sus servicios'
    }
  },
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_USERNAME || 'vanessaperez_events',
  email: process.env.NEXT_PUBLIC_EMAIL || 'info@vanessaperez.com',
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

