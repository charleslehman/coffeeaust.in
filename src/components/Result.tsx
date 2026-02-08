import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Navigation, RotateCcw, Star, MapPin, Clock, Sparkles } from 'lucide-react';
import { fadeInUp, staggerContainer } from '@/utils/animations';
import { analytics } from '@/utils/analytics';
import { Map } from '@/components/ui/Map';
import type { Recommendation, Coordinates } from '@/data/types';

interface ResultProps {
  recommendation: Recommendation | null;
  userLocation: Coordinates | null;
  onReset: () => void;
}

export const Result: React.FC<ResultProps> = ({ recommendation, userLocation, onReset }) => {
  useEffect(() => {
    if (recommendation) {
      analytics.resultShown(recommendation.shop.id);
    }
  }, [recommendation]);

  if (!recommendation) {
    return (
      <motion.section
        variants={fadeInUp}
        initial="hidden"
        animate="show"
        className="flex flex-1 flex-col items-center justify-center text-center"
      >
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[hsl(var(--muted))]">
          <MapPin className="h-7 w-7 text-[hsl(var(--muted-foreground))]" />
        </div>
        <h2 className="font-serif text-2xl font-normal tracking-tight">
          No shops found nearby
        </h2>
        <p className="mt-2 max-w-[28ch] text-sm text-[hsl(var(--muted-foreground))]">
          Try switching to driving, or check back from a different spot.
        </p>
        <button
          className="btn-primary touch-target mt-8 w-full max-w-[280px]"
          onClick={onReset}
          aria-label="Start over and try again"
        >
          <RotateCcw className="h-4 w-4" />
          Start over
        </button>
      </motion.section>
    );
  }

  const { shop, reasoning, navigationUrl } = recommendation;
  const time = Math.round(shop.travelTimeMinutes);

  return (
    <motion.section
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      exit={{ opacity: 0, y: -8, transition: { duration: 0.2 } }}
      className="flex flex-col"
    >
      <motion.div variants={fadeInUp} className="text-center">
        <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-[hsl(var(--primary))]/10 px-3 py-1">
          <Sparkles className="h-3 w-3 text-[hsl(var(--primary))]" />
          <span className="text-xs font-semibold text-[hsl(var(--primary))]">Your match</span>
        </div>
        <h2 className="font-serif text-3xl font-normal tracking-tight sm:text-4xl">
          {shop.name}
        </h2>
        <div className="mt-2 flex items-center justify-center gap-3 text-sm text-[hsl(var(--muted-foreground))]">
          <span className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            {shop.neighborhood}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {time} min
          </span>
        </div>
      </motion.div>

      <motion.div variants={fadeInUp} className="mt-6 overflow-hidden rounded-2xl border shadow-card">
        <Map
          shops={[shop]}
          userLocation={userLocation}
          selectedShopId={shop.id}
          className="h-[180px]"
        />
      </motion.div>

      <motion.div variants={fadeInUp} className="mt-5 rounded-2xl bg-white border p-4 shadow-subtle">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[hsl(var(--primary))]/10">
            <Star className="h-4 w-4 text-[hsl(var(--primary))]" />
          </div>
          <div>
            <div className="flex items-center gap-2 text-sm">
              <span className="font-semibold text-[hsl(var(--primary))]">{shop.rating}</span>
              <span className="text-[hsl(var(--muted-foreground))]">from {shop.reviewCount} reviews</span>
            </div>
            <p className="mt-1 text-[13px] leading-relaxed text-[hsl(var(--muted-foreground))]">
              {reasoning}
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div variants={fadeInUp} className="mt-6 flex flex-col gap-2">
        <motion.a
          whileTap={{ scale: 0.98 }}
          href={navigationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-navigate touch-target w-full"
          onClick={() => analytics.navigateClicked(shop.id)}
          aria-label={`Open Google Maps navigation to ${shop.name}`}
        >
          <Navigation className="h-4 w-4" />
          Navigate there
        </motion.a>
        <button
          className="btn-secondary touch-target w-full"
          onClick={() => {
            analytics.tryAgain();
            onReset();
          }}
          aria-label="Start over and get a new recommendation"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Try again
        </button>
      </motion.div>
    </motion.section>
  );
};
