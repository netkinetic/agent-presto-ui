'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function StepEight() {
  const searchParams = useSearchParams();
  const action = searchParams.get('action') || 'none';

  return (
    <div className="max-w-xl mx-auto text-center mt-10">
      <h1 className="text-3xl font-bold text-green-700 mb-4">🎉 Playbook Complete!</h1>
      <p className="text-lg text-gray-600 mb-6">
        You selected: <strong>{action.replace('-', ' ')}</strong>
      </p>

      <div className="space-y-3">
        <Link
          href="/dashboard"
          className="block bg-blue-600 hover:bg-blue-700 text-white py-3 px-5 rounded-lg"
        >
          View in Dashboard
        </Link>
        <Link
          href="/wizard"
          className="block bg-gray-500 hover:bg-gray-600 text-white py-3 px-5 rounded-lg"
        >
          Start New Playbook
        </Link>
      </div>
    </div>
  );
}
