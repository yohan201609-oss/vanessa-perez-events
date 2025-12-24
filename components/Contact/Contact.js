'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaWhatsapp, FaInstagram } from 'react-icons/fa';
import analytics from '@/utils/analytics';
import { getInstagramUrl, getWhatsAppUrl, socialLinks } from '@/config/socialLinks';
import { contentStorage } from '@/lib/storage';
import styles from './Contact.module.css';

const Contact = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [contactConfig, setContactConfig] = useState({
    email: socialLinks.email,
    telefono: '+1 (555) 123-4567',
    location: 'Ciudad, Estado, País',
    whatsapp: socialLinks.whatsapp.number,
    instagram: socialLinks.instagram
  });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    eventDate: '',
    guestCount: '',
    budget: '',
    message: '',
    register: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    loadContactConfig();
    
    // Escuchar cambios en la configuración
    if (typeof window !== 'undefined') {
      const handleContentUpdate = (event) => {
        if (event.detail && event.detail.type === 'config') {
          loadContactConfig();
        }
      };

      const handleStorageChange = (e) => {
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
    }
  }, []);

  const loadContactConfig = async () => {
    try {
      const config = await contentStorage.getConfig();
      setContactConfig({
        email: config.email || socialLinks.email,
        telefono: config.telefono || '+1 (555) 123-4567',
        location: config.location || 'Ciudad, Estado, País',
        whatsapp: config.whatsapp || socialLinks.whatsapp.number,
        instagram: config.instagram || socialLinks.instagram
      });
    } catch (error) {
      console.error('Error loading contact config:', error);
    }
  };

  const eventTypes = [
    'Boda',
    'Baby Shower',
    'Evento Corporativo',
    'Evento Especial',
    'Graduación',
    'Otro'
  ];

  const budgetRanges = [
    'Menos de $1,000',
    '$1,000 - $2,500',
    '$2,500 - $5,000',
    '$5,000 - $10,000',
    'Más de $10,000'
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
      analytics.trackEvent('form_step_progress', {
        step: currentStep + 1,
        event_category: 'engagement',
        event_label: 'contact_form'
      });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Preparar los datos del template
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        event_type: formData.eventType,
        event_date: formData.eventDate,
        guest_count: formData.guestCount,
        budget: formData.budget,
        message: formData.message,
        register: formData.register ? 'Sí' : 'No',
        to_name: 'Vanessa Pérez'
      };

      // Enviar email usando la API route de Next.js
      // Las credenciales se manejan en el servidor
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          templateParams
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Error al enviar el email');
      }
      
      // Track successful form submission
      analytics.trackFormSubmission('contact_form', {
        event_type: formData.eventType,
        guest_count: formData.guestCount,
        budget: formData.budget
      });
      
      setSubmitStatus('success');
      setIsSubmitting(false);
      setCurrentStep(1);
      setFormData({
        name: '',
        email: '',
        phone: '',
        eventType: '',
        eventDate: '',
        guestCount: '',
        budget: '',
        message: '',
        register: false
      });

    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className={styles.stepContent}>
            <h3>Información Personal</h3>
            <div className={styles.formGroup}>
              <label>Nombre completo *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Tu nombre completo"
              />
            </div>
            <div className={styles.formGroup}>
              <label>Correo electrónico *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="tu@email.com"
              />
            </div>
            <div className={styles.formGroup}>
              <label>Teléfono</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className={styles.stepContent}>
            <h3>Detalles del Evento</h3>
            <div className={styles.formGroup}>
              <label>Tipo de evento *</label>
              <select
                name="eventType"
                value={formData.eventType}
                onChange={handleInputChange}
                required
              >
                <option value="">Selecciona un tipo</option>
                {eventTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div className={styles.formGroup}>
              <label>Fecha del evento *</label>
              <input
                type="date"
                name="eventDate"
                value={formData.eventDate}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label>Número de invitados *</label>
              <input
                type="number"
                name="guestCount"
                value={formData.guestCount}
                onChange={handleInputChange}
                required
                placeholder="Ej: 50"
                min="1"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className={styles.stepContent}>
            <h3>Presupuesto y Detalles</h3>
            <div className={styles.formGroup}>
              <label>Presupuesto estimado *</label>
              <select
                name="budget"
                value={formData.budget}
                onChange={handleInputChange}
                required
              >
                <option value="">Selecciona un rango</option>
                {budgetRanges.map(range => (
                  <option key={range} value={range}>{range}</option>
                ))}
              </select>
            </div>
            <div className={styles.formGroup}>
              <label>Mensaje adicional</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Cuéntanos más sobre tu evento, ideas específicas, preferencias de color, etc."
                rows="4"
              />
            </div>
            <div className={`${styles.formGroup} ${styles.checkboxGroup}`}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="register"
                  checked={formData.register}
                  onChange={handleInputChange}
                />
                <span className={styles.checkmark}></span>
                Quiero registrarme para recibir ofertas especiales y novedades
              </label>
            </div>
          </div>
        );

      case 4:
        return (
          <div className={styles.stepContent}>
            <h3>Resumen de tu Solicitud</h3>
            <div className={styles.summary}>
              <div className={styles.summaryItem}>
                <strong>Nombre:</strong> {formData.name}
              </div>
              <div className={styles.summaryItem}>
                <strong>Email:</strong> {formData.email}
              </div>
              <div className={styles.summaryItem}>
                <strong>Teléfono:</strong> {formData.phone || 'No proporcionado'}
              </div>
              <div className={styles.summaryItem}>
                <strong>Tipo de evento:</strong> {formData.eventType}
              </div>
              <div className={styles.summaryItem}>
                <strong>Fecha:</strong> {formData.eventDate}
              </div>
              <div className={styles.summaryItem}>
                <strong>Invitados:</strong> {formData.guestCount}
              </div>
              <div className={styles.summaryItem}>
                <strong>Presupuesto:</strong> {formData.budget}
              </div>
              {formData.message && (
                <div className={styles.summaryItem}>
                  <strong>Mensaje:</strong> {formData.message}
                </div>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (submitStatus === 'success') {
    return (
      <section id="contacto" className={`${styles.contact} section`}>
        <div className="container">
          <motion.div 
            className={styles.successMessage}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className={styles.successIcon}>✓</div>
            <h2>¡Solicitud Enviada!</h2>
            <p>Gracias por contactarnos. Nos pondremos en contacto contigo en las próximas 24 horas.</p>
            <button 
              className="btn btn-primary"
              onClick={() => setSubmitStatus(null)}
            >
              Enviar otra solicitud
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="contacto" className={`${styles.contact} section`}>
      <div className="container">
        <motion.div 
          className="section-header text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">Planifica tu Evento</h2>
          <p className="section-subtitle">
            Cuéntanos sobre tu evento y te ayudaremos a hacerlo realidad
          </p>
        </motion.div>

        <div className={styles.contactContent}>
          <motion.div 
            className={styles.contactForm}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit}>
              <div className={styles.formHeader}>
                <div className={styles.stepIndicator}>
                  {[1, 2, 3, 4].map(step => (
                    <div 
                      key={step} 
                      className={`${styles.step} ${currentStep >= step ? styles.active : ''}`}
                    >
                      {step}
                    </div>
                  ))}
                </div>
                <div className={styles.stepTitle}>
                  Paso {currentStep} de 4
                </div>
              </div>

              {renderStep()}

              <div className={styles.formActions}>
                {currentStep > 1 && (
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={prevStep}
                  >
                    Anterior
                  </button>
                )}
                
                {currentStep < 4 ? (
                  <button 
                    type="button" 
                    className="btn btn-primary"
                    onClick={nextStep}
                  >
                    Siguiente
                  </button>
                ) : (
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Enviando...' : 'Enviar Solicitud'}
                  </button>
                )}
              </div>
            </form>
          </motion.div>

          <motion.div 
            className={styles.contactInfo}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3>Información de Contacto</h3>
            
            <div className={styles.infoItem}>
              <FaEnvelope className={styles.infoIcon} />
              <div>
                <h4>Email</h4>
                <p>{contactConfig.email}</p>
              </div>
            </div>

            <div className={styles.infoItem}>
              <FaPhone className={styles.infoIcon} />
              <div>
                <h4>Teléfono</h4>
                <p>{contactConfig.telefono}</p>
              </div>
            </div>

            <div className={styles.infoItem}>
              <FaMapMarkerAlt className={styles.infoIcon} />
              <div>
                <h4>Ubicación</h4>
                <p>{contactConfig.location}</p>
              </div>
            </div>

            <div className={styles.socialContact}>
              <h4>Síguenos</h4>
              <div className={styles.socialLinks}>
              <a href={`https://instagram.com/${contactConfig.instagram}`} target="_blank" rel="noopener noreferrer" aria-label="Síguenos en Instagram">
                <FaInstagram />
                Instagram
              </a>
              <a href={`https://wa.me/${contactConfig.whatsapp.replace(/[\s()\-+]/g, '')}?text=${encodeURIComponent('¡Hola! Me interesa conocer más sobre sus servicios de eventos. ¿Podrían ayudarme?')}`} target="_blank" rel="noopener noreferrer" aria-label="Contáctanos por WhatsApp">
                <FaWhatsapp />
                WhatsApp
              </a>
              </div>
            </div>

            <div className={styles.quickContact}>
              <h4>¿Necesitas una respuesta rápida?</h4>
              <p>Contáctanos directamente por WhatsApp para una respuesta inmediata.</p>
              <a 
                href={`https://wa.me/${contactConfig.whatsapp.replace(/[\s()\-+]/g, '')}?text=${encodeURIComponent('¡Hola! Me interesa conocer más sobre sus servicios de eventos. ¿Podrían ayudarme?')}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                <FaWhatsapp />
                Chatear ahora
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

