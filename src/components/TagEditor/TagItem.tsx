
import React from 'react';
import { Tag as TagType } from '@/types';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TagItemProps {
  tag: TagType;
  index: number;
  activeIndex: number | null;
  readOnly: boolean;
  onRemove: (tagId: string, tagName: string) => void;
  onKeyDown: (e: React.KeyboardEvent, index: number) => void;
}

const TagItem: React.FC<TagItemProps> = ({
  tag,
  index,
  activeIndex,
  readOnly,
  onRemove,
  onKeyDown
}) => {
  return (
    <div 
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        tag.auto_generated 
          ? 'bg-accent/20 text-accent-foreground' 
          : 'bg-primary/20 text-primary-foreground',
        !readOnly && 'pr-1',
        "animate-scale-in transition-all duration-200 hover:bg-opacity-30",
        activeIndex === index ? 'ring-2 ring-primary ring-offset-2' : ''
      )}
      role="listitem"
    >
      {tag.name}
      {!readOnly && (
        <button
          type="button"
          onClick={() => onRemove(tag.id, tag.name)}
          onKeyDown={(e) => onKeyDown(e, index)}
          className="ml-1 rounded-full p-0.5 hover:bg-accent/30 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
          aria-label={`Remove ${tag.name} tag`}
        >
          <X className="h-3 w-3" />
          <span className="sr-only">Remove {tag.name} tag</span>
        </button>
      )}
    </div>
  );
};

export default TagItem;
