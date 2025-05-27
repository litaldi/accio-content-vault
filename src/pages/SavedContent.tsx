
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
  Link
} from 'lucide-react';

const SavedContent = () => {
  const savedItems = [
    {
      id: '1',
      title: 'The Future of Web Development',
      type: 'article',
      url: 'https://example.com/article',
      description: 'An in-depth look at emerging technologies shaping web development.',
      tags: ['Web Dev', 'Technology', 'Future'],
      savedAt: '2024-01-15',
    },
    {
      id: '2',
      title: 'Design System Documentation',
      type: 'note',
      description: 'Personal notes on building scalable design systems.',
      tags: ['Design', 'Systems', 'Documentation'],
      savedAt: '2024-01-14',
    },
    {
      id: '3',
      title: 'React Performance Tips',
      type: 'article',
      url: 'https://example.com/react-tips',
      description: 'Best practices for optimizing React applications.',
      tags: ['React', 'Performance', 'Optimization'],
      savedAt: '2024-01-13',
    },
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'article': return Link;
      case 'note': return FileText;
      default: return Bookmark;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Saved Content - Accio</title>
      </Helmet>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Bookmark className="h-8 w-8 text-primary" />
              Saved Content
            </h1>
            <p className="text-muted-foreground mt-2">
              All your saved articles, notes, and ideas in one place
            </p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search your saved content..." className="pl-10" />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>

        {/* Content Grid */}
        <div className="space-y-4">
          {savedItems.map((item) => {
            const TypeIcon = getTypeIcon(item.type);
            
            return (
              <Card key={item.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <TypeIcon className="h-4 w-4 text-primary" />
                        <h3 className="font-semibold">{item.title}</h3>
                        <Badge variant="outline" className="text-xs">{item.type}</Badge>
                      </div>
                      
                      <p className="text-muted-foreground mb-3">{item.description}</p>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(item.savedAt).toLocaleDateString()}
                        </span>
                        {item.url && (
                          <span className="flex items-center gap-1">
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
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SavedContent;
