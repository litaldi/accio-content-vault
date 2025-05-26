
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  Search, 
  FolderOpen, 
  BarChart3, 
  Play,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Playground: React.FC = () => {
  const demoFeatures = [
    {
      icon: Brain,
      title: 'AI Content Analysis',
      description: 'See how our AI analyzes and categorizes your content automatically.',
      action: 'Try Demo',
      disabled: false
    },
    {
      icon: Search,
      title: 'Semantic Search',
      description: 'Experience natural language search across your knowledge base.',
      action: 'Search Demo',
      disabled: false
    },
    {
      icon: FolderOpen,
      title: 'Smart Collections',
      description: 'Watch as content organizes itself into intelligent collections.',
      action: 'View Collections',
      disabled: false
    },
    {
      icon: BarChart3,
      title: 'Analytics Dashboard',
      description: 'Explore insights about your knowledge management patterns.',
      action: 'View Analytics',
      disabled: false
    }
  ];

  return (
    <>
      <Helmet>
        <title>Playground - Accio | Try Our AI-Powered Features</title>
        <meta name="description" content="Experience Accio's powerful AI features in our interactive playground. Try semantic search, content analysis, and smart organization tools." />
      </Helmet>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-blue-500/5">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="outline" className="mb-6">
            <Play className="h-3 w-3 mr-1" />
            Interactive Demo
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Try Accio 
            <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent block sm:inline">
              {" "}Risk-Free
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Explore our AI-powered knowledge management features in this interactive playground. 
            No signup required - just click and experience the magic.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">
              Start Exploring
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/features">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Demo Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Interactive Demos</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience each feature hands-on with sample data and real AI processing
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {demoFeatures.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </div>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    className="w-full" 
                    disabled={feature.disabled}
                    variant={feature.disabled ? "outline" : "default"}
                  >
                    {feature.action}
                    <Play className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Getting Started */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Build Your Knowledge Base?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Start your journey with Accio and transform how you manage and access information.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/dashboard">
                <Sparkles className="mr-2 h-4 w-4" />
                Get Started Free
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/contact">Talk to Sales</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Playground;
