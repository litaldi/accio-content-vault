
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Tag } from '@/types';
import { Plus, X } from 'lucide-react';

interface UrlFormTagSectionProps {
  tags: Tag[];
  setTags: React.Dispatch<React.SetStateAction<Tag[]>>;
  tagInput: string;
  setTagInput: React.Dispatch<React.SetStateAction<string>>;
}

const UrlFormTagSection: React.FC<UrlFormTagSectionProps> = ({
  tags,
  setTags,
  tagInput,
  setTagInput,
}) => {
  const addTag = (tagName: string) => {
    if (tagName.trim() && !tags.find(tag => tag.name === tagName.trim())) {
      const newTag: Tag = {
        id: `temp-${Date.now()}`, // Simple unique ID for client-side
        name: tagName.trim(),
        auto_generated: false,
        confirmed: true,
      };
      setTags(prevTags => [...prevTags, newTag]);
      setTagInput('');
    }
  };

  const removeTag = (tagId: string) => {
    setTags(prevTags => prevTags.filter(tag => tag.id !== tagId));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      addTag(tagInput);
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="tags-input">Tags</Label>
      <div className="flex gap-2">
        <Input
          id="tags-input" // Changed ID to avoid conflict if "tags" is used elsewhere
          placeholder="Add tags"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={handleKeyDown}
          aria-describedby="tags-help"
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => addTag(tagInput)}
          disabled={!tagInput.trim()}
          aria-label="Add tag"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <p id="tags-help" className="text-xs text-muted-foreground">
        Press Enter or click + to add tags
      </p>
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag) => (
            <Badge key={tag.id} variant="secondary" className="flex items-center gap-1">
              {tag.name}
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 hover:bg-destructive hover:text-destructive-foreground"
                onClick={() => removeTag(tag.id)}
                aria-label={`Remove ${tag.name} tag`}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

export default UrlFormTagSection;
