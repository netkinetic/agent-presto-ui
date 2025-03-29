// src/components/wizard/YourWizardComponent.tsx
import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useWizardState } from '../../store/wizardState';
import ProgressBar from './ProgressBar';
import StepLoading from './StepLoading';
import StepContent from './StepContent';

const TOTAL_STEPS = 8; // Adjust this to your wizard's total steps

const YourWizardComponent: React.FC = () => {
  const { isLoading, currentStep } = useWizardState();

  return (
    <div className="max-w-3xl mx-auto p-4">
      {/* Progress indicator */}
      <ProgressBar totalSteps={TOTAL_STEPS} />

      {/* Wizard content with smooth transitions */}
      <div className="mt-6">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <StepLoading />
            </motion.div>
          ) : (
            <motion.div
              key={`step-${currentStep}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <StepContent step={currentStep} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default YourWizardComponent;
