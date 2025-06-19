import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Loader2 className="animate-spin text-nebula-400 mb-4" size={48} />
      <p className="text-slate-300 text-lg">{message}</p>
    </div>
  );
};

export default LoadingSpinner;