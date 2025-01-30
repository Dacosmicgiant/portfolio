// frontend/src/lib/analytics.js
import { axiosInstance } from './axios.js';

export const trackEvent = async (eventType, page, element, location = null) => {
  try {
    await axiosInstance.post('/analytics/track', {
      eventType,
      page,
      element,
      ...(location && {
        latitude: location.latitude,
        longitude: location.longitude
      })
    });
  } catch (error) {
    console.error('Analytics tracking failed:', error);
  }
};

