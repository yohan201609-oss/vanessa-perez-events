'use client';

import { usePathname } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import ProtectedRoute from '@/components/admin/ProtectedRoute';

export default function AdminLayoutWrapper({ children }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';

  if (isLoginPage) {
    // Página de login sin protección
    return <>{children}</>;
  }

  // Otras páginas admin con protección
  return (
    <ProtectedRoute>
      <AdminLayout>
        {children}
      </AdminLayout>
    </ProtectedRoute>
  );
}

