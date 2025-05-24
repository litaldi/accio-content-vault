
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, ExternalLink } from 'lucide-react';

interface RecentlyViewedProps {
  recentItems: any[];
  onViewAll: () => void;
  onItemClick: (item: any) => void;
}

export const RecentlyViewed: React.FC<RecentlyViewedProps> = ({
  recentItems,
  onViewAll,
  onItemClick
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Clock className="h-5 w-5" />
          Recently Viewed
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {recentItems.length > 0 ? (
          <>
            {recentItems.map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors cursor-pointer"
                onClick={() => onItemClick(item)}
              >
                <h4 className="font-medium text-sm mb-1 line-clamp-1">{item.title}</h4>
                <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                  {item.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {new Date(item.created_at).toLocaleDateString()}
                  </span>
                  <ExternalLink className="h-3 w-3 text-muted-foreground" />
                </div>
              </div>
            ))}
            <Button variant="ghost" size="sm" onClick={onViewAll} className="w-full">
              View All
            </Button>
          </>
        ) : (
          <p className="text-sm text-muted-foreground text-center py-4">
            No recent items to show
          </p>
        )}
      </CardContent>
    </Card>
  );
};
