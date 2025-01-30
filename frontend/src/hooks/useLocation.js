import { useState, useEffect } from 'react';

export const useLocation = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setLoading(false);
      return;
    }

    setLoading(true);  // Set loading to true when requesting location

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };

        // Save the location to localStorage
        localStorage.setItem('location', JSON.stringify(newLocation));

        setLocation(newLocation);
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    );
  };

  useEffect(() => {
    // Check if location is already stored in localStorage
    const storedLocation = localStorage.getItem('location');

    if (storedLocation) {
      // If location is stored, use it directly
      setLocation(JSON.parse(storedLocation));
    } else {
      // If location is not stored, request it
      requestLocation();
    }
  }, []);

  return { location, error, loading, requestLocation };
};
