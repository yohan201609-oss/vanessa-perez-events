'use client';

import { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaHeart, FaBaby, FaBriefcase, FaCalendarAlt, FaGraduationCap } from 'react-icons/fa';
import ImageUploader from '@/components/admin/ImageUploader';
import styles from './ServiciosEditor.module.css';

const iconMap = {
  FaHeart,
  FaBaby,
  FaBriefcase,
  FaCalendarAlt,
  FaGraduationCap
};

export default function ServiciosEditor() {
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: 'FaHeart',
    image: '',
    features: ['']
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadServicios();
  }, []);

  const loadServicios = async () => {
    try {
      const { contentStorage } = await import('@/lib/storage');
      const data = await contentStorage.getServicios();
      setServicios(data);
    } catch (error) {
      console.error('Error loading servicios:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const { contentStorage } = await import('@/lib/storage');
      
      const serviceData = {
        ...formData,
        features: formData.features.filter(f => f.trim() !== '')
      };

      // Obtener servicios actuales
      const servicios = await contentStorage.getServicios();
      let updatedServicios;

      if (editingId) {
        // Actualizar servicio existente
        serviceData.id = editingId;
        updatedServicios = servicios.map(s => 
          s.id === editingId ? serviceData : s
        );
      } else {
        // Agregar nuevo servicio
        const maxId = servicios.length > 0 
          ? Math.max(...servicios.map(s => s.id)) 
          : 0;
        serviceData.id = maxId + 1;
        updatedServicios = [...servicios, serviceData];
      }

      const result = await contentStorage.saveServicios(updatedServicios);

      if (result.success) {
        // Disparar evento para actualizar componentes
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('contentUpdated', { 
            detail: { type: 'servicios', data: updatedServicios } 
          }));
        }
        
        setMessage('✅ Servicio guardado exitosamente. Recarga la página principal para ver los cambios.');
        resetForm();
        loadServicios();
        setTimeout(() => setMessage(''), 5000);
      } else {
        setMessage(`❌ ${result.error || 'Error al guardar servicio'}`);
        setTimeout(() => setMessage(''), 8000);
      }
    } catch (error) {
      console.error('Error saving servicio:', error);
      setMessage('❌ Error al guardar servicio');
    }
  };

  const handleEdit = (servicio) => {
    setFormData({
      title: servicio.title,
      description: servicio.description,
      icon: servicio.icon,
      image: servicio.image || '',
      features: servicio.features && servicio.features.length > 0 
        ? servicio.features 
        : ['']
    });
    setEditingId(servicio.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Estás seguro de eliminar este servicio?')) return;

    try {
      const { contentStorage } = await import('@/lib/storage');
      
      const servicios = await contentStorage.getServicios();
      const updatedServicios = servicios.filter(s => s.id !== id);
      
      const result = await contentStorage.saveServicios(updatedServicios);

      if (result.success) {
        // Disparar evento para actualizar componentes
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('contentUpdated', { 
            detail: { type: 'servicios', data: updatedServicios } 
          }));
        }
        
        setMessage('✅ Servicio eliminado exitosamente. Recarga la página principal para ver los cambios.');
        loadServicios();
        setTimeout(() => setMessage(''), 5000);
      } else {
        setMessage(`❌ ${result.error || 'Error al eliminar servicio'}`);
        setTimeout(() => setMessage(''), 8000);
      }
    } catch (error) {
      console.error('Error deleting servicio:', error);
      setMessage('❌ Error al eliminar servicio');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      icon: 'FaHeart',
      image: '',
      features: ['']
    });
    setEditingId(null);
    setShowForm(false);
  };

  const addFeature = () => {
    setFormData({
      ...formData,
      features: [...formData.features, '']
    });
  };

  const updateFeature = (index, value) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData({ ...formData, features: newFeatures });
  };

  const removeFeature = (index) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData({ ...formData, features: newFeatures.length > 0 ? newFeatures : [''] });
  };

  if (loading) {
    return <div className={styles.loading}>Cargando servicios...</div>;
  }

  const IconComponent = iconMap[formData.icon] || FaHeart;

  return (
    <div className={styles.editor}>
      <div className={styles.header}>
        <h1>Gestionar Servicios</h1>
        <button 
          className={styles.addBtn}
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
        >
          <FaPlus /> Agregar Servicio
        </button>
      </div>

      {message && (
        <div className={`${styles.message} ${message.includes('✅') ? styles.success : styles.error}`}>
          {message}
        </div>
      )}

      {showForm && (
        <div className={styles.formContainer}>
          <h2>{editingId ? 'Editar' : 'Agregar'} Servicio</h2>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label>Título</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                required
                placeholder="Ej: Bodas"
              />
            </div>

            <div className={styles.formGroup}>
              <label>Descripción</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows="3"
                required
                placeholder="Descripción del servicio..."
              />
            </div>

            <div className={styles.formGroup}>
              <label>Icono</label>
              <select
                value={formData.icon}
                onChange={(e) => setFormData({...formData, icon: e.target.value})}
              >
                <option value="FaHeart">Corazón (Bodas)</option>
                <option value="FaBaby">Bebé (Baby Showers)</option>
                <option value="FaBriefcase">Maletín (Corporativos)</option>
                <option value="FaCalendarAlt">Calendario (Especiales)</option>
                <option value="FaGraduationCap">Gorra (Graduaciones)</option>
              </select>
              <div className={styles.iconPreview}>
                <IconComponent />
              </div>
            </div>

            <div className={styles.formGroup}>
              <ImageUploader
                label="Imagen del Servicio"
                currentImage={formData.image}
                onUpload={(url) => setFormData({...formData, image: url})}
              />
            </div>

            <div className={styles.formGroup}>
              <label>Características del Servicio</label>
              {formData.features.map((feature, index) => (
                <div key={index} className={styles.featureInput}>
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => updateFeature(index, e.target.value)}
                    placeholder="Característica del servicio..."
                  />
                  {formData.features.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      className={styles.removeBtn}
                    >
                      <FaTrash />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addFeature}
                className={styles.addFeatureBtn}
              >
                <FaPlus /> Agregar Característica
              </button>
            </div>

            <div className={styles.formActions}>
              <button type="submit" className={styles.saveBtn}>
                {editingId ? 'Actualizar' : 'Crear'} Servicio
              </button>
              <button type="button" onClick={resetForm} className={styles.cancelBtn}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      <div className={styles.servicesList}>
        <h2>Servicios ({servicios.length})</h2>
        <div className={styles.servicesGrid}>
          {servicios.map((servicio) => {
            const ServiceIcon = iconMap[servicio.icon] || FaHeart;
            return (
              <div key={servicio.id} className={styles.serviceCard}>
                <div className={styles.serviceImage}>
                  {servicio.image ? (
                    <img src={servicio.image} alt={servicio.title} />
                  ) : (
                    <div className={styles.noImage}>Sin imagen</div>
                  )}
                </div>
                <div className={styles.serviceContent}>
                  <div className={styles.serviceIcon}>
                    <ServiceIcon />
                  </div>
                  <h3>{servicio.title}</h3>
                  <p>{servicio.description}</p>
                  <div className={styles.serviceActions}>
                    <button
                      onClick={() => handleEdit(servicio)}
                      className={styles.editBtn}
                    >
                      <FaEdit /> Editar
                    </button>
                    <button
                      onClick={() => handleDelete(servicio.id)}
                      className={styles.deleteBtn}
                    >
                      <FaTrash /> Eliminar
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

