import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Navigation, RotateCcw, Star, MapPin } from 'lucide-react';
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
        className="flex flex-col items-center text-center"
      >
        <h2 className="font-serif text-[1.75rem] font-normal tracking-tight">
          No shops found nearby
        </h2>
        <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">
          Try switching to driving, or check back from a different location.
        </p>
        <button
          className="btn-primary touch-target mt-8 w-full"
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

  return (
    <motion.section
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      className="flex flex-col"
    >
      <motion.div variants={fadeInUp} className="text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-[hsl(var(--primary))]">
          Go here
        </p>
        <h2 className="mt-3 font-serif text-[2rem] font-normal tracking-tight">
          {shop.name}
        </h2>
        <p className="mt-1 flex items-center justify-center gap-1 text-sm text-[hsl(var(--muted-foreground))]">
          <MapPin className="h-3.5 w-3.5" />
          {shop.neighborhood}
        </p>
      </motion.div>

      <motion.div variants={fadeInUp} className="mt-6">
        <Map
          shops={[shop]}
          userLocation={userLocation}
          selectedShopId={shop.id}
          className="h-[200px]"
        />
      </motion.div>

      <motion.p
        variants={fadeInUp}
        className="mt-6 text-center text-sm leading-relaxed text-[hsl(var(--foreground))]"
      >
        {reasoning}
      </motion.p>

      <motion.div
        variants={fadeInUp}
        className="mt-4 flex items-center justify-center gap-6 text-sm text-[hsl(var(--muted-foreground))]"
      >
        <span className="flex items-center gap-1 font-semibold text-[hsl(var(--primary))]">
          <Star className="h-3.5 w-3.5" />
          {shop.rating}
        </span>
        <span>{shop.reviewCount} reviews</span>
      </motion.div>

      <motion.div variants={fadeInUp} className="mt-8 flex flex-col gap-1">
        <a
          href={navigationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-navigate touch-target w-full"
          onClick={() => analytics.navigateClicked(shop.id)}
          aria-label={`Open Google Maps navigation to ${shop.name}`}
        >
          <Navigation className="h-4 w-4" />
          Navigate
        </a>
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
