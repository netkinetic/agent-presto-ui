'use client';

import { useEffect, useState } from 'react';
import { fetchGoals } from '@/lib/api';
import { useWizardState } from '@/store/wizardState';

export default function StepThree({ onNext }: { onNext: () => void }) {
  const { industry, businessType, setGoal } = useWizardState();
  const [goals, setGoals] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (industry && businessType) {
      fetchGoals(businessType)
        .then((data) => setGoals(data))
        .catch((err) => console.error('Failed to fetch goals:', err))
        .finally(() => setLoading(false));
    }
  }, [industry, businessType]);

  const handleSelect = (selectedGoal: string) => {
    setGoal(selectedGoal);
    onNext(); // auto-advance
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">What do you want to accomplish?</h2>
      {loading ? (
        <p className="text-gray-500">Loading goals...</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {goals.map((goal) => (
            <li
              key={goal}
              onClick={() => handleSelect(goal)}
              className="p-4 border rounded cursor-pointer hover:bg-blue-100 hover:border-blue-500 transition"
            >
              {goal}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
