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
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');

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

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setChangingPassword(true);
    setPasswordMessage('');

    // Validaciones
    if (passwordData.newPassword.length < 6) {
      setPasswordMessage('❌ La nueva contraseña debe tener al menos 6 caracteres');
      setChangingPassword(false);
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordMessage('❌ Las contraseñas no coinciden');
      setChangingPassword(false);
      return;
    }

    try {
      // Obtener el hash actual para enviarlo al servidor
      const { getPasswordHash } = await import('@/lib/auth');
      const currentPasswordHash = getPasswordHash();

      const response = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
          currentPasswordHash: currentPasswordHash
        }),
      });

      const data = await response.json();

      if (data.success && data.passwordHash) {
        // Guardar el hash de la nueva contraseña en localStorage
        const { savePasswordHash } = await import('@/lib/auth');
        await savePasswordHash(data.passwordHash);
        
        setPasswordMessage('✅ Contraseña cambiada exitosamente');
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
        setTimeout(() => setPasswordMessage(''), 5000);
      } else {
        setPasswordMessage(data.message || '❌ Error al cambiar contraseña');
      }
    } catch (error) {
      console.error('Error changing password:', error);
      setPasswordMessage('❌ Error de conexión. Por favor intenta nuevamente.');
    } finally {
      setChangingPassword(false);
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

      <div className={styles.passwordSection}>
        <h2>Cambiar Contraseña del Admin</h2>
        
        <form onSubmit={handlePasswordChange} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="currentPassword">Contraseña Actual</label>
            <input
              id="currentPassword"
              type="password"
              value={passwordData.currentPassword}
              onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
              required
              placeholder="Ingresa tu contraseña actual"
              disabled={changingPassword}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="newPassword">Nueva Contraseña</label>
            <input
              id="newPassword"
              type="password"
              value={passwordData.newPassword}
              onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
              required
              placeholder="Mínimo 6 caracteres"
              minLength={6}
              disabled={changingPassword}
            />
            <small>La contraseña debe tener al menos 6 caracteres</small>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword">Confirmar Nueva Contraseña</label>
            <input
              id="confirmPassword"
              type="password"
              value={passwordData.confirmPassword}
              onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
              required
              placeholder="Confirma tu nueva contraseña"
              disabled={changingPassword}
            />
          </div>

          {passwordMessage && (
            <div className={`${styles.message} ${passwordMessage.includes('✅') ? styles.success : styles.error}`}>
              {passwordMessage}
            </div>
          )}

          <div className={styles.actions}>
            <button 
              type="submit" 
              className={styles.saveBtn}
              disabled={changingPassword}
            >
              {changingPassword ? 'Cambiando contraseña...' : 'Cambiar Contraseña'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

