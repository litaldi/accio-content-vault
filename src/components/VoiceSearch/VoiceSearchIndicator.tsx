
import React from 'react';
import { Mic, Volume2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface VoiceSearchIndicatorProps {
  isListening: boolean;
  transcript: string;
  className?: string;
}

export const VoiceSearchIndicator: React.FC<VoiceSearchIndicatorProps> = ({
  isListening,
  transcript,
  className,
}) => {
  if (!isListening && !transcript) {
    return null;
  }

  return (
    <Card className={cn('border-2', isListening && 'border-red-500 bg-red-50 dark:bg-red-900/20', className)}>
      <CardContent className="p-3">
        <div className="flex items-center gap-2 mb-2">
          {isListening ? (
            <>
              <Mic className="h-4 w-4 text-red-500 animate-pulse" />
              <span className="text-sm font-medium text-red-600 dark:text-red-400">
                Listening...
              </span>
            </>
          ) : (
            <>
              <Volume2 className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium text-green-600 dark:text-green-400">
                Voice input received
              </span>
            </>
          )}
        </div>
        
        {transcript && (
          <div className="text-sm text-muted-foreground">
            <span className="font-medium">Transcript: </span>
            <span className={cn(isListening && 'italic')}>{transcript}</span>
          </div>
        )}
        
        {isListening && (
          <div className="mt-2 text-xs text-muted-foreground">
            Speak clearly into your microphone
          </div>
        )}
      </CardContent>
    </Card>
  );
};
