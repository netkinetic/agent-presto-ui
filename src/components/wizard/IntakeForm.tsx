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
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [isTransforming, setIsTransforming] = useState(false);

  useEffect(() => {
    if (formData.businessName.trim()) {
      setGreeting(`Hi ${formData.businessName.trim()}! Let's get started 🚀`);
    } else {
      setGreeting('Welcome to Agent Presto!');
    }
  }, [formData.businessName]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setPreviewUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Autofill the form with playful data
  const handleSurpriseMe = () => {
    const surpriseData = {
      businessName: 'Wonder Widgets Inc.',
      website: 'https://www.wonderwidgets.com',
      keywords: 'magic, innovation, fun',
    };
    setFormData(surpriseData);
  };

  // Transform image using our API route at /api/dynamic-image
  const handleTransformImage = async () => {
    if (!imageFile) return;
    setIsTransforming(true);
    try {
      const uploadData = new FormData();
      uploadData.append('file', imageFile);
      const res = await fetch('/api/dynamic-image', {
        method: 'POST',
        body: uploadData,
      });
      if (!res.ok) {
        throw new Error(await res.text());
      }
      const { imageUrl } = await res.json();
      setPreviewUrl(imageUrl);
    } catch (error: any) {
      console.error('Error transforming image:', error);
    } finally {
      setIsTransforming(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCampaignData({ ...campaignData, ...formData, aiImage: previewUrl });
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

      {/* Surprise Me Button */}
      <div className="flex justify-center">
        <button
          type="button"
          onClick={handleSurpriseMe}
          className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          Surprise Me!
        </button>
      </div>

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

        <div>
          <label htmlFor="image" className="block font-semibold">
            Upload Your Photo or Logo
          </label>
          <input
            id="image"
            name="file"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="mt-1 w-full"
          />
          {previewUrl && (
            <img
              src={previewUrl}
              alt="Preview"
              className="mt-2 rounded shadow w-32 h-32 object-cover"
            />
          )}
          {imageFile && (
            <button
              type="button"
              onClick={handleTransformImage}
              className="mt-2 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
            >
              {isTransforming ? 'Transforming...' : 'Transform Image'}
            </button>
          )}
        </div>
      </div>

      <div className="flex justify-end">
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
