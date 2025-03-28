import React from 'react';
import Spinner from '../ui/Spinner';

const StepLoading: React.FC = () => (
  <div className="p-4">
    <Spinner />
    <p className="mt-2 text-center">Please wait, we are processing your request...</p>
  </div>
);

export default StepLoading;
