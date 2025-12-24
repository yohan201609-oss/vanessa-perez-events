'use client';

import { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaStar } from 'react-icons/fa';
import ImageUploader from '@/components/admin/ImageUploader';
import styles from './TestimoniosEditor.module.css';

export default function TestimoniosEditor() {
  const [testimonios, setTestimonios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    event: '',
    rating: 5,
    text: '',
    image: '',
    date: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadTestimonios();
  }, []);

  const loadTestimonios = async () => {
    try {
      const { contentStorage } = await import('@/lib/storage');
      const data = await contentStorage.getTestimonios();
      setTestimonios(data);
    } catch (error) {
      console.error('Error loading testimonios:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const { contentStorage } = await import('@/lib/storage');
      
      const testimonioData = { ...formData };
      const testimonios = await contentStorage.getTestimonios();
      let updatedTestimonios;

      if (editingId) {
        // Actualizar testimonio existente
        testimonioData.id = editingId;
        updatedTestimonios = testimonios.map(t => 
          t.id === editingId ? testimonioData : t
        );
      } else {
        // Agregar nuevo testimonio
        const maxId = testimonios.length > 0 
          ? Math.max(...testimonios.map(t => t.id)) 
          : 0;
        testimonioData.id = maxId + 1;
        updatedTestimonios = [...testimonios, testimonioData];
      }

      const result = await contentStorage.saveTestimonios(updatedTestimonios);

      if (result.success) {
        // Disparar evento para actualizar componentes
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('contentUpdated', { 
            detail: { type: 'testimonios', data: updatedTestimonios } 
          }));
        }
        
        setMessage('✅ Testimonio guardado exitosamente. Recarga la página principal para ver los cambios.');
        resetForm();
        loadTestimonios();
        setTimeout(() => setMessage(''), 5000);
      } else {
        setMessage('❌ Error al guardar testimonio');
      }
    } catch (error) {
      console.error('Error saving testimonio:', error);
      setMessage('❌ Error al guardar testimonio');
    }
  };

  const handleEdit = (testimonio) => {
    setFormData({
      name: testimonio.name,
      event: testimonio.event,
      rating: testimonio.rating,
      text: testimonio.text,
      image: testimonio.image || '',
      date: testimonio.date || ''
    });
    setEditingId(testimonio.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Estás seguro de eliminar este testimonio?')) return;

    try {
      const { contentStorage } = await import('@/lib/storage');
      
      const testimonios = await contentStorage.getTestimonios();
      const updatedTestimonios = testimonios.filter(t => t.id !== id);
      
      const result = await contentStorage.saveTestimonios(updatedTestimonios);

      if (result.success) {
        // Disparar evento para actualizar componentes
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('contentUpdated', { 
            detail: { type: 'testimonios', data: updatedTestimonios } 
          }));
        }
        
        setMessage('✅ Testimonio eliminado exitosamente. Recarga la página principal para ver los cambios.');
        loadTestimonios();
        setTimeout(() => setMessage(''), 5000);
      } else {
        setMessage('❌ Error al eliminar testimonio');
      }
    } catch (error) {
      console.error('Error deleting testimonio:', error);
      setMessage('❌ Error al eliminar testimonio');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      event: '',
      rating: 5,
      text: '',
      image: '',
      date: ''
    });
    setEditingId(null);
    setShowForm(false);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FaStar 
        key={index} 
        className={index < rating ? styles.filled : styles.empty} 
      />
    ));
  };

  if (loading) {
    return <div className={styles.loading}>Cargando testimonios...</div>;
  }

  return (
    <div className={styles.editor}>
      <div className={styles.header}>
        <h1>Gestionar Testimonios</h1>
        <button 
          className={styles.addBtn}
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
        >
          <FaPlus /> Agregar Testimonio
        </button>
      </div>

      {message && (
        <div className={`${styles.message} ${message.includes('✅') ? styles.success : styles.error}`}>
          {message}
        </div>
      )}

      {showForm && (
        <div className={styles.formContainer}>
          <h2>{editingId ? 'Editar' : 'Agregar'} Testimonio</h2>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>Nombre del Cliente</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                  placeholder="Ej: María González"
                />
              </div>

              <div className={styles.formGroup}>
                <label>Tipo de Evento</label>
                <input
                  type="text"
                  value={formData.event}
                  onChange={(e) => setFormData({...formData, event: e.target.value})}
                  required
                  placeholder="Ej: Boda de Ensueño"
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>Calificación (1-5 estrellas)</label>
                <select
                  value={formData.rating}
                  onChange={(e) => setFormData({...formData, rating: parseInt(e.target.value)})}
                >
                  <option value={5}>5 estrellas</option>
                  <option value={4}>4 estrellas</option>
                  <option value={3}>3 estrellas</option>
                  <option value={2}>2 estrellas</option>
                  <option value={1}>1 estrella</option>
                </select>
                <div className={styles.ratingPreview}>
                  {renderStars(formData.rating)}
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Fecha</label>
                <input
                  type="text"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  placeholder="Ej: Enero 2024"
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label>Testimonio</label>
              <textarea
                value={formData.text}
                onChange={(e) => setFormData({...formData, text: e.target.value})}
                rows="5"
                required
                placeholder="Escribe el testimonio del cliente..."
              />
            </div>

            <div className={styles.formGroup}>
              <ImageUploader
                label="Foto del Cliente"
                currentImage={formData.image}
                onUpload={(url) => setFormData({...formData, image: url})}
              />
            </div>

            <div className={styles.formActions}>
              <button type="submit" className={styles.saveBtn}>
                {editingId ? 'Actualizar' : 'Crear'} Testimonio
              </button>
              <button type="button" onClick={resetForm} className={styles.cancelBtn}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      <div className={styles.testimoniosList}>
        <h2>Testimonios ({testimonios.length})</h2>
        <div className={styles.testimoniosGrid}>
          {testimonios.map((testimonio) => (
            <div key={testimonio.id} className={styles.testimonioCard}>
              <div className={styles.testimonioImage}>
                {testimonio.image ? (
                  <img src={testimonio.image} alt={testimonio.name} />
                ) : (
                  <div className={styles.noImage}>Sin foto</div>
                )}
              </div>
              <div className={styles.testimonioContent}>
                <div className={styles.testimonioRating}>
                  {renderStars(testimonio.rating)}
                </div>
                <p className={styles.testimonioText}>"{testimonio.text}"</p>
                <div className={styles.testimonioAuthor}>
                  <h4>{testimonio.name}</h4>
                  <p className={styles.eventType}>{testimonio.event}</p>
                  {testimonio.date && <p className={styles.date}>{testimonio.date}</p>}
                </div>
                <div className={styles.testimonioActions}>
                  <button
                    onClick={() => handleEdit(testimonio)}
                    className={styles.editBtn}
                  >
                    <FaEdit /> Editar
                  </button>
                  <button
                    onClick={() => handleDelete(testimonio.id)}
                    className={styles.deleteBtn}
                  >
                    <FaTrash /> Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

