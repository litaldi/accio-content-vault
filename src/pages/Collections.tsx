
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FolderOpen, Plus, Grid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Collections = () => {
  const collections = [
    {
      name: "AI & Machine Learning",
      description: "Latest research and articles on artificial intelligence",
      itemCount: 23,
      color: "bg-blue-500"
    },
    {
      name: "Product Management",
      description: "Best practices and strategies for product development",
      itemCount: 15,
      color: "bg-green-500"
    },
    {
      name: "Design Systems",
      description: "UI/UX design patterns and component libraries",
      itemCount: 31,
      color: "bg-purple-500"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Collections - Accio</title>
        <meta name="description" content="Organize your saved content into themed collections for better knowledge management." />
      </Helmet>

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Collections</h1>
            <p className="text-muted-foreground">Organize your content into themed collections</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Collection
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((collection, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-3 h-3 rounded-full ${collection.color}`} />
                  <FolderOpen className="h-5 w-5 text-muted-foreground" />
                </div>
                <CardTitle className="text-lg">{collection.name}</CardTitle>
                <CardDescription>{collection.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {collection.itemCount} items
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {collections.length === 0 && (
          <div className="text-center py-12">
            <FolderOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No collections yet</h3>
            <p className="text-muted-foreground mb-4">
              Create your first collection to organize your saved content
            </p>
            <Button>Create Collection</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Collections;
