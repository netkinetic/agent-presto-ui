'use client';

import { useEffect, useState } from 'react';
import { fetchGoals } from '@/lib/api';
import { useWizardState } from '@/store/wizardState';

export default function StepThree({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const { industry, businessType, setGoal } = useWizardState();
  const [goals, setGoals] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (industry && businessType) {
      fetchGoals(industry, businessType)
        .then(setGoals)
        .catch((err) => console.error('Failed to fetch goals:', err))
        .finally(() => setLoading(false));
    }
  }, [industry, businessType]);

  const handleSelect = (goal: string) => {
    setGoal(goal);
    onNext();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">What do you want to accomplish?</h2>
      {loading ? (
        <p>Loading goals...</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {goals.map((goal) => (
            <li
              key={goal}
              onClick={() => handleSelect(goal)}
              className="p-4 border rounded cursor-pointer hover:bg-blue-50 transition"
            >
              {goal}
            </li>
          ))}
        </ul>
      )}
      <div className="mt-6">
        <button onClick={onBack} className="px-4 py-2 bg-gray-200 rounded">← Back</button>
      </div>
    </div>
  );
}
