
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, ArrowRight } from 'lucide-react';
import { SavedContent } from '@/types';
import { formatDistanceToNow } from 'date-fns';

interface RecentlyViewedProps {
  recentItems: SavedContent[];
  onViewAll: () => void;
  onItemClick: (content: SavedContent) => void;
}

export const RecentlyViewed: React.FC<RecentlyViewedProps> = ({
  recentItems,
  onViewAll,
  onItemClick,
}) => {
  if (recentItems.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="flex items-center gap-2 text-sm font-medium">
          <Clock className="h-4 w-4" />
          Recently Viewed
        </CardTitle>
        <Button variant="ghost" size="sm" onClick={onViewAll} className="h-8 px-2">
          <span className="text-xs">View All</span>
          <ArrowRight className="h-3 w-3 ml-1" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {recentItems.slice(0, 3).map((item) => (
          <div
            key={item.id}
            className="flex items-start gap-3 p-2 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
            onClick={() => onItemClick(item)}
          >
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium line-clamp-1 mb-1">
                {item.title}
              </h4>
              <p className="text-xs text-muted-foreground">
                Viewed {formatDistanceToNow(new Date(item.created_at), { addSuffix: true })}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
