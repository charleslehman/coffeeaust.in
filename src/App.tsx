import { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import type { Coordinates, TravelMode, AppStep, Recommendation } from '@/data/types';
import { getRecommendation } from '@/recommend';
import { Header } from '@/components/Header';
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
      <div className="mx-auto flex min-h-dvh max-w-[520px] flex-col px-5 sm:px-6">
        <Header />
        <main className="flex-1 py-10">
          <AnimatePresence mode="wait">
            {step === 'location' && <LocationPrompt key="location" onLocation={handleLocation} />}
            {step === 'order' && <OrderInput key="order" onSubmit={handleOrder} />}
            {step === 'mode' && <ModeSelect key="mode" onSelect={handleMode} />}
            {step === 'result' && <Result key="result" recommendation={result} userLocation={location} onReset={handleReset} />}
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </HelmetProvider>
  );
}
