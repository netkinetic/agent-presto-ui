'use client';

import { useEffect, useState } from 'react';
import { useWizardState } from '@/store/wizardState';
import { Playbook } from '@/types';

export default function StepFour({ onConfirm }: { onConfirm: () => void }) {
  const { goal, businessType, setSelectedPlaybook } = useWizardState();
  const [playbooks, setPlaybooks] = useState<Playbook[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPlaybooks() {
      try {
        setLoading(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/dynamic-playbooks`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ goal, business: businessType }),
        });

        const json = await res.json();
        if (!json.success) throw new Error('Failed to fetch playbooks.');
        setPlaybooks(json.data);
      } catch (err: any) {
        setError(err.message || 'Something went wrong.');
      } finally {
        setLoading(false);
      }
    }

    fetchPlaybooks();
  }, [goal, businessType]);

  if (loading) return <p className="text-center">Loading playbooks...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Choose a Playbook</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {playbooks.map((pb, index) => (
          <div key={index} className="border rounded-xl p-4 shadow hover:shadow-lg transition">
            <img
              src={pb.thumbnail_url || '/placeholder.png'}
              alt={pb.name}
              className="w-full h-40 object-cover rounded-lg mb-3"
            />
            <h3 className="text-xl font-bold mb-2">{pb.name}</h3>
            <p className="text-gray-600 mb-3">{pb.short_desc}</p>
            <ul className="text-sm mb-3">
              {pb.deliverables.map((item, idx) => (
                <li key={idx} className="text-gray-500">✔ {item.label}</li>
              ))}
            </ul>
            <button
              className="mt-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              onClick={() => {
                setSelectedPlaybook(pb);
                onConfirm();
              }}
            >
              Select This Playbook
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

