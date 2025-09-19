import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaBirthdayCake, FaBriefcase, FaGraduationCap, FaBaby, FaCalendarAlt } from 'react-icons/fa';
import './Services.css';

const Services = () => {
  const [activeService, setActiveService] = useState(0);

  const services = [
    {
      id: 1,
      title: 'Bodas',
      icon: FaHeart,
      description: 'Creamos la boda de tus sueños con cada detalle perfectamente planificado. Desde la coordinación del día hasta la decoración elegante.',
      features: [
        'Planificación completa del evento',
        'Coordinación de proveedores',
        'Decoración personalizada',
        'Seguimiento integral',
        'Asesoría de imagen y estilo'
      ],
      image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 2,
      title: 'Cumpleaños',
      icon: FaBirthdayCake,
      description: 'Celebraciones únicas para todas las edades. Desde fiestas infantiles temáticas hasta celebraciones adultas elegantes.',
      features: [
        'Decoración temática personalizada',
        'Coordinación de actividades',
        'Gestión de entretenimiento',
        'Fotografía del evento',
        'Coordinación completa'
      ],
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 3,
      title: 'Eventos Corporativos',
      icon: FaBriefcase,
      description: 'Eventos empresariales profesionales que dejan una impresión duradera. Conferencias, galas y reuniones corporativas.',
      features: [
        'Planificación estratégica',
        'Coordinación de audiovisuales',
        'Gestión de catering',
        'Soporte técnico completo',
        'Coordinación integral'
      ],
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 4,
      title: 'Graduaciones',
      icon: FaGraduationCap,
      description: 'Celebra los logros académicos con eventos memorables que honran el esfuerzo y dedicación de los graduados.',
      features: [
        'Decoración temática elegante',
        'Coordinación de ceremonias',
        'Gestión de catering',
        'Fotografía profesional',
        'Coordinación completa'
      ],
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 5,
      title: 'Baby Showers',
      icon: FaBaby,
      description: 'Celebra la llegada del bebé con un evento especial lleno de amor, juegos y momentos únicos.',
      features: [
        'Decoración temática adorable',
        'Coordinación de juegos',
        'Gestión de actividades',
        'Fotografía del evento',
        'Coordinación completa'
      ],
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 6,
      title: 'Eventos Especiales',
      icon: FaCalendarAlt,
      description: 'Cualquier celebración especial merece ser memorable. Aniversarios, despedidas, inauguraciones y más.',
      features: [
        'Diseño personalizado',
        'Coordinación completa',
        'Gestión integral',
        'Seguimiento detallado',
        'Servicio personalizado'
      ],
      image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
    }
  ];

  return (
    <section id="servicios" className="services section">
      <div className="container">
        <motion.div 
          className="section-header text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">Nuestros Servicios</h2>
          <p className="section-subtitle">
            Ofrecemos una amplia gama de servicios para hacer de tu evento una experiencia inolvidable
          </p>
        </motion.div>

        <div className="services-grid">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className={`service-card ${activeService === index ? 'active' : ''}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              onClick={() => setActiveService(index)}
            >
              <div className="service-icon">
                <service.icon />
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              <div className="service-image">
                <img src={service.image} alt={service.title} />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="service-details"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="service-features">
            <h3>Lo que incluye nuestro servicio de {services[activeService].title}</h3>
            <div className="features-grid">
              {services[activeService].features.map((feature, index) => (
                <div key={index} className="feature-item">
                  <div className="feature-icon">✓</div>
                  <span className="feature-text">{feature}</span>
                </div>
              ))}
            </div>
            <div className="service-cta">
              <p className="cta-text">¿Interesado en nuestros servicios de {services[activeService].title.toLowerCase()}?</p>
              <button 
                className="btn btn-primary"
                onClick={() => {
                  const element = document.getElementById('contacto');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Solicitar Cotización
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;