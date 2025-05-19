
import React, { useState, useRef, KeyboardEvent } from 'react';
import { Tag } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { X, Check, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TagEditorProps {
  tags: Tag[];
  onTagsChange: (newTags: Tag[]) => void;
  readOnly?: boolean;
  maxTags?: number;
  className?: string;
}

const TagEditor: React.FC<TagEditorProps> = ({ 
  tags, 
  onTagsChange, 
  readOnly = false,
  maxTags = 10,
  className = ""
}) => {
  const [newTagName, setNewTagName] = useState<string>('');
  const [isAddingTag, setIsAddingTag] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAddTag = () => {
    if (!isAddingTag) {
      setIsAddingTag(true);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 10);
      return;
    }
    
    const trimmedTag = newTagName.trim().toLowerCase();
    
    if (trimmedTag && !tags.some(tag => tag.name.toLowerCase() === trimmedTag)) {
      const newTag: Tag = {
        id: `temp-${Date.now()}`,
        name: trimmedTag,
        auto_generated: false,
      };
      
      onTagsChange([...tags, newTag]);
      setNewTagName('');
      
      if (tags.length + 1 >= maxTags) {
        setIsAddingTag(false);
      }
    } else {
      setNewTagName('');
    }
  };

  const handleRemoveTag = (tagId: string) => {
    onTagsChange(tags.filter(tag => tag.id !== tagId));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    } else if (e.key === 'Escape') {
      setIsAddingTag(false);
      setNewTagName('');
    }
  };

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {tags.map((tag) => (
        <Badge
          key={tag.id}
          variant={tag.auto_generated ? "outline" : "default"}
          className={`
            ${tag.auto_generated ? 'border border-primary/30' : ''} 
            ${tag.confirmed ? 'border-primary' : ''}
            ${!readOnly ? 'pr-1' : ''}
          `}
        >
          {tag.name}
          {!readOnly && (
            <button
              type="button"
              onClick={() => handleRemoveTag(tag.id)}
              className="ml-1 rounded-full hover:bg-primary/20 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
              aria-label={`Remove tag ${tag.name}`}
            >
              <X className="h-3 w-3" />
            </button>
          )}
        </Badge>
      ))}
      
      {!readOnly && tags.length < maxTags && (
        isAddingTag ? (
          <div className="flex">
            <Input
              ref={inputRef}
              type="text"
              placeholder="Add tag..."
              value={newTagName}
              onChange={(e) => setNewTagName(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={() => newTagName.trim() ? handleAddTag() : setIsAddingTag(false)}
              className="h-7 px-2 py-0 text-xs w-32"
              maxLength={20}
              aria-label="New tag name"
            />
            <Button
              size="sm"
              variant="ghost"
              onClick={handleAddTag}
              className="h-7 px-2 py-0"
              aria-label="Add tag"
            >
              <Check className="h-3 w-3" />
            </Button>
          </div>
        ) : (
          <Button 
            size="sm"
            variant="outline" 
            onClick={() => setIsAddingTag(true)}
            className="h-7 px-2 py-0 text-xs"
          >
            <Plus className="h-3 w-3 mr-1" />
            Add Tag
          </Button>
        )
      )}
      
      {!readOnly && tags.length >= maxTags && (
        <span className="text-xs text-muted-foreground">
          Maximum {maxTags} tags
        </span>
      )}
    </div>
  );
};

export default TagEditor;
