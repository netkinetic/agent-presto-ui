'use client';

import { useWizardState } from '@/store/wizardState';
import { useEffect, useState } from 'react';

export default function StepFive({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const { playbook, setCampaignData, campaignData } = useWizardState();

  const [formData, setFormData] = useState({
    campaignTitle: playbook?.name || campaignData.campaignTitle || 'Untitled Campaign',
    businessName: campaignData.businessName || '',
    website: campaignData.website || '',
    keywords: campaignData.keywords || '',
    goal: campaignData.goal || '',
    contentLength: campaignData.contentLength || 'short',
    additionalInstructions: campaignData.additionalInstructions || '',
    playbookDuration: campaignData.playbookDuration || '30 days',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleNext = () => {
    setCampaignData({ ...formData });
    onNext();
  };

  useEffect(() => {
    if (playbook?.name) {
      setFormData((prev) => ({ ...prev, campaignTitle: playbook.name }));
    }
  }, [playbook]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Step 5: Review & Customize</h2>
      <p className="text-gray-600">Edit and confirm your campaign details before generating content.</p>

      {playbook?.thumbnail_url && (
        <img
          src={playbook.thumbnail_url}
          alt="Playbook Preview"
          className="w-full max-w-md rounded shadow"
        />
      )}

      <div className="space-y-4">
        <InputField id="campaignTitle" label="Campaign Title" value={formData.campaignTitle} onChange={handleChange} />
        <InputField id="businessName" label="Business Name" value={formData.businessName} onChange={handleChange} />
        <InputField id="website" label="Website" value={formData.website} onChange={handleChange} />
        <InputField id="keywords" label="Keywords" value={formData.keywords} onChange={handleChange} />
        
        <label className="block">
          <span className="font-semibold">Goal</span>
          <input
            type="text"
            id="goal"
            value={formData.goal}
            readOnly
            className="mt-1 w-full border border-gray-300 rounded p-2 bg-gray-100"
          />
        </label>

        <label className="block">
          <span className="font-semibold">Content Length</span>
          <select
            id="contentLength"
            value={formData.contentLength}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 rounded p-2"
          >
            <option value="short">Short</option>
            <option value="medium">Medium</option>
            <option value="long">Long</option>
          </select>
        </label>

        <InputField
          id="additionalInstructions"
          label="Additional Instructions"
          value={formData.additionalInstructions}
          onChange={handleChange}
        />

        <label className="block">
          <span className="font-semibold">Playbook Duration</span>
          <select
            id="playbookDuration"
            value={formData.playbookDuration}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 rounded p-2"
          >
            {['1 day', '7 days', '30 days', '3 months', '6 months', '1 year'].map((dur) => (
              <option key={dur} value={dur}>
                {dur}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="flex gap-2 pt-4">
        <button onClick={handleNext} className="px-4 py-2 bg-blue-600 text-white rounded">
          Generate →
        </button>
      </div>
    </div>
  );
}

function InputField({
  id,
  label,
  value,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <label className="block">
      <span className="font-semibold">{label}</span>
      <input
        type="text"
        id={id}
        value={value}
        onChange={onChange}
        className="mt-1 w-full border border-gray-300 rounded p-2"
      />
    </label>
  );
}
