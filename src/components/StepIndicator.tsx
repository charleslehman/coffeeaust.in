import React from 'react';
import { cn } from '@/lib/utils';
import type { AppStep } from '@/data/types';

interface StepIndicatorProps {
  currentStep: AppStep;
}

const STEPS: AppStep[] = ['location', 'order', 'mode', 'result'];

export const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  const currentIndex = STEPS.indexOf(currentStep);

  return (
    <div className="flex items-center justify-center gap-1.5" aria-label={`Step ${currentIndex + 1} of ${STEPS.length}`}>
      {STEPS.map((step, i) => (
        <div
          key={step}
          className={cn(
            'step-dot',
            i === currentIndex && 'step-dot-active',
            i < currentIndex && 'step-dot-complete',
            i > currentIndex && 'step-dot-inactive',
          )}
        />
      ))}
    </div>
  );
};
