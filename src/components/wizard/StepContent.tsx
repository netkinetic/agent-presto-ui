import React from 'react';

interface StepContentProps {
  step: number;
}

const StepContent: React.FC<StepContentProps> = ({ step }) => (
  <div>
    <h1>Step {step}</h1>
    <p>This is the content for step {step}.</p>
  </div>
);

export default StepContent;
