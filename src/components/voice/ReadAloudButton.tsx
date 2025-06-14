
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Volume2, Pause, Play } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ReadAloudButtonProps {
  text: string;
  disabled?: boolean;
  className?: string;
}

export const ReadAloudButton: React.FC<ReadAloudButtonProps> = ({ text, disabled, className }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  const handleClick = async () => {
    if (isPlaying && audio) {
      audio.pause();
      setIsPlaying(false);
      return;
    }
    if (audioUrl && audio) {
      audio.currentTime = 0;
      audio.play();
      setIsPlaying(true);
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch('/functions/text-to-speech', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, voice: 'alloy' }),
      });
      const data = await response.json();
      if (data.audioContent) {
        const url = `data:audio/mp3;base64,${data.audioContent}`;
        const newAudio = new window.Audio(url);
        setAudioUrl(url);
        setAudio(newAudio);
        newAudio.play();
        setIsPlaying(true);
        newAudio.onended = () => setIsPlaying(false);
      }
    } catch (e) {
      // In a real app: show toast for error here
      setIsPlaying(false);
    }
    setIsLoading(false);
  };

  return (
    <Button
      type="button"
      size="icon"
      className={cn("rounded-full", className, isPlaying && "bg-primary/20")}
      title={isPlaying ? "Pause audio" : "Read aloud"}
      onClick={handleClick}
      disabled={disabled || isLoading}
      aria-label="Read aloud"
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : isPlaying ? (
        <Pause className="h-4 w-4" />
      ) : (
        <Volume2 className="h-4 w-4" />
      )}
    </Button>
  );
};

export default ReadAloudButton;
