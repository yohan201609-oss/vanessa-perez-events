'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import WhatsAppButton from '@/components/WhatsAppButton/WhatsAppButton';

export default function ConditionalLayout({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  // Si es una ruta admin, no renderizar Header, Footer ni WhatsAppButton
  if (isAdminRoute) {
    return <>{children}</>;
  }

  // Para rutas normales, renderizar todo
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

