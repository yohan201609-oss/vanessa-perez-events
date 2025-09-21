import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <img 
              src="/images/logo-vanessa-perez.svg" 
              alt="Vanessa Pérez - Event Planner" 
              className="logo-image"
            />
          </div>
          
          <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
            <a href="#inicio" onClick={() => scrollToSection('inicio')}>Inicio</a>
            <a href="#servicios" onClick={() => scrollToSection('servicios')}>Servicios</a>
            <a href="#galeria" onClick={() => scrollToSection('galeria')}>Galería</a>
            <a href="#testimonios" onClick={() => scrollToSection('testimonios')}>Testimonios</a>
            <a href="#contacto" onClick={() => scrollToSection('contacto')}>Contacto</a>
          </nav>

          <div className="header-actions">
            <a 
              href="https://wa.me/1234567890" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Consulta Rápida
            </a>
          </div>

          <button className="menu-toggle" onClick={toggleMenu}>
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;