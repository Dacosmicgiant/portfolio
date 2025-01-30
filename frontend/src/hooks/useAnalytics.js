// frontend/src/hooks/useAnalytics.js
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackEvent } from '../lib/analytics';


export const usePageTracking = () => {
    const location = useLocation();
  
    useEffect(() => {
      const userLocation = JSON.parse(localStorage.getItem('userLocation'));
      trackEvent('page_view', location.pathname, null, userLocation);
    }, [location]);
  };