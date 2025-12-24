import { Inter, Playfair_Display } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import WhatsAppButton from '@/components/WhatsAppButton/WhatsAppButton';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata = {
  title: 'Vanessa Perez - Event Planner Profesional',
  description: 'Planificación profesional de bodas, cumpleaños, eventos corporativos y más. Expertos en crear momentos inolvidables.',
  keywords: ['event planner', 'bodas', 'eventos', 'fiestas', 'wedding planner', 'planificación de eventos', 'eventos corporativos', 'baby shower', 'graduaciones'],
  authors: [{ name: 'Vanessa Perez' }],
  creator: 'Vanessa Perez',
  publisher: 'Vanessa Perez Event Planner',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_WEBSITE_URL || 'https://vanessaperez-events.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Vanessa Perez Event Planner - Planificación Profesional de Eventos',
    description: 'Planificación profesional de bodas, cumpleaños, eventos corporativos y más. Expertos en crear momentos inolvidables.',
    url: process.env.NEXT_PUBLIC_WEBSITE_URL || 'https://vanessaperez-events.com',
    siteName: 'Vanessa Perez Event Planner',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Vanessa Perez Event Planner',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vanessa Perez Event Planner',
    description: 'Planificación profesional de eventos inolvidables',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

import ConditionalLayout from '@/components/ConditionalLayout';

export default function RootLayout({ children }) {
  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        {gaMeasurementId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaMeasurementId}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  );
}

