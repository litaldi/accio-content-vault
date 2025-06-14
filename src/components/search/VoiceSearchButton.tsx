
import React from 'react';
import { Mic, MicOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface VoiceSearchButtonProps {
  isListening: boolean;
  onVoiceSearch: () => void;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const VoiceSearchButton: React.FC<VoiceSearchButtonProps> = ({
  isListening,
  onVoiceSearch,
  size = 'md',
  className
}) => {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={onVoiceSearch}
      className={cn(
        "h-6 w-6 p-0 transition-all duration-200",
        size === 'lg' && "h-8 w-8",
        isListening 
          ? "text-red-500 animate-pulse hover:bg-red-50 dark:hover:bg-red-950/20" 
          : "hover:bg-muted/80",
        className
      )}
      aria-label={isListening ? "Stop voice search" : "Start voice search"}
    >
      {isListening ? (
        <MicOff className="h-3 w-3" />
      ) : (
        <Mic className="h-3 w-3" />
      )}
    </Button>
  );
};
