'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaInstagram, FaWhatsapp, FaArrowRight } from 'react-icons/fa';
import { GiDiamondRing } from 'react-icons/gi';
import { getInstagramUrl, getWhatsAppUrl, socialLinks } from '@/config/socialLinks';
import { images } from '@/config/images';
import { contentStorage } from '@/lib/storage';
import styles from './Hero.module.css';

const Hero = () => {
  const [content, setContent] = useState(null);
  const [contactConfig, setContactConfig] = useState({
    whatsapp: socialLinks.whatsapp.number,
    instagram: socialLinks.instagram
  });

  useEffect(() => {
    loadContent();
    loadContactConfig();
    
    // Sincronizar cambios
    if (typeof window === 'undefined') return;

    const handleContentUpdate = (event) => {
      if (event.detail) {
        if (event.detail.type === 'hero') {
          loadContent();
        }
        if (event.detail.type === 'config') {
          loadContactConfig();
        }
      }
    };

    const handleStorageChange = (e) => {
      if (e.key === 'content:hero') {
        loadContent();
      }
      if (e.key === 'content:config') {
        loadContactConfig();
      }
    };

    window.addEventListener('contentUpdated', handleContentUpdate);
    window.addEventListener('storage', handleStorageChange);

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('contentUpdated', handleContentUpdate);
        window.removeEventListener('storage', handleStorageChange);
      }
    };
  }, []);

  const loadContactConfig = async () => {
    try {
      const config = await contentStorage.getConfig();
      setContactConfig({
        whatsapp: config.whatsapp ? config.whatsapp.replace(/[\s()\-+]/g, '') : socialLinks.whatsapp.number,
        instagram: config.instagram || socialLinks.instagram
      });
    } catch (error) {
      console.error('Error loading contact config:', error);
    }
  };

  const loadContent = async () => {
    try {
      const data = await contentStorage.getHero();
      if (data && data.title) {
        setContent(data);
      } else {
        // Usar valores por defecto si los datos no son válidos
        setContent({
          title: "Creamos momentos únicos que duran para siempre",
          highlightWord: "momentos únicos",
          subtitle: "Somos especialistas en diseñar y organizar eventos inolvidables. Desde bodas de ensueño hasta celebraciones corporativas, cada detalle cuenta en tu historia.",
          primaryButton: "Planifica tu evento",
          secondaryButton: "Ver nuestro trabajo",
          backgroundImage: images.hero.background
        });
      }
    } catch (error) {
      console.error('Error loading hero content:', error);
      // Usar valores por defecto si hay error
      setContent({
        title: "Creamos momentos únicos que duran para siempre",
        highlightWord: "momentos únicos",
        subtitle: "Somos especialistas en diseñar y organizar eventos inolvidables. Desde bodas de ensueño hasta celebraciones corporativas, cada detalle cuenta en tu historia.",
        primaryButton: "Planifica tu evento",
        secondaryButton: "Ver nuestro trabajo",
        backgroundImage: images.hero.background
      });
    }
  };

  const scrollToContact = () => {
    const element = document.getElementById('contacto');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!content) {
    return <div style={{ minHeight: '85vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Cargando...</div>;
  }

  // Dividir el título en partes para destacar la palabra clave
  const titleParts = content.title ? content.title.split(content.highlightWord || '') : ['', ''];

  return (
    <section id="inicio" className={styles.hero}>
      <div 
        className={styles.heroBackground}
        style={{
          backgroundImage: `url(${content.backgroundImage || images.hero.background})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroOverlayDark}></div>
      </div>
      
      <div className="container">
        <div className={styles.heroContent}>
          <motion.div 
            className={styles.heroText}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className={styles.heroTitle}>
              {titleParts[0]}
              {content.highlightWord && (
                <span className={styles.highlight}>{content.highlightWord}</span>
              )}
              {titleParts[1] && <br />}
              {titleParts[1]}
            </h1>
            <p className={styles.heroSubtitle}>
              {content.subtitle}
            </p>
            
            <div className={styles.ctaButtons}>
              <motion.button 
                className={styles.primaryBtn} 
                onClick={scrollToContact}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {content.primaryButton}
                <FaArrowRight />
              </motion.button>
              <motion.button 
                className={styles.secondaryBtn}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaPlay className={styles.playIcon} />
                {content.secondaryButton}
              </motion.button>
            </div>

            <div className={styles.stats}>
              <motion.div 
                className={styles.statItem}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
              >
                <span className={styles.statNumber}>200+</span>
                <p className={styles.statLabel}>Eventos realizados</p>
              </motion.div>
              <motion.div 
                className={styles.statItem}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                whileHover={{ scale: 1.05 }}
              >
                <span className={styles.statNumber}>5+</span>
                <p className={styles.statLabel}>Años de experiencia</p>
              </motion.div>
              <motion.div 
                className={styles.statItem}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                whileHover={{ scale: 1.05 }}
              >
                <span className={styles.statNumber}>100%</span>
                <p className={styles.statLabel}>Clientes satisfechos</p>
              </motion.div>
            </div>
          </motion.div>

          <motion.div 
            className={styles.heroImage}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div 
              className={styles.featureCard}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className={styles.iconWrapper}>
                <GiDiamondRing className={styles.mainIcon} />
                <div className={styles.decorativeCircle}></div>
              </div>
              <h3 className={styles.featureTitle}>{images.hero.overlay}</h3>
              <p className={styles.featureDescription}>Diseño personalizado</p>
              <motion.button 
                className={styles.viewGalleryBtn}
                onClick={() => {
                  const element = document.getElementById('galeria');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Ver Galería</span>
                <FaArrowRight />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        <div className={styles.socialLinks}>
          <a href={`https://instagram.com/${contactConfig.instagram}`} target="_blank" rel="noopener noreferrer" aria-label="Síguenos en Instagram">
            <FaInstagram />
          </a>
          <a href={`https://wa.me/${contactConfig.whatsapp}?text=${encodeURIComponent('¡Hola! Me interesa conocer más sobre sus servicios de eventos. ¿Podrían ayudarme?')}`} target="_blank" rel="noopener noreferrer" aria-label="Contáctanos por WhatsApp">
            <FaWhatsapp />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;

