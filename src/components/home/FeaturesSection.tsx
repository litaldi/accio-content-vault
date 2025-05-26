
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  Search, 
  Shield, 
  Users, 
  Zap, 
  BookOpen, 
  Tags, 
  BarChart3,
  Clock,
  Globe,
  Smartphone,
  Lock
} from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Organization",
      description: "Automatically categorize and tag your content with intelligent AI that learns from your preferences.",
      badge: "Smart",
      color: "bg-purple-500"
    },
    {
      icon: Search,
      title: "Semantic Search",
      description: "Find anything in seconds with natural language search that understands context and meaning.",
      badge: "Fast",
      color: "bg-blue-500"
    },
    {
      icon: Shield,
      title: "Bank-Level Security",
      description: "Your data is encrypted end-to-end and stays completely private with enterprise-grade security.",
      badge: "Secure",
      color: "bg-green-500"
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Share knowledge and collaborate with your team seamlessly with advanced permission controls.",
      badge: "Social",
      color: "bg-orange-500"
    },
    {
      icon: BookOpen,
      title: "Smart Collections",
      description: "Organize content into intelligent collections that automatically suggest related items.",
      badge: "Organized",
      color: "bg-indigo-500"
    },
    {
      icon: Tags,
      title: "Auto-Tagging",
      description: "Never manually tag again. Our AI automatically applies relevant tags to all your content.",
      badge: "Automated",
      color: "bg-pink-500"
    },
    {
      icon: BarChart3,
      title: "Analytics & Insights",
      description: "Track your knowledge growth and discover patterns in your learning with detailed analytics.",
      badge: "Insights",
      color: "bg-emerald-500"
    },
    {
      icon: Smartphone,
      title: "Mobile & Desktop",
      description: "Access your knowledge library anywhere with our responsive web app and mobile extensions.",
      badge: "Everywhere",
      color: "bg-cyan-500"
    },
    {
      icon: Globe,
      title: "Universal Capture",
      description: "Save content from any website, document, or file format with our browser extension.",
      badge: "Universal",
      color: "bg-violet-500"
    }
  ];

  return (
    <section 
      className="py-24 bg-background" 
      aria-labelledby="features-heading"
      id="features-section"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-primary border-primary/20">
            ✨ Features
          </Badge>
          <h2 id="features-heading" className="text-3xl md:text-4xl font-bold mb-6">
            Everything you need to organize knowledge
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Powerful features designed to transform how you save, organize, and discover information.
            Built for individuals and teams who value their knowledge.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <Card 
              key={feature.title} 
              className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50 hover:border-primary/20"
            >
              <CardHeader className="text-center pb-4">
                <div className="relative mb-4">
                  <div className={`w-16 h-16 mx-auto ${feature.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-8 w-8 text-white" aria-hidden="true" />
                  </div>
                  <Badge 
                    variant="secondary" 
                    className="absolute -top-2 -right-4 text-xs font-medium"
                  >
                    {feature.badge}
                  </Badge>
                </div>
                <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Feature highlights */}
        <div className="mt-20 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Clock className="h-6 w-6 text-primary mr-2" aria-hidden="true" />
              <span className="text-2xl font-bold text-primary">30s</span>
            </div>
            <p className="text-muted-foreground">Setup time to get started</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Zap className="h-6 w-6 text-primary mr-2" aria-hidden="true" />
              <span className="text-2xl font-bold text-primary">10x</span>
            </div>
            <p className="text-muted-foreground">Faster information retrieval</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Lock className="h-6 w-6 text-primary mr-2" aria-hidden="true" />
              <span className="text-2xl font-bold text-primary">100%</span>
            </div>
            <p className="text-muted-foreground">Private and secure</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
