'use client';
import React, { useState } from 'react';
import { useWizardState } from '@/store/wizardState';

interface Props {
  onComplete: () => void;
}

export default function IntakeForm({ onComplete }: Props) {
  const { campaignData, setCampaignData } = useWizardState();
  const [form, setForm] = useState(campaignData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCampaignData(form);
    onComplete();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="campaignTitle"
        placeholder="What should we call this campaign?"
        className="input w-full"
        value={form.campaignTitle}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="name"
        placeholder="Your Name / Brand / Business"
        className="input w-full"
        value={form.businessName}
        onChange={(e) => setForm({ ...form, businessName: e.target.value })}
        required
      />
      <input
        type="text"
        name="website"
        placeholder="Website or Profile URL"
        className="input w-full"
        value={form.website}
        onChange={handleChange}
      />
      <input
        type="text"
        name="keywords"
        placeholder="Keywords (comma separated)"
        className="input w-full"
        value={form.keywords}
        onChange={handleChange}
      />
      <button type="submit" className="btn w-full bg-blue-600 text-white hover:bg-blue-700">
        Start Wizard
      </button>
    </form>
  );
}
