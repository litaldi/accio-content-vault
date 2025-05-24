
import { useState, useCallback, useRef, useEffect } from 'react';
import { voiceSearchService, VoiceSearchResult, VoiceSearchConfig } from '@/services/voiceSearchService';
import { useToast } from '@/hooks/use-toast';

export interface UseVoiceSearchOptions {
  onTranscript?: (transcript: string, isFinal: boolean) => void;
  onError?: (error: string) => void;
  autoSearch?: boolean;
  minConfidence?: number;
  config?: VoiceSearchConfig;
}

export const useVoiceSearch = (options: UseVoiceSearchOptions = {}) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSupported, setIsSupported] = useState(false);
  const { toast } = useToast();
  const finalTranscriptRef = useRef('');

  const {
    onTranscript,
    onError,
    autoSearch = true,
    minConfidence = 0.7,
    config = {}
  } = options;

  useEffect(() => {
    setIsSupported(voiceSearchService.isSupported());

    // Set up event handlers
    voiceSearchService.onRecognitionStart(() => {
      setIsListening(true);
      setTranscript('');
      finalTranscriptRef.current = '';
    });

    voiceSearchService.onRecognitionEnd(() => {
      setIsListening(false);
    });

    voiceSearchService.onRecognitionResult((result: VoiceSearchResult) => {
      if (result.confidence >= minConfidence) {
        if (result.isFinal) {
          finalTranscriptRef.current = result.transcript;
          setTranscript(result.transcript);
          onTranscript?.(result.transcript, true);
        } else {
          setTranscript(finalTranscriptRef.current + result.transcript);
          onTranscript?.(finalTranscriptRef.current + result.transcript, false);
        }
      }
    });

    voiceSearchService.onRecognitionError((error: string) => {
      setIsListening(false);
      onError?.(error);
      toast({
        title: "Voice search error",
        description: error,
        variant: "destructive",
      });
    });

    return () => {
      if (isListening) {
        voiceSearchService.stopListening();
      }
    };
  }, [minConfidence, onTranscript, onError, toast, isListening]);

  const startListening = useCallback(() => {
    if (!isSupported) {
      toast({
        title: "Voice search not supported",
        description: "Your browser doesn't support voice search",
        variant: "destructive",
      });
      return;
    }

    voiceSearchService.startListening({
      continuous: false,
      interimResults: true,
      language: 'en-US',
      ...config
    });
  }, [isSupported, config, toast]);

  const stopListening = useCallback(() => {
    voiceSearchService.stopListening();
  }, []);

  const toggleListening = useCallback(() => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  }, [isListening, startListening, stopListening]);

  return {
    isListening,
    transcript,
    isSupported,
    startListening,
    stopListening,
    toggleListening,
  };
};
