
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Zap, 
  Network, 
  Search, 
  BookOpen, 
  Download,
  Brain,
  ArrowRight
} from 'lucide-react';
import { QuickCaptureWidget } from '@/components/features/QuickCaptureWidget';
import { KnowledgeGraph } from '@/components/features/KnowledgeGraph';
import { AdvancedSearch } from '@/components/features/AdvancedSearch';
import { ReadingMode, useReadingMode } from '@/components/features/ReadingMode';
import { DataPortability } from '@/components/features/DataPortability';
import { Link } from 'react-router-dom';

const FeaturesShowcase = () => {
  const { openReadingMode, ReadingModeComponent } = useReadingMode();

  const sampleContent = {
    title: "The Future of Knowledge Management",
    url: "https://example.com/article",
    content: `
      <p>Knowledge management has evolved significantly in the digital age. With the advent of AI and machine learning, we're seeing unprecedented capabilities in how we capture, organize, and retrieve information.</p>
      
      <h2>Key Trends in Knowledge Management</h2>
      <p>The integration of artificial intelligence has revolutionized how organizations handle their intellectual assets. From automatic categorization to semantic search, these technologies are making knowledge more accessible than ever before.</p>
      
      <h3>AI-Powered Organization</h3>
      <p>Modern knowledge management systems can automatically categorize content, suggest tags, and even identify relationships between different pieces of information. This reduces the manual overhead traditionally associated with maintaining organized knowledge bases.</p>
      
      <h3>Semantic Search Capabilities</h3>
      <p>Instead of relying on exact keyword matches, semantic search understands the intent and context behind queries. This means users can find relevant information even when using different terminology than what's in the original content.</p>
    `,
    tags: ['AI', 'Knowledge Management', 'Technology', 'Future'],
    readingTime: 5
  };

  const features = [
    {
      id: 'capture',
      title: 'Quick Capture',
      icon: Zap,
      description: 'Save content instantly from anywhere',
      badge: 'Interactive'
    },
    {
      id: 'graph',
      title: 'Knowledge Graph',
      icon: Network,
      description: 'Visualize connections between your content',
      badge: 'Beta'
    },
    {
      id: 'search',
      title: 'Advanced Search',
      icon: Search,
      description: 'Powerful filtering and discovery tools',
      badge: 'Enhanced'
    },
    {
      id: 'reading',
      title: 'Reading Mode',
      icon: BookOpen,
      description: 'Distraction-free content consumption',
      badge: 'New'
    },
    {
      id: 'portability',
      title: 'Data Portability',
      icon: Download,
      description: 'Import and export your knowledge',
      badge: 'Essential'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Features Showcase - Accio Knowledge Management</title>
        <meta name="description" content="Explore all the powerful features that make Accio the ultimate knowledge management platform." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">
              <Brain className="h-3 w-3 mr-1" />
              Interactive Demo
            </Badge>
            <h1 className="text-4xl font-bold mb-4">
              Experience Accio's Powerful Features
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Try out our advanced knowledge management tools in this interactive showcase. 
              Each feature is fully functional and demonstrates real capabilities.
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/register">
                  Get Started Free
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => openReadingMode(sampleContent)}
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Try Reading Mode
              </Button>
            </div>
          </div>

          {/* Features Overview */}
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.id} className="text-center hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <Badge variant="secondary" className="mb-2 text-xs">
                      {feature.badge}
                    </Badge>
                    <h3 className="font-medium text-sm mb-1">{feature.title}</h3>
                    <p className="text-xs text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Interactive Features */}
          <Tabs defaultValue="search" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="search">Advanced Search</TabsTrigger>
              <TabsTrigger value="graph">Knowledge Graph</TabsTrigger>
              <TabsTrigger value="portability">Data Export</TabsTrigger>
              <TabsTrigger value="reading">Reading Mode</TabsTrigger>
              <TabsTrigger value="capture">Quick Capture</TabsTrigger>
            </TabsList>

            <div className="mt-8">
              <TabsContent value="search">
                <div className="space-y-4">
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold mb-2">Advanced Search & Filtering</h2>
                    <p className="text-muted-foreground">
                      Find exactly what you need with powerful search filters and semantic understanding
                    </p>
                  </div>
                  <AdvancedSearch />
                </div>
              </TabsContent>

              <TabsContent value="graph">
                <div className="space-y-4">
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold mb-2">Knowledge Graph Visualization</h2>
                    <p className="text-muted-foreground">
                      Discover connections between your content, tags, and collections
                    </p>
                  </div>
                  <KnowledgeGraph />
                </div>
              </TabsContent>

              <TabsContent value="portability">
                <div className="space-y-4">
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold mb-2">Data Import & Export</h2>
                    <p className="text-muted-foreground">
                      Your data, your way. Export to multiple formats or import from other tools
                    </p>
                  </div>
                  <DataPortability />
                </div>
              </TabsContent>

              <TabsContent value="reading">
                <div className="space-y-4">
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold mb-2">Distraction-Free Reading</h2>
                    <p className="text-muted-foreground">
                      Immerse yourself in content with customizable reading experiences
                    </p>
                  </div>
                  <Card>
                    <CardHeader>
                      <CardTitle>Sample Article Preview</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-muted/30 rounded-lg p-6 mb-4">
                        <h3 className="text-lg font-medium mb-2">{sampleContent.title}</h3>
                        <div className="flex gap-2 mb-3">
                          {sampleContent.tags.map(tag => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">
                          Experience our reading mode with customizable fonts, themes, and distraction-free layout...
                        </p>
                        <Button onClick={() => openReadingMode(sampleContent)}>
                          <BookOpen className="h-4 w-4 mr-2" />
                          Open in Reading Mode
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="capture">
                <div className="space-y-4">
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold mb-2">Quick Capture Widget</h2>
                    <p className="text-muted-foreground">
                      Save content instantly from anywhere with our floating capture tool
                    </p>
                  </div>
                  <Card>
                    <CardContent className="p-8 text-center">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Zap className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-lg font-medium mb-2">Quick Capture Widget</h3>
                      <p className="text-muted-foreground mb-4">
                        Look for the floating capture button in the bottom-right corner of your screen. 
                        Click it to instantly save URLs, notes, or files to your knowledge base.
                      </p>
                      <Badge variant="secondary">
                        Available on every page
                      </Badge>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </div>
          </Tabs>

          {/* Call to Action */}
          <div className="text-center mt-16 p-8 bg-primary/5 rounded-2xl">
            <h2 className="text-2xl font-bold mb-4">Ready to supercharge your knowledge management?</h2>
            <p className="text-muted-foreground mb-6">
              These features are just the beginning. Start building your knowledge empire today.
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/register">
                  Start Free Trial
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/pricing">View Pricing</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Components */}
      <QuickCaptureWidget />
      <ReadingModeComponent />
    </>
  );
};

export default FeaturesShowcase;
