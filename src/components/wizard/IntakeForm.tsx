'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useWizardState } from '@/store/wizardState';

interface IntakeFormProps {
  onNext: () => void;
}

export default function IntakeForm({ onNext }: IntakeFormProps) {
  const { campaignData, setCampaignData } = useWizardState();

  const [formData, setFormData] = useState({
    businessName: campaignData.businessName || '',
    website: campaignData.website || '',
    keywords: campaignData.keywords || '',
  });

  const [greeting, setGreeting] = useState('Welcome to Agent Presto!');

  useEffect(() => {
    if (formData.businessName.trim()) {
      setGreeting(`Hi ${formData.businessName.trim()}! Let's get started 🚀`);
    } else {
      setGreeting('Welcome to Agent Presto!');
    }
  }, [formData.businessName]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSurprise = () => {
    const surpriseData = {
      businessName: 'Captain Spark',
      website: 'https://captainspark.com',
      keywords: 'innovation, creativity, fun',
    };
    setFormData(surpriseData);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCampaignData({ ...campaignData, ...formData });
    onNext();
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-xl mx-auto p-6 bg-white shadow-xl rounded-2xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <h1 className="text-3xl font-bold text-center text-blue-600">{greeting}</h1>
      <p className="text-gray-600 text-center">
        Tell us about yourself so we can craft a custom playbook for your personal, career, business, or community goals!
      </p>

      <div className="space-y-4">
        <div>
          <label htmlFor="businessName" className="block font-semibold">
            Name / Brand / Organization
          </label>
          <input
            id="businessName"
            type="text"
            value={formData.businessName}
            onChange={handleChange}
            placeholder="e.g., John Doe, Acme Inc., or Superhero Squad"
            className="mt-1 w-full border border-gray-300 rounded p-2"
            required
          />
        </div>

        <div>
          <label htmlFor="website" className="block font-semibold">
            Website or Profile URL
          </label>
          <input
            id="website"
            type="url"
            value={formData.website}
            onChange={handleChange}
            placeholder="https://yourwebsite.com"
            className="mt-1 w-full border border-gray-300 rounded p-2"
          />
        </div>

        <div>
          <label htmlFor="keywords" className="block font-semibold">
            Keywords or Interests
          </label>
          <input
            id="keywords"
            type="text"
            value={formData.keywords}
            onChange={handleChange}
            placeholder="e.g., innovation, creativity, adventure"
            className="mt-1 w-full border border-gray-300 rounded p-2"
          />
        </div>
      </div>

      <div className="flex justify-between items-center">
        <button
          type="button"
          onClick={handleSurprise}
          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
        >
          Surprise Me!
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Let’s Go →
        </button>
      </div>
    </motion.form>
  );
}
