
import { useState, useEffect } from 'react';

interface UseVoiceSearchProps {
  onTranscript: (text: string, isFinal: boolean) => void;
  minConfidence?: number;
}

export const useVoiceSearch = ({ onTranscript, minConfidence = 0.7 }: UseVoiceSearchProps) => {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [transcript, setTranscript] = useState('');

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

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return {
    isListening,
    isSupported,
    transcript,
    startListening,
    stopListening,
    toggleListening
  };
};
