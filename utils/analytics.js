// Google Analytics utility functions
class Analytics {
  constructor() {
    this.gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'GA_MEASUREMENT_ID';
    this.isInitialized = false;
  }

  // Initialize Google Analytics
  init() {
    if (this.isInitialized || typeof window === 'undefined') return;

    // Load Google Analytics script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${this.gaId}`;
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(){window.dataLayer.push(arguments);}
    window.gtag = gtag;
    
    gtag('js', new Date());
    gtag('config', this.gaId, {
      page_title: document.title,
      page_location: window.location.href,
    });

    this.isInitialized = true;
    console.log('Google Analytics initialized');
  }

  // Track page views
  trackPageView(pagePath, pageTitle) {
    if (!this.isInitialized || typeof window === 'undefined') return;
    
    window.gtag('config', this.gaId, {
      page_path: pagePath,
      page_title: pageTitle,
    });
  }

  // Track custom events
  trackEvent(eventName, parameters = {}) {
    if (!this.isInitialized || typeof window === 'undefined') return;
    
    window.gtag('event', eventName, parameters);
  }

  // Track form submissions
  trackFormSubmission(formName, formData = {}) {
    this.trackEvent('form_submit', {
      form_name: formName,
      event_category: 'engagement',
      event_label: formName,
      ...formData
    });
  }

  // Track button clicks
  trackButtonClick(buttonName, location = '') {
    this.trackEvent('button_click', {
      button_name: buttonName,
      event_category: 'engagement',
      event_label: location,
      location: location
    });
  }

  // Track WhatsApp clicks
  trackWhatsAppClick(source = '') {
    this.trackEvent('whatsapp_click', {
      event_category: 'contact',
      event_label: source,
      source: source
    });
  }

  // Track gallery interactions
  trackGalleryInteraction(action, itemTitle = '') {
    this.trackEvent('gallery_interaction', {
      action: action,
      item_title: itemTitle,
      event_category: 'engagement',
      event_label: action
    });
  }

  // Track service interest
  trackServiceInterest(serviceName, action = 'view') {
    this.trackEvent('service_interest', {
      service_name: serviceName,
      action: action,
      event_category: 'business',
      event_label: serviceName
    });
  }

  // Track scroll depth
  trackScrollDepth(depth) {
    this.trackEvent('scroll_depth', {
      depth: depth,
      event_category: 'engagement',
      event_label: `${depth}%`
    });
  }

  // Track time on page
  trackTimeOnPage(timeInSeconds) {
    this.trackEvent('time_on_page', {
      time_seconds: timeInSeconds,
      event_category: 'engagement'
    });
  }
}

// Create singleton instance
const analytics = new Analytics();

export default analytics;

