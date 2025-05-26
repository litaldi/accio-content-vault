
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
  ArrowRight,
  Users,
  Bell,
  Map,
  BarChart3
} from 'lucide-react';
import { QuickCaptureWidget } from '@/components/features/QuickCaptureWidget';
import { KnowledgeGraph } from '@/components/features/KnowledgeGraph';
import { AdvancedSearch } from '@/components/features/AdvancedSearch';
import { ReadingMode, useReadingMode } from '@/components/features/ReadingMode';
import { DataPortability } from '@/components/features/DataPortability';
import { AIContentAnalysis } from '@/components/features/AIContentAnalysis';
import { CollaborativeWorkspaces } from '@/components/features/CollaborativeWorkspaces';
import { SmartNotifications } from '@/components/features/SmartNotifications';
import { LearningPathGenerator } from '@/components/features/LearningPathGenerator';
import { ContentInsights } from '@/components/features/ContentInsights';
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
      id: 'ai-analysis',
      title: 'AI Analysis',
      icon: Brain,
      description: 'Smart content insights and recommendations',
      badge: 'AI-Powered'
    },
    {
      id: 'collaboration',
      title: 'Collaboration',
      icon: Users,
      description: 'Team workspaces and shared knowledge',
      badge: 'Team'
    },
    {
      id: 'notifications',
      title: 'Smart Alerts',
      icon: Bell,
      description: 'Intelligent notifications and reminders',
      badge: 'Smart'
    },
    {
      id: 'learning',
      title: 'Learning Paths',
      icon: Map,
      description: 'AI-generated personalized learning journeys',
      badge: 'New'
    },
    {
      id: 'insights',
      title: 'Analytics',
      icon: BarChart3,
      description: 'Deep insights into your knowledge patterns',
      badge: 'Pro'
    },
    {
      id: 'graph',
      title: 'Knowledge Graph',
      icon: Network,
      description: 'Visualize connections between content',
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
      badge: 'Focus'
    },
    {
      id: 'portability',
      title: 'Data Export',
      icon: Download,
      description: 'Import and export your knowledge',
      badge: 'Essential'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Advanced Features Showcase - Accio Knowledge Management</title>
        <meta name="description" content="Explore all the powerful AI-driven features that make Accio the ultimate knowledge management platform." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">
              <Brain className="h-3 w-3 mr-1" />
              AI-Powered Features
            </Badge>
            <h1 className="text-4xl font-bold mb-4">
              Next-Generation Knowledge Management
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Experience the future of knowledge work with AI-powered insights, collaborative workspaces, 
              smart notifications, and personalized learning paths. Every feature is designed to amplify your intellectual productivity.
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/register">
                  Start Your Knowledge Journey
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

          {/* Features Grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.id} className="text-center hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Icon className="h-5 w-5 text-primary" />
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
          <Tabs defaultValue="ai-analysis" className="w-full">
            <TabsList className="grid w-full grid-cols-5 lg:grid-cols-10">
              <TabsTrigger value="ai-analysis">AI Analysis</TabsTrigger>
              <TabsTrigger value="collaboration">Collaboration</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="learning">Learning</TabsTrigger>
              <TabsTrigger value="insights">Insights</TabsTrigger>
              <TabsTrigger value="search">Search</TabsTrigger>
              <TabsTrigger value="graph">Graph</TabsTrigger>
              <TabsTrigger value="reading">Reading</TabsTrigger>
              <TabsTrigger value="portability">Export</TabsTrigger>
              <TabsTrigger value="capture">Capture</TabsTrigger>
            </TabsList>

            <div className="mt-8">
              <TabsContent value="ai-analysis">
                <div className="space-y-4">
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold mb-2">AI Content Analysis & Insights</h2>
                    <p className="text-muted-foreground">
                      Let AI analyze your knowledge base and provide personalized insights for better learning
                    </p>
                  </div>
                  <AIContentAnalysis />
                </div>
              </TabsContent>

              <TabsContent value="collaboration">
                <div className="space-y-4">
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold mb-2">Collaborative Workspaces</h2>
                    <p className="text-muted-foreground">
                      Create shared knowledge spaces for teams and collaborate on research projects
                    </p>
                  </div>
                  <CollaborativeWorkspaces />
                </div>
              </TabsContent>

              <TabsContent value="notifications">
                <div className="space-y-4">
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold mb-2">Smart Notifications & Reminders</h2>
                    <p className="text-muted-foreground">
                      Stay on top of your knowledge goals with intelligent notifications and insights
                    </p>
                  </div>
                  <SmartNotifications />
                </div>
              </TabsContent>

              <TabsContent value="learning">
                <div className="space-y-4">
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold mb-2">AI Learning Path Generator</h2>
                    <p className="text-muted-foreground">
                      Generate personalized learning paths for any topic using AI-powered curriculum design
                    </p>
                  </div>
                  <LearningPathGenerator />
                </div>
              </TabsContent>

              <TabsContent value="insights">
                <div className="space-y-4">
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold mb-2">Content Analytics & Insights</h2>
                    <p className="text-muted-foreground">
                      Track your knowledge growth and discover patterns in your learning journey
                    </p>
                  </div>
                  <ContentInsights />
                </div>
              </TabsContent>

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
          <div className="text-center mt-16 p-8 bg-gradient-to-r from-primary/10 via-purple/10 to-blue/10 rounded-2xl">
            <h2 className="text-2xl font-bold mb-4">Ready to revolutionize your knowledge management?</h2>
            <p className="text-muted-foreground mb-6">
              Join thousands of knowledge workers who are already transforming how they learn, collaborate, and grow.
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
