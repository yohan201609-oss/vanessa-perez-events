'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaPhone, FaWhatsapp, FaInstagram } from 'react-icons/fa';
import { getWhatsAppUrl, getInstagramUrl } from '@/config/socialLinks';
import styles from './Header.module.css';
import Image from 'next/image';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Detectar sección activa
      const sections = ['inicio', 'servicios', 'galeria', 'testimonios', 'contacto'];
      const scrollPosition = window.scrollY + 150;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Llamar una vez al cargar
    
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMenuOpen(false);
  };

  const navLinks = [
    { name: 'Inicio', id: 'inicio' },
    { name: 'Servicios', id: 'servicios' },
    { name: 'Galería', id: 'galeria' },
    { name: 'Testimonios', id: 'testimonios' },
    { name: 'Contacto', id: 'contacto' }
  ];

  return (
    <motion.header 
      className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container">
        <div className={styles.headerContent}>
          {/* Logo mejorado */}
          <motion.a 
            href="#inicio" 
            className={styles.logoWrapper}
            onClick={(e) => { e.preventDefault(); scrollToSection('inicio'); }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <div className={styles.logoContainer}>
              <Image 
                src="/images/logo-vanessa-perez.svg" 
                alt="Vanessa Pérez - Event Planner" 
                className={styles.logoImage}
                width={60}
                height={60}
                priority
              />
              <div className={styles.logoText}>
                <span className={styles.logoName}>Vanessa Perez</span>
                <span className={styles.logoTagline}>Event Planner</span>
              </div>
            </div>
          </motion.a>
          
          {/* Desktop Navigation */}
          <nav className={styles.nav}>
            <ul className={styles.navLinks}>
              {navLinks.map((link, index) => (
                <motion.li 
                  key={link.id}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <a 
                    href={`#${link.id}`}
                    className={`${styles.navLink} ${activeSection === link.id ? styles.active : ''}`}
                    onClick={(e) => { e.preventDefault(); scrollToSection(link.id); }}
                  >
                    {link.name}
                    <span className={styles.linkUnderline}></span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </nav>

          {/* Contact Icons */}
          <div className={styles.contactIcons}>
            <motion.a 
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.iconLink}
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Contactar por WhatsApp"
            >
              <FaWhatsapp />
            </motion.a>
            <motion.a 
              href={getInstagramUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.iconLink}
              whileHover={{ scale: 1.2, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Seguir en Instagram"
            >
              <FaInstagram />
            </motion.a>
          </div>

          {/* CTA Button mejorado */}
          <motion.button
            className={styles.ctaButton}
            onClick={() => scrollToSection('contacto')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaPhone className={styles.ctaIcon} />
            <span>Consulta Rápida</span>
            <span className={styles.ctaShine}></span>
          </motion.button>

          {/* Mobile Menu Toggle */}
          <button 
            className={styles.mobileMenuToggle}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              className={styles.mobileMenuOverlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMenu}
            />
            <motion.div
              className={styles.mobileMenu}
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
            >
              <div className={styles.mobileMenuContent}>
                <ul className={styles.mobileNavLinks}>
                  {navLinks.map((link, index) => (
                    <motion.li
                      key={link.id}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <a
                        href={`#${link.id}`}
                        className={`${styles.mobileNavLink} ${activeSection === link.id ? styles.active : ''}`}
                        onClick={(e) => { e.preventDefault(); scrollToSection(link.id); }}
                      >
                        {link.name}
                      </a>
                    </motion.li>
                  ))}
                </ul>
                
                <div className={styles.mobileContactInfo}>
                  <motion.button 
                    className={styles.mobileCtaButton}
                    onClick={() => scrollToSection('contacto')}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaPhone />
                    Consulta Rápida
                  </motion.button>
                  <div className={styles.mobileSocialLinks}>
                    <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                      <FaWhatsapp />
                    </a>
                    <a href={getInstagramUrl()} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                      <FaInstagram />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;

