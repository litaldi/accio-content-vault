
import React from 'react';

interface VoiceSearchFeedbackProps {
  isVisible: boolean;
}

export const VoiceSearchFeedback: React.FC<VoiceSearchFeedbackProps> = ({
  isVisible
}) => {
  if (!isVisible) return null;

  return (
    <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 z-50">
      <div className="flex items-center gap-2 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg px-3 py-2 shadow-lg">
        <div className="h-2 w-2 bg-red-500 rounded-full animate-pulse" />
        <span className="text-sm text-red-700 dark:text-red-300 font-medium">
          Listening...
        </span>
      </div>
    </div>
  );
};
