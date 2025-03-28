// StepOne.tsx
'use client';

import { useEffect, useState } from 'react';
import { fetchIndustries } from '@/lib/api';
import { useWizardState } from '@/store/wizardState';

export default function StepOne({ onNext }: { onNext: () => void }) {
  const [industries, setIndustries] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const { setIndustry, industry } = useWizardState();

  useEffect(() => {
    setLoading(true);
    fetchIndustries()
      .then(setIndustries)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">What industry are you in?</h2>
      {loading ? (
        <p>Loading industries...</p>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {industries.map((ind) => (
            <button
              key={ind}
              onClick={() => {
                setIndustry(ind);
                onNext();
              }}
              className={`p-3 rounded border hover:bg-blue-100 transition ${industry === ind ? 'bg-blue-200 border-blue-500' : 'bg-white'}`}
            >
              {ind}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
