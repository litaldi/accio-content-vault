
import React from 'react';
import { Tag as TagType } from '@/types';
import { useFocusTrap } from '@/hooks/use-focus-trap';
import { useTagEditor } from './TagEditor/useTagEditor';
import TagHeader from './TagEditor/TagHeader';
import TagList from './TagEditor/TagList';
import TagInput from './TagEditor/TagInput';

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
  const trapRef = useFocusTrap();
  const isCompact = variant === 'compact';
  
  const {
    newTagName,
    setNewTagName,
    inputFocused,
    setInputFocused,
    activeIndex,
    inputRef,
    tagsContainerRef,
    canAddMore,
    handleAddTag,
    handleRemoveTag,
    handleKeyDown,
    handleTagKeyDown,
  } = useTagEditor({ tags, onTagsChange, maxTags });
  
  return (
    <div className={`tag-editor ${className}`} ref={trapRef as React.RefObject<HTMLDivElement>}>
      {/* Visually hidden announcer for screen readers */}
      <div 
        id="tag-announcer" 
        role="status" 
        aria-live="polite" 
        className="sr-only"
      />
      
      <TagHeader
        isCompact={isCompact}
        readOnly={readOnly}
        tagCount={tags.length}
        maxTags={maxTags}
      />
      
      <TagList
        tags={tags}
        readOnly={readOnly}
        activeIndex={activeIndex}
        containerRef={tagsContainerRef}
        onRemoveTag={handleRemoveTag}
        onTagKeyDown={handleTagKeyDown}
      />

      {!readOnly && (
        <TagInput
          newTagName={newTagName}
          canAddMore={canAddMore}
          maxTags={maxTags}
          isCompact={isCompact}
          inputFocused={inputFocused}
          inputRef={inputRef}
          onNewTagNameChange={setNewTagName}
          onKeyDown={handleKeyDown}
          onFocus={() => setInputFocused(true)}
          onBlur={() => setInputFocused(false)}
          onAddTag={handleAddTag}
        />
      )}
    </div>
  );
};

export default TagEditor;
