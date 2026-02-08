import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { fadeInUp } from '@/utils/animations';
import { analytics } from '@/utils/analytics';
import type { Coordinates } from '@/data/types';

interface LocationPromptProps {
  onLocation: (coords: Coordinates) => void;
}

export const LocationPrompt: React.FC<LocationPromptProps> = ({ onLocation }) => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }

    setLoading(true);
    setError('');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        analytics.locationShared();
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
      { enableHighAccuracy: true, timeout: 10000 },
    );
  }, [onLocation]);

  return (
    <motion.section
      variants={fadeInUp}
      initial="hidden"
      animate="show"
      className="flex flex-col"
    >
      <h2 className="font-serif text-[1.75rem] font-normal tracking-tight">
        Where are you?
      </h2>
      <p className="mt-2 max-w-[36ch] text-sm text-[hsl(var(--muted-foreground))]">
        We'll find the best coffee shop near you.
      </p>
      <button
        className="btn-primary touch-target mt-8 w-full"
        onClick={requestLocation}
        disabled={loading}
        aria-label="Share your location to find nearby coffee shops"
      >
        <MapPin className="h-4 w-4" />
        {loading ? 'Finding you...' : 'Share my location'}
      </button>
      {error && (
        <p className="mt-3 text-sm text-[hsl(var(--destructive))]" role="alert">
          {error}
        </p>
      )}
    </motion.section>
  );
};
