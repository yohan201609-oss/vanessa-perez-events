'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuoteLeft, FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import OptimizedImage from '@/components/OptimizedImage/OptimizedImage';
import { images } from '@/config/images';
import { contentStorage } from '@/lib/storage';
import styles from './Testimonials.module.css';

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTestimonials();
  }, []);

  // Sincronizar cambios
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleContentUpdate = (event) => {
      if (event.detail.type === 'testimonios') {
        loadTestimonials();
      }
    };

    const handleStorageChange = (e) => {
      if (e.key === 'content:testimonios') {
        loadTestimonials();
      }
    };

    window.addEventListener('contentUpdated', handleContentUpdate);
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('contentUpdated', handleContentUpdate);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const loadTestimonials = async () => {
    try {
      const data = await contentStorage.getTestimonios();
      setTestimonials(data);
    } catch (error) {
      console.error('Error loading testimonials:', error);
      // Valores por defecto
      const defaultTestimonials = [
    {
      id: 1,
      name: 'María González',
      event: 'Boda de Ensueño',
      rating: 5,
      text: 'Vanessa hizo realidad la boda de nuestros sueños. Su atención al detalle y profesionalismo fueron excepcionales. Cada momento fue perfecto.',
      image: images.testimonials[0].image,
      date: 'Enero 2024'
    },
    {
      id: 2,
      name: 'Carlos y Ana Rodríguez',
      event: 'Cumpleaños de 50 años',
      rating: 5,
      text: 'Increíble experiencia. Vanessa organizó una fiesta sorpresa perfecta para mi esposa. Todos los invitados quedaron encantados con la decoración y la coordinación.',
      image: images.testimonials[1].image,
      date: 'Diciembre 2023'
    },
    {
      id: 3,
      name: 'TechCorp Solutions',
      event: 'Conferencia Anual',
      rating: 5,
      text: 'Vanessa coordinó nuestro evento corporativo con excelencia. Su profesionalismo y capacidad de organización nos permitió enfocarnos en el contenido del evento.',
      image: images.testimonials[2].image,
      date: 'Noviembre 2023'
    },
    {
      id: 4,
      name: 'Laura Martínez',
      event: 'Baby Shower',
      rating: 5,
      text: 'El baby shower fue mágico gracias a Vanessa. Cada detalle estaba perfectamente pensado. Definitivamente la recomiendo para cualquier evento especial.',
      image: images.testimonials[3].image,
      date: 'Octubre 2023'
    },
    {
      id: 5,
      name: 'Familia Hernández',
      event: 'Graduación Universitaria',
      rating: 5,
      text: 'Vanessa organizó la celebración de graduación de nuestra hija de manera impecable. La decoración y la coordinación del evento fueron perfectas.',
      image: images.testimonials[4].image,
      date: 'Septiembre 2023'
    }
      ];
      setTestimonials(defaultTestimonials);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isAutoPlaying || testimonials.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => 
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => 
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => 
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
    setIsAutoPlaying(false);
  };

  const goToTestimonial = (index) => {
    setCurrentTestimonial(index);
    setIsAutoPlaying(false);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FaStar 
        key={index} 
        className={`${styles.star} ${index < rating ? styles.filled : ''}`} 
      />
    ));
  };

  if (loading || testimonials.length === 0) {
    return (
      <section id="testimonios" className={`${styles.testimonials} section`}>
        <div className="container">
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>Cargando testimonios...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="testimonios" className={`${styles.testimonials} section`}>
      <div className="container">
        <motion.div 
          className="section-header text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">Lo que dicen nuestros clientes</h2>
          <p className="section-subtitle">
            La satisfacción de nuestros clientes es nuestra mayor recompensa
          </p>
        </motion.div>

        <motion.div 
          className={styles.testimonialsContainer}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className={styles.testimonialsCarousel}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                className={styles.testimonialCard}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
              >
                <div className={styles.testimonialContent}>
                  <div className={styles.quoteIcon}>
                    <FaQuoteLeft />
                  </div>
                  
                  <div className={styles.testimonialText}>
                    <p>&ldquo;{testimonials[currentTestimonial].text}&rdquo;</p>
                  </div>

                  <div className={styles.testimonialRating}>
                    {renderStars(testimonials[currentTestimonial].rating)}
                  </div>

                  <div className={styles.testimonialAuthor}>
                    <div className={styles.authorImage}>
                      <OptimizedImage 
                        src={testimonials[currentTestimonial].image} 
                        alt={testimonials[currentTestimonial].name}
                        className={styles.authorImg}
                      />
                    </div>
                    <div className={styles.authorInfo}>
                      <h4>{testimonials[currentTestimonial].name}</h4>
                      <p className={styles.eventType}>{testimonials[currentTestimonial].event}</p>
                      <p className={styles.eventDate}>{testimonials[currentTestimonial].date}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className={styles.carouselControls}>
              <button 
                className={styles.controlBtn}
                onClick={prevTestimonial}
                aria-label="Testimonial anterior"
              >
                <FaChevronLeft />
              </button>
              
              <div className={styles.carouselDots}>
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    className={`${styles.dot} ${index === currentTestimonial ? styles.active : ''}`}
                    onClick={() => goToTestimonial(index)}
                    aria-label={`Ir al testimonial ${index + 1}`}
                  />
                ))}
              </div>
              
              <button 
                className={styles.controlBtn}
                onClick={nextTestimonial}
                aria-label="Testimonial siguiente"
              >
                <FaChevronRight />
              </button>
            </div>
          </div>

          <motion.div 
            className={styles.testimonialsStats}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className={styles.statItem}>
              <h3>4.9/5</h3>
              <p>Calificación promedio</p>
            </div>
            <div className={styles.statItem}>
              <h3>200+</h3>
              <p>Clientes satisfechos</p>
            </div>
            <div className={styles.statItem}>
              <h3>100%</h3>
              <p>Recomendaciones</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;

