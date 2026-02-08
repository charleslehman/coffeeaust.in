import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import { Footprints, Car } from 'lucide-react';
import { fadeInUp, staggerContainer } from '@/utils/animations';
import { analytics } from '@/utils/analytics';
import type { TravelMode } from '@/data/types';

interface ModeSelectProps {
  onSelect: (mode: TravelMode) => void;
}

export const ModeSelect: React.FC<ModeSelectProps> = ({ onSelect }) => {
  const handleSelect = useCallback((mode: TravelMode) => {
    analytics.modeSelected(mode);
    onSelect(mode);
  }, [onSelect]);

  return (
    <motion.section
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      exit={{ opacity: 0, y: -8, transition: { duration: 0.2 } }}
      className="flex flex-1 flex-col justify-center"
    >
      <motion.h2
        variants={fadeInUp}
        className="font-serif text-3xl font-normal tracking-tight sm:text-4xl"
      >
        How far?
      </motion.h2>
      <motion.p
        variants={fadeInUp}
        className="mt-3 max-w-[32ch] text-[15px] leading-relaxed text-[hsl(var(--muted-foreground))]"
      >
        We'll search for the best shop within range.
      </motion.p>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="mt-8 grid grid-cols-2 gap-3"
      >
        <motion.button
          variants={fadeInUp}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="touch-target card flex flex-col items-center gap-3 px-4 py-8 transition-all hover:border-[hsl(var(--primary))] hover:shadow-elevated"
          onClick={() => handleSelect('walk')}
          role="button"
          tabIndex={0}
          aria-label="Search for coffee shops within walking distance"
          onKeyDown={e => e.key === 'Enter' && handleSelect('walk')}
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[hsl(var(--primary))]/10">
            <Footprints className="h-6 w-6 text-[hsl(var(--primary))]" />
          </div>
          <div className="text-center">
            <span className="block text-sm font-semibold">Walk</span>
            <span className="mt-0.5 block text-xs text-[hsl(var(--muted-foreground))]">within 20 min</span>
          </div>
        </motion.button>
        <motion.button
          variants={fadeInUp}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="touch-target card flex flex-col items-center gap-3 px-4 py-8 transition-all hover:border-[hsl(var(--primary))] hover:shadow-elevated"
          onClick={() => handleSelect('drive')}
          role="button"
          tabIndex={0}
          aria-label="Search for coffee shops within driving distance"
          onKeyDown={e => e.key === 'Enter' && handleSelect('drive')}
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[hsl(var(--primary))]/10">
            <Car className="h-6 w-6 text-[hsl(var(--primary))]" />
          </div>
          <div className="text-center">
            <span className="block text-sm font-semibold">Drive</span>
            <span className="mt-0.5 block text-xs text-[hsl(var(--muted-foreground))]">within 15 min</span>
          </div>
        </motion.button>
      </motion.div>
    </motion.section>
  );
};
