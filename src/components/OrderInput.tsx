import { useState } from 'react';

interface Props {
  onSubmit: (order: string) => void;
}

export default function OrderInput({ onSubmit }: Props) {
  const [value, setValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onSubmit(value.trim());
    }
  };

  return (
    <section className="step">
      <h2 className="step-title">What do you usually order?</h2>
      <p className="step-desc">
        Helps us match you with the right spot.
      </p>
      <form onSubmit={handleSubmit} className="order-form">
        <input
          type="text"
          className="text-input"
          placeholder="e.g. cortado, cold brew, oat latte..."
          value={value}
          onChange={e => setValue(e.target.value)}
          autoFocus
        />
        <button
          type="submit"
          className="btn btn-primary"
          disabled={!value.trim()}
        >
          Next
        </button>
      </form>
    </section>
  );
}
