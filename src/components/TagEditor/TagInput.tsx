
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface TagInputProps {
  newTagName: string;
  canAddMore: boolean;
  maxTags?: number;
  isCompact: boolean;
  inputFocused: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
  onNewTagNameChange: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  onFocus: () => void;
  onBlur: () => void;
  onAddTag: () => void;
}

const TagInput: React.FC<TagInputProps> = ({
  newTagName,
  canAddMore,
  maxTags,
  isCompact,
  inputFocused,
  inputRef,
  onNewTagNameChange,
  onKeyDown,
  onFocus,
  onBlur,
  onAddTag
}) => {
  return (
    <div className="flex space-x-2">
      <div className={`relative flex-grow transition-all duration-200 ${inputFocused ? 'shadow-sm ring-1 ring-primary/20 rounded-md' : ''}`}>
        <Input
          ref={inputRef}
          value={newTagName}
          onChange={(e) => onNewTagNameChange(e.target.value)}
          onKeyDown={onKeyDown}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={canAddMore ? "Add a tag..." : `Maximum ${maxTags} tags reached`}
          className={`w-full transition-all ${isCompact ? 'h-8 text-sm' : ''}`}
          aria-label="New tag name"
          disabled={!canAddMore}
          maxLength={50}
          id="tag-input"
        />
      </div>
      <Button 
        type="button" 
        size={isCompact ? "sm" : "default"}
        onClick={onAddTag}
        disabled={!newTagName.trim() || !canAddMore}
        className="btn-with-icon transition-all duration-200"
        aria-label="Add tag"
      >
        <Plus className="h-4 w-4" />
        <span>Add</span>
      </Button>
    </div>
  );
};

export default TagInput;
