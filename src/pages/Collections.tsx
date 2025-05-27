
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FolderOpen, Plus, Search, Grid, List, Filter } from 'lucide-react';

const Collections = () => {
  const collections = [
    {
      name: 'Web Development',
      items: 24,
      description: 'Articles, tutorials, and resources about web development',
      color: 'bg-blue-500'
    },
    {
      name: 'Design Inspiration',
      items: 18,
      description: 'UI/UX designs, color palettes, and creative ideas',
      color: 'bg-purple-500'
    },
    {
      name: 'Research Papers',
      items: 12,
      description: 'Academic papers and research documents',
      color: 'bg-green-500'
    },
    {
      name: 'Business Ideas',
      items: 8,
      description: 'Startup ideas, market research, and business plans',
      color: 'bg-orange-500'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Collections - Accio Knowledge Management</title>
        <meta name="description" content="Organize your knowledge into collections. Create, manage, and explore your organized content collections." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">Collections</h1>
              <p className="text-muted-foreground mt-2">
                Organize your knowledge into meaningful collections
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Collection
              </Button>
            </div>
          </div>

          {/* View Toggle */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Grid className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <List className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {collections.length} collections
              </span>
            </div>
          </div>

          {/* Collections Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {collections.map((collection, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 ${collection.color} rounded-lg flex items-center justify-center`}>
                      <FolderOpen className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{collection.name}</CardTitle>
                      <Badge variant="secondary">{collection.items} items</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>{collection.description}</CardDescription>
                </CardContent>
              </Card>
            ))}

            {/* Create New Collection Card */}
            <Card className="border-2 border-dashed border-muted-foreground/25 hover:border-primary/50 transition-colors cursor-pointer">
              <CardContent className="flex flex-col items-center justify-center h-40 text-center">
                <Plus className="h-8 w-8 text-muted-foreground mb-2" />
                <h3 className="font-medium mb-1">Create New Collection</h3>
                <p className="text-sm text-muted-foreground">
                  Organize your content into a new collection
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Empty State Help */}
          <div className="mt-12 text-center">
            <div className="max-w-md mx-auto">
              <h3 className="text-lg font-medium mb-2">Getting Started with Collections</h3>
              <p className="text-muted-foreground mb-4">
                Collections help you organize related content together. Create your first collection 
                to start organizing your knowledge base.
              </p>
              <Button variant="outline">
                Learn More About Collections
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Collections;
