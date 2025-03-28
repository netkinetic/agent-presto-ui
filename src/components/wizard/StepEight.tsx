'use client';
import React from 'react';

interface DeliverableLink {
  label: string;
  url: string;
}

interface StepEightProps {
  mode: 'live' | 'draft' | 'scheduled';
  scheduledDate?: string;
  deliverables: DeliverableLink[];
  onDownloadPDF?: () => void;
  onSendEmail?: () => void;
  onUpgrade?: () => void;
}

const StepEight: React.FC<StepEightProps> = ({
  mode,
  scheduledDate,
  deliverables,
  onDownloadPDF,
  onSendEmail,
  onUpgrade,
}) => {
  let publishMessage = '';
  if (mode === 'live') {
    publishMessage = 'published live!';
  } else if (mode === 'draft') {
    publishMessage = 'saved as a draft.';
  } else if (mode === 'scheduled' && scheduledDate) {
    publishMessage = `scheduled for ${scheduledDate}.`;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 text-center">
      <div className="text-4xl mb-4">🎉</div>
      <h2 className="text-2xl font-bold mb-4">Congratulations!</h2>
      <p className="text-gray-800 mb-6">
        Your campaign has been {publishMessage}
      </p>

      <div className="mb-8 text-left">
        <h3 className="text-xl font-semibold mb-3 text-gray-800">Your Assets</h3>
        {deliverables.length === 0 ? (
          <p className="text-gray-500">No deliverables available.</p>
        ) : (
          <ul className="list-disc list-inside text-gray-700">
            {deliverables.map((item, idx) => (
              <li key={idx}>
                <a href={item.url} className="text-blue-600 hover:underline" target="_blank" rel="noreferrer">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-3 text-gray-800">Next Steps</h3>
        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={onDownloadPDF ?? (() => alert('PDF download coming soon!'))}
            className="bg-white text-gray-800 border border-gray-300 px-4 py-2 rounded hover:bg-gray-50"
          >
            📄 Download PDF
          </button>
          <button
            onClick={onSendEmail ?? (() => alert('Email feature not enabled yet.'))}
            className="bg-white text-gray-800 border border-gray-300 px-4 py-2 rounded hover:bg-gray-50"
          >
            ✉️ Send to Email
          </button>
          <button
            onClick={onUpgrade ?? (() => alert('Upgrade feature launching soon.'))}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            🚀 Upgrade to Interactive Playbook
          </button>
        </div>
      </div>

      <p className="text-gray-600">
        Ready to take your next campaign to the next level? Save or share your results to keep growing.
      </p>
    </div>
  );
};

export default StepEight;
