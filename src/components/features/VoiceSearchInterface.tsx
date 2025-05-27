
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX,
  Waveform,
  Play,
  Pause
} from 'lucide-react';

export const VoiceSearchInterface = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);

  const startListening = () => {
    setIsListening(true);
    // Simulate voice recognition
    setTimeout(() => {
      setTranscript("Find articles about artificial intelligence and machine learning from the last month");
      setIsListening(false);
    }, 3000);
  };

  const stopListening = () => {
    setIsListening(false);
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  const searchResults = [
    {
      title: "The Future of AI in Knowledge Management",
      type: "Article",
      relevance: 95,
      source: "Tech Insights",
      date: "2 days ago"
    },
    {
      title: "Machine Learning Applications in Content Organization",
      type: "Research Paper",
      relevance: 88,
      source: "AI Research Journal",
      date: "1 week ago"
    },
    {
      title: "Building Intelligent Knowledge Systems",
      type: "Video",
      relevance: 82,
      source: "KnowledgeBase Pro",
      date: "3 weeks ago"
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mic className="h-5 w-5 text-primary" />
            Voice Search Interface
            <Badge variant="secondary">AI-Powered</Badge>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Voice Input Section */}
          <div className="text-center">
            <div className="relative inline-block">
              <Button
                size="lg"
                className={`w-20 h-20 rounded-full ${
                  isListening 
                    ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                    : 'bg-primary hover:bg-primary/90'
                }`}
                onClick={isListening ? stopListening : startListening}
              >
                {isListening ? (
                  <MicOff className="h-8 w-8" />
                ) : (
                  <Mic className="h-8 w-8" />
                )}
              </Button>
              
              {isListening && (
                <div className="absolute -inset-4 border-2 border-red-500 rounded-full animate-ping" />
              )}
            </div>
            
            <p className="mt-4 text-sm text-muted-foreground">
              {isListening 
                ? "Listening... Speak your search query" 
                : "Click to start voice search"
              }
            </p>
          </div>

          {/* Audio Controls */}
          <div className="flex items-center justify-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setAudioEnabled(!audioEnabled)}
            >
              {audioEnabled ? (
                <Volume2 className="h-4 w-4 mr-2" />
              ) : (
                <VolumeX className="h-4 w-4 mr-2" />
              )}
              Audio {audioEnabled ? 'On' : 'Off'}
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={togglePlayback}
              disabled={!transcript}
            >
              {isPlaying ? (
                <Pause className="h-4 w-4 mr-2" />
              ) : (
                <Play className="h-4 w-4 mr-2" />
              )}
              {isPlaying ? 'Pause' : 'Play Back'}
            </Button>
          </div>

          {/* Transcript Display */}
          {transcript && (
            <Card className="bg-muted/20">
              <CardContent className="p-4">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Waveform className="h-4 w-4" />
                  Voice Transcript
                </h4>
                <p className="text-sm italic">"{transcript}"</p>
              </CardContent>
            </Card>
          )}

          {/* Search Results */}
          {transcript && (
            <div>
              <h4 className="font-medium mb-3">Voice Search Results</h4>
              <div className="space-y-3">
                {searchResults.map((result, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h5 className="font-medium mb-1">{result.title}</h5>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Badge variant="outline" className="text-xs">
                              {result.type}
                            </Badge>
                            <span>{result.source}</span>
                            <span>•</span>
                            <span>{result.date}</span>
                          </div>
                        </div>
                        <Badge variant="secondary" className="ml-4">
                          {result.relevance}% match
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
