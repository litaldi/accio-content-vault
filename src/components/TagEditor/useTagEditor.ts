
import { useState, useRef, useEffect } from 'react';
import { Tag as TagType } from '@/types';
import { throttle } from '@/utils/performance';

interface UseTagEditorProps {
  tags: TagType[];
  onTagsChange: (newTags: TagType[]) => void;
  maxTags?: number;
}

export const useTagEditor = ({ tags, onTagsChange, maxTags = 50 }: UseTagEditorProps) => {
  const [newTagName, setNewTagName] = useState('');
  const [inputFocused, setInputFocused] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const tagsContainerRef = useRef<HTMLDivElement>(null);
  
  const canAddMore = maxTags ? tags.length < maxTags : true;

  // Reset active index when tags change
  useEffect(() => {
    setActiveIndex(null);
  }, [tags.length]);

  const announceToScreenReader = (message: string) => {
    const announcer = document.getElementById('tag-announcer');
    if (announcer) {
      announcer.textContent = message;
    }
  };

  const handleAddTag = () => {
    if (!newTagName.trim() || !canAddMore) return;
    
    // Check if tag already exists (case insensitive)
    const normalizedName = newTagName.trim().toLowerCase();
    const tagExists = tags.some(tag => 
      tag.name.toLowerCase() === normalizedName
    );
    
    if (!tagExists) {
      const newTag: TagType = {
        id: `user-${Date.now()}`,
        name: newTagName.trim(),
        auto_generated: false,
        confirmed: true,
        created_at: new Date().toISOString(), // added created_at
      };
      
      onTagsChange([...tags, newTag]);
      announceToScreenReader(`Tag ${newTagName.trim()} added`);
    }
    
    setNewTagName('');
    inputRef.current?.focus();
  };

  const handleRemoveTag = (tagId: string, tagName: string) => {
    const updatedTags = tags.filter(tag => tag.id !== tagId);
    onTagsChange(updatedTags);
    announceToScreenReader(`Tag ${tagName} removed`);
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
      setActiveIndex(tags.length - 1);
      const tagElements = tagsContainerRef.current?.querySelectorAll('[role="listitem"] button');
      if (tagElements && tagElements.length > 0) {
        (tagElements[tagElements.length - 1] as HTMLElement).focus();
      }
    }
  };

  const handleTagKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'ArrowLeft' && index > 0) {
      setActiveIndex(index - 1);
      const tagElements = tagsContainerRef.current?.querySelectorAll('[role="listitem"] button');
      if (tagElements && tagElements[index - 1]) {
        (tagElements[index - 1] as HTMLElement).focus();
      }
    } else if (e.key === 'ArrowRight') {
      if (index < tags.length - 1) {
        setActiveIndex(index + 1);
        const tagElements = tagsContainerRef.current?.querySelectorAll('[role="listitem"] button');
        if (tagElements && tagElements[index + 1]) {
          (tagElements[index + 1] as HTMLElement).focus();
        }
      } else {
        inputRef.current?.focus();
        setActiveIndex(null);
      }
    }
  };

  const throttledAddTag = throttle(handleAddTag, 300);

  return {
    newTagName,
    setNewTagName,
    inputFocused,
    setInputFocused,
    activeIndex,
    inputRef,
    tagsContainerRef,
    canAddMore,
    handleAddTag: throttledAddTag,
    handleRemoveTag,
    handleKeyDown,
    handleTagKeyDown,
  };
};
