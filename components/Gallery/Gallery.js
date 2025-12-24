'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FaPlay, FaTimes } from 'react-icons/fa';
import { getAllGalleryImages } from '@/config/images';
import styles from './Gallery.module.css';

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [selectedImage, setSelectedImage] = useState(null);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const categories = [
    { id: 'todos', name: 'Todos' },
    { id: 'bodas', name: 'Bodas' },
    { id: 'baby-showers', name: 'Baby Showers' },
    { id: 'corporativos', name: 'Corporativos' },
    { id: 'especiales', name: 'Eventos Especiales' },
    { id: 'graduaciones', name: 'Graduaciones' }
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
      const currentIndex = filteredItems.findIndex(item => item.id === selectedImage.id);
      const nextIndex = (currentIndex + 1) % filteredItems.length;
      setSelectedImage(filteredItems[nextIndex]);
    }
    
    if (isRightSwipe && selectedImage) {
      const currentIndex = filteredItems.findIndex(item => item.id === selectedImage.id);
      const prevIndex = currentIndex === 0 ? filteredItems.length - 1 : currentIndex - 1;
      setSelectedImage(filteredItems[prevIndex]);
    }
  };

  return (
    <section id="galeria" className={`${styles.gallery} section`}>
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
          className={styles.galleryFilters}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {categories.map(category => (
            <button
              key={category.id}
              className={`${styles.filterBtn} ${selectedCategory === category.id ? styles.active : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </motion.div>

        <motion.div 
          className={styles.galleryGrid}
          layout
        >
          <AnimatePresence>
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                className={styles.galleryItem}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => openModal(item)}
              >
                <div className={styles.galleryImage}>
                  {item.image.startsWith('http') ? (
                    <img 
                      src={item.image} 
                      alt={item.title}
                      loading="lazy"
                    />
                  ) : (
                    <Image 
                      src={item.image} 
                      alt={item.title}
                      width={400}
                      height={250}
                      style={{ objectFit: 'cover' }}
                    />
                  )}
                  {item.type === 'video' && (
                    <div className={styles.playOverlay}>
                      <FaPlay />
                    </div>
                  )}
                </div>
                <div className={styles.galleryContent}>
                  <h3 className={styles.galleryTitle}>{item.title}</h3>
                  <p className={styles.galleryDescription}>{item.description}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence>
          {selectedImage && (
            <motion.div
              className={styles.galleryModal}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
            >
              <div 
                className={styles.modalContent} 
                onClick={e => e.stopPropagation()}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <button className={styles.modalClose} onClick={closeModal}>
                  <FaTimes />
                </button>
                
                <div className={styles.modalImage}>
                  {selectedImage.image.startsWith('http') ? (
                    <img 
                      src={selectedImage.image} 
                      alt={selectedImage.title}
                    />
                  ) : (
                    <Image 
                      src={selectedImage.image} 
                      alt={selectedImage.title}
                      width={900}
                      height={500}
                      style={{ objectFit: 'cover' }}
                    />
                  )}
                  {selectedImage.type === 'video' && (
                    <div className={styles.videoOverlay}>
                      <FaPlay />
                    </div>
                  )}
                </div>
                
                <div className={styles.modalInfo}>
                  <h3>{selectedImage.title}</h3>
                  <p>{selectedImage.description}</p>
                </div>
                
                <div className={styles.swipeIndicator}>
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

