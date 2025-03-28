'use client';

import { useWizardState } from '@/store/wizardState';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function StepSeven() {
  const { campaignContent } = useWizardState();
  const [isPublishing, setIsPublishing] = useState(false);
  const router = useRouter();

  const handleAction = async (action: string) => {
    setIsPublishing(true);

    // Simulate action handling (replace with real calls)
    setTimeout(() => {
      router.push(`/wizard/complete?action=${action}`);
    }, 1200);
  };

  return (
    <div className="max-w-3xl mx-auto text-center">
      <h2 className="text-2xl font-semibold mb-4">Final Step: Choose Your Action</h2>
      <p className="text-gray-600 mb-8">
        Your campaign playbook is ready. What would you like to do next?
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          onClick={() => handleAction('publish-draft')}
          className="bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-5 rounded-lg transition"
        >
          Publish as Draft
        </button>
        <button
          onClick={() => handleAction('publish-live')}
          className="bg-green-600 hover:bg-green-700 text-white py-3 px-5 rounded-lg transition"
        >
          Publish Live
        </button>
        <button
          onClick={() => handleAction('send-email')}
          className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-5 rounded-lg transition"
        >
          Email Playbook
        </button>
        <button
          onClick={() => handleAction('download-pdf')}
          className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-5 rounded-lg transition"
        >
          Download PDF
        </button>
        <button
          onClick={() => handleAction('schedule')}
          className="bg-gray-700 hover:bg-gray-800 text-white py-3 px-5 rounded-lg transition col-span-full"
        >
          Schedule Reminders & Nudges
        </button>
      </div>

      {isPublishing && (
        <div className="mt-8 text-sm text-gray-500 animate-pulse">Processing your request...</div>
      )}
    </div>
  );
}
