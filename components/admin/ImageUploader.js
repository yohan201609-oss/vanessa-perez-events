'use client';

import { useState } from 'react';
import { FaUpload, FaTimes, FaSpinner } from 'react-icons/fa';
import styles from './ImageUploader.module.css';

export default function ImageUploader({ onUpload, currentImage, label = 'Imagen' }) {
  const [preview, setPreview] = useState(currentImage || null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  // Función para comprimir imagen
  const compressImage = (file, maxWidth = 1200, maxHeight = 1200, quality = 0.8) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          // Calcular nuevo tamaño manteniendo proporción
          if (width > height) {
            if (width > maxWidth) {
              height = (height * maxWidth) / width;
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width = (width * maxHeight) / height;
              height = maxHeight;
            }
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          // Convertir a base64 con compresión
          const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
          resolve(compressedDataUrl);
        };
      };
    });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validar tipo de archivo
    if (!file.type.startsWith('image/')) {
      setError('Por favor selecciona un archivo de imagen');
      return;
    }

    // Validar tamaño (máximo 10MB antes de comprimir)
    if (file.size > 10 * 1024 * 1024) {
      setError('La imagen debe ser menor a 10MB');
      return;
    }

    setError('');
    setUploading(true);
    
    try {
      // Comprimir imagen antes de subir
      const compressedDataUrl = await compressImage(file, 1200, 1200, 0.75);
      
      // Validar tamaño después de compresión (máximo 500KB)
      const base64Size = compressedDataUrl.length * 0.75; // Aproximación del tamaño en bytes
      if (base64Size > 500 * 1024) {
        // Si sigue siendo muy grande, comprimir más
        const moreCompressed = await compressImage(file, 800, 800, 0.6);
        const moreCompressedSize = moreCompressed.length * 0.75;
        if (moreCompressedSize > 500 * 1024) {
          setError('La imagen es demasiado grande. Por favor, usa una imagen más pequeña.');
          setUploading(false);
          return;
        }
        setPreview(moreCompressed);
        onUpload(moreCompressed);
      } else {
        setPreview(compressedDataUrl);
        onUpload(compressedDataUrl);
      }
    } catch (error) {
      console.error('Error processing image:', error);
      setError('Error al procesar la imagen');
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onUpload(null);
    setError('');
  };

  return (
    <div className={styles.uploader}>
      <label className={styles.label}>{label}</label>
      
      {preview ? (
        <div className={styles.preview}>
          <img src={preview} alt="Preview" />
          {!uploading && (
            <button 
              onClick={handleRemove}
              className={styles.removeBtn}
              type="button"
              aria-label="Eliminar imagen"
            >
              <FaTimes />
            </button>
          )}
          {uploading && (
            <div className={styles.uploadingOverlay}>
              <FaSpinner className={styles.spinner} />
              <span>Subiendo...</span>
            </div>
          )}
        </div>
      ) : (
        <label className={styles.uploadArea}>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={uploading}
            style={{ display: 'none' }}
          />
          {uploading ? (
            <>
              <FaSpinner className={styles.spinner} />
              <span>Subiendo imagen...</span>
            </>
          ) : (
            <>
              <FaUpload />
              <span>Click para subir imagen</span>
              <small>JPG, PNG o GIF (máx. 10MB, se comprimirá automáticamente)</small>
            </>
          )}
        </label>
      )}
      
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
}

