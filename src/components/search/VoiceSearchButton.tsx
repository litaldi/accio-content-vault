
import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { voiceSearchService } from '@/services/voiceSearchService';
import { useEnhancedToast } from '@/components/feedback/ToastEnhancer';

interface VoiceSearchButtonProps {
  onTranscript: (text: string) => void;
  disabled?: boolean;
  className?: string;
}

export const VoiceSearchButton: React.FC<VoiceSearchButtonProps> = ({
  onTranscript,
  disabled,
  className
}) => {
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { showSuccess, showError } = useEnhancedToast();

  const handleVoiceSearch = useCallback(async () => {
    if (!voiceSearchService.isSupported()) {
      showError('Voice Search Not Supported', 'Your browser does not support speech recognition.');
      return;
    }

    if (isListening) {
      voiceSearchService.stopListening();
      setIsListening(false);
      return;
    }

    try {
      setIsListening(true);
      setIsProcessing(false);

      voiceSearchService.onRecognitionStart(() => {
        setIsProcessing(false);
      });

      voiceSearchService.onRecognitionResult((result) => {
        if (result.isFinal && result.transcript.trim()) {
          onTranscript(result.transcript.trim());
          setIsListening(false);
          showSuccess('Voice Search Complete', `Searching for: "${result.transcript}"`);
        }
      });

      voiceSearchService.onRecognitionError((error) => {
        setIsListening(false);
        setIsProcessing(false);
        showError('Voice Search Error', error);
      });

      voiceSearchService.onRecognitionEnd(() => {
        setIsListening(false);
        setIsProcessing(false);
      });

      voiceSearchService.startListening({
        continuous: false,
        interimResults: true,
        language: 'en-US'
      });

    } catch (error) {
      setIsListening(false);
      setIsProcessing(false);
      showError('Voice Search Failed', 'Please try again or check your microphone permissions.');
    }
  }, [isListening, onTranscript, showSuccess, showError]);

  const getButtonIcon = () => {
    if (isProcessing) {
      return <Loader2 className="h-4 w-4 animate-spin" />;
    }
    return isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />;
  };

  const getButtonLabel = () => {
    if (isProcessing) return 'Processing...';
    return isListening ? 'Stop listening' : 'Start voice search';
  };

  return (
    <Button
      variant={isListening ? "destructive" : "outline"}
      size="icon"
      onClick={handleVoiceSearch}
      disabled={disabled || isProcessing}
      className={cn(
        "transition-all duration-200",
        isListening && "animate-pulse bg-red-500 hover:bg-red-600",
        className
      )}
      title={getButtonLabel()}
      aria-label={getButtonLabel()}
    >
      {getButtonIcon()}
    </Button>
  );
};

export default VoiceSearchButton;
