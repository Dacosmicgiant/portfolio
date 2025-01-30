// frontend/src/lib/analytics.js
import axios from './axios.js';

export const trackEvent = async (eventType, page, element) => {
  try {
    await axios.post('/api/analytics/track', {
      eventType,
      page,
      element
    });
  } catch (error) {
    console.error('Analytics tracking failed:', error);
  }
};