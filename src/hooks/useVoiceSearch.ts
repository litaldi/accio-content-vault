
import { useState, useEffect } from 'react';

interface UseVoiceSearchProps {
  onTranscript: (text: string, isFinal: boolean) => void;
}

export const useVoiceSearch = ({ onTranscript }: UseVoiceSearchProps) => {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    // Check if speech recognition is supported
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    setIsSupported(!!SpeechRecognition);
  }, []);

  const startListening = () => {
    setIsListening(true);
    // Implementation would go here
  };

  const stopListening = () => {
    setIsListening(false);
    // Implementation would go here
  };

  return {
    isListening,
    isSupported,
    startListening,
    stopListening
  };
};
