'use client';
import React, { useState } from 'react';
import { useWizardState } from '@/store/wizardState';

interface IntakeFormProps {
  onComplete: () => void;
}

export default function IntakeForm({ onComplete }: IntakeFormProps) {
  const { campaignData, setCampaignData } = useWizardState();
  const [formData, setFormData] = useState({
    campaignTitle: campaignData.campaignTitle || '',
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
    onComplete();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        id="campaignTitle"
        placeholder="Campaign Title"
        value={formData.campaignTitle}
        onChange={handleChange}
        className="input w-full"
      />
      <input
        type="text"
        id="businessName"
        placeholder="Your Name / Brand / Organization"
        value={formData.businessName}
        onChange={handleChange}
        className="input w-full"
      />
      <input
        type="text"
        id="website"
        placeholder="Website or Profile URL"
        value={formData.website}
        onChange={handleChange}
        className="input w-full"
      />
      <input
        type="text"
        id="keywords"
        placeholder="Keywords or Interests"
        value={formData.keywords}
        onChange={handleChange}
        className="input w-full"
      />
      <button type="submit" className="btn w-full bg-blue-600 text-white">
        Next →
      </button>
    </form>
  );
}