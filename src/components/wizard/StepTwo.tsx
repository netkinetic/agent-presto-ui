'use client';

import { useEffect, useState } from 'react';
import { fetchBusinessTypes } from '@/lib/api';
import { useWizardState } from '@/store/wizardState';

export default function StepTwo({ onNext }: { onNext: () => void }) {
  const { industry, setBusinessType } = useWizardState();
  const [businessTypes, setBusinessTypes] = useState<string[]>([]);
  const [selected, setSelected] = useState('');

  useEffect(() => {
    if (industry) {
      fetchBusinessTypes(industry).then(setBusinessTypes);
    }
  }, [industry]);

  const handleNext = () => {
    if (selected) {
      setBusinessType(selected);
      onNext();
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">What type of business is it?</h2>
      <div className="space-y-2">
        {businessTypes.map((type) => (
          <button
            key={type}
            className={`w-full text-left p-3 border rounded ${selected === type ? 'bg-blue-100 border-blue-500' : 'bg-white'}`}
            onClick={() => setSelected(type)}
          >
            {type}
          </button>
        ))}
      </div>
      <div className="mt-6">
        <button
          onClick={handleNext}
          disabled={!selected}
          className="px-6 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
