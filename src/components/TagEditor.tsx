
import React, { useState } from 'react';
import { Tag as TagType } from '@/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { X, Plus } from 'lucide-react';

interface TagEditorProps {
  tags: TagType[];
  onTagsChange: (newTags: TagType[]) => void;
  readOnly?: boolean;
}

const TagEditor: React.FC<TagEditorProps> = ({ tags, onTagsChange, readOnly = false }) => {
  const [newTagName, setNewTagName] = useState('');
  const [inputFocused, setInputFocused] = useState(false);

  const handleAddTag = () => {
    if (!newTagName.trim()) return;
    
    // Check if tag already exists
    const tagExists = tags.some(tag => 
      tag.name.toLowerCase() === newTagName.toLowerCase()
    );
    
    if (!tagExists) {
      const newTag: TagType = {
        id: `user-${Date.now()}`, // In production, this ID would come from the server
        name: newTagName.trim(),
        auto_generated: false,
        confirmed: true,
      };
      
      onTagsChange([...tags, newTag]);
    }
    
    setNewTagName('');
  };

  const handleRemoveTag = (tagId: string) => {
    const updatedTags = tags.filter(tag => tag.id !== tagId);
    onTagsChange(updatedTags);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };
  
  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map(tag => (
          <div 
            key={tag.id} 
            className={`
              inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
              ${tag.auto_generated 
                ? 'bg-accent/20 text-accent-foreground' 
                : 'bg-primary/20 text-primary-foreground'}
              ${!readOnly && 'pr-1'}
              animate-scale-in transition-all duration-200 hover:bg-opacity-30
            `}
            role="listitem"
          >
            {tag.name}
            {!readOnly && (
              <button
                type="button"
                onClick={() => handleRemoveTag(tag.id)}
                className="ml-1 rounded-full p-0.5 hover:bg-accent/30 transition-colors"
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
              value={newTagName}
              onChange={(e) => setNewTagName(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setInputFocused(true)}
              onBlur={() => setInputFocused(false)}
              placeholder="Add a tag..."
              className="w-full transition-all"
              aria-label="New tag name"
            />
          </div>
          <Button 
            type="button" 
            size="sm"
            onClick={handleAddTag}
            disabled={!newTagName.trim()}
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
