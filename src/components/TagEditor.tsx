
import React, { useState, useRef, useEffect } from 'react';
import { Tag as TagType } from '@/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { X, Plus, Tag as TagIcon } from 'lucide-react';
import { useFocusTrap } from '@/hooks/use-focus-trap';
import { throttle } from '@/utils/performance';

interface TagEditorProps {
  tags: TagType[];
  onTagsChange: (newTags: TagType[]) => void;
  readOnly?: boolean;
  maxTags?: number;
  className?: string;
  variant?: 'default' | 'compact';
}

/**
 * TagEditor component for managing and editing content tags
 * Supports keyboard navigation, a11y features, and different display variants
 */
const TagEditor: React.FC<TagEditorProps> = ({ 
  tags, 
  onTagsChange, 
  readOnly = false, 
  maxTags = 50,
  className = '',
  variant = 'default'
}) => {
  const [newTagName, setNewTagName] = useState('');
  const [inputFocused, setInputFocused] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const tagsContainerRef = useRef<HTMLDivElement>(null);
  const trapRef = useFocusTrap();
  
  const isCompact = variant === 'compact';
  const canAddMore = maxTags ? tags.length < maxTags : true;

  // Reset active index when tags change
  useEffect(() => {
    setActiveIndex(null);
  }, [tags.length]);

  const handleAddTag = () => {
    if (!newTagName.trim() || !canAddMore) return;
    
    // Check if tag already exists (case insensitive)
    const normalizedName = newTagName.trim().toLowerCase();
    const tagExists = tags.some(tag => 
      tag.name.toLowerCase() === normalizedName
    );
    
    if (!tagExists) {
      const newTag: TagType = {
        id: `user-${Date.now()}`, // In production, this ID would come from the server
        name: newTagName.trim(),
        auto_generated: false,
        confirmed: true,
      };
      
      onTagsChange([...tags, newTag]);
      
      // Announce for screen readers
      const announcer = document.getElementById('tag-announcer');
      if (announcer) {
        announcer.textContent = `Tag ${newTagName.trim()} added`;
      }
    }
    
    setNewTagName('');
    inputRef.current?.focus();
  };

  const handleRemoveTag = (tagId: string, tagName: string) => {
    const updatedTags = tags.filter(tag => tag.id !== tagId);
    onTagsChange(updatedTags);
    
    // Announce for screen readers
    const announcer = document.getElementById('tag-announcer');
    if (announcer) {
      announcer.textContent = `Tag ${tagName} removed`;
    }
    
    // Focus the input when a tag is removed
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Add tag on Enter
    if (e.key === 'Enter' && newTagName.trim()) {
      e.preventDefault();
      handleAddTag();
      return;
    }
    
    // Delete last tag on Backspace if input is empty
    if (e.key === 'Backspace' && !newTagName && tags.length > 0) {
      const lastTag = tags[tags.length - 1];
      handleRemoveTag(lastTag.id, lastTag.name);
      return;
    }
    
    // Tag keyboard navigation
    if (e.key === 'ArrowLeft' && document.activeElement === inputRef.current && !newTagName) {
      // Move focus to last tag if input is empty
      setActiveIndex(tags.length - 1);
      const tagElements = tagsContainerRef.current?.querySelectorAll('[role="listitem"] button');
      if (tagElements && tagElements.length > 0) {
        (tagElements[tagElements.length - 1] as HTMLElement).focus();
      }
    }
  };

  // Throttled tag addition for better performance with rapid inputs
  const throttledAddTag = throttle(handleAddTag, 300);
  
  return (
    <div className={`tag-editor ${className}`} ref={trapRef as React.RefObject<HTMLDivElement>}>
      {/* Visually hidden announcer for screen readers */}
      <div 
        id="tag-announcer" 
        role="status" 
        aria-live="polite" 
        className="sr-only"
      />
      
      <div className="flex items-center gap-2 mb-2">
        <TagIcon className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
        <h3 className={`font-medium ${isCompact ? 'text-sm' : 'text-base'}`}>
          Tags {!readOnly && maxTags ? `(${tags.length}/${maxTags})` : ''}
        </h3>
      </div>
      
      <div 
        ref={tagsContainerRef}
        className={`flex flex-wrap gap-2 mb-4 ${tags.length === 0 && readOnly ? 'min-h-8' : ''}`} 
        role="list"
        aria-label="Content tags"
      >
        {tags.length === 0 && readOnly && (
          <p className="text-sm text-muted-foreground">No tags added yet</p>
        )}
        
        {tags.map((tag, index) => (
          <div 
            key={tag.id} 
            className={`
              inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
              ${tag.auto_generated 
                ? 'bg-accent/20 text-accent-foreground' 
                : 'bg-primary/20 text-primary-foreground'}
              ${!readOnly && 'pr-1'}
              animate-scale-in transition-all duration-200 hover:bg-opacity-30
              ${activeIndex === index ? 'ring-2 ring-primary ring-offset-2' : ''}
            `}
            role="listitem"
          >
            {tag.name}
            {!readOnly && (
              <button
                type="button"
                onClick={() => handleRemoveTag(tag.id, tag.name)}
                onKeyDown={(e) => {
                  // Move focus to previous tag on left arrow
                  if (e.key === 'ArrowLeft' && index > 0) {
                    setActiveIndex(index - 1);
                    const tagElements = tagsContainerRef.current?.querySelectorAll('[role="listitem"] button');
                    if (tagElements && tagElements[index - 1]) {
                      (tagElements[index - 1] as HTMLElement).focus();
                    }
                  }
                  // Move focus to next tag on right arrow
                  else if (e.key === 'ArrowRight') {
                    if (index < tags.length - 1) {
                      setActiveIndex(index + 1);
                      const tagElements = tagsContainerRef.current?.querySelectorAll('[role="listitem"] button');
                      if (tagElements && tagElements[index + 1]) {
                        (tagElements[index + 1] as HTMLElement).focus();
                      }
                    } else {
                      // If at last tag, move to input
                      inputRef.current?.focus();
                      setActiveIndex(null);
                    }
                  }
                }}
                className="ml-1 rounded-full p-0.5 hover:bg-accent/30 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
                aria-label={`Remove ${tag.name} tag`}
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove {tag.name} tag</span>
              </button>
            )}
          </div>
        ))}
      </div>

      {!readOnly && (
        <div className="flex space-x-2">
          <div className={`relative flex-grow transition-all duration-200 ${inputFocused ? 'shadow-sm ring-1 ring-primary/20 rounded-md' : ''}`}>
            <Input
              ref={inputRef}
              value={newTagName}
              onChange={(e) => setNewTagName(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setInputFocused(true)}
              onBlur={() => setInputFocused(false)}
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
            onClick={throttledAddTag}
            disabled={!newTagName.trim() || !canAddMore}
            className="btn-with-icon transition-all duration-200"
            aria-label="Add tag"
          >
            <Plus className="h-4 w-4" />
            <span>Add</span>
          </Button>
        </div>
      )}
    </div>
  );
};

export default TagEditor;
