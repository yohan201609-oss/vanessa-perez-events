'use client';

import { useState, useEffect } from 'react';
import { FaWhatsapp, FaTimes } from 'react-icons/fa';
import analytics from '@/utils/analytics';
import { socialLinks } from '@/config/socialLinks';
import styles from './WhatsAppButton.module.css';

const WhatsAppButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const windowHeight = window.innerHeight;
      
      setIsVisible(scrollTop > windowHeight * 0.2);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(socialLinks.whatsapp.message);
    const url = `https://wa.me/${socialLinks.whatsapp.number}?text=${message}`;
    
    analytics.trackWhatsAppClick('main_button');
    
    window.open(url, '_blank');
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  if (!isVisible) return null;

  return (
    <div className={`${styles.whatsappButton} ${isExpanded ? styles.expanded : ''}`}>
      <div className={styles.whatsappContent}>
        {isExpanded && (
          <div className={styles.whatsappMessage}>
            <div className={styles.messageHeader}>
              <h4>¡Hola! 👋</h4>
              <button 
                className={styles.closeBtn}
                onClick={toggleExpanded}
              >
                <FaTimes />
              </button>
            </div>
            <p>¿Necesitas ayuda con tu evento? ¡Estamos aquí para ti!</p>
            <div className={styles.quickOptions}>
              <button 
                className={styles.quickBtn}
                onClick={() => {
                  analytics.trackWhatsAppClick('quote_button');
                  const message = encodeURIComponent(socialLinks.whatsapp.quickMessages.quote);
                  window.open(`https://wa.me/${socialLinks.whatsapp.number}?text=${message}`, '_blank');
                }}
              >
                💰 Cotizar evento
              </button>
              <button 
                className={styles.quickBtn}
                onClick={() => {
                  analytics.trackWhatsAppClick('portfolio_button');
                  const message = encodeURIComponent(socialLinks.whatsapp.quickMessages.portfolio);
                  window.open(`https://wa.me/${socialLinks.whatsapp.number}?text=${message}`, '_blank');
                }}
              >
                📸 Ver portafolio
              </button>
              <button 
                className={styles.quickBtn}
                onClick={() => {
                  analytics.trackWhatsAppClick('questions_button');
                  const message = encodeURIComponent(socialLinks.whatsapp.quickMessages.questions);
                  window.open(`https://wa.me/${socialLinks.whatsapp.number}?text=${message}`, '_blank');
                }}
              >
                ❓ Hacer preguntas
              </button>
            </div>
          </div>
        )}
        
        <button 
          className={styles.whatsappMainBtn}
          onClick={isExpanded ? handleWhatsAppClick : toggleExpanded}
        >
          <FaWhatsapp />
        </button>
      </div>
    </div>
  );
};

export default WhatsAppButton;

