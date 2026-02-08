import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { fadeInUp } from '@/utils/animations';
import { analytics } from '@/utils/analytics';

interface OrderInputProps {
  onSubmit: (order: string) => void;
}

export const OrderInput: React.FC<OrderInputProps> = ({ onSubmit }) => {
  const [value, setValue] = useState('');

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      analytics.orderSubmitted(value.trim());
      onSubmit(value.trim());
    }
  }, [value, onSubmit]);

  return (
    <motion.section
      variants={fadeInUp}
      initial="hidden"
      animate="show"
      className="flex flex-col"
    >
      <h2 className="font-serif text-[1.75rem] font-normal tracking-tight">
        What do you usually order?
      </h2>
      <p className="mt-2 max-w-[36ch] text-sm text-[hsl(var(--muted-foreground))]">
        Helps us match you with the right spot.
      </p>
      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3">
        <input
          type="text"
          className="touch-target w-full rounded-xl border border-[hsl(var(--border))] bg-white px-4 py-3.5 text-base outline-none transition-colors placeholder:text-[hsl(var(--muted-foreground))]/60 focus:border-[hsl(var(--ring))]"
          placeholder="e.g. cortado, cold brew, oat latte..."
          value={value}
          onChange={e => setValue(e.target.value)}
          autoFocus
          aria-label="Your usual coffee order"
        />
        <button
          type="submit"
          className="btn-primary touch-target w-full"
          disabled={!value.trim()}
        >
          Next
          <ArrowRight className="h-4 w-4" />
        </button>
      </form>
    </motion.section>
  );
};
