import { useState, useCallback } from 'react';
import type { Coordinates, TravelMode } from './types/coffee-shop';
import type { Recommendation } from './recommend';
import { getRecommendation } from './recommend';
import Header from './components/Header';
import LocationPrompt from './components/LocationPrompt';
import OrderInput from './components/OrderInput';
import ModeSelect from './components/ModeSelect';
import Result from './components/Result';
import Footer from './components/Footer';

type Step = 'location' | 'order' | 'mode' | 'result';

export default function App() {
  const [step, setStep] = useState<Step>('location');
  const [location, setLocation] = useState<Coordinates | null>(null);
  const [order, setOrder] = useState('');
  const [result, setResult] = useState<Recommendation | null>(null);
  const [fade, setFade] = useState(true);

  const transition = useCallback((next: Step) => {
    setFade(false);
    setTimeout(() => {
      setStep(next);
      setFade(true);
    }, 300);
  }, []);

  const handleLocation = useCallback((coords: Coordinates) => {
    setLocation(coords);
    transition('order');
  }, [transition]);

  const handleOrder = useCallback((value: string) => {
    setOrder(value);
    transition('mode');
  }, [transition]);

  const handleMode = useCallback((mode: TravelMode) => {
    if (!location) return;
    const rec = getRecommendation(location, order, mode);
    setResult(rec);
    transition('result');
  }, [location, order, transition]);

  const handleReset = useCallback(() => {
    setResult(null);
    setOrder('');
    transition('location');
  }, [transition]);

  return (
    <div className="app">
      <Header />
      <main className={`main ${fade ? 'fade-in' : 'fade-out'}`}>
        {step === 'location' && <LocationPrompt onLocation={handleLocation} />}
        {step === 'order' && <OrderInput onSubmit={handleOrder} />}
        {step === 'mode' && <ModeSelect onSelect={handleMode} />}
        {step === 'result' && <Result recommendation={result} onReset={handleReset} />}
      </main>
      <Footer />
    </div>
  );
}
