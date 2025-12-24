// Sistema de almacenamiento de contenido usando window.storage
// Proporciona una API simple para guardar y recuperar contenido del sitio

// Valores por defecto para Hero
function getDefaultHero() {
  return {
    title: "Creamos momentos únicos que duran para siempre",
    highlightWord: "momentos únicos",
    subtitle: "Somos especialistas en diseñar y organizar eventos inolvidables. Desde bodas de ensueño hasta celebraciones corporativas, cada detalle cuenta en tu historia.",
    primaryButton: "Planifica tu evento",
    secondaryButton: "Ver nuestro trabajo",
    backgroundImage: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
  };
}

// Valores por defecto para Servicios
function getDefaultServicios() {
  return [
    {
      id: 1,
      title: 'Bodas',
      description: 'Creamos la boda de tus sueños con cada detalle perfectamente planificado. Desde la coordinación del día hasta la decoración elegante.',
      icon: 'FaHeart',
      features: [
        'Planificación completa del evento',
        'Coordinación de proveedores',
        'Decoración personalizada',
        'Seguimiento integral',
        'Asesoría de imagen y estilo'
      ],
      image: '/images/events/boda-elegante-jardin.jpg'
    },
    {
      id: 2,
      title: 'Baby Showers',
      description: 'Celebra la llegada del bebé con un evento especial lleno de amor, juegos y momentos únicos.',
      icon: 'FaBaby',
      features: [
        'Decoración temática adorable',
        'Coordinación de juegos',
        'Gestión de actividades',
        'Fotografía del evento',
        'Coordinación completa'
      ],
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 3,
      title: 'Eventos Corporativos',
      description: 'Eventos empresariales profesionales que dejan una impresión duradera. Conferencias, galas y reuniones corporativas.',
      icon: 'FaBriefcase',
      features: [
        'Planificación estratégica',
        'Coordinación de audiovisuales',
        'Gestión de catering',
        'Soporte técnico completo',
        'Coordinación integral'
      ],
      image: '/images/events/conferencia-empresarial.jpg'
    },
    {
      id: 4,
      title: 'Eventos Especiales',
      description: 'Cualquier celebración especial merece ser memorable. Aniversarios, despedidas, inauguraciones y más.',
      icon: 'FaCalendarAlt',
      features: [
        'Diseño personalizado',
        'Coordinación completa',
        'Gestión integral',
        'Seguimiento detallado',
        'Servicio personalizado'
      ],
      image: '/images/events/aniversario-bodas.jpg'
    },
    {
      id: 5,
      title: 'Graduaciones',
      description: 'Celebra los logros académicos con eventos memorables que honran el esfuerzo y dedicación de los graduados.',
      icon: 'FaGraduationCap',
      features: [
        'Decoración temática elegante',
        'Coordinación de ceremonias',
        'Gestión de catering',
        'Fotografía profesional',
        'Coordinación completa'
      ],
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    }
  ];
}

// Valores por defecto para Testimonios
function getDefaultTestimonios() {
  return [
    {
      id: 1,
      name: 'María González',
      event: 'Boda de Ensueño',
      rating: 5,
      text: 'Vanessa hizo realidad la boda de nuestros sueños. Su atención al detalle y profesionalismo fueron excepcionales. Cada momento fue perfecto.',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      date: 'Enero 2024'
    },
    {
      id: 2,
      name: 'Carlos y Ana Rodríguez',
      event: 'Cumpleaños de 50 años',
      rating: 5,
      text: 'Increíble experiencia. Vanessa organizó una fiesta sorpresa perfecta para mi esposa. Todos los invitados quedaron encantados con la decoración y la coordinación.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      date: 'Diciembre 2023'
    },
    {
      id: 3,
      name: 'TechCorp Solutions',
      event: 'Conferencia Anual',
      rating: 5,
      text: 'Vanessa coordinó nuestro evento corporativo con excelencia. Su profesionalismo y capacidad de organización nos permitió enfocarnos en el contenido del evento.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      date: 'Noviembre 2023'
    },
    {
      id: 4,
      name: 'Laura Martínez',
      event: 'Baby Shower',
      rating: 5,
      text: 'El baby shower fue mágico gracias a Vanessa. Cada detalle estaba perfectamente pensado. Definitivamente la recomiendo para cualquier evento especial.',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      date: 'Octubre 2023'
    },
    {
      id: 5,
      name: 'Familia Hernández',
      event: 'Graduación Universitaria',
      rating: 5,
      text: 'Vanessa organizó la celebración de graduación de nuestra hija de manera impecable. La decoración y la coordinación del evento fueron perfectas.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      date: 'Septiembre 2023'
    }
  ];
}

