'use client';

import { useState, useEffect } from 'react';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import StepFour from './StepFour';
import StepFive from './StepFive';
import StepSix from './StepSix';
import StepSeven from './StepSeven';
import StepEight from './StepEight';

export default function Wizard() {
  const [step, setStep] = useState(1);

  useEffect(() => {
    setStep(1);
  }, []);

  const next = () => setStep((prev) => Math.min(prev + 1, 8));
  const back = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6 flex justify-between items-center">
        <div className="text-lg font-medium text-gray-700">Step {step} of 8</div>
        <div className="space-x-2">
          {step > 1 && step < 8 && (
            <button
              onClick={back}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
            >
              Back
            </button>
          )}
          {step < 7 && (
            <button
              onClick={next}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Next
            </button>
          )}
        </div>
      </div>

      <div className="transition-all duration-500 ease-in-out">
        {step === 1 && <StepOne onNext={next} />}
        {step === 2 && <StepTwo onNext={next} />}
        {step === 3 && <StepThree onNext={next} />}
        {step === 4 && <StepFour onNext={next} />}
        {step === 5 && <StepFive onNext={next} />}
        {step === 6 && <StepSix onNext={next} />}
        {step === 7 && <StepSeven onNext={next} />}
        {step === 8 && (
          <StepEight
            mode="live"
            deliverables={[
              { label: 'Landing Page', url: '/preview/landing' },
              { label: 'Blog Post', url: '/preview/blog' },
              { label: 'Product Page', url: '/preview/product' },
            ]}
            onDownloadPDF={() => console.log('📄 Download PDF')}
            onSendEmail={() => console.log('✉️ Email sent')}
            onUpgrade={() => console.log('🚀 Upgrade to interactive')}
          />
        )}
      </div>
    </div>
  );
}
