'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './Admin.module.css';
import { 
  FaHome, 
  FaServicestack, 
  FaImages, 
  FaComments, 
  FaCog 
} from 'react-icons/fa';

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState({
    servicios: 0,
    galeria: 0,
    testimonios: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [serviciosRes, galeriaRes, testimoniosRes] = await Promise.all([
        fetch('/api/content/servicios'),
        fetch('/api/content/galeria'),
        fetch('/api/content/testimonios')
      ]);

      const [serviciosData, galeriaData, testimoniosData] = await Promise.all([
        serviciosRes.json(),
        galeriaRes.json(),
        testimoniosRes.json()
      ]);

      setStats({
        servicios: serviciosData.success ? serviciosData.data.length : 0,
        galeria: galeriaData.success ? galeriaData.data.length : 0,
        testimonios: testimoniosData.success ? testimoniosData.data.length : 0
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const adminSections = [
    {
      title: 'Hero',
      description: 'Editar título y textos principales',
      icon: <FaHome />,
      href: '/admin/hero',
      color: '#d4af37'
    },
    {
      title: 'Servicios',
      description: `${stats.servicios} servicios activos`,
      icon: <FaServicestack />,
      href: '/admin/servicios',
      color: '#4CAF50'
    },
    {
      title: 'Portafolio',
      description: `${stats.galeria} imágenes`,
      icon: <FaImages />,
      href: '/admin/galeria',
      color: '#2196F3'
    },
    {
      title: 'Testimonios',
      description: `${stats.testimonios} testimonios`,
      icon: <FaComments />,
      href: '/admin/testimonios',
      color: '#FF9800'
    },
    {
      title: 'Configuración',
      description: 'Redes sociales y contacto',
      icon: <FaCog />,
      href: '/admin/configuracion',
      color: '#9C27B0'
    }
  ];

  if (loading) {
    return (
      <div className={styles.loading}>
        <p>Cargando estadísticas...</p>
      </div>
    );
  }

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <h1>Panel Administrativo</h1>
        <p className={styles.subtitle}>Gestiona el contenido de tu sitio web</p>
      </div>

      <div className={styles.gridContainer}>
        {adminSections.map((section) => (
          <Link 
            key={section.title}
            href={section.href}
            className={styles.card}
            style={{ borderLeftColor: section.color }}
          >
            <div 
              className={styles.cardIcon}
              style={{ color: section.color }}
            >
              {section.icon}
            </div>
            <h3>{section.title}</h3>
            <p>{section.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

