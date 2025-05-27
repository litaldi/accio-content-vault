
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Link, 
  FileText, 
  Bookmark,
  Check,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuickCaptureWidgetProps {
  isOpen?: boolean;
  onToggle?: () => void;
  className?: string;
}

export const QuickCaptureWidget: React.FC<QuickCaptureWidgetProps> = ({ 
  isOpen = false, 
  onToggle,
  className 
}) => {
  const [captureType, setCaptureType] = useState<'url' | 'note' | 'file'>('url');
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleCapture = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Reset form
    setUrl('');
    setTitle('');
    setNotes('');
    setIsLoading(false);
    
    if (onToggle) onToggle();
    
    console.log('Content captured:', { type: captureType, url, title, notes });
  };

  if (!isOpen) {
    return (
      <Button
        onClick={onToggle}
        className={cn("w-full", className)}
        aria-label="Open quick capture"
      >
        <Plus className="h-4 w-4 mr-2" />
        Quick Capture
      </Button>
    );
  }

  return (
    <Card className={cn("w-full max-w-md mx-auto", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Quick Capture</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            aria-label="Close quick capture"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex gap-2">
          <Badge
            variant={captureType === 'url' ? 'default' : 'outline'}
            className="cursor-pointer"
            onClick={() => setCaptureType('url')}
          >
            <Link className="h-3 w-3 mr-1" />
            URL
          </Badge>
          <Badge
            variant={captureType === 'note' ? 'default' : 'outline'}
            className="cursor-pointer"
            onClick={() => setCaptureType('note')}
          >
            <FileText className="h-3 w-3 mr-1" />
            Note
          </Badge>
          <Badge
            variant={captureType === 'file' ? 'default' : 'outline'}
            className="cursor-pointer"
            onClick={() => setCaptureType('file')}
          >
            <Bookmark className="h-3 w-3 mr-1" />
            File
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {captureType === 'url' && (
          <Input
            placeholder="Paste URL here..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        )}
        
        <Input
          placeholder="Title (optional)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        
        <Textarea
          placeholder="Add notes or description..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
        />
        
        <div className="flex gap-2">
          <Button
            onClick={handleCapture}
            disabled={isLoading || (!url && captureType === 'url')}
            className="flex-1"
            loading={isLoading}
            loadingText="Capturing..."
          >
            <Check className="h-4 w-4 mr-2" />
            Capture
          </Button>
          <Button
            variant="outline"
            onClick={onToggle}
          >
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
