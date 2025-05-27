
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { PlayCircle, Clock, Users, Star } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Tutorials = () => {
  const tutorials = [
    {
      title: "Getting Started with Accio",
      description: "Learn the basics of saving, organizing, and finding your content",
      duration: "5 min",
      difficulty: "Beginner",
      rating: 4.9,
      thumbnail: "/api/placeholder/300/200"
    },
    {
      title: "Advanced Search Techniques",
      description: "Master powerful search features to find exactly what you need",
      duration: "8 min",
      difficulty: "Intermediate",
      rating: 4.8,
      thumbnail: "/api/placeholder/300/200"
    },
    {
      title: "AI Features Deep Dive",
      description: "Explore how AI can enhance your knowledge management workflow",
      duration: "12 min",
      difficulty: "Advanced",
      rating: 4.9,
      thumbnail: "/api/placeholder/300/200"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Tutorials - Accio</title>
        <meta name="description" content="Learn how to use Accio effectively with our comprehensive video tutorials and guides." />
      </Helmet>

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Tutorials</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Master Accio with our step-by-step video tutorials and guides
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tutorials.map((tutorial, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
              <div className="relative">
                <div className="w-full h-48 bg-muted flex items-center justify-center">
                  <PlayCircle className="h-12 w-12 text-primary group-hover:scale-110 transition-transform" />
                </div>
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="bg-black/50 text-white">
                    <Clock className="h-3 w-3 mr-1" />
                    {tutorial.duration}
                  </Badge>
                </div>
              </div>
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant={tutorial.difficulty === 'Beginner' ? 'default' : tutorial.difficulty === 'Intermediate' ? 'secondary' : 'destructive'}>
                    {tutorial.difficulty}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{tutorial.rating}</span>
                  </div>
                </div>
                <CardTitle className="text-lg leading-tight">{tutorial.title}</CardTitle>
                <CardDescription>{tutorial.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tutorials;
