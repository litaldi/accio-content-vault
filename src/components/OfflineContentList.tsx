
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SavedContent } from '@/types';
import { formatDistanceToNow } from 'date-fns';
import { File, FileText, Image, Link, Search, Filter, Download, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import LazyContentDetailView from './LazyContentDetailView';

interface OfflineContentListProps {
  contents: SavedContent[];
  isOnline: boolean;
  className?: string;
}

const OfflineContentList: React.FC<OfflineContentListProps> = ({
  contents,
  isOnline,
  className
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContent, setSelectedContent] = useState<SavedContent | null>(null);
  const [filterType, setFilterType] = useState<'all' | 'url' | 'file'>('all');

  // Filter and search content
  const filteredContents = contents.filter(content => {
    const matchesSearch = !searchQuery || 
      content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      content.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      content.tags.some(tag => tag.name.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesType = filterType === 'all' || 
      (filterType === 'url' && content.url) ||
      (filterType === 'file' && content.file_url);

    return matchesSearch && matchesType;
  });

  const renderContentIcon = (content: SavedContent) => {
    if (content.file_type === 'pdf') {
      return <FileText className="h-5 w-5 text-red-500" />;
    } else if (content.file_type === 'image') {
      return <Image className="h-5 w-5 text-blue-500" />;
    } else {
      return <Link className="h-5 w-5 text-green-500" />;
    }
  };

  const getOfflineStatus = (content: SavedContent) => {
    const offlineContent = content as any;
    if (offlineContent.isOfflineOnly) {
      return { label: 'Offline Only', variant: 'secondary' as const };
    }
    return { label: 'Cached', variant: 'outline' as const };
  };

  if (contents.length === 0) {
    return (
      <div className={cn("text-center py-12", className)}>
        <Download className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-medium mb-2">No offline content</h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          {isOnline 
            ? "Your content will be automatically cached for offline access when you browse."
            : "Connect to the internet to cache content for offline viewing."
          }
        </p>
      </div>
    );
  }

  return (
    <div className={cn("space-y-6", className)}>
      {/* Search and Filter Controls */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search offline content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button
            variant={filterType === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterType('all')}
            className="flex items-center gap-2"
          >
            <Filter className="h-3 w-3" />
            All ({contents.length})
          </Button>
          <Button
            variant={filterType === 'url' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterType('url')}
            className="flex items-center gap-2"
          >
            <Link className="h-3 w-3" />
            Links ({contents.filter(c => c.url).length})
          </Button>
          <Button
            variant={filterType === 'file' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterType('file')}
            className="flex items-center gap-2"
          >
            <File className="h-3 w-3" />
            Files ({contents.filter(c => c.file_url).length})
          </Button>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredContents.map((content) => {
          const offlineStatus = getOfflineStatus(content);
          
          return (
            <Card 
              key={content.id} 
              className="hover:shadow-md transition-shadow cursor-pointer group"
              onClick={() => setSelectedContent(content)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    {renderContentIcon(content)}
                    <CardTitle className="text-sm line-clamp-2 group-hover:text-primary transition-colors">
                      {content.title || 'Untitled Content'}
                    </CardTitle>
                  </div>
                  <Badge variant={offlineStatus.variant} className="shrink-0 ml-2">
                    {offlineStatus.label}
                  </Badge>
                </div>
                
                <CardDescription className="flex items-center gap-1 text-xs">
                  <Clock className="h-3 w-3" />
                  {formatDistanceToNow(new Date(content.created_at), { addSuffix: true })}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pt-0">
                {content.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                    {content.description}
                  </p>
                )}
                
                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {content.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag.id} variant="secondary" className="text-xs">
                      {tag.name}
                    </Badge>
                  ))}
                  {content.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{content.tags.length - 3}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* No results */}
      {filteredContents.length === 0 && searchQuery && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">
            No offline content matches your search.
          </p>
        </div>
      )}

      {/* Content Detail Modal */}
      {selectedContent && (
        <LazyContentDetailView
          content={selectedContent}
          isOpen={!!selectedContent}
          onClose={() => setSelectedContent(null)}
        />
      )}
    </div>
  );
};

export default OfflineContentList;
