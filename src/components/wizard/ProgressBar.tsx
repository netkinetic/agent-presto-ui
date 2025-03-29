// src/components/wizard/ProgressBar.tsx
import React from 'react';
import { useWizardState } from '../../store/wizardState';

interface ProgressBarProps {
  totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ totalSteps }) => {
  const { currentStep } = useWizardState();

  const progressPercentage = Math.min(100, (currentStep / totalSteps) * 100);

  return (
    <div className="w-full bg-gray-200 rounded-full h-4">
      <div
        className="bg-blue-500 h-4 rounded-full transition-all duration-300"
        style={{ width: `${progressPercentage}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
