'use client';

import { useEffect, useState } from 'react';
import { useWizardState } from '@/store/wizardState';
import { Playbook } from '@/types';

export default function StepFour({ onConfirm }: { onConfirm: () => void }) {
  const { goal, businessType, setSelectedPlaybook } = useWizardState();
  const [playbooks, setPlaybooks] = useState<Playbook[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlaybooks = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/dynamic-playbooks`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ goal, business: businessType }),
        });

        const json = await res.json();
        if (!json.data) throw new Error('No playbooks found.');
        setPlaybooks(json.data);
      } catch (err: any) {
        console.error('❌ Playbook fetch error:', err);
        setError(err.message || 'Failed to fetch playbooks.');
      } finally {
        setLoading(false);
      }
    };

    fetchPlaybooks();
  }, [goal, businessType]);

  if (loading) return <p className="text-center text-gray-500">Loading playbooks...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Choose a Playbook</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {playbooks.map((pb, index) => (
          <div
            key={index}
            className="border rounded-xl p-4 shadow-sm hover:shadow-lg transition bg-white flex flex-col"
          >
            <img
              src={pb.thumbnail_url || '/placeholder.png'}
              alt={pb.name}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <h3 className="text-lg font-semibold mb-2">{pb.name}</h3>
            <p className="text-gray-600 mb-3">{pb.short_desc}</p>
            <ul className="text-sm text-gray-500 mb-4">
              {pb.deliverables.map((item, idx) => (
                <li key={idx}>✔ {item.label}</li>
              ))}
            </ul>
            <button
              onClick={() => {
                setSelectedPlaybook(pb);
                onConfirm(); // Auto-advance
              }}
              className="mt-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Select This Playbook
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
