'use client';

import { FaInstagram, FaWhatsapp, FaEnvelope, FaPhone, FaMapMarkerAlt, FaHeart } from 'react-icons/fa';
import { getInstagramUrl, getWhatsAppUrl, getEmailUrl, socialLinks } from '@/config/socialLinks';
import styles from './Footer.module.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <div className={styles.footerLogo}>
              <h3>Vanessa Perez</h3>
              <span>Event Planner</span>
            </div>
            <p className={styles.footerDescription}>
              Creamos momentos únicos que duran para siempre. 
              Especialistas en diseñar y organizar eventos inolvidables 
              con elegancia y profesionalismo.
            </p>
            <div className={styles.socialLinks}>
              <a href={getInstagramUrl()} target="_blank" rel="noopener noreferrer" aria-label="Síguenos en Instagram">
                <FaInstagram />
              </a>
              <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" aria-label="Contáctanos por WhatsApp">
                <FaWhatsapp />
              </a>
              <a href={getEmailUrl('Consulta sobre servicios de eventos')} aria-label="Envíanos un email">
                <FaEnvelope />
              </a>
            </div>
          </div>

          <div className={styles.footerSection}>
            <h4>Servicios</h4>
            <ul className={styles.footerLinks}>
              <li><a href="#servicios">Bodas</a></li>
              <li><a href="#servicios">Cumpleaños</a></li>
              <li><a href="#servicios">Eventos Corporativos</a></li>
              <li><a href="#servicios">Graduaciones</a></li>
              <li><a href="#servicios">Baby Showers</a></li>
              <li><a href="#servicios">Eventos Especiales</a></li>
            </ul>
          </div>

          <div className={styles.footerSection}>
            <h4>Enlaces Rápidos</h4>
            <ul className={styles.footerLinks}>
              <li><a href="#inicio">Inicio</a></li>
              <li><a href="#servicios">Servicios</a></li>
              <li><a href="#galeria">Galería</a></li>
              <li><a href="#contacto">Contacto</a></li>
              <li><a href="#contacto">Cotización</a></li>
            </ul>
          </div>

          <div className={styles.footerSection}>
            <h4>Contacto</h4>
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <FaPhone className={styles.contactIcon} />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className={styles.contactItem}>
                <FaEnvelope className={styles.contactIcon} />
                <span>{socialLinks.email}</span>
              </div>
              <div className={styles.contactItem}>
                <FaMapMarkerAlt className={styles.contactIcon} />
                <span>Ciudad, Estado, País</span>
              </div>
            </div>
            
            <div className={styles.whatsappCta}>
              <a 
                href={getWhatsAppUrl()} 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.whatsappBtn}
              >
                <FaWhatsapp />
                Chatea con nosotros
              </a>
            </div>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <div className={styles.footerBottomContent}>
            <p>&copy; {currentYear} Vanessa Perez Event Planner. Todos los derechos reservados.</p>
            <p className={styles.madeWithLove}>
              Hecho con <FaHeart className={styles.heartIcon} /> para crear momentos únicos
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

