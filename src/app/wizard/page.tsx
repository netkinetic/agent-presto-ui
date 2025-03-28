// src/app/wizard/page.tsx
'use client';

import { useState, useEffect } from 'react';
import StepOne from '@/components/wizard/StepOne';
import StepTwo from '@/components/wizard/StepTwo';
import StepThree from '@/components/wizard/StepThree';
import StepFour from '@/components/wizard/StepFour';
import StepFive from '@/components/wizard/StepFive';
import StepSix from '@/components/wizard/StepSix';
import StepSeven from '@/components/wizard/StepSeven';
import StepEight from '@/components/wizard/StepEight';

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
        {step > 1 && step < 8 && (
          <button
            onClick={back}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
          >
            ← Back
          </button>
        )}
      </div>

      <div className="transition-all duration-300 ease-in-out">
        {step === 1 && <StepOne onNext={next} />}
        {step === 2 && <StepTwo onNext={next} onBack={back} />}
        {step === 3 && <StepThree onNext={next} onBack={back} />}
        {step === 4 && <StepFour onConfirm={next} onBack={back} />}
        {step === 5 && <StepFive onNext={next} onBack={back} />}
        {step === 6 && <StepSix onNext={next} onBack={back} />}
        {step === 7 && <StepSeven onNext={next} onBack={back} />}
        {step === 8 && (
  <StepEight
    mode="draft"
    deliverables={[
      { label: 'Landing Page', url: '#' },
      { label: 'Email Campaign', url: '#' },
    ]}
    onDownloadPDF={() => console.log('Download PDF')}
    onSendEmail={() => console.log('Send Email')}
    onUpgrade={() => console.log('Upgrade')}
  />
)}

      </div>
    </div>
  );
}