'use client';

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import styles from './OptimizedImage.module.css';

const OptimizedImage = ({
  src,
  alt,
  className = '',
  style = {},
  placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2Y0ZjRmNCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiM5OTkiIGR5PSIuM2VtIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5DYXJnYW5kby4uLjwvdGV4dD48L3N2Zz4=',
  onError = null,
  width,
  height,
  ...props
}) => {
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleImageLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleImageError = useCallback(() => {
    setHasError(true);
    setIsLoading(false);
    if (onError) {
      onError();
    }
  }, [onError]);

  useEffect(() => {
    if (src && src !== placeholder) {
      // Usar el constructor nativo del navegador para pre-cargar la imagen
      const img = new window.Image();
      let isMounted = true;
      
      img.onload = () => {
        if (isMounted) {
          setImageSrc(src);
          handleImageLoad();
        }
      };
      img.onerror = () => {
        if (isMounted) {
          handleImageError();
        }
      };
      img.src = src;
      
      return () => {
        isMounted = false;
        // Limpiar referencias
        img.onload = null;
        img.onerror = null;
      };
    }
  }, [src, placeholder, handleImageError, handleImageLoad]);

  // Si es una URL externa, usar img normal
  if (src && (src.startsWith('http://') || src.startsWith('https://'))) {
    return (
      <div className={`${styles.imageContainer} ${className}`} style={style}>
        <img
          src={imageSrc}
          alt={alt}
          className={`${styles.optimizedImage} ${isLoading ? styles.loading : ''} ${hasError ? styles.error : ''}`}
          onError={handleImageError}
          {...props}
        />
        {isLoading && (
          <div className={styles.imageLoading}>
            <div className={styles.loadingSpinner}></div>
          </div>
        )}
        {hasError && (
          <div className={styles.imageError}>
            <span>⚠️ Error al cargar la imagen</span>
          </div>
        )}
      </div>
    );
  }

  // Si es una ruta local, usar Next.js Image
  return (
    <div className={`${styles.imageContainer} ${className}`} style={style}>
      <Image
        src={src || placeholder}
        alt={alt}
        width={width || 150}
        height={height || 150}
        className={`${styles.optimizedImage} ${isLoading ? styles.loading : ''} ${hasError ? styles.error : ''}`}
        onError={handleImageError}
        onLoad={handleImageLoad}
        {...props}
      />
      {isLoading && (
        <div className={styles.imageLoading}>
          <div className={styles.loadingSpinner}></div>
        </div>
      )}
      {hasError && (
        <div className={styles.imageError}>
          <span>⚠️ Error al cargar la imagen</span>
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;

