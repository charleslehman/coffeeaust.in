import { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import type { Coordinates, TravelMode, AppStep, Recommendation } from '@/data/types';
import { getRecommendation } from '@/recommend';
import { Header } from '@/components/Header';
import { StepIndicator } from '@/components/StepIndicator';
import { LocationPrompt } from '@/components/LocationPrompt';
import { OrderInput } from '@/components/OrderInput';
import { ModeSelect } from '@/components/ModeSelect';
import { Result } from '@/components/Result';
import { Footer } from '@/components/Footer';

export default function App() {
  const [step, setStep] = useState<AppStep>('location');
  const [location, setLocation] = useState<Coordinates | null>(null);
  const [order, setOrder] = useState('');
  const [result, setResult] = useState<Recommendation | null>(null);

  const handleLocation = useCallback((coords: Coordinates) => {
    setLocation(coords);
    setStep('order');
  }, []);

  const handleOrder = useCallback((value: string) => {
    setOrder(value);
    setStep('mode');
  }, []);

  const handleMode = useCallback((mode: TravelMode) => {
    if (!location) return;
    const rec = getRecommendation(location, order, mode);
    setResult(rec);
    setStep('result');
  }, [location, order]);

  const handleReset = useCallback(() => {
    setResult(null);
    setOrder('');
    setStep('location');
  }, []);

  return (
    <HelmetProvider>
      <Helmet>
        <title>coffeeaust.in — find your next cup</title>
        <meta name="description" content="One coffee recommendation based on your location and usual order. No scrolling, no decisions — just go." />
        <meta property="og:title" content="coffeeaust.in — find your next cup" />
        <meta property="og:description" content="One coffee recommendation based on your location and usual order. No scrolling, no decisions — just go." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://coffeeaust.in" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="coffeeaust.in — find your next cup" />
        <meta name="twitter:description" content="One coffee recommendation based on your location and usual order. No scrolling, no decisions — just go." />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#faf8f5" />
      </Helmet>

      <div className="min-h-dvh lg:grid lg:grid-cols-[1fr_minmax(0,560px)_1fr] lg:gap-0">
        {/* Left decorative panel — visible on desktop only */}
        <div className="hidden lg:flex lg:flex-col lg:items-end lg:justify-center lg:pr-16 xl:pr-24">
          <div className="max-w-[280px]">
            <p className="font-serif text-5xl font-normal leading-tight tracking-tight xl:text-6xl">
              Your next cup,<br />decided.
            </p>
            <p className="mt-4 text-base leading-relaxed text-[hsl(var(--muted-foreground))]">
              One recommendation based on where you are and what you drink. No lists, no scrolling.
            </p>
            <div className="mt-8 flex items-center gap-3 text-sm text-[hsl(var(--muted-foreground))]">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[hsl(var(--primary))]/10 text-xs">32</span>
              curated Austin coffee shops
            </div>
          </div>
        </div>

        {/* Main app column */}
        <div className="mx-auto flex min-h-dvh w-full max-w-[560px] flex-col px-5 sm:px-8 lg:border-x lg:border-[hsl(var(--border))] lg:bg-white lg:px-12">
          <Header onReset={handleReset} />
          <div className="mt-4 mb-6">
            <StepIndicator currentStep={step} />
          </div>
          <main className="flex flex-1 flex-col pb-6">
            <AnimatePresence mode="wait">
              {step === 'location' && <LocationPrompt key="location" onLocation={handleLocation} />}
              {step === 'order' && <OrderInput key="order" onSubmit={handleOrder} />}
              {step === 'mode' && <ModeSelect key="mode" onSelect={handleMode} />}
              {step === 'result' && <Result key="result" recommendation={result} userLocation={location} onReset={handleReset} />}
            </AnimatePresence>
          </main>
          <Footer />
        </div>

        {/* Right empty panel for symmetry */}
        <div className="hidden lg:block" />
      </div>
    </HelmetProvider>
  );
}
