// Configuración de imágenes del sitio
// Reemplaza estas URLs con tus imágenes reales

export const images = {
  // Imágenes del Hero
  hero: {
    background: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    overlay: 'Boda Elegante'
  },

  // Imágenes de la Galería
  gallery: {
    bodas: [
      {
        id: 1,
        title: 'Boda Elegante en Jardín',
        description: 'Decoración romántica con flores blancas y doradas',
        image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        type: 'image'
      },
      {
        id: 2,
        title: 'Boda de Ensueño',
        description: 'Momentos mágicos de una boda perfecta',
        image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        type: 'video'
      }
    ],
    cumpleanos: [
      {
        id: 3,
        title: 'Cumpleaños Infantil',
        description: 'Fiesta temática de superhéroes',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        type: 'image'
      }
    ],
    corporativos: [
      {
        id: 4,
        title: 'Evento Corporativo',
        description: 'Conferencia empresarial elegante',
        image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        type: 'image'
      }
    ],
    graduaciones: [
      {
        id: 5,
        title: 'Ceremonia de Graduación',
        description: 'Celebración de logros académicos',
        image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        type: 'video'
      }
    ],
    babyShowers: [
      {
        id: 6,
        title: 'Baby Shower Elegante',
        description: 'Celebración de la llegada del bebé',
        image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        type: 'image'
      }
    ],
    especiales: [
      {
        id: 7,
        title: 'Evento Especial',
        description: 'Celebración única y memorable',
        image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        type: 'image'
      }
    ]
  },

  // Imágenes de Testimonios
  testimonials: [
    {
      name: 'María González',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
    },
    {
      name: 'Carlos y Ana Rodríguez',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
    },
    {
      name: 'TechCorp Solutions',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
    },
    {
      name: 'Laura Martínez',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
    },
    {
      name: 'Familia Hernández',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
    }
  ],

  // Imágenes de Servicios
  services: {
    bodas: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    cumpleanos: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    corporativos: 'https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    graduaciones: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    babyShowers: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    especiales: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
  }
};

// Función para obtener todas las imágenes de la galería
export const getAllGalleryImages = () => {
  return [
    ...images.gallery.bodas.map(item => ({ ...item, category: 'bodas' })),
    ...images.gallery.cumpleanos.map(item => ({ ...item, category: 'cumpleanos' })),
    ...images.gallery.corporativos.map(item => ({ ...item, category: 'corporativos' })),
    ...images.gallery.graduaciones.map(item => ({ ...item, category: 'graduaciones' })),
    ...images.gallery.babyShowers.map(item => ({ ...item, category: 'baby-showers' })),
    ...images.gallery.especiales.map(item => ({ ...item, category: 'especiales' }))
  ];
};

// Función para obtener imágenes por categoría
export const getImagesByCategory = (category) => {
  const categoryMap = {
    'bodas': images.gallery.bodas,
    'cumpleanos': images.gallery.cumpleanos,
    'corporativos': images.gallery.corporativos,
    'graduaciones': images.gallery.graduaciones,
    'baby-showers': images.gallery.babyShowers,
    'especiales': images.gallery.especiales
  };
  return categoryMap[category] || [];
};
