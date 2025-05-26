
import React from 'react';
import { TooltipProvider } from '@/components/ui/tooltip';

interface RadixProvidersProps {
  children: React.ReactNode;
}

export const RadixProviders: React.FC<RadixProvidersProps> = ({ children }) => {
  return (
    <TooltipProvider delayDuration={300}>
      {children}
    </TooltipProvider>
  );
};
