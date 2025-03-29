// src/components/wizard/StepContent.tsx
import React from 'react';

interface StepContentProps {
  step: number;
}

const StepContent: React.FC<StepContentProps> = ({ step }) => (
  <div className="p-4">
    <h1 className="text-xl font-semibold">Step {step}</h1>
    <p className="mt-2">This is the content for step {step}.</p>
  </div>
);

export default StepContent;
