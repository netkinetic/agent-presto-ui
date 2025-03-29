// src/components/wizard/StepLoading.tsx
import React from 'react';
import Spinner from './../Spinner';

const StepLoading: React.FC = () => (
  <div className="p-4 flex flex-col items-center">
    <Spinner />
    <p className="mt-2 text-center text-gray-700">
      Please wait, we are processing your request...
    </p>
  </div>
);

export default StepLoading;
