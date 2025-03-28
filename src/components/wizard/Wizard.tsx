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

  // Start on Step 1
  useEffect(() => {
    setStep(1);
  }, []);

  const next = () => setStep((prev) => Math.min(prev + 1, 8));
  const back = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Step Counter */}
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

      {/* Step Renderer */}
      <div className="transition-all duration-300 ease-in-out">
        {step === 1 && <StepOne onNext={next} />}
        {step === 2 && <StepTwo onNext={next} onBack={back} />}
        {step === 3 && <StepThree onNext={next} onBack={back} />}
        {step === 4 && <StepFour onNext={next} onBack={back} />}
        {step === 5 && <StepFive onNext={next} onBack={back} />}
        {step === 6 && <StepSix onNext={next} onBack={back} />}
        {step === 7 && <StepSeven onNext={next} onBack={back} />}
        {step === 8 && <StepEight />}
      </div>
    </div>
  );
}
