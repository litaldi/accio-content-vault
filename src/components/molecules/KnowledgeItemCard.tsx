
import React from 'react';
import { EnhancedCard, EnhancedCardContent, EnhancedCardHeader, EnhancedCardTitle } from '@/components/ui/enhanced-card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Tag } from 'lucide-react';
import { cn } from '@/lib/utils';

interface KnowledgeItem {
  id: string;
  title: string;
  description?: string;
  tags: string[];
  createdAt: string;
  type: 'article' | 'note' | 'video' | 'document';
}

interface KnowledgeItemCardProps {
  item: KnowledgeItem;
  onItemClick?: (item: KnowledgeItem) => void;
  className?: string;
  isSelected?: boolean;
}

export const KnowledgeItemCard: React.FC<KnowledgeItemCardProps> = ({
  item,
  onItemClick,
  className,
  isSelected = false
}) => {
  const handleCardClick = () => {
    onItemClick?.(item);
  };

  return (
    <EnhancedCard
      variant={onItemClick ? "interactive" : "default"}
      className={cn(
        "cursor-pointer transition-all duration-200",
        isSelected && "ring-2 ring-primary",
        className
      )}
      onClick={handleCardClick}
    >
      <EnhancedCardHeader>
        <EnhancedCardTitle className="text-lg line-clamp-2">
          {item.title}
        </EnhancedCardTitle>
        {item.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {item.description}
          </p>
        )}
      </EnhancedCardHeader>
      <EnhancedCardContent className="space-y-3">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Calendar className="h-3 w-3" />
          <span>{new Date(item.createdAt).toLocaleDateString()}</span>
        </div>
        
        {item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            <Tag className="h-3 w-3 text-muted-foreground" />
            {item.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {item.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{item.tags.length - 3}
              </Badge>
            )}
          </div>
        )}
      </EnhancedCardContent>
    </EnhancedCard>
  );
};
