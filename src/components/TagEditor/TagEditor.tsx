
import React from 'react';
// Inline props definition
interface TagEditorProps {
  tags: import('@/types').Tag[];
  onTagsChange: (tags: import('@/types').Tag[]) => void;
  readOnly?: boolean;
  maxTags?: number;
  variant?: 'default' | 'compact';
}
import TagHeader from './TagHeader';
import TagList from './TagList';
import TagInput from './TagInput';
import { useTagEditor } from './useTagEditor';

const TagEditor: React.FC<TagEditorProps> = ({ 
  tags, 
  onTagsChange, 
  readOnly = false,
  maxTags,
  variant = 'default'
}) => {
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

  const isCompact = variant === 'compact';

  return (
    <div className="space-y-4">
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
