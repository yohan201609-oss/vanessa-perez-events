// Hook para sincronizar contenido entre admin y componentes públicos
import { useEffect } from 'react';

export function useContentSync(contentType, onUpdate) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Escuchar eventos personalizados de actualización
    const handleContentUpdate = (event) => {
      if (event.detail.type === contentType) {
        onUpdate();
      }
    };

    // Escuchar cambios en localStorage (para sincronización entre pestañas)
    const handleStorageChange = (e) => {
      if (e.key === `content:${contentType}`) {
        onUpdate();
      }
    };

    window.addEventListener('contentUpdated', handleContentUpdate);
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('contentUpdated', handleContentUpdate);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [contentType, onUpdate]);
}

