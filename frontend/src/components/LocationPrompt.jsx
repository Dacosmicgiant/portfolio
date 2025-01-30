import React, { useState } from 'react';
import { MapPin, X } from 'lucide-react';
import { useLocation } from '../hooks/useLocation';

const LocationPrompt = ({ onLocationUpdate }) => {
  const [dismissed, setDismissed] = useState(false);
  const { location, error, loading, requestLocation } = useLocation();

  const handleRequestLocation = async () => {
    requestLocation();
  };

  React.useEffect(() => {
    if (location) {
      onLocationUpdate(location);
    }
  }, [location, onLocationUpdate]);

  if (dismissed || location) return null;

  return (
    <div className="alert alert-info shadow-lg relative">
      <MapPin className="h-5 w-5 text-info" />
      <div>
        <span className="font-semibold">Enable Location Services</span>
        <div className="mt-2 text-sm">
          Help us provide better analytics by sharing your location. We only collect city-level data to understand our user base better.
        </div>
      </div>
      <div className="mt-4 flex gap-3">
        <button
          onClick={handleRequestLocation}
          disabled={loading}
          className={`btn ${loading ? 'btn-disabled' : 'btn-primary'}`}
        >
          {loading ? 'Requesting...' : 'Allow Location'}
        </button>
        <button
          onClick={() => setDismissed(true)}
          className="btn btn-ghost"
        >
          Maybe Later
        </button>
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-500">
          Error: {error}
        </p>
      )}
      <button
        onClick={() => setDismissed(true)}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

export default LocationPrompt;
