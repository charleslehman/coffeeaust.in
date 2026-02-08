import { useState } from 'react';
import type { Coordinates } from '../types/coffee-shop';

interface Props {
  onLocation: (coords: Coordinates) => void;
}

export default function LocationPrompt({ onLocation }: Props) {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }

    setLoading(true);
    setError('');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        onLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (err) => {
        setLoading(false);
        if (err.code === err.PERMISSION_DENIED) {
          setError('Location access denied. We need this to find nearby shops.');
        } else {
          setError('Could not get your location. Please try again.');
        }
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  return (
    <section className="step">
      <h2 className="step-title">Where are you?</h2>
      <p className="step-desc">
        We'll find the best coffee shop near you.
      </p>
      <button
        className="btn btn-primary"
        onClick={requestLocation}
        disabled={loading}
      >
        {loading ? 'Finding you...' : 'Share my location'}
      </button>
      {error && <p className="error">{error}</p>}
    </section>
  );
}
