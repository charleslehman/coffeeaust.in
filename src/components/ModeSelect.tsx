import type { TravelMode } from '../types/coffee-shop';

interface Props {
  onSelect: (mode: TravelMode) => void;
}

export default function ModeSelect({ onSelect }: Props) {
  return (
    <section className="step">
      <h2 className="step-title">Walking or driving?</h2>
      <p className="step-desc">
        Walking searches within 20 min. Driving within 15.
      </p>
      <div className="mode-buttons">
        <button className="btn btn-mode" onClick={() => onSelect('walk')}>
          <span className="mode-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="5" r="2"/>
              <path d="M10 22l2-7 3 3v6"/>
              <path d="M14 13l-3-3-2 4"/>
              <path d="M9 17l-3 4"/>
            </svg>
          </span>
          Walk
        </button>
        <button className="btn btn-mode" onClick={() => onSelect('drive')}>
          <span className="mode-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 17h14v-5l-2-6H7L5 12z"/>
              <circle cx="7.5" cy="17.5" r="1.5"/>
              <circle cx="16.5" cy="17.5" r="1.5"/>
              <path d="M5 12h14"/>
            </svg>
          </span>
          Drive
        </button>
      </div>
    </section>
  );
}
