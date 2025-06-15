
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Link, 
  FileText, 
  Image, 
  Video,
  Bookmark,
  Check,
  Loader2,
  Plus
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuickCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const captureTypes = [
  { id: 'url', label: 'URL', icon: Link, placeholder: 'Paste URL here...' },
  { id: 'note', label: 'Note', icon: FileText, placeholder: 'Write your note...' },
  { id: 'image', label: 'Image', icon: Image, placeholder: 'Image URL or upload...' },
  { id: 'video', label: 'Video', icon: Video, placeholder: 'Video URL...' }
];

export const QuickCaptureModal: React.FC<QuickCaptureModalProps> = ({ 
  isOpen, 
  onClose 
}) => {
  const [selectedType, setSelectedType] = useState('url');
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  const { toast } = useToast();

  const handleAnalyzeUrl = async () => {
    if (!url.trim()) return;
    
    setIsAnalyzing(true);
    // Simulate URL analysis
    setTimeout(() => {
      setTitle('Extracted Title from URL');
      setDescription('Auto-generated description based on content analysis...');
      setTags(['web', 'article', 'technology']);
      setIsAnalyzing(false);
      toast({
        title: "Content Analyzed",
        description: "Title, description, and tags have been automatically generated."
      });
    }, 2000);
  };

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleCapture = async () => {
    if (!url.trim() && selectedType === 'url') {
      toast({
        title: "Error",
        description: "Please enter a URL to capture.",
        variant: "destructive"
      });
      return;
    }

    if (!title.trim() && !description.trim()) {
      toast({
        title: "Error", 
        description: "Please provide at least a title or description.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate saving
    setTimeout(() => {
      setIsLoading(false);
      onClose();
      
      // Reset form
      setUrl('');
      setTitle('');
      setDescription('');
      setTags([]);
      setNewTag('');
      
      toast({
        title: "Content Captured",
        description: "Your content has been successfully saved to your knowledge base."
      });
    }, 1500);
  };

  const selectedTypeData = captureTypes.find(type => type.id === selectedType);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bookmark className="h-5 w-5" />
            Quick Capture
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Capture Type Selection */}
          <div className="grid grid-cols-4 gap-2">
            {captureTypes.map((type) => (
              <Button
                key={type.id}
                variant={selectedType === type.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedType(type.id)}
                className="flex flex-col gap-1 h-auto py-3"
              >
                <type.icon className="h-4 w-4" />
                <span className="text-xs">{type.label}</span>
              </Button>
            ))}
          </div>

          {/* Content Input */}
          <div className="space-y-4">
            {selectedType === 'url' && (
              <div className="flex gap-2">
                <Input
                  placeholder={selectedTypeData?.placeholder}
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="flex-1"
                />
                <Button
                  variant="outline"
                  onClick={handleAnalyzeUrl}
                  disabled={!url.trim() || isAnalyzing}
                  className="gap-2"
                >
                  {isAnalyzing ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Plus className="h-4 w-4" />
                  )}
                  Analyze
                </Button>
              </div>
            )}

            {selectedType === 'note' && (
              <Textarea
                placeholder="Write your note here..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
              />
            )}

            <Input
              placeholder="Title (optional)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <Textarea
              placeholder="Add description or notes..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />

            {/* Tags Input */}
            <div className="space-y-2">
              <div className="flex gap-2">
                <Input
                  placeholder="Add tags..."
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
                  className="flex-1"
                />
                <Button variant="outline" onClick={handleAddTag} disabled={!newTag.trim()}>
                  Add
                </Button>
              </div>
              
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="gap-1">
                      {tag}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-4 w-4 p-0 hover:bg-transparent"
                        onClick={() => handleRemoveTag(tag)}
                      >
                        ×
                      </Button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              onClick={handleCapture} 
              disabled={isLoading}
              className="gap-2"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Check className="h-4 w-4" />
              )}
              {isLoading ? 'Capturing...' : 'Capture'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
