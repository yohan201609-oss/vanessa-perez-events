'use client';

import { motion } from 'framer-motion';
import { FaPlay, FaInstagram, FaWhatsapp, FaArrowRight } from 'react-icons/fa';
import { GiDiamondRing } from 'react-icons/gi';
import { getInstagramUrl, getWhatsAppUrl } from '@/config/socialLinks';
import { images } from '@/config/images';
import styles from './Hero.module.css';

const Hero = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contacto');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="inicio" className={styles.hero}>
      <div 
        className={styles.heroBackground}
        style={{
          backgroundImage: `url(${images.hero.background})`,
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
              Creamos <span className={styles.highlight}>momentos únicos</span><br />
              que duran para siempre
            </h1>
            <p className={styles.heroSubtitle}>
              Somos especialistas en diseñar y organizar eventos inolvidables. 
              Desde bodas de ensueño hasta celebraciones corporativas, 
              cada detalle cuenta en tu historia.
            </p>
            
            <div className={styles.ctaButtons}>
              <motion.button 
                className={styles.primaryBtn} 
                onClick={scrollToContact}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Planifica tu evento
                <FaArrowRight />
              </motion.button>
              <motion.button 
                className={styles.secondaryBtn}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaPlay className={styles.playIcon} />
                Ver nuestro trabajo
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
          <a href={getInstagramUrl()} target="_blank" rel="noopener noreferrer" aria-label="Síguenos en Instagram">
            <FaInstagram />
          </a>
          <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" aria-label="Contáctanos por WhatsApp">
            <FaWhatsapp />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;

