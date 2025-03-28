'use client';

import { useEffect, useState } from 'react';
import { fetchBusinessTypes } from '@/lib/api';
import { useWizardState } from '@/store/wizardState';

export default function StepTwo({ onNext }: { onNext: () => void }) {
  const { industry, setBusinessType } = useWizardState();
  const [businessTypes, setBusinessTypes] = useState<string[]>([]);

  useEffect(() => {
    if (industry) {
      fetchBusinessTypes(industry).then(setBusinessTypes);
    }
  }, [industry]);

  const handleSelect = (type: string) => {
    setBusinessType(type);
    onNext(); // proceed to next step automatically
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">What type of business is it?</h2>
      <div className="space-y-2">
        {businessTypes.map((type) => (
          <button
            key={type}
            className="w-full text-left p-3 border rounded bg-white hover:bg-blue-100 hover:border-blue-500 transition"
            onClick={() => handleSelect(type)}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
}
