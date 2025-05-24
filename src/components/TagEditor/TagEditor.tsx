
import React from 'react';
import { TagEditorProps } from '@/types';
import { TagHeader } from './TagHeader';
import { TagList } from './TagList';
import { TagInput } from './TagInput';
import { useTagEditor } from './useTagEditor';

const TagEditor: React.FC<TagEditorProps> = ({ 
  tags, 
  onTagsChange, 
  readOnly = false,
  maxTags,
  variant = 'default'
}) => {
  const {
    inputValue,
    setInputValue,
    handleAddTag,
    handleRemoveTag,
    handleInputKeyDown,
    isMaxTagsReached
  } = useTagEditor({ tags, onTagsChange, maxTags });

  return (
    <div className="space-y-4">
      <TagHeader readOnly={readOnly} />
      
      <TagList 
        tags={tags}
        onRemoveTag={handleRemoveTag}
        readOnly={readOnly}
      />
      
      {!readOnly && (
        <TagInput
          value={inputValue}
          onChange={setInputValue}
          onAddTag={handleAddTag}
          onKeyDown={handleInputKeyDown}
          isMaxTagsReached={isMaxTagsReached}
          maxTags={maxTags}
          variant={variant}
        />
      )}
      
      {readOnly && tags.length === 0 && (
        <p className="text-muted-foreground text-sm">No tags added yet</p>
      )}
    </div>
  );
};

export default TagEditor;
