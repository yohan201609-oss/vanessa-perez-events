'use client';

import { useState, useEffect } from 'react';
import ImageUploader from '@/components/admin/ImageUploader';
import styles from './HeroEditor.module.css';

export default function HeroEditor() {
  const [content, setContent] = useState({
    title: '',
    highlightWord: '',
    subtitle: '',
    primaryButton: '',
    secondaryButton: '',
    backgroundImage: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const { contentStorage } = await import('@/lib/storage');
      const data = await contentStorage.getHero();
      setContent(data);
    } catch (error) {
      console.error('Error loading hero:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    try {
      const { contentStorage } = await import('@/lib/storage');
      const result = await contentStorage.saveHero(content);

      if (result.success) {
        // Disparar evento para actualizar componentes en la misma pestaña
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('contentUpdated', { 
            detail: { type: 'hero', data: content } 
          }));
        }
        
        setMessage('✅ Cambios guardados exitosamente. Recarga la página principal para ver los cambios.');
        setTimeout(() => setMessage(''), 5000);
      } else {
        setMessage('❌ Error al guardar cambios: ' + (result.error || 'Error desconocido'));
      }
    } catch (error) {
      console.error('Error saving hero:', error);
      setMessage('❌ Error al guardar cambios: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className={styles.loading}>Cargando...</div>;
  }

  return (
    <div className={styles.editor}>
      <div className={styles.header}>
        <h1>Editar Hero</h1>
        <p>Personaliza el contenido principal de tu página de inicio</p>
      </div>

      <div className={styles.content}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label>Título Principal</label>
            <input
              type="text"
              value={content.title}
              onChange={(e) => setContent({...content, title: e.target.value})}
              placeholder="Creamos momentos únicos..."
            />
          </div>

          <div className={styles.formGroup}>
            <label>Palabra Destacada (que aparecerá resaltada)</label>
            <input
              type="text"
              value={content.highlightWord}
              onChange={(e) => setContent({...content, highlightWord: e.target.value})}
              placeholder="momentos únicos"
            />
          </div>

          <div className={styles.formGroup}>
            <label>Subtítulo</label>
            <textarea
              value={content.subtitle}
              onChange={(e) => setContent({...content, subtitle: e.target.value})}
              rows="4"
              placeholder="Somos especialistas en..."
            />
          </div>

          <div className={styles.formGroup}>
            <label>Texto del Botón Principal</label>
            <input
              type="text"
              value={content.primaryButton}
              onChange={(e) => setContent({...content, primaryButton: e.target.value})}
              placeholder="Planifica tu evento"
            />
          </div>

          <div className={styles.formGroup}>
            <label>Texto del Botón Secundario</label>
            <input
              type="text"
              value={content.secondaryButton}
              onChange={(e) => setContent({...content, secondaryButton: e.target.value})}
              placeholder="Ver nuestro trabajo"
            />
          </div>

          <div className={styles.formGroup}>
            <ImageUploader
              label="Imagen de Fondo"
              currentImage={content.backgroundImage}
              onUpload={(url) => setContent({...content, backgroundImage: url})}
            />
          </div>

          {message && (
            <div className={`${styles.message} ${message.includes('✅') ? styles.success : styles.error}`}>
              {message}
            </div>
          )}

          <div className={styles.actions}>
            <button 
              type="submit" 
              className={styles.saveBtn}
              disabled={saving}
            >
              {saving ? 'Guardando...' : 'Guardar Cambios'}
            </button>
          </div>
        </form>

        <div className={styles.preview}>
          <h3>Vista Previa</h3>
          <div className={styles.previewContent}>
            <div 
              className={styles.previewBackground}
              style={{
                backgroundImage: content.backgroundImage 
                  ? `url(${content.backgroundImage})` 
                  : 'linear-gradient(135deg, #f8f6f0 0%, #e8e0d0 100%)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className={styles.previewOverlay}></div>
              <div className={styles.previewText}>
                <h1>
                  {content.title.split(content.highlightWord)[0]}
                  {content.highlightWord && (
                    <span className={styles.highlight}>{content.highlightWord}</span>
                  )}
                  {content.title.split(content.highlightWord)[1]}
                </h1>
                <p>{content.subtitle}</p>
                <div className={styles.previewButtons}>
                  <button>{content.primaryButton}</button>
                  <button>{content.secondaryButton}</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

