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
        image: '/images/events/boda-elegante-jardin.jpg',
        type: 'image'
      },
      {
        id: 2,
        title: 'Boda Moderna',
        description: 'Momentos mágicos de una boda perfecta',
        image: '/images/events/boda-moderna.jpg',
        type: 'image'
      },
      {
        id: 3,
        title: 'Boda Rústica',
        description: 'Celebración íntima con decoración natural',
        image: '/images/events/boda-rustica.jpg',
        type: 'image'
      }
    ],
    babyShowers: [
      {
        id: 4,
        title: 'Baby Shower Elegante',
        description: 'Celebración de la llegada del bebé',
        image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        type: 'image'
      },
      {
        id: 5,
        title: 'Baby Shower Temático',
        description: 'Fiesta temática con decoración creativa',
        image: '/images/events/baby-shower-tematico.jpg',
        type: 'image'
      }
    ],
    corporativos: [
      {
        id: 6,
        title: 'Conferencia Empresarial',
        description: 'Evento corporativo elegante y profesional',
        image: '/images/events/conferencia-empresarial.jpg',
        type: 'image'
      },
      {
        id: 7,
        title: 'Lanzamiento de Producto',
        description: 'Presentación corporativa moderna',
        image: '/images/events/lanzamiento-producto.jpg',
        type: 'image'
      },
      {
        id: 8,
        title: 'Cena de Gala',
        description: 'Evento corporativo de alto nivel',
        image: '/images/events/cena-gala-corporativa.jpg',
        type: 'image'
      }
    ],
    especiales: [
      {
        id: 9,
        title: 'Aniversario de Bodas',
        description: 'Celebración de aniversario especial',
        image: '/images/events/aniversario-bodas.jpg',
        type: 'image'
      },
      {
        id: 10,
        title: 'Quinceañera',
        description: 'Celebración de quince años inolvidable',
        image: '/images/events/quinceanera.jpg',
        type: 'image'
      },
      {
        id: 11,
        title: 'Evento de Gala',
        description: 'Celebración elegante y sofisticada',
        image: '/images/events/evento-gala.jpg',
        type: 'image'
      }
    ],
    graduaciones: [
      {
        id: 12,
        title: 'Ceremonia de Graduación',
        description: 'Celebración de logros académicos',
        image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        type: 'image'
      },
      {
        id: 13,
        title: 'Fiesta de Graduación',
        description: 'Celebración post-graduación',
        image: '/images/events/fiesta-graduacion.jpg',
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
    bodas: '/images/events/boda-elegante-jardin.jpg',
    babyShowers: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    corporativos: '/images/events/conferencia-empresarial.jpg',
    especiales: '/images/events/aniversario-bodas.jpg',
    graduaciones: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
  }
};

// Función para obtener todas las imágenes de la galería
export const getAllGalleryImages = () => {
  return [
    ...images.gallery.bodas.map(item => ({ ...item, category: 'bodas' })),
    ...images.gallery.babyShowers.map(item => ({ ...item, category: 'baby-showers' })),
    ...images.gallery.corporativos.map(item => ({ ...item, category: 'corporativos' })),
    ...images.gallery.especiales.map(item => ({ ...item, category: 'especiales' })),
    ...images.gallery.graduaciones.map(item => ({ ...item, category: 'graduaciones' }))
  ];
};

// Función para obtener imágenes por categoría
export const getImagesByCategory = (category) => {
  const categoryMap = {
    'bodas': images.gallery.bodas,
    'baby-showers': images.gallery.babyShowers,
    'corporativos': images.gallery.corporativos,
    'especiales': images.gallery.especiales,
    'graduaciones': images.gallery.graduaciones
  };
  return categoryMap[category] || [];
};

