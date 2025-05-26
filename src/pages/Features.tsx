
import React from 'react';
import { Helmet } from 'react-helmet-async';
import ProfessionalNavigation from '@/components/navigation/ProfessionalNavigation';
import ImprovedFooter from '@/components/layout/ImprovedFooter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Sparkles, 
  Zap, 
  Shield, 
  Search,
  FolderOpen,
  BarChart3,
  Globe,
  Smartphone
} from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Sparkles,
      title: "AI-Powered Organization",
      description: "Automatically categorize and tag your content with advanced AI",
      color: "blue"
    },
    {
      icon: Zap,
      title: "Lightning Fast Search",
      description: "Find any piece of content instantly with semantic search",
      color: "purple"
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your data is encrypted and completely under your control",
      color: "green"
    },
    {
      icon: FolderOpen,
      title: "Smart Collections",
      description: "Organize content into intelligent, dynamic collections",
      color: "orange"
    },
    {
      icon: BarChart3,
      title: "Insightful Analytics",
      description: "Track your knowledge patterns and learning progress",
      color: "red"
    },
    {
      icon: Globe,
      title: "Universal Capture",
      description: "Save content from anywhere on the web with one click",
      color: "cyan"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Features - Accio Knowledge Engine</title>
        <meta name="description" content="Discover the powerful features that make Accio the ultimate knowledge management platform." />
      </Helmet>

      <ProfessionalNavigation />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 border-b">
          <div className="container mx-auto px-4 max-w-6xl text-center">
            <Badge variant="outline" className="mb-6">Features</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Powerful Features for <span className="text-primary">Smart Knowledge</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to capture, organize, and discover knowledge effortlessly
            </p>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <Card key={index} className="card-elevated group hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg bg-${feature.color}-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <feature.icon className={`h-6 w-6 text-${feature.color}-500`} />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary/5 border-t">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Knowledge?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of users who have revolutionized their learning
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-gradient-to-r from-primary to-blue-600">
                <a href="/register">
                  <Sparkles className="h-5 w-5 mr-2" />
                  Start Now
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="/help">Learn More</a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <ImprovedFooter />
    </div>
  );
};

export default Features;
