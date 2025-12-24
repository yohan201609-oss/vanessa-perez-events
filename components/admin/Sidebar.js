'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  FaHome, 
  FaServicestack, 
  FaImages, 
  FaComments, 
  FaCog,
  FaBars,
  FaSignOutAlt,
  FaChevronLeft
} from 'react-icons/fa';
import styles from './Sidebar.module.css';

export default function Sidebar({ isOpen, onToggle, currentPath, onLogout }) {
  const router = useRouter();

  const menuItems = [
    {
      title: 'Dashboard',
      href: '/admin',
      icon: <FaHome />,
      color: '#d4af37'
    },
    {
      title: 'Hero',
      href: '/admin/hero',
      icon: <FaHome />,
      color: '#d4af37'
    },
    {
      title: 'Servicios',
      href: '/admin/servicios',
      icon: <FaServicestack />,
      color: '#4CAF50'
    },
    {
      title: 'Galería',
      href: '/admin/galeria',
      icon: <FaImages />,
      color: '#2196F3'
    },
    {
      title: 'Testimonios',
      href: '/admin/testimonios',
      icon: <FaComments />,
      color: '#FF9800'
    },
    {
      title: 'Configuración',
      href: '/admin/configuracion',
      icon: <FaCog />,
      color: '#9C27B0'
    }
  ];

  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}>
      <div className={styles.sidebarHeader}>
        <h2 className={styles.logo}>Vanessa Perez Events</h2>
        <button 
          className={styles.toggleBtn}
          onClick={onToggle}
          aria-label="Toggle sidebar"
        >
          <FaChevronLeft className={isOpen ? '' : styles.rotated} />
        </button>
      </div>

      <nav className={styles.nav}>
        {menuItems.map((item) => {
          const isActive = currentPath === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.navItem} ${isActive ? styles.active : ''}`}
              style={isActive ? { borderLeftColor: item.color } : {}}
            >
              <span className={styles.navIcon} style={{ color: item.color }}>
                {item.icon}
              </span>
              {isOpen && <span className={styles.navText}>{item.title}</span>}
            </Link>
          );
        })}
      </nav>

      <div className={styles.sidebarFooter}>
        <button 
          className={styles.logoutBtn}
          onClick={onLogout}
        >
          <FaSignOutAlt />
          {isOpen && <span>Cerrar Sesión</span>}
        </button>
      </div>
    </aside>
  );
}

