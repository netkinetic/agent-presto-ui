'use client';

import { useEffect, useState } from 'react';
import { fetchIndustries } from '@/lib/api';
import { useWizardState } from '@/store/wizardState';

export default function StepOne({ onNext }: { onNext: () => void }) {
  const { industry, setIndustry } = useWizardState();
  const [industries, setIndustries] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchIndustries()
      .then(setIndustries)
      .catch((err) => console.error('Failed to fetch industries:', err))
      .finally(() => setLoading(false));
  }, []);

  const handleSelect = (ind: string) => {
    setIndustry(ind);
    onNext();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">What industry are you in?</h2>
      {loading ? (
        <p>Loading industries...</p>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {industries.map((ind) => (
            <button
              key={ind}
              onClick={() => handleSelect(ind)}
              className="p-3 rounded border bg-white hover:bg-blue-100 transition"
            >
              {ind}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
