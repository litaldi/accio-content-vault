
import React from 'react';
import { Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface VoiceSearchButtonProps {
  isListening: boolean;
  isSupported: boolean;
  onClick: () => void;
}

export const VoiceSearchButton: React.FC<VoiceSearchButtonProps> = ({
  isListening,
  isSupported,
  onClick
}) => {
  if (!isSupported) return null;

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={onClick}
      className={cn(
        "h-6 w-6 p-0",
        isListening && "text-red-500 animate-pulse"
      )}
      aria-label={isListening ? "Stop voice search" : "Start voice search"}
    >
      <Mic className="h-3 w-3" />
    </Button>
  );
};
