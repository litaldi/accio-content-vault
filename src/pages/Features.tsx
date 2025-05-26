
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Brain, 
  Sparkles, 
  Search, 
  Tags, 
  FileText, 
  TrendingUp,
  Zap,
  Target,
  Clock,
  Globe
} from 'lucide-react';

const Features: React.FC = () => {
  const aiFeatures = [
    {
      icon: Brain,
      title: 'Smart Content Tagging',
      description: 'AI automatically suggests relevant tags when you save content, learning from your preferences.',
      status: 'active',
      benefit: 'Save 80% of tagging time'
    },
    {
      icon: Search,
      title: 'Natural Language Search',
      description: 'Ask questions like "Show me recent programming tutorials" and get intelligent results.',
      status: 'active',
      benefit: 'Find content 3x faster'
    },
    {
      icon: FileText,
      title: 'AI Summarization',
      description: 'Generate concise summaries of articles, documents, and long-form content instantly.',
      status: 'active',
      benefit: 'Understand content quickly'
    },
    {
      icon: TrendingUp,
      title: 'Smart Recommendations',
      description: 'Discover related content based on your interests and viewing patterns.',
      status: 'active',
      benefit: 'Never miss relevant content'
    },
    {
      icon: Target,
      title: 'Auto-Categorization',
      description: 'AI analyzes your content library and suggests optimal organization strategies.',
      status: 'active',
      benefit: 'Keep organized effortlessly'
    },
    {
      icon: Zap,
      title: 'Instant Insights',
      description: 'Get key insights and trends from your saved content with one click.',
      status: 'coming-soon',
      benefit: 'Unlock hidden patterns'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'coming-soon':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <>
      <Helmet>
        <title>AI Features - Accio</title>
        <meta name="description" content="Discover powerful AI features that help you organize, search, and understand your content better." />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="flex justify-center mb-6">
              <div className="p-3 bg-primary/10 rounded-full">
                <Brain className="h-12 w-12 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              AI-Powered Features
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Experience the future of knowledge management with intelligent features that learn from your behavior and help you work smarter.
            </p>
            <Button size="lg" className="gap-2">
              <Sparkles className="h-5 w-5" />
              Try AI Features
            </Button>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {aiFeatures.map((feature, index) => (
                <Card key={index} className="group hover:shadow-lg transition-all duration-200 border-2 hover:border-primary/20">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                        <feature.icon className="h-6 w-6 text-primary" />
                      </div>
                      <Badge className={getStatusColor(feature.status)}>
                        {feature.status === 'active' ? 'Active' : 'Coming Soon'}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                    <CardDescription className="text-sm">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-sm font-medium text-green-600 dark:text-green-400">
                      <Clock className="h-4 w-4" />
                      {feature.benefit}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">How AI Enhances Your Workflow</h2>
              <p className="text-muted-foreground">
                Our AI features work seamlessly in the background to make your knowledge management effortless.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Save Content</h3>
                <p className="text-sm text-muted-foreground">
                  AI analyzes and tags your content automatically as you save it.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">AI Processing</h3>
                <p className="text-sm text-muted-foreground">
                  Machine learning models understand context and generate insights.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Smart Results</h3>
                <p className="text-sm text-muted-foreground">
                  Get personalized recommendations and intelligent search results.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Experience AI-Powered Knowledge Management?</h2>
            <p className="text-muted-foreground mb-8">
              Join thousands of users who are already saving time with our intelligent features.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2">
                <Brain className="h-5 w-5" />
                Start Using AI Features
              </Button>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Features;
