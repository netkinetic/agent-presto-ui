'use client';
import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useWizardState } from '../../store/wizardState';
import StepLoading from './StepLoading';
import StepContent from './StepContent';

const TOTAL_STEPS = 8; // Adjust to match your wizard's total steps

const YourWizardComponent: React.FC = () => {
  const { isLoading, currentStep, setLoading } = useWizardState();

  // Simulate an API call: force loading for 3 seconds when the component mounts.
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [setLoading]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Optionally add a progress indicator here */}

      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <StepLoading />
          </motion.div>
        ) : (
          <motion.div
            key={`step-${currentStep}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <StepContent step={currentStep} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default YourWizardComponent;
