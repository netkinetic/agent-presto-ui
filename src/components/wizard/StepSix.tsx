'use client';

import { useEffect, useState } from 'react';
import { useWizardState } from '@/store/wizardState';
import { generateCampaignContent } from '@/lib/api';

export default function StepSix({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const { playbook, campaignData, setGeneratedContent } = useWizardState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('Generating campaign content...');

  useEffect(() => {
    const runGeneration = async () => {
      try {
        const response = await generateCampaignContent({
          campaign_title: campaignData.campaignTitle,
          business_name: campaignData.businessName,
          website: campaignData.website,
          keywords: campaignData.keywords,
          goal: campaignData.goal,
          content_length: campaignData.contentLength,
          additional_instructions: campaignData.additionalInstructions,
          business: campaignData.businessType,
          playbook_duration: campaignData.playbookDuration,
        });

        if (response?.ai_data) {
          setGeneratedContent(response.ai_data);
          setStatus('✅ Campaign content generated successfully!');
          setTimeout(onNext, 1000);
        } else {
          throw new Error('No content returned from AI.');
        }
      } catch (err: any) {
        console.error('❌ AI Generation Error:', err);
        setError(err.message || 'An error occurred while generating content.');
      } finally {
        setLoading(false);
      }
    };

    runGeneration();
  }, []);

  return (
    <div className="text-center py-10">
      <h2 className="text-2xl font-bold mb-4">Step 6: Generating Content</h2>

      {loading && (
        <>
          <p className="text-gray-600 mb-6">{status}</p>
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 mx-auto" />
        </>
      )}

      {!loading && error && (
        <div className="space-y-4">
          <p className="text-red-600 font-semibold">{error}</p>
          <div className="mt-6 flex justify-center gap-4">
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {!loading && !error && (
        <p className="text-green-600 font-semibold">{status}</p>
      )}
    </div>
  );
}
