import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay, FaTimes } from 'react-icons/fa';
import OptimizedImage from './OptimizedImage';
import { getAllGalleryImages } from '../config/images';
import './Gallery.css';

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [selectedImage, setSelectedImage] = useState(null);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const categories = [
    { id: 'todos', name: 'Todos' },
    { id: 'bodas', name: 'Bodas' },
    { id: 'cumpleanos', name: 'Cumpleaños' },
    { id: 'corporativos', name: 'Corporativos' },
    { id: 'graduaciones', name: 'Graduaciones' },
    { id: 'baby-showers', name: 'Baby Showers' }
  ];

  const galleryItems = getAllGalleryImages();

  const filteredItems = selectedCategory === 'todos' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  const openModal = (item) => {
    setSelectedImage(item);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  // Touch handlers for swipe gestures
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && selectedImage) {
      // Swipe left - next image
      const currentIndex = filteredItems.findIndex(item => item.id === selectedImage.id);
      const nextIndex = (currentIndex + 1) % filteredItems.length;
      setSelectedImage(filteredItems[nextIndex]);
    }
    
    if (isRightSwipe && selectedImage) {
      // Swipe right - previous image
      const currentIndex = filteredItems.findIndex(item => item.id === selectedImage.id);
      const prevIndex = currentIndex === 0 ? filteredItems.length - 1 : currentIndex - 1;
      setSelectedImage(filteredItems[prevIndex]);
    }
  };

  return (
    <section id="galeria" className="gallery section">
      <div className="container">
        <motion.div 
          className="section-header text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">Nuestro Portafolio</h2>
          <p className="section-subtitle">
            Descubre la magia de nuestros eventos a través de nuestra galería
          </p>
        </motion.div>

        <motion.div 
          className="gallery-filters"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {categories.map(category => (
            <button
              key={category.id}
              className={`filter-btn ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </motion.div>

        <motion.div 
          className="gallery-grid"
          layout
        >
          <AnimatePresence>
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                className="gallery-item"
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => openModal(item)}
              >
                <div className="gallery-image">
                  <OptimizedImage 
                    src={item.image} 
                    alt={item.title}
                    className="gallery-img"
                  />
                  {item.type === 'video' && (
                    <div className="play-overlay">
                      <FaPlay />
                    </div>
                  )}
                </div>
                <div className="gallery-content">
                  <h3 className="gallery-title">{item.title}</h3>
                  <p className="gallery-description">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence>
          {selectedImage && (
            <motion.div
              className="gallery-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
            >
              <div 
                className="modal-content" 
                onClick={e => e.stopPropagation()}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <button className="modal-close" onClick={closeModal}>
                  <FaTimes />
                </button>
                
                <div className="modal-image">
                  <OptimizedImage 
                    src={selectedImage.image} 
                    alt={selectedImage.title}
                    className="modal-img"
                  />
                  {selectedImage.type === 'video' && (
                    <div className="video-overlay">
                      <FaPlay />
                    </div>
                  )}
                </div>
                
                <div className="modal-info">
                  <h3>{selectedImage.title}</h3>
                  <p>{selectedImage.description}</p>
                </div>
                
                {/* Mobile swipe indicator */}
                <div className="swipe-indicator">
                  <span>← Desliza para navegar →</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Gallery;