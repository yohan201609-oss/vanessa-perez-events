'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaHeart, FaBriefcase, FaGraduationCap, FaBaby, FaCalendarAlt } from 'react-icons/fa';
import { images } from '@/config/images';
import styles from './Services.module.css';

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
      image: images.services.bodas
    },
    {
      id: 2,
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
      image: images.services.babyShowers
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
      image: images.services.corporativos
    },
    {
      id: 4,
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
      image: images.services.especiales
    },
    {
      id: 5,
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
      image: images.services.graduaciones
    }
  ];

  return (
    <section id="servicios" className={`${styles.services} section`}>
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

        <div className={styles.servicesGrid}>
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className={`${styles.serviceCard} ${activeService === index ? styles.active : ''}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              onClick={() => setActiveService(index)}
            >
              <div className={styles.serviceIcon}>
                <service.icon />
              </div>
              <h3 className={styles.serviceTitle}>{service.title}</h3>
              <p className={styles.serviceDescription}>{service.description}</p>
              <div className={styles.serviceImage}>
                {service.image.startsWith('http') ? (
                  <img 
                    src={service.image} 
                    alt={service.title}
                    loading="lazy"
                  />
                ) : (
                  <Image 
                    src={service.image} 
                    alt={service.title}
                    width={400}
                    height={150}
                    style={{ objectFit: 'cover' }}
                  />
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className={styles.serviceDetails}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className={styles.serviceFeatures}>
            <h3>Lo que incluye nuestro servicio de {services[activeService].title}</h3>
            <div className={styles.featuresGrid}>
              {services[activeService].features.map((feature, index) => (
                <div key={index} className={styles.featureItem}>
                  <div className={styles.featureIcon}>✓</div>
                  <span className={styles.featureText}>{feature}</span>
                </div>
              ))}
            </div>
            <div className={styles.serviceCta}>
              <p className={styles.ctaText}>¿Interesado en nuestros servicios de {services[activeService].title.toLowerCase()}?</p>
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

