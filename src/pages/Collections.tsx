
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import EnhancedUnifiedLayout from '@/components/layout/EnhancedUnifiedLayout';
import { UnifiedTypography, UnifiedSpacing } from '@/components/ui/unified-design-system';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Folder, FileText, Calendar, Tag } from 'lucide-react';
import { cn } from '@/lib/utils';

const Collections = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for collections
  const collections = [
    {
      id: 1,
      name: "Web Development",
      description: "Articles and resources about modern web development",
      itemCount: 23,
      tags: ["JavaScript", "React", "CSS"],
      lastUpdated: "2 days ago",
      color: "bg-blue-500"
    },
    {
      id: 2,
      name: "Design Inspiration",
      description: "UI/UX designs and creative inspiration",
      itemCount: 15,
      tags: ["Design", "UI/UX", "Inspiration"],
      lastUpdated: "1 week ago",
      color: "bg-purple-500"
    },
    {
      id: 3,
      name: "Research Papers",
      description: "Academic papers and research materials",
      itemCount: 8,
      tags: ["Research", "Academic", "Science"],
      lastUpdated: "3 days ago",
      color: "bg-green-500"
    },
    {
      id: 4,
      name: "Productivity Tips",
      description: "Tools and techniques for better productivity",
      itemCount: 31,
      tags: ["Productivity", "Tools", "Workflows"],
      lastUpdated: "5 days ago",
      color: "bg-orange-500"
    }
  ];

  const filteredCollections = collections.filter(collection =>
    collection.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    collection.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    collection.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <EnhancedUnifiedLayout>
      <Helmet>
        <title>Collections - Accio Knowledge Library</title>
        <meta name="description" content="Organize your saved content into collections for easy access and management." />
      </Helmet>

      <UnifiedSpacing.Section>
        <UnifiedSpacing.Container>
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <UnifiedTypography.H1>Collections</UnifiedTypography.H1>
              <UnifiedTypography.Lead>
                Organize your knowledge into meaningful collections.
              </UnifiedTypography.Lead>
            </div>
            <Button className="shrink-0">
              <Plus className="h-4 w-4 mr-2" />
              New Collection
            </Button>
          </div>

          {/* Search */}
          <div className="relative mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search collections..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Collections Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCollections.map((collection) => (
              <Card 
                key={collection.id} 
                className="hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className={cn(
                      "w-12 h-12 rounded-lg flex items-center justify-center",
                      collection.color
                    )}>
                      <Folder className="h-6 w-6 text-white" />
                    </div>
                    <Badge variant="secondary">
                      {collection.itemCount} items
                    </Badge>
                  </div>
                  <CardTitle className="line-clamp-1">{collection.name}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {collection.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {collection.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  {/* Last Updated */}
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-3 w-3 mr-1" />
                    Updated {collection.lastUpdated}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {filteredCollections.length === 0 && (
            <div className="text-center py-12">
              <Folder className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <UnifiedTypography.H3 className="mb-2">
                {searchQuery ? 'No collections found' : 'No collections yet'}
              </UnifiedTypography.H3>
              <UnifiedTypography.Body className="text-muted-foreground mb-4">
                {searchQuery 
                  ? 'Try adjusting your search terms.'
                  : 'Create your first collection to organize your content.'
                }
              </UnifiedTypography.Body>
              {!searchQuery && (
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Collection
                </Button>
              )}
            </div>
          )}
        </UnifiedSpacing.Container>
      </UnifiedSpacing.Section>
    </EnhancedUnifiedLayout>
  );
};

export default Collections;
