'use client';

import { useState, useEffect } from 'react';
import { FaPlus, FaTrash, FaEdit } from 'react-icons/fa';
import ImageUploader from '@/components/admin/ImageUploader';
import styles from './GaleriaEditor.module.css';

export default function GaleriaEditor() {
  const [galeria, setGaleria] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    category: 'bodas',
    type: 'image'
  });
  const [message, setMessage] = useState('');

  const categories = [
    { id: 'bodas', name: 'Bodas' },
    { id: 'baby-showers', name: 'Baby Showers' },
    { id: 'corporativos', name: 'Corporativos' },
    { id: 'especiales', name: 'Eventos Especiales' },
    { id: 'graduaciones', name: 'Graduaciones' }
  ];

  useEffect(() => {
    loadGaleria();
  }, []);

  const loadGaleria = async () => {
    try {
      const { contentStorage } = await import('@/lib/storage');
      const data = await contentStorage.getGaleria();
      setGaleria(data);
    } catch (error) {
      console.error('Error loading galeria:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.image) {
      setMessage('❌ Por favor selecciona una imagen');
      return;
    }

    setMessage('');

    try {
      const { contentStorage } = await import('@/lib/storage');
      
      const galeria = await contentStorage.getGaleria();
      const maxId = galeria.length > 0 
        ? Math.max(...galeria.map(i => i.id)) 
        : 0;
      
      const newImage = {
        ...formData,
        id: maxId + 1,
        type: formData.type || 'image'
      };
      
      const updatedGaleria = [...galeria, newImage];
      const result = await contentStorage.saveGaleria(updatedGaleria);

      if (result.success) {
        // Disparar evento para actualizar componentes
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('contentUpdated', { 
            detail: { type: 'galeria', data: updatedGaleria } 
          }));
        }
        
        setMessage('✅ Imagen agregada exitosamente. Recarga la página principal para ver los cambios.');
        resetForm();
        loadGaleria();
        setTimeout(() => setMessage(''), 5000);
      } else {
        setMessage('❌ Error al agregar imagen');
      }
    } catch (error) {
      console.error('Error saving galeria:', error);
      setMessage('❌ Error al agregar imagen');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Estás seguro de eliminar esta imagen?')) return;

    try {
      const { contentStorage } = await import('@/lib/storage');
      
      const galeria = await contentStorage.getGaleria();
      const updatedGaleria = galeria.filter(i => i.id !== id);
      
      const result = await contentStorage.saveGaleria(updatedGaleria);

      if (result.success) {
        // Disparar evento para actualizar componentes
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('contentUpdated', { 
            detail: { type: 'galeria', data: updatedGaleria } 
          }));
        }
        
        setMessage('✅ Imagen eliminada exitosamente. Recarga la página principal para ver los cambios.');
        loadGaleria();
        setTimeout(() => setMessage(''), 5000);
      } else {
        setMessage('❌ Error al eliminar imagen');
      }
    } catch (error) {
      console.error('Error deleting galeria:', error);
      setMessage('❌ Error al eliminar imagen');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      image: '',
      category: 'bodas',
      type: 'image'
    });
    setShowForm(false);
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : categoryId;
  };

  if (loading) {
    return <div className={styles.loading}>Cargando portafolio...</div>;
  }

  return (
    <div className={styles.editor}>
      <div className={styles.header}>
        <h1>Gestionar Portafolio</h1>
        <button 
          className={styles.addBtn}
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
        >
          <FaPlus /> Agregar Imagen
        </button>
      </div>

      {message && (
        <div className={`${styles.message} ${message.includes('✅') ? styles.success : styles.error}`}>
          {message}
        </div>
      )}

      {showForm && (
        <div className={styles.formContainer}>
          <h2>Agregar Imagen al Portafolio</h2>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <ImageUploader
                label="Imagen"
                currentImage={formData.image}
                onUpload={(url) => setFormData({...formData, image: url})}
              />
            </div>

            <div className={styles.formGroup}>
              <label>Título</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                required
                placeholder="Ej: Boda Elegante en Jardín"
              />
            </div>

            <div className={styles.formGroup}>
              <label>Descripción</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows="3"
                required
                placeholder="Descripción de la imagen..."
              />
            </div>

            <div className={styles.formGroup}>
              <label>Categoría</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div className={styles.formActions}>
              <button type="submit" className={styles.saveBtn}>
                Agregar Imagen
              </button>
              <button type="button" onClick={resetForm} className={styles.cancelBtn}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      <div className={styles.galeriaList}>
        <h2>Portafolio ({galeria.length} imágenes)</h2>
        
        {galeria.length === 0 ? (
          <div className={styles.emptyState}>
            <p>No hay imágenes en el portafolio. Agrega tu primera imagen.</p>
          </div>
        ) : (
          <div className={styles.galeriaGrid}>
            {galeria.map((item) => (
              <div key={item.id} className={styles.galeriaItem}>
                <div className={styles.galeriaImage}>
                  <img src={item.image} alt={item.title} />
                  <div className={styles.galeriaOverlay}>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className={styles.deleteBtn}
                      title="Eliminar"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
                <div className={styles.galeriaInfo}>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <span className={styles.categoryBadge}>
                    {getCategoryName(item.category)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

