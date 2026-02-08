import type { Recommendation } from '../recommend';

interface Props {
  recommendation: Recommendation | null;
  onReset: () => void;
}

export default function Result({ recommendation, onReset }: Props) {
  if (!recommendation) {
    return (
      <section className="step">
        <h2 className="step-title">No shops found nearby</h2>
        <p className="step-desc">
          Try switching to driving, or check back from a different location.
        </p>
        <button className="btn btn-primary" onClick={onReset}>
          Start over
        </button>
      </section>
    );
  }

  const { shop, reasoning, navigationUrl } = recommendation;

  return (
    <section className="step result-section">
      <p className="result-label">Go here</p>
      <h2 className="result-name">{shop.name}</h2>
      <p className="result-neighborhood">{shop.neighborhood}</p>
      <p className="result-reasoning">{reasoning}</p>
      <div className="result-meta">
        <span className="result-rating">{shop.rating} ★</span>
        <span className="result-reviews">{shop.reviewCount} reviews</span>
      </div>
      <a
        href={navigationUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-navigate"
      >
        Navigate →
      </a>
      <button className="btn btn-secondary" onClick={onReset}>
        Try again
      </button>
    </section>
  );
}
