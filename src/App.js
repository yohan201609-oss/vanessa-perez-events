import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import analytics from './utils/analytics';
import './App.css';

function App() {
  useEffect(() => {
    // Initialize Google Analytics
    analytics.init();
    
    // Track page view on app load
    analytics.trackPageView(window.location.pathname, document.title);
    
    // Track scroll depth
    let maxScroll = 0;
    const trackScroll = () => {
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
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      analytics.trackTimeOnPage(timeSpent);
    };
    
    window.addEventListener('beforeunload', trackTime);
    
    return () => {
      window.removeEventListener('scroll', trackScroll);
      window.removeEventListener('beforeunload', trackTime);
    };
  }, []);

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <Services />
              <Gallery />
              <Testimonials />
              <Contact />
            </>
          } />
        </Routes>
        <Footer />
        <WhatsAppButton />
      </div>
    </Router>
  );
}

export default App;