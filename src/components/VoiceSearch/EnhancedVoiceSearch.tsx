
import React, { useState, useEffect } from 'react';
import { VoiceSearchButton } from './VoiceSearchButton';
import { VoiceSearchIndicator } from './VoiceSearchIndicator';
import { useVoiceSearch } from '@/hooks/useVoiceSearch';

interface EnhancedVoiceSearchProps {
  onSearch: (query: string) => void;
  className?: string;
  showIndicator?: boolean;
}

export const EnhancedVoiceSearch: React.FC<EnhancedVoiceSearchProps> = ({
  onSearch,
  className,
  showIndicator = true,
}) => {
  const [currentTranscript, setCurrentTranscript] = useState('');

  const { isListening, transcript, isSupported } = useVoiceSearch({
    onTranscript: (text, isFinal) => {
      setCurrentTranscript(text);
      if (isFinal && text.trim()) {
        onSearch(text.trim());
        setCurrentTranscript('');
      }
    },
    minConfidence: 0.6,
  });

  useEffect(() => {
    setCurrentTranscript(transcript);
  }, [transcript]);

  if (!isSupported) {
    return null;
  }

  return (
    <div className={className}>
      <VoiceSearchButton
        onTranscript={(text, isFinal) => {
          setCurrentTranscript(text);
          if (isFinal && text.trim()) {
            onSearch(text.trim());
            setCurrentTranscript('');
          }
        }}
      />
      
      {showIndicator && (
        <VoiceSearchIndicator
          isListening={isListening}
          transcript={currentTranscript}
          className="mt-2"
        />
      )}
    </div>
  );
};
