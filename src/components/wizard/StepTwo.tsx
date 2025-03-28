'use client';

import { useEffect, useState } from 'react';
import { fetchBusinessTypes } from '@/lib/api';
import { useWizardState } from '@/store/wizardState';

export default function StepTwo({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const { industry, setBusinessType } = useWizardState();
  const [businessTypes, setBusinessTypes] = useState<string[]>([]);

  useEffect(() => {
    if (industry) {
      fetchBusinessTypes(industry).then(setBusinessTypes);
    }
  }, [industry]);

  const handleSelect = (type: string) => {
    setBusinessType(type);
    onNext();
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">What type of business is it?</h2>
      <div className="space-y-2">
        {businessTypes.map((type) => (
          <button
            key={type}
            onClick={() => handleSelect(type)}
            className="w-full text-left p-3 border rounded bg-white hover:bg-blue-50 transition"
          >
            {type}
          </button>
        ))}
      </div>
      <div className="mt-6">
        <button onClick={onBack} className="px-4 py-2 bg-gray-200 rounded">← Back</button>
      </div>
    </div>
  );
}
