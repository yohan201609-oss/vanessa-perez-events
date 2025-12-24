'use client';

import { useState, useEffect } from 'react';
import styles from './ConfiguracionEditor.module.css';

export default function ConfiguracionEditor() {
  const [config, setConfig] = useState({
    whatsapp: '',
    instagram: '',
    email: '',
    telefono: '',
    location: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadConfig();
  }, []);

  const loadConfig = async () => {
    try {
      const { contentStorage } = await import('@/lib/storage');
      const data = await contentStorage.getConfig();
      setConfig(data);
    } catch (error) {
      console.error('Error loading config:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    try {
      const { saveContentAndNotify } = await import('@/lib/adminHelpers');
      await saveContentAndNotify('config', config);
      
      setMessage('✅ Configuración guardada exitosamente');
      setTimeout(() => setMessage(''), 5000);
    } catch (error) {
      console.error('Error saving config:', error);
      setMessage('❌ Error al guardar configuración');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className={styles.loading}>Cargando configuración...</div>;
  }

  return (
    <div className={styles.editor}>
      <div className={styles.header}>
        <h1>Configuración General</h1>
        <p>Gestiona la información de contacto y redes sociales</p>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.section}>
          <h2>Información de Contacto</h2>
          
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={config.email}
              onChange={(e) => setConfig({...config, email: e.target.value})}
              placeholder="info@vanessaperez.com"
            />
            <small>Email principal de contacto</small>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="telefono">Teléfono</label>
            <input
              id="telefono"
              type="tel"
              value={config.telefono}
              onChange={(e) => setConfig({...config, telefono: e.target.value})}
              placeholder="+1 (555) 123-4567"
            />
            <small>Teléfono de contacto (formato libre)</small>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="whatsapp">WhatsApp</label>
            <input
              id="whatsapp"
              type="tel"
              value={config.whatsapp}
              onChange={(e) => setConfig({...config, whatsapp: e.target.value})}
              placeholder="+1 (849) 856-3436"
            />
            <small>Número de WhatsApp (se limpiará automáticamente)</small>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="location">Ubicación</label>
            <input
              id="location"
              type="text"
              value={config.location}
              onChange={(e) => setConfig({...config, location: e.target.value})}
              placeholder="Ciudad, Estado, País"
            />
            <small>Ubicación del negocio</small>
          </div>
        </div>

        <div className={styles.section}>
          <h2>Redes Sociales</h2>
          
          <div className={styles.formGroup}>
            <label htmlFor="instagram">Instagram</label>
            <input
              id="instagram"
              type="text"
              value={config.instagram}
              onChange={(e) => setConfig({...config, instagram: e.target.value})}
              placeholder="vanessaperez_events"
            />
            <small>Nombre de usuario de Instagram (sin @)</small>
          </div>
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
            {saving ? 'Guardando...' : 'Guardar Configuración'}
          </button>
        </div>

        <div className={styles.infoBox}>
          <h3>📌 Nota Importante</h3>
          <p>
            Estas configuraciones se guardan en el almacenamiento local del sitio. 
            Para que los cambios en las variables de entorno (NEXT_PUBLIC_*) tengan efecto, 
            es necesario configurarlas también en el archivo de variables de entorno de tu 
            proveedor de hosting (Vercel, Netlify, etc.).
          </p>
        </div>
      </form>
    </div>
  );
}

