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
      variants={fadeInUp}
      initial="hidden"
      animate="show"
      className="flex flex-col"
    >
      <h2 className="font-serif text-[1.75rem] font-normal tracking-tight">
        Walking or driving?
      </h2>
      <p className="mt-2 max-w-[36ch] text-sm text-[hsl(var(--muted-foreground))]">
        Walking searches within 20 min. Driving within 15.
      </p>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="mt-8 grid grid-cols-2 gap-3"
      >
        <motion.button
          variants={fadeInUp}
          whileTap={{ scale: 0.98 }}
          className="touch-target card flex flex-col items-center gap-3 px-4 py-8 transition-colors hover:border-[hsl(var(--primary))] hover:text-[hsl(var(--primary))]"
          onClick={() => handleSelect('walk')}
          role="button"
          tabIndex={0}
          aria-label="Search for coffee shops within walking distance"
          onKeyDown={e => e.key === 'Enter' && handleSelect('walk')}
        >
          <Footprints className="h-7 w-7" />
          <span className="text-sm font-medium">Walk</span>
        </motion.button>
        <motion.button
          variants={fadeInUp}
          whileTap={{ scale: 0.98 }}
          className="touch-target card flex flex-col items-center gap-3 px-4 py-8 transition-colors hover:border-[hsl(var(--primary))] hover:text-[hsl(var(--primary))]"
          onClick={() => handleSelect('drive')}
          role="button"
          tabIndex={0}
          aria-label="Search for coffee shops within driving distance"
          onKeyDown={e => e.key === 'Enter' && handleSelect('drive')}
        >
          <Car className="h-7 w-7" />
          <span className="text-sm font-medium">Drive</span>
        </motion.button>
      </motion.div>
    </motion.section>
  );
};
