// Funciones helper para el panel admin
import { contentStorage } from './storage';

/**
 * Guarda contenido y dispara evento de actualización
 */
export async function saveContentAndNotify(contentType, data) {
  try {
    let result;
    
    switch (contentType) {
      case 'hero':
        result = await contentStorage.saveHero(data);
        break;
      case 'servicios':
        result = await contentStorage.saveServicios(data);
        break;
      case 'testimonios':
        result = await contentStorage.saveTestimonios(data);
        break;
      case 'galeria':
        result = await contentStorage.saveGaleria(data);
        break;
      case 'config':
        result = await contentStorage.saveConfig(data);
        break;
      default:
        return { success: false, error: 'Tipo de contenido no válido' };
    }

    if (result.success) {
      // Disparar evento personalizado para actualización inmediata
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('contentUpdated', { 
          detail: { type: contentType, data } 
        }));
        
        // El evento storage se dispara automáticamente cuando se usa localStorage.setItem
        // que es lo que hace saveToStorage en lib/storage.js
      }
    }

    return result;
  } catch (error) {
    console.error(`Error saving ${contentType}:`, error);
    return { success: false, error: error.message };
  }
}

