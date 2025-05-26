
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Mic, 
  MicOff, 
  Square, 
  Play, 
  Pause,
  RefreshCw,
  Download,
  FileText,
  Volume2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface VoiceContentCreatorProps {
  onContentCreated?: (content: string) => void;
  className?: string;
}

export const VoiceContentCreator: React.FC<VoiceContentCreatorProps> = ({
  onContentCreated,
  className
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [structuredContent, setStructuredContent] = useState('');
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string>('');
  const [isPlaying, setIsPlaying] = useState(false);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    };
  }, [audioUrl]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);

      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);

      toast({
        title: "Recording Started",
        description: "Speak clearly for best transcription results.",
      });
    } catch (error) {
      toast({
        title: "Recording Failed",
        description: "Please check microphone permissions.",
        variant: "destructive"
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  };

  const transcribeAudio = async () => {
    if (!audioUrl) return;

    setIsProcessing(true);
    try {
      // Simulate transcription (in real implementation, use Whisper API)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock transcription result
      const mockTranscript = "This is a sample transcription of your voice recording. The AI has converted your speech to text and will now structure it into organized content with proper formatting and suggestions for tags.";
      
      setTranscript(mockTranscript);
      
      // Generate structured content
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const structured = `# Voice Note - ${new Date().toLocaleDateString()}

## Transcript
${mockTranscript}

## Key Points
- Important ideas extracted from your voice note
- Automatically identified themes and concepts
- Action items or follow-up tasks mentioned

## Summary
Your voice note has been processed and structured for easy reference. The main themes and actionable items have been highlighted above.

## Suggested Tags
#voice-note #${new Date().toLocaleDateString().replace(/\//g, '-')} #ideas #quick-capture

---
*Generated from voice recording on ${new Date().toLocaleString()}*`;

      setStructuredContent(structured);
      
      if (onContentCreated) {
        onContentCreated(structured);
      }

      toast({
        title: "Content Created!",
        description: "Your voice recording has been transcribed and structured.",
      });
    } catch (error) {
      toast({
        title: "Processing Failed",
        description: "Please try recording again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const playAudio = () => {
    if (audioUrl && audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const resetRecording = () => {
    setTranscript('');
    setStructuredContent('');
    setRecordingTime(0);
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      setAudioUrl('');
    }
    setIsPlaying(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={className}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Volume2 className="h-5 w-5 text-primary" />
            Voice Content Creator
            <Badge variant="secondary">AI-Powered</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Recording Controls */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <Button
                size="lg"
                variant={isRecording ? "destructive" : "default"}
                className="rounded-full w-24 h-24"
                onClick={isRecording ? stopRecording : startRecording}
                disabled={isProcessing}
              >
                {isRecording ? (
                  <Square className="h-8 w-8" />
                ) : (
                  <Mic className="h-8 w-8" />
                )}
              </Button>
            </div>
            
            <div className="space-y-2">
              <div className="text-lg font-mono">
                {formatTime(recordingTime)}
              </div>
              {isRecording && (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  <span className="text-sm text-red-500">Recording...</span>
                </div>
              )}
            </div>
          </div>

          {/* Audio Playback */}
          {audioUrl && (
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className="text-sm font-medium">Recording Ready</span>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={playAudio}
                  >
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={transcribeAudio}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <RefreshCw className="h-4 w-4 animate-spin" />
                    ) : (
                      <FileText className="h-4 w-4" />
                    )}
                    {isProcessing ? "Processing..." : "Transcribe"}
                  </Button>
                </div>
              </div>
              
              <audio
                ref={audioRef}
                src={audioUrl}
                onEnded={() => setIsPlaying(false)}
                className="hidden"
              />
            </div>
          )}

          {/* Processing Status */}
          {isProcessing && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Processing audio...</span>
                <span>AI Transcription</span>
              </div>
              <Progress value={isProcessing ? 45 : 0} className="h-2" />
            </div>
          )}

          {/* Transcript */}
          {transcript && (
            <div className="space-y-2">
              <h3 className="font-medium">Transcript</h3>
              <Textarea
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                rows={3}
                className="text-sm"
              />
            </div>
          )}

          {/* Structured Content */}
          {structuredContent && (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Structured Content</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetRecording}
                >
                  <RefreshCw className="h-4 w-4 mr-1" />
                  New Recording
                </Button>
              </div>
              <Textarea
                value={structuredContent}
                onChange={(e) => setStructuredContent(e.target.value)}
                rows={10}
                className="font-mono text-sm"
              />
            </div>
          )}

          {/* Tips */}
          {!audioUrl && !isRecording && (
            <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-lg text-sm">
              <h4 className="font-medium mb-1">💡 Tips for better results:</h4>
              <ul className="text-muted-foreground space-y-1">
                <li>• Speak clearly and at a normal pace</li>
                <li>• Find a quiet environment</li>
                <li>• Mention key topics and action items</li>
                <li>• Keep recordings under 5 minutes for best results</li>
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
