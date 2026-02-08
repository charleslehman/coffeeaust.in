import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Search } from 'lucide-react';
import { fadeInUp, staggerContainer } from '@/utils/animations';
import { analytics } from '@/utils/analytics';

interface OrderInputProps {
  onSubmit: (order: string) => void;
}

const SUGGESTIONS = ['Cortado', 'Cold brew', 'Oat latte', 'Pour-over', 'Espresso', 'Matcha'];

export const OrderInput: React.FC<OrderInputProps> = ({ onSubmit }) => {
  const [value, setValue] = useState('');

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      analytics.orderSubmitted(value.trim());
      onSubmit(value.trim());
    }
  }, [value, onSubmit]);

  const handleSuggestion = useCallback((suggestion: string) => {
    setValue(suggestion);
    analytics.orderSubmitted(suggestion);
    onSubmit(suggestion);
  }, [onSubmit]);

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
        What's your go-to?
      </motion.h2>
      <motion.p
        variants={fadeInUp}
        className="mt-3 max-w-[32ch] text-[15px] leading-relaxed text-[hsl(var(--muted-foreground))]"
      >
        Tell us your usual order so we can find the right spot.
      </motion.p>

      <motion.form variants={fadeInUp} onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(var(--muted-foreground))]/50" />
          <input
            type="text"
            className="touch-target w-full rounded-2xl border border-[hsl(var(--border))] bg-white py-4 pl-11 pr-4 text-base shadow-subtle outline-none transition-all placeholder:text-[hsl(var(--muted-foreground))]/50 focus:border-[hsl(var(--ring))] focus:shadow-card"
            placeholder="Type your order..."
            value={value}
            onChange={e => setValue(e.target.value)}
            autoFocus
            aria-label="Your usual coffee order"
          />
        </div>
        <button
          type="submit"
          className="btn-primary touch-target w-full"
          disabled={!value.trim()}
        >
          Next
          <ArrowRight className="h-4 w-4" />
        </button>
      </motion.form>

      <motion.div variants={fadeInUp} className="mt-6">
        <p className="mb-2.5 text-xs font-medium uppercase tracking-wider text-[hsl(var(--muted-foreground))]/60">
          Popular
        </p>
        <div className="flex flex-wrap gap-2">
          {SUGGESTIONS.map(s => (
            <button
              key={s}
              onClick={() => handleSuggestion(s)}
              className="filter-pill touch-target border-[hsl(var(--border))] bg-white text-[13px] text-[hsl(var(--muted-foreground))] shadow-subtle transition-all hover:border-[hsl(var(--primary))] hover:text-[hsl(var(--primary))]"
              tabIndex={0}
              role="button"
              aria-label={`Select ${s} as your order`}
              onKeyDown={e => e.key === 'Enter' && handleSuggestion(s)}
            >
              {s}
            </button>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
};
