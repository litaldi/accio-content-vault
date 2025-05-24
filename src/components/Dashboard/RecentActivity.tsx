
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, ExternalLink, Eye, Tag, ArrowRight } from 'lucide-react';
import { SavedContent } from '@/types';

interface RecentActivityProps {
  recentContent: SavedContent[];
  onViewContent: (content: SavedContent) => void;
  onViewAll: () => void;
}

const RecentActivity: React.FC<RecentActivityProps> = ({
  recentContent,
  onViewContent,
  onViewAll,
}) => {
  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return date.toLocaleDateString();
  };

  const getContentTypeIcon = (content: SavedContent) => {
    if (content.file_url) return '📄';
    if (content.url?.includes('youtube.com') || content.url?.includes('vimeo.com')) return '🎥';
    if (content.url?.includes('github.com')) return '👨‍💻';
    return '🔗';
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Recent Activity
          </CardTitle>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={onViewAll}
            className="text-xs"
          >
            View all
            <ArrowRight className="h-3 w-3 ml-1" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {recentContent.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No recent activity</p>
            <p className="text-xs">Start saving content to see it here</p>
          </div>
        ) : (
          recentContent.slice(0, 5).map((content) => (
            <div
              key={content.id}
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer group"
              onClick={() => onViewContent(content)}
            >
              <div className="text-lg mt-0.5">{getContentTypeIcon(content)}</div>
              
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm line-clamp-1 group-hover:text-primary transition-colors">
                  {content.title}
                </h4>
                <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                  {content.description}
                </p>
                
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {getTimeAgo(content.created_at)}
                  </span>
                  
                  {content.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag.id} variant="outline" className="text-xs h-4 px-1">
                      <Tag className="h-2 w-2 mr-1" />
                      {tag.name}
                    </Badge>
                  ))}
                  
                  {content.tags.length > 2 && (
                    <span className="text-xs text-muted-foreground">
                      +{content.tags.length - 2}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <Eye className="h-3 w-3" />
                </Button>
                
                {content.url && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-6 w-6 p-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(content.url, '_blank');
                    }}
                  >
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                )}
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
