'use client';

import { useState, useEffect } from 'react';
import IntakeForm from '@/components/wizard/IntakeForm'; // New intake form component
import StepOne from '@/components/wizard/StepOne';
import StepTwo from '@/components/wizard/StepTwo';
import StepThree from '@/components/wizard/StepThree';
import StepFour from '@/components/wizard/StepFour';
import StepFive from '@/components/wizard/StepFive';
import StepSix from '@/components/wizard/StepSix';
import StepSeven from '@/components/wizard/StepSeven';
import StepEight from '@/components/wizard/StepEight';

export default function Wizard() {
  // Start at 0 for the intake screen; subsequent steps shift by +1.
  const [step, setStep] = useState(0);

  useEffect(() => {
    setStep(0);
  }, []);

  // Total steps now becomes 9 (0 for intake + steps 1-8)
  const totalSteps = 9;

  const next = () => setStep((prev) => Math.min(prev + 1, totalSteps - 1));
  const back = () => setStep((prev) => Math.max(prev - 1, 0));

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6 flex justify-between items-center">
        <div className="text-lg font-medium text-gray-700">
          Step {step === 0 ? 1 : step + 1} of {totalSteps}
        </div>
        {step > 0 && step < totalSteps - 1 && (
          <button
            onClick={back}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
          >
            ← Back
          </button>
        )}
      </div>

      <div className="transition-all duration-300 ease-in-out">
        {step === 0 && <IntakeForm onNext={next} />}
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
