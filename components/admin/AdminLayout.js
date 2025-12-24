'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Sidebar from './Sidebar';
import styles from './AdminLayout.module.css';

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem('admin-auth');
    localStorage.removeItem('admin-token');
    router.push('/admin/login');
  };

  return (
    <div className={styles.adminLayout}>
      <Sidebar 
        isOpen={sidebarOpen} 
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        currentPath={pathname}
        onLogout={handleLogout}
      />
      <main className={`${styles.mainContent} ${!sidebarOpen ? styles.fullWidth : ''}`}>
        <div className={styles.contentWrapper}>
          {children}
        </div>
      </main>
    </div>
  );
}