// Valores por defecto para Configuración
function getDefaultConfig() {
  return {
    whatsapp: '+1 (849) 856-3436',
    instagram: 'vanessaperez_events',
    email: 'info@vanessaperez.com',
    telefono: '+1 (555) 123-4567',
    location: 'Ciudad, Estado, País'
  };
}

// Helper para obtener del storage o localStorage como fallback
async function getFromStorage(key, defaultValue) {
  // En el servidor, retornar valores por defecto
  if (typeof window === 'undefined') {
    return defaultValue;
  }

  try {
    // Intentar usar window.storage primero (si está disponible)
    if (window.storage && typeof window.storage.get === 'function') {
      try {
        const result = await window.storage.get(key);
        if (result && result.value) {
          return JSON.parse(result.value);
        }
      } catch (e) {
        // Si window.storage falla, continuar con localStorage
      }
    }
    
    // Fallback a localStorage
    const item = localStorage.getItem(key);
    if (item) {
      return JSON.parse(item);
    }
    
    return defaultValue;
  } catch (error) {
    console.error(`Error reading ${key} from storage:`, error);
    return defaultValue;
  }
}

// Helper para guardar en storage o localStorage como fallback
async function saveToStorage(key, data) {
  // En el servidor, aceptar pero no guardar (el cliente lo hará)
  if (typeof window === 'undefined') {
    // En servidor, simplemente retornar éxito
    // El guardado real se hará desde el cliente
    return { success: true, serverSide: true };
  }

  try {
    const jsonData = JSON.stringify(data);
    const dataSize = new Blob([jsonData]).size;
    
    // Verificar tamaño antes de guardar (localStorage tiene ~5-10MB de límite)
    if (dataSize > 4 * 1024 * 1024) { // 4MB como límite seguro
      console.warn(`Warning: ${key} es muy grande (${(dataSize / 1024 / 1024).toFixed(2)}MB). Considera reducir el tamaño de las imágenes.`);
    }
    
    // Intentar usar window.storage primero (si está disponible)
    if (window.storage && typeof window.storage.set === 'function') {
      try {
        await window.storage.set(key, jsonData);
        return { success: true };
      } catch (e) {
        // Si window.storage falla, continuar con localStorage
        if (e.name === 'QuotaExceededError') {
          return { 
            success: false, 
            error: 'Almacenamiento lleno. Por favor, elimina imágenes antiguas o reduce el tamaño de las imágenes.' 
          };
        }
      }
    }
    
    // Fallback a localStorage
    try {
      localStorage.setItem(key, jsonData);
    } catch (e) {
      if (e.name === 'QuotaExceededError') {
        // Intentar limpiar espacio eliminando datos antiguos o sugerir al usuario
        const errorMsg = 'El almacenamiento está lleno. Por favor: 1) Elimina servicios/imágenes que no uses, 2) Reduce el tamaño de las imágenes, o 3) Limpia el almacenamiento del navegador.';
        console.error(errorMsg);
        return { 
          success: false, 
          error: errorMsg 
        };
      }
      throw e;
    }
    
    // Disparar evento storage manualmente para la misma pestaña
    // (el evento storage solo se dispara automáticamente entre pestañas diferentes)
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new StorageEvent('storage', {
        key: key,
        newValue: jsonData,
        oldValue: localStorage.getItem(key),
        storageArea: localStorage
      }));
    }
    
    return { success: true };
  } catch (error) {
    console.error(`Error saving ${key} to storage:`, error);
    if (error.name === 'QuotaExceededError') {
      return { 
        success: false, 
        error: 'El almacenamiento está lleno. Elimina contenido antiguo o reduce el tamaño de las imágenes.' 
      };
    }
    return { success: false, error: error.message };
  }
}

// API de almacenamiento de contenido
export const contentStorage = {
  // Hero
  async getHero() {
    return await getFromStorage('content:hero', getDefaultHero());
  },
  
  async saveHero(data) {
    return await saveToStorage('content:hero', data);
  },
  
  // Servicios
  async getServicios() {
    return await getFromStorage('content:servicios', getDefaultServicios());
  },
  
  async saveServicios(data) {
    return await saveToStorage('content:servicios', data);
  },
  
  // Galería
  async getGaleria() {
    return await getFromStorage('content:galeria', []);
  },
  
  async saveGaleria(data) {
    return await saveToStorage('content:galeria', data);
  },
  
  // Testimonios
  async getTestimonios() {
    return await getFromStorage('content:testimonios', getDefaultTestimonios());
  },
  
  async saveTestimonios(data) {
    return await saveToStorage('content:testimonios', data);
  },
  
  // Configuración
  async getConfig() {
    return await getFromStorage('content:config', getDefaultConfig());
  },
  
  async saveConfig(data) {
    return await saveToStorage('content:config', data);
  }
};

