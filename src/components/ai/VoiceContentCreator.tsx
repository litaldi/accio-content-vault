
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  Mic, 
  Square,
  Play,
  Pause,
  RotateCcw,
  FileText,
  Wand2,
  Download,
  Volume2,
  Edit
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface VoiceNote {
  id: string;
  title: string;
  originalTranscript: string;
  structuredContent: string;
  duration: number;
  createdAt: Date;
  tags: string[];
}

interface VoiceContentCreatorProps {
  className?: string;
}

export const VoiceContentCreator: React.FC<VoiceContentCreatorProps> = ({ className }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [voiceNotes, setVoiceNotes] = useState<VoiceNote[]>([]);
  const [selectedNote, setSelectedNote] = useState<VoiceNote | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [editedContent, setEditedContent] = useState('');
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadExistingNotes();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const loadExistingNotes = () => {
    const mockNotes: VoiceNote[] = [
      {
        id: '1',
        title: 'React Hooks Learning Notes',
        originalTranscript: 'So I was thinking about React hooks today and how they really changed the way we write components. useState is probably the most basic one but useEffect is where things get interesting...',
        structuredContent: `# React Hooks Learning Notes

## Key Insights
- **useState**: The foundation of state management in functional components
- **useEffect**: Handles side effects and lifecycle events
- **Custom Hooks**: Enable reusable stateful logic

## Next Steps
- Practice building custom hooks
- Explore advanced hooks like useCallback and useMemo
- Study performance optimization patterns`,
        duration: 125,
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        tags: ['React', 'JavaScript', 'Learning']
      }
    ];
    setVoiceNotes(mockNotes);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      mediaRecorder.start();
      setIsRecording(true);
      setRecordingDuration(0);
      
      intervalRef.current = setInterval(() => {
        setRecordingDuration(prev => prev + 1);
      }, 1000);
      
      mediaRecorder.addEventListener('dataavailable', handleRecordingComplete);
    } catch (error) {
      toast({
        title: "Recording Failed",
        description: "Could not access microphone. Please check permissions.",
        variant: "destructive"
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
  };

  const handleRecordingComplete = async (event: BlobEvent) => {
    setIsProcessing(true);
    
    try {
      // Simulate AI processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const mockTranscript = "This is a sample transcription of your voice note. The AI has converted your speech to text and will now structure it into organized content.";
      const mockStructuredContent = `# Voice Note Summary

## Key Points
- Main topic discussed
- Important insights shared
- Action items identified

## Structured Content
${mockTranscript}

## Generated Tags
- Content Creation
- Voice Notes
- AI Processing`;

      const newNote: VoiceNote = {
        id: Date.now().toString(),
        title: `Voice Note ${new Date().toLocaleDateString()}`,
        originalTranscript: mockTranscript,
        structuredContent: mockStructuredContent,
        duration: recordingDuration,
        createdAt: new Date(),
        tags: ['Voice Note', 'AI Generated']
      };

      setVoiceNotes(prev => [newNote, ...prev]);
      setSelectedNote(newNote);
      
      toast({
        title: "Voice Note Created!",
        description: "Your recording has been transcribed and structured.",
      });
    } finally {
      setIsProcessing(false);
      setRecordingDuration(0);
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const enhanceContent = async (note: VoiceNote) => {
    setIsProcessing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const enhancedContent = `# ${note.title} (Enhanced)

## Executive Summary
AI-enhanced version with improved structure and clarity.

${note.structuredContent}

## AI Enhancements
- Improved formatting and structure
- Added section headers for better organization
- Enhanced readability and flow
- Suggested related topics for further exploration`;

      const updatedNote = { ...note, structuredContent: enhancedContent };
      setVoiceNotes(prev => prev.map(n => n.id === note.id ? updatedNote : n));
      setSelectedNote(updatedNote);
      
      toast({
        title: "Content Enhanced!",
        description: "AI has improved the structure and clarity of your note.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const saveEditedContent = () => {
    if (selectedNote) {
      const updatedNote = { ...selectedNote, structuredContent: editedContent };
      setVoiceNotes(prev => prev.map(n => n.id === selectedNote.id ? updatedNote : n));
      setSelectedNote(updatedNote);
      setEditMode(false);
      toast({
        title: "Content Saved!",
        description: "Your changes have been saved.",
      });
    }
  };

  return (
    <div className={className}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mic className="h-5 w-5 text-primary" />
            Voice Content Creator
            <Badge variant="secondary">AI-Powered</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Recording Controls */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className={`w-24 h-24 rounded-full flex items-center justify-center border-4 ${
                isRecording ? 'border-red-500 bg-red-50 dark:bg-red-950' : 'border-primary bg-primary/10'
              }`}>
                {isRecording ? (
                  <div className="w-8 h-8 bg-red-500 rounded-sm animate-pulse" />
                ) : (
                  <Mic className="h-8 w-8 text-primary" />
                )}
              </div>
            </div>
            
            {isRecording && (
              <div className="text-lg font-mono">
                {formatDuration(recordingDuration)}
              </div>
            )}
            
            <div className="flex justify-center gap-2">
              {!isRecording ? (
                <Button onClick={startRecording} size="lg" className="gap-2">
                  <Mic className="h-5 w-5" />
                  Start Recording
                </Button>
              ) : (
                <Button onClick={stopRecording} variant="destructive" size="lg" className="gap-2">
                  <Square className="h-5 w-5" />
                  Stop Recording
                </Button>
              )}
            </div>
            
            {isProcessing && (
              <div className="text-center space-y-2">
                <div className="w-6 h-6 mx-auto animate-spin rounded-full border-2 border-primary border-t-transparent" />
                <p className="text-sm text-muted-foreground">AI is transcribing and structuring your content...</p>
              </div>
            )}
          </div>

          {/* Voice Notes List */}
          <div className="space-y-4">
            <h3 className="font-medium">Your Voice Notes</h3>
            <div className="grid gap-3">
              {voiceNotes.map((note) => (
                <Card 
                  key={note.id} 
                  className={`cursor-pointer transition-all ${
                    selectedNote?.id === note.id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedNote(note)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium">{note.title}</h4>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {note.originalTranscript}
                        </p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Volume2 className="h-3 w-3" />
                            {formatDuration(note.duration)}
                          </span>
                          <span>{note.createdAt.toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {note.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Selected Note Content */}
          {selectedNote && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Content Preview</h3>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => enhanceContent(selectedNote)}
                    disabled={isProcessing}
                    className="gap-1"
                  >
                    <Wand2 className="h-3 w-3" />
                    Enhance
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => {
                      setEditMode(!editMode);
                      setEditedContent(selectedNote.structuredContent);
                    }}
                    className="gap-1"
                  >
                    <Edit className="h-3 w-3" />
                    Edit
                  </Button>
                </div>
              </div>
              
              {editMode ? (
                <div className="space-y-2">
                  <Textarea
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    className="min-h-[200px] font-mono text-sm"
                  />
                  <div className="flex gap-2">
                    <Button onClick={saveEditedContent} size="sm">Save Changes</Button>
                    <Button variant="outline" onClick={() => setEditMode(false)} size="sm">Cancel</Button>
                  </div>
                </div>
              ) : (
                <div className="bg-muted/30 p-4 rounded-lg">
                  <pre className="whitespace-pre-wrap text-sm font-sans">
                    {selectedNote.structuredContent}
                  </pre>
                </div>
              )}
            </div>
          )}

          {/* Tips */}
          <div className="bg-purple-50 dark:bg-purple-950 p-3 rounded-lg text-sm">
            <h4 className="font-medium mb-1">🎤 Voice Notes Tips:</h4>
            <ul className="text-muted-foreground space-y-1">
              <li>• Speak clearly and at a moderate pace for best transcription</li>
              <li>• Use the enhance feature to improve structure and readability</li>
              <li>• Voice notes are automatically tagged based on content</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
