// frontend/src/lib/analytics.js
import { axiosInstance } from './axios.js';


export const trackEvent = async (eventType, page, element) => {
  try {
    await axiosInstance.post('/analytics/track', {
      eventType,
      page,
      element
    });
  } catch (error) {
    console.error('Analytics tracking failed:', error);
  }
};