'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const auth = localStorage.getItem('admin-auth');
      const token = localStorage.getItem('admin-token');
      
      if (auth === 'true' && token) {
        // Verificar token con el servidor
        const response = await fetch('/api/auth/verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });

        const data = await response.json();

        if (data.success) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem('admin-auth');
          localStorage.removeItem('admin-token');
          router.push('/admin/login');
        }
      } else {
        router.push('/admin/login');
      }
    } catch (error) {
      console.error('Error checking auth:', error);
      router.push('/admin/login');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        fontSize: '1.2rem'
      }}>
        Verificando acceso...
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}

