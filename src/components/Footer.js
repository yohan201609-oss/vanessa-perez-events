import React from 'react';
import { FaInstagram, FaWhatsapp, FaEnvelope, FaPhone, FaMapMarkerAlt, FaHeart } from 'react-icons/fa';
import { getInstagramUrl, getWhatsAppUrl, getEmailUrl, socialLinks } from '../config/socialLinks';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <h3>Vanessa Perez</h3>
              <span>Event Planner</span>
            </div>
            <p className="footer-description">
              Creamos momentos únicos que duran para siempre. 
              Especialistas en diseñar y organizar eventos inolvidables 
              con elegancia y profesionalismo.
            </p>
            <div className="social-links">
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

          <div className="footer-section">
            <h4>Servicios</h4>
            <ul className="footer-links">
              <li><a href="#servicios">Bodas</a></li>
              <li><a href="#servicios">Cumpleaños</a></li>
              <li><a href="#servicios">Eventos Corporativos</a></li>
              <li><a href="#servicios">Graduaciones</a></li>
              <li><a href="#servicios">Baby Showers</a></li>
              <li><a href="#servicios">Eventos Especiales</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Enlaces Rápidos</h4>
            <ul className="footer-links">
              <li><a href="#inicio">Inicio</a></li>
              <li><a href="#servicios">Servicios</a></li>
              <li><a href="#galeria">Galería</a></li>
              <li><a href="#contacto">Contacto</a></li>
              <li><a href="#contacto">Cotización</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contacto</h4>
            <div className="contact-info">
              <div className="contact-item">
                <FaPhone className="contact-icon" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="contact-item">
                <FaEnvelope className="contact-icon" />
                <span>{socialLinks.email}</span>
              </div>
              <div className="contact-item">
                <FaMapMarkerAlt className="contact-icon" />
                <span>Ciudad, Estado, País</span>
              </div>
            </div>
            
            <div className="whatsapp-cta">
              <a 
                href={getWhatsAppUrl()} 
                target="_blank" 
                rel="noopener noreferrer"
                className="whatsapp-btn"
              >
                <FaWhatsapp />
                Chatea con nosotros
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; {currentYear} Vanessa Perez Event Planner. Todos los derechos reservados.</p>
            <p className="made-with-love">
              Hecho con <FaHeart className="heart-icon" /> para crear momentos únicos
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;