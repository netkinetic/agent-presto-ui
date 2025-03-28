'use client';

import { useEffect, useState } from 'react';
import { fetchGoals } from '@/lib/api';
import { useWizardState } from '@/store/wizardState';

export default function StepThree({ onNext }: { onNext: () => void }) {
  const { industry, businessType, goal, setGoal } = useWizardState();
  const [goals, setGoals] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (industry && businessType) {
      fetchGoals(industry, businessType)
        .then((data) => setGoals(data))
        .catch((err) => console.error('Failed to fetch goals:', err))
        .finally(() => setLoading(false));
    }
  }, [industry, businessType]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">What do you want to accomplish?</h2>
      {loading ? (
        <p>Loading goals...</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {goals.map((item) => (
            <li
              key={item}
              onClick={() => {
                setGoal(item);
                onNext();
              }}
              className={`p-4 border rounded cursor-pointer transition ${
                goal === item ? 'bg-blue-100 border-blue-500' : 'hover:bg-gray-100'
              }`}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
