'use client';

import { useState } from 'react';
import StepOne from '@/components/wizard/StepOne';
import StepTwo from '@/components/wizard/StepTwo';
import StepThree from '@/components/wizard/StepThree';
import StepFour from '@/components/wizard/StepFour';
import StepFive from '@/components/wizard/StepFive';
import StepSix from '@/components/wizard/StepSix';
import StepSeven from '@/components/wizard/StepSeven';

export default function WizardPage() {
  const [step, setStep] = useState(1);

  const next = () => setStep((prev) => Math.min(prev + 1, 7));
  const back = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="min-h-screen bg-white p-6 max-w-4xl mx-auto">
      <div className="mb-6 flex justify-between items-center">
        <div className="text-lg font-medium text-gray-700">Step {step} of 7</div>
        <div className="space-x-2">
          {step > 1 && (
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

      <div className="transition-all duration-300 ease-in-out">
        {step === 1 && <StepOne onNext={next} />}
        {step === 2 && <StepTwo onNext={next} />}
        {step === 3 && <StepThree onNext={next} />}
        {step === 4 && <StepFour onConfirm={next} />}

        {step === 5 && <StepFive onNext={next} />}
        {step === 6 && <StepSix onNext={next} />}
        {step === 7 && <StepSeven />}
      </div>
    </div>
  );
}

