'use client';

import { useEffect } from 'react';
import Hero from '@/components/Hero/Hero';
import Services from '@/components/Services/Services';
import Gallery from '@/components/Gallery/Gallery';
import Testimonials from '@/components/Testimonials/Testimonials';
import Contact from '@/components/Contact/Contact';
import analytics from '@/utils/analytics';

export default function Home() {
  useEffect(() => {
    // Verificar que estamos en el cliente
    if (typeof window === 'undefined') return;
    
    // Initialize Google Analytics
    analytics.init();
    
    // Track page view on app load
    analytics.trackPageView(window.location.pathname, document.title);
    
    // Track scroll depth
    let maxScroll = 0;
    const trackScroll = () => {
      if (typeof window === 'undefined') return;
      const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
      if (scrollPercent > maxScroll && scrollPercent % 25 === 0) {
        maxScroll = scrollPercent;
        analytics.trackScrollDepth(scrollPercent);
      }
    };
    
    window.addEventListener('scroll', trackScroll);
    
    // Track time on page
    const startTime = Date.now();
    const trackTime = () => {
      if (typeof window === 'undefined') return;
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      analytics.trackTimeOnPage(timeSpent);
    };
    
    window.addEventListener('beforeunload', trackTime);
    
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('scroll', trackScroll);
        window.removeEventListener('beforeunload', trackTime);
      }
    };
  }, []);

  return (
    <>
      <Hero />
      <Services />
      <Gallery />
      <Testimonials />
      <Contact />
    </>
  );
}

