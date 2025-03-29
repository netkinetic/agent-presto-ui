'use client';
import React, { useState } from 'react';
import { useWizardState } from '@/store/wizardState';

interface IntakeFormProps {
  onNext: () => void;
}

export default function IntakeForm({ onNext }: IntakeFormProps) {
  const { campaignData, setCampaignData } = useWizardState();
  const [formData, setFormData] = useState({
    // Use generic labels for personal, career, business, etc.
    campaignTitle: campaignData.campaignTitle || 'Untitled Campaign',
    businessName: campaignData.businessName || '',
    website: campaignData.website || '',
    keywords: campaignData.keywords || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCampaignData(formData);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">Tell Us About Yourself</h2>
      <label className="block">
        <span className="font-semibold">Name / Brand / Organization</span>
        <input
          id="businessName"
          type="text"
          value={formData.businessName}
          onChange={handleChange}
          placeholder="e.g., John Doe, Acme Inc."
          className="mt-1 w-full border border-gray-300 rounded p-2"
          required
        />
      </label>
      <label className="block">
        <span className="font-semibold">Website or Profile URL</span>
        <input
          id="website"
          type="url"
          value={formData.website}
          onChange={handleChange}
          placeholder="https://example.com"
          className="mt-1 w-full border border-gray-300 rounded p-2"
        />
      </label>
      <label className="block">
        <span className="font-semibold">Keywords or Interests</span>
        <input
          id="keywords"
          type="text"
          value={formData.keywords}
          onChange={handleChange}
          placeholder="e.g., innovation, leadership, design"
          className="mt-1 w-full border border-gray-300 rounded p-2"
        />
      </label>
      <button type="submit" className="btn w-full bg-blue-600 text-white rounded hover:bg-blue-700">
        Next →
      </button>
    </form>
  );
}
