import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Loader2 } from 'lucide-react';
import { fadeInUp, staggerContainer } from '@/utils/animations';
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
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      exit={{ opacity: 0, y: -8, transition: { duration: 0.2 } }}
      className="flex flex-1 flex-col items-center justify-center text-center"
    >
      <motion.div variants={fadeInUp} className="animate-float mb-8">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-[hsl(var(--primary))]/10">
          <span className="text-4xl" role="img" aria-label="coffee">&#9749;</span>
        </div>
      </motion.div>

      <motion.h2
        variants={fadeInUp}
        className="font-serif text-3xl font-normal tracking-tight sm:text-4xl"
      >
        Find your next cup
      </motion.h2>

      <motion.p
        variants={fadeInUp}
        className="mt-3 max-w-[28ch] text-[15px] leading-relaxed text-[hsl(var(--muted-foreground))]"
      >
        One recommendation based on where you are and what you like.
      </motion.p>

      <motion.button
        variants={fadeInUp}
        whileTap={{ scale: 0.98 }}
        className="btn-primary touch-target mt-10 w-full max-w-[280px]"
        onClick={requestLocation}
        disabled={loading}
        aria-label="Share your location to find nearby coffee shops"
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <MapPin className="h-4 w-4" />
        )}
        {loading ? 'Finding you...' : 'Share my location'}
      </motion.button>

      {error && (
        <motion.p
          variants={fadeInUp}
          className="mt-4 text-sm text-[hsl(var(--destructive))]"
          role="alert"
        >
          {error}
        </motion.p>
      )}
    </motion.section>
  );
};
