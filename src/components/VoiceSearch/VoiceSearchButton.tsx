
import React from 'react';
import { Mic, MicOff, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useVoiceSearch } from '@/hooks/useVoiceSearch';
import { cn } from '@/lib/utils';

interface VoiceSearchButtonProps {
  onTranscript: (transcript: string, isFinal: boolean) => void;
  className?: string;
  size?: 'sm' | 'default' | 'lg';
  variant?: 'default' | 'ghost' | 'outline';
}

export const VoiceSearchButton: React.FC<VoiceSearchButtonProps> = ({
  onTranscript,
  className,
  size = 'sm',
  variant = 'ghost',
}) => {
  const { isListening, isSupported, toggleListening } = useVoiceSearch({
    onTranscript,
    autoSearch: false,
  });

  if (!isSupported) {
    return null;
  }

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      className={cn(
        'transition-all duration-200',
        isListening && 'text-red-500 bg-red-50 dark:bg-red-900/20',
        className
      )}
      onClick={toggleListening}
      title={isListening ? 'Stop voice search' : 'Start voice search'}
    >
      {isListening ? (
        <MicOff className={cn(
          'animate-pulse',
          size === 'sm' && 'h-3 w-3',
          size === 'default' && 'h-4 w-4',
          size === 'lg' && 'h-5 w-5'
        )} />
      ) : (
        <Mic className={cn(
          size === 'sm' && 'h-3 w-3',
          size === 'default' && 'h-4 w-4',
          size === 'lg' && 'h-5 w-5'
        )} />
      )}
    </Button>
  );
};
