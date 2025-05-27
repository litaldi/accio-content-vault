
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Bookmark, 
  Search, 
  Filter,
  ExternalLink,
  Tag,
  Calendar,
  FileText,
  Link as LinkIcon,
  Grid,
  List,
  SortAsc,
  Plus
} from 'lucide-react';

const SavedContent = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  const savedItems = [
    {
      id: '1',
      title: 'The Future of Web Development',
      type: 'article',
      url: 'https://example.com/article',
      description: 'An in-depth look at emerging technologies shaping web development.',
      tags: ['Web Dev', 'Technology', 'Future'],
      savedAt: '2024-01-15',
      readTime: '8 min read',
    },
    {
      id: '2',
      title: 'Design System Documentation',
      type: 'note',
      description: 'Personal notes on building scalable design systems.',
      tags: ['Design', 'Systems', 'Documentation'],
      savedAt: '2024-01-14',
      readTime: '5 min read',
    },
    {
      id: '3',
      title: 'React Performance Tips',
      type: 'article',
      url: 'https://example.com/react-tips',
      description: 'Best practices for optimizing React applications.',
      tags: ['React', 'Performance', 'Optimization'],
      savedAt: '2024-01-13',
      readTime: '12 min read',
    },
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'article': return LinkIcon;
      case 'note': return FileText;
      default: return Bookmark;
    }
  };

  const filteredItems = savedItems.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Saved Content - Accio</title>
        <meta name="description" content="All your saved articles, notes, and ideas in one organized place." />
      </Helmet>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Bookmark className="h-8 w-8 text-primary" />
              Saved Content
            </h1>
            <p className="text-muted-foreground mt-2">
              All your saved articles, notes, and ideas in one place
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2">
              <Plus className="h-4 w-4" />
              Save New
            </Button>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create Collection
            </Button>
          </div>
        </div>

        {/* Search and Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search your saved content..." 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
            
            <Button variant="outline" size="sm" className="gap-2">
              <SortAsc className="h-4 w-4" />
              Sort
            </Button>
            
            <div className="flex items-center border rounded-lg p-1">
              <Button
                variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="h-8 px-2"
                aria-label="Grid view"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="h-8 px-2"
                aria-label="List view"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Content Grid/List */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <Bookmark className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium mb-2">No content found</h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery ? 'Try adjusting your search terms' : 'Start saving content to see it here'}
            </p>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Save Your First Item
            </Button>
          </div>
        ) : (
          <div className={viewMode === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
            : "space-y-4"
          }>
            {filteredItems.map((item) => {
              const TypeIcon = getTypeIcon(item.type);
              
              return (
                <Card 
                  key={item.id} 
                  className={`hover:shadow-lg transition-all duration-200 cursor-pointer group ${
                    viewMode === 'list' ? 'hover:bg-accent/50' : ''
                  }`}
                >
                  <CardContent className={viewMode === 'grid' ? "p-6" : "p-4"}>
                    <div className={viewMode === 'list' 
                      ? "flex items-start justify-between gap-4" 
                      : "space-y-4"
                    }>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <TypeIcon className="h-4 w-4 text-primary flex-shrink-0" />
                          <h3 className="font-semibold line-clamp-1 group-hover:text-primary transition-colors">
                            {item.title}
                          </h3>
                          <Badge variant="outline" className="text-xs">
                            {item.type}
                          </Badge>
                        </div>
                        
                        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                          {item.description}
                        </p>
                        
                        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mb-3">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(item.savedAt).toLocaleDateString()}
                          </span>
                          {item.readTime && (
                            <span>• {item.readTime}</span>
                          )}
                          {item.url && (
                            <span className="flex items-center gap-1 hover:text-primary cursor-pointer">
                              <ExternalLink className="h-3 w-3" />
                              View Original
                            </span>
                          )}
                        </div>
                        
                        <div className="flex flex-wrap gap-1">
                          {item.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              <Tag className="h-2 w-2 mr-1" />
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      {viewMode === 'list' && (
                        <div className="flex flex-col gap-2">
                          <Button variant="ghost" size="sm">
                            Open
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedContent;
