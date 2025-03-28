import React from 'react';
import { useWizardState } from '../../store/wizardState';
import StepLoading from './StepLoading';
import StepContent from './StepContent';

const YourWizardComponent: React.FC = () => {
  const { isLoading, currentStep } = useWizardState();

  return (
    <div>
      {isLoading ? <StepLoading /> : <StepContent step={currentStep} />}
    </div>
  );
};

export default YourWizardComponent;
