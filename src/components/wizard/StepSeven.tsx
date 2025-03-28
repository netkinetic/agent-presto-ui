'use client';

import { useWizardState } from '@/store/wizardState';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Modal from '@/components/ui/Modal'; // Make sure this file exists

export default function StepSeven({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  const { campaignContent } = useWizardState();
  const [isPublishing, setIsPublishing] = useState(false);
  const [previewItem, setPreviewItem] = useState<any | null>(null);
  const router = useRouter();

  const handleAction = async (action: string) => {
    setIsPublishing(true);
    setTimeout(() => {
      router.push(`/wizard/complete?action=${action}`);
    }, 1200);
  };

  return (
    <div className="max-w-3xl mx-auto text-center">
      <h2 className="text-2xl font-semibold mb-4">Final Step: Choose Your Action</h2>
      <p className="text-gray-600 mb-6">Your campaign playbook is ready. Preview your content below.</p>

      <div className="space-y-4 mb-10">
        {campaignContent?.deliverables?.map((item: any, idx: number) => (
          <div
            key={idx}
            className="border rounded-lg p-4 shadow text-left flex justify-between items-center bg-white"
          >
            <div>
              <h3 className="font-semibold text-lg text-gray-800">{item.label}</h3>
              <p className="text-sm text-gray-500">Preview your {item.label} content</p>
            </div>
            <button
              onClick={() => setPreviewItem(item)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Preview
            </button>
          </div>
        ))}
      </div>

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

      {/* Optional Back Button */}
      <div className="mt-10">
        <button
          onClick={onBack}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          ← Back
        </button>
      </div>

      {/* Preview Modal */}
      {previewItem && (
        <Modal onClose={() => setPreviewItem(null)}>
          <div className="p-6">
            <h3 className="text-xl font-bold mb-4">Preview: {previewItem.label}</h3>
            <div className="prose max-w-none bg-white p-4 rounded shadow-inner overflow-auto">
              <div dangerouslySetInnerHTML={{ __html: previewItem.content }} />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
