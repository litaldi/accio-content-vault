
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { EmptyState } from '@/components/ui/empty-state';
import { QuickActionBar } from '@/components/ui/quick-action-bar';
import { 
  Bookmark, 
  Search, 
  Filter,
  Grid,
  List,
  Plus,
  Tag,
  Clock,
  ExternalLink,
  MoreHorizontal,
  Star,
  Archive,
  Trash2
} from 'lucide-react';
import { Link } from 'react-router-dom';

const SavedContent = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const savedItems = [
    {
      id: '1',
      title: 'React Performance Optimization Guide',
      type: 'article',
      url: 'https://example.com/react-performance',
      description: 'A comprehensive guide to optimizing React applications for better performance and user experience.',
      tags: ['React', 'Performance', 'JavaScript'],
      savedAt: '2 hours ago',
      readTime: '8 min read',
      thumbnail: null,
      isStarred: true,
    },
    {
      id: '2',
      title: 'Design System Best Practices',
      type: 'note',
      url: null,
      description: 'Key principles for building scalable design systems that work across teams and products.',
      tags: ['Design', 'Systems', 'UI/UX'],
      savedAt: '5 hours ago',
      readTime: '3 min read',
      thumbnail: null,
      isStarred: false,
    },
    {
      id: '3',
      title: 'Machine Learning Fundamentals',
      type: 'pdf',
      url: 'https://example.com/ml-fundamentals.pdf',
      description: 'Complete introduction to machine learning concepts, algorithms, and practical applications.',
      tags: ['ML', 'AI', 'Data Science'],
      savedAt: '1 day ago',
      readTime: '25 min read',
      thumbnail: null,
      isStarred: false,
    },
  ];

  const filters = [
    { id: 'all', label: 'All Items', count: savedItems.length },
    { id: 'articles', label: 'Articles', count: savedItems.filter(item => item.type === 'article').length },
    { id: 'notes', label: 'Notes', count: savedItems.filter(item => item.type === 'note').length },
    { id: 'pdfs', label: 'PDFs', count: savedItems.filter(item => item.type === 'pdf').length },
    { id: 'starred', label: 'Starred', count: savedItems.filter(item => item.isStarred).length },
  ];

  const filteredItems = savedItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesFilter = selectedFilter === 'all' ||
                         (selectedFilter === 'starred' && item.isStarred) ||
                         item.type === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'article':
        return '📰';
      case 'note':
        return '📝';
      case 'pdf':
        return '📄';
      default:
        return '📎';
    }
  };

  const ItemCard = ({ item }: { item: typeof savedItems[0] }) => (
    <Card className="group hover:shadow-md transition-all duration-200 hover:scale-[1.02]">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg" role="img" aria-label={`${item.type} type`}>
              {getTypeIcon(item.type)}
            </span>
            <Badge variant="outline" className="text-xs">
              {item.type}
            </Badge>
            {item.isStarred && (
              <Star className="h-4 w-4 text-yellow-500 fill-current" aria-label="Starred item" />
            )}
          </div>
          <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">More options</span>
          </Button>
        </div>
        <CardTitle className="text-lg line-clamp-2 leading-tight">
          {item.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2 leading-relaxed">
          {item.description}
        </p>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {item.tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{item.savedAt}</span>
          </div>
          <span>{item.readTime}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Button size="sm" className="flex-1">
            Open
          </Button>
          {item.url && (
            <Button variant="outline" size="icon">
              <ExternalLink className="h-3 w-3" />
              <span className="sr-only">Open original link</span>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  const ItemRow = ({ item }: { item: typeof savedItems[0] }) => (
    <Card className="hover:shadow-sm transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-lg" role="img" aria-label={`${item.type} type`}>
              {getTypeIcon(item.type)}
            </span>
            {item.isStarred && (
              <Star className="h-4 w-4 text-yellow-500 fill-current" aria-label="Starred item" />
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-medium line-clamp-1">{item.title}</h3>
              <Badge variant="outline" className="text-xs">
                {item.type}
              </Badge>
            </div>
            <p className="text-muted-foreground text-sm line-clamp-1 mb-2">
              {item.description}
            </p>
            <div className="flex flex-wrap gap-1">
              {item.tags.slice(0, 3).map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {item.tags.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{item.tags.length - 3}
                </Badge>
              )}
            </div>
          </div>
          
          <div className="text-xs text-muted-foreground text-right">
            <div>{item.savedAt}</div>
            <div>{item.readTime}</div>
          </div>
          
          <Button size="sm">
            Open
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Saved Content - Accio</title>
        <meta name="description" content="Browse and manage your saved content in your knowledge library" />
      </Helmet>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Bookmark className="h-8 w-8 text-primary" />
              Saved Content
            </h1>
            <p className="text-muted-foreground mt-2">
              Your personal knowledge library of saved articles, notes, and resources
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" asChild>
              <Link to="/search" className="gap-2">
                <Search className="h-4 w-4" />
                Search
              </Link>
            </Button>
            <Button size="sm" className="gap-2" asChild>
              <Link to="/save">
                <Plus className="h-4 w-4" />
                Add Content
              </Link>
            </Button>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search your saved content..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                aria-label="Search saved content"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-muted rounded-lg p-1">
              {filters.map((filter) => (
                <Button
                  key={filter.id}
                  variant={selectedFilter === filter.id ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setSelectedFilter(filter.id)}
                  className="gap-1"
                >
                  {filter.label}
                  <Badge variant="secondary" className="text-xs">
                    {filter.count}
                  </Badge>
                </Button>
              ))}
            </div>
            
            <div className="flex items-center bg-muted rounded-lg p-1">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="icon"
                onClick={() => setViewMode('grid')}
                aria-label="Grid view"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="icon"
                onClick={() => setViewMode('list')}
                aria-label="List view"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        {filteredItems.length === 0 ? (
          <EmptyState
            icon={searchQuery ? Search : Bookmark}
            title={searchQuery ? 'No matching content found' : 'No saved content yet'}
            description={
              searchQuery 
                ? 'Try adjusting your search terms or filters to find what you\'re looking for.'
                : 'Start building your knowledge library by saving articles, notes, and resources you want to remember.'
            }
            actionLabel="Add Your First Item"
            actionHref="/save"
          />
        ) : (
          <>
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item) => (
                  <ItemCard key={item.id} item={item} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredItems.map((item) => (
                  <ItemRow key={item.id} item={item} />
                ))}
              </div>
            )}
            
            {/* Load More */}
            {filteredItems.length >= 10 && (
              <div className="mt-12 text-center">
                <Button variant="outline" className="gap-2">
                  Load More Content
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </>
        )}

        {/* Quick Actions for Mobile */}
        <QuickActionBar variant="inline" className="mt-8 lg:hidden" />
      </div>
    </div>
  );
};

export default SavedContent;
