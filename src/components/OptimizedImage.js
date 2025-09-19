import React, { useState, useCallback } from 'react';

const OptimizedImage = ({
  src,
  alt,
  className = '',
  style = {},
  placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2Y0ZjRmNCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiM5OTkiIGR5PSIuM2VtIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5DYXJnYW5kby4uLjwvdGV4dD48L3N2Zz4=',
  onError = null,
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

  React.useEffect(() => {
    if (src && src !== placeholder) {
      const img = new Image();
      img.onload = () => {
        setImageSrc(src);
        handleImageLoad();
      };
      img.onerror = handleImageError;
      img.src = src;
    }
  }, [src, placeholder, handleImageError]);

  return (
    <div className={`image-container ${className}`} style={style}>
      <img
        src={imageSrc}
        alt={alt}
        className={`optimized-image ${isLoading ? 'loading' : ''} ${hasError ? 'error' : ''}`}
        onError={handleImageError}
        {...props}
      />
      {isLoading && (
        <div className="image-loading">
          <div className="loading-spinner"></div>
        </div>
      )}
      {hasError && (
        <div className="image-error">
          <span>⚠️ Error al cargar la imagen</span>
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;
