import React from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { getInstagramUrl, getWhatsAppUrl } from '../config/socialLinks';
import { images } from '../config/images';
import './Hero.css';

const Hero = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contacto');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="inicio" className="hero">
      <div 
        className="hero-background"
        style={{
          backgroundImage: `url(${images.hero.background})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="hero-overlay"></div>
      </div>
      
      <div className="container">
        <div className="hero-content">
          <motion.div 
            className="hero-text"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="hero-title">
              Creamos <span className="gradient-text">momentos únicos</span><br />
              que duran para siempre
            </h1>
            <p className="hero-subtitle">
              Somos especialistas en diseñar y organizar eventos inolvidables. 
              Desde bodas de ensueño hasta celebraciones corporativas, 
              cada detalle cuenta en tu historia.
            </p>
            
            <div className="hero-actions">
              <button className="btn btn-primary" onClick={scrollToContact}>
                Planifica tu evento
              </button>
              <button className="btn btn-secondary">
                <FaPlay className="play-icon" />
                Ver nuestro trabajo
              </button>
            </div>

            <div className="hero-stats">
              <div className="stat">
                <h3>200+</h3>
                <p>Eventos realizados</p>
              </div>
              <div className="stat">
                <h3>5+</h3>
                <p>Años de experiencia</p>
              </div>
              <div className="stat">
                <h3>100%</h3>
                <p>Clientes satisfechos</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="hero-image"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="hero-image-container">
              <div className="image-overlay">
                <h3>{images.hero.overlay}</h3>
                <p>Diseño personalizado</p>
                <button 
                  className="btn btn-secondary"
                  onClick={() => {
                    const element = document.getElementById('galeria');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  <FaPlay className="play-icon" />
                  Ver Galería
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="social-links">
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