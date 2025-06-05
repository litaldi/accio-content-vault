
import React from 'react';
import { CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FormSuccessProps {
  message?: string;
  className?: string;
}

export const FormSuccess: React.FC<FormSuccessProps> = ({ message, className }) => {
  if (!message) return null;

  return (
    <div 
      className={cn(
        "flex items-center gap-2 text-sm text-success",
        className
      )}
      role="status"
      aria-live="polite"
    >
      <CheckCircle className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
      <span>{message}</span>
    </div>
  );
};
