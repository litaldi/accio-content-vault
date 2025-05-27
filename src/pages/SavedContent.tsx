
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import AuthenticatedLayout from '@/components/layout/AuthenticatedLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Bookmark,
  Search,
  Filter,
  Clock,
  Tag,
  FileText,
  Video,
  Image,
  ExternalLink,
  MoreVertical,
  Star,
  Archive
} from 'lucide-react';

const SavedContent = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All Content', count: 47 },
    { id: 'articles', label: 'Articles', count: 23 },
    { id: 'videos', label: 'Videos', count: 12 },
    { id: 'images', label: 'Images', count: 8 },
    { id: 'favorites', label: 'Favorites', count: 4 }
  ];

  const savedItems = [
    {
      id: '1',
      title: 'React Performance Optimization Techniques',
      url: 'https://example.com/react-performance',
      type: 'article',
      excerpt: 'Learn how to optimize your React applications for better performance with advanced techniques...',
      tags: ['React', 'Performance', 'Frontend'],
      savedDate: '2 days ago',
      readTime: '8 min',
      isFavorite: true
    },
    {
      id: '2',
      title: 'Advanced TypeScript Patterns',
      url: 'https://example.com/typescript-patterns',
      type: 'video',
      excerpt: 'Deep dive into advanced TypeScript patterns and best practices for large applications...',
      tags: ['TypeScript', 'Programming', 'Tutorial'],
      savedDate: '1 week ago',
      readTime: '45 min',
      isFavorite: false
    },
    {
      id: '3',
      title: 'Design System Guidelines',
      url: 'https://example.com/design-systems',
      type: 'pdf',
      excerpt: 'Comprehensive guide to building scalable design systems for modern applications...',
      tags: ['Design', 'Systems', 'UI/UX'],
      savedDate: '3 days ago',
      readTime: '15 min',
      isFavorite: false
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return Video;
      case 'image': return Image;
      default: return FileText;
    }
  };

  const filteredItems = savedItems.filter(item => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'favorites') return item.isFavorite;
    return item.type === selectedFilter.slice(0, -1); // Remove 's' from plural
  });

  return (
    <AuthenticatedLayout>
      <div className="min-h-screen bg-background">
        <Helmet>
          <title>Saved Content - Accio</title>
          <meta name="description" content="Browse and manage your saved content collection" />
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
                Your personal knowledge collection
              </p>
            </div>
            
            <Button className="gap-2" asChild>
              <a href="/save">
                <Bookmark className="h-4 w-4" />
                Save New Content
              </a>
            </Button>
          </div>

          {/* Search and Filters */}
          <div className="space-y-4 mb-6">
            <div className="flex gap-2">
              <Input
                placeholder="Search your saved content..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
              <Button variant="outline" className="gap-2">
                <Search className="h-4 w-4" />
                Search
              </Button>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <Button
                  key={filter.id}
                  variant={selectedFilter === filter.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedFilter(filter.id)}
                  className="gap-2"
                >
                  {filter.label}
                  <Badge variant="secondary" className="text-xs">
                    {filter.count}
                  </Badge>
                </Button>
              ))}
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid gap-4">
            {filteredItems.map((item) => {
              const TypeIcon = getTypeIcon(item.type);
              
              return (
                <Card key={item.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1 min-w-0">
                        <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
                          <TypeIcon className="h-6 w-6 text-accent-foreground" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-lg line-clamp-1 hover:text-primary cursor-pointer">
                              {item.title}
                            </h3>
                            {item.isFavorite && (
                              <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            )}
                          </div>
                          
                          <p className="text-muted-foreground mb-3 line-clamp-2">
                            {item.excerpt}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex flex-wrap gap-1">
                              {item.tags.map((tag, tagIndex) => (
                                <Badge key={tagIndex} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {item.readTime}
                              </span>
                              <span>Saved {item.savedDate}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" asChild>
                          <a href={item.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <Archive className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No content found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filters, or save some new content to get started.
              </p>
            </div>
          )}
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default SavedContent;
