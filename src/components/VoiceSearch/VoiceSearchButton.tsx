
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff } from 'lucide-react';

interface VoiceSearchButtonProps {
  onTranscript: (text: string, isFinal: boolean) => void;
  variant?: 'default' | 'ghost' | 'outline';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export const VoiceSearchButton: React.FC<VoiceSearchButtonProps> = ({
  onTranscript,
  variant = 'ghost',
  size = 'icon'
}) => {
  const [isListening, setIsListening] = useState(false);

  const handleClick = () => {
    if (isListening) {
      setIsListening(false);
      // Stop listening logic here
    } else {
      setIsListening(true);
      // Start listening logic here
      // For now, simulate a transcript
      setTimeout(() => {
        onTranscript('test search', true);
        setIsListening(false);
      }, 2000);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleClick}
      className={isListening ? 'text-red-600' : ''}
      aria-label={isListening ? 'Stop voice search' : 'Start voice search'}
    >
      {isListening ? (
        <MicOff className="h-4 w-4" />
      ) : (
        <Mic className="h-4 w-4" />
      )}
    </Button>
  );
};
