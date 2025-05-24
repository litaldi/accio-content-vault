
import React from 'react';
import { Tag as TagType } from '@/types';
import TagItem from './TagItem';

interface TagListProps {
  tags: TagType[];
  readOnly: boolean;
  activeIndex: number | null;
  containerRef: React.RefObject<HTMLDivElement>;
  onRemoveTag: (tagId: string, tagName: string) => void;
  onTagKeyDown: (e: React.KeyboardEvent, index: number) => void;
}

const TagList: React.FC<TagListProps> = ({
  tags,
  readOnly,
  activeIndex,
  containerRef,
  onRemoveTag,
  onTagKeyDown
}) => {
  return (
    <div 
      ref={containerRef}
      className={`flex flex-wrap gap-2 mb-4 ${tags.length === 0 && readOnly ? 'min-h-8' : ''}`} 
      role="list"
      aria-label="Content tags"
    >
      {tags.length === 0 && readOnly && (
        <p className="text-sm text-muted-foreground">No tags added yet</p>
      )}
      
      {tags.map((tag, index) => (
        <TagItem
          key={tag.id}
          tag={tag}
          index={index}
          activeIndex={activeIndex}
          readOnly={readOnly}
          onRemove={onRemoveTag}
          onKeyDown={onTagKeyDown}
        />
      ))}
    </div>
  );
};

export default TagList;
