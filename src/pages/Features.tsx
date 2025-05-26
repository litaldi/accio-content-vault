
import React from 'react';
import { Helmet } from 'react-helmet-async';
import ProfessionalNavigation from '@/components/navigation/ProfessionalNavigation';
import ImprovedFooter from '@/components/layout/ImprovedFooter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Brain, 
  Search, 
  Tags, 
  Globe, 
  Smartphone, 
  Shield, 
  BarChart3, 
  Users, 
  Zap,
  Download,
  FileText,
  Link,
  CheckCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Features = () => {
  const navigate = useNavigate();

  const coreFeatures = [
    {
      title: "AI-Powered Organization",
      description: "Let AI automatically categorize and tag your content based on meaning and context.",
      icon: Brain,
      highlights: ["Smart categorization", "Automatic tagging", "Content relationships"]
    },
    {
      title: "Semantic Search",
      description: "Find anything by describing what you remember, not just exact keywords.",
      icon: Search,
      highlights: ["Natural language queries", "Context-aware results", "Smart suggestions"]
    },
    {
      title: "Universal Capture",
      description: "Save content from anywhere - web pages, documents, images, or quick notes.",
      icon: Globe,
      highlights: ["Browser extension", "Mobile app", "Drag & drop"]
    },
    {
      title: "Smart Collections",
      description: "Organize content into collections that adapt and grow with your needs.",
      icon: Tags,
      highlights: ["Dynamic collections", "Auto-sorting", "Custom rules"]
    }
  ];

  const advancedFeatures = [
    {
      title: "Knowledge Analytics",
      description: "Gain insights into your learning patterns and information consumption.",
      icon: BarChart3,
      color: "text-blue-600"
    },
    {
      title: "Team Collaboration",
      description: "Share collections and collaborate on knowledge bases with your team.",
      icon: Users,
      color: "text-green-600"
    },
    {
      title: "Offline Access",
      description: "Access your most important content even without an internet connection.",
      icon: Download,
      color: "text-purple-600"
    },
    {
      title: "Enterprise Security",
      description: "Bank-level encryption and compliance with enterprise security standards.",
      icon: Shield,
      color: "text-red-600"
    },
    {
      title: "API Integration",
      description: "Connect with your favorite tools and automate your knowledge workflow.",
      icon: Link,
      color: "text-orange-600"
    },
    {
      title: "Cross-Platform Sync",
      description: "Seamless synchronization across all your devices and platforms.",
      icon: Smartphone,
      color: "text-indigo-600"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Features - Accio Knowledge Engine</title>
        <meta name="description" content="Discover all the powerful features that make Accio the ultimate knowledge management platform. AI-powered organization, semantic search, and more." />
      </Helmet>

      <ProfessionalNavigation />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-background via-primary/5 to-blue-500/5">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <Badge variant="outline" className="mb-6 bg-primary/10 text-primary border-primary/20">All Features</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Everything You Need for
              <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent block">
                Smart Knowledge Management
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              From AI-powered organization to advanced analytics, Accio provides all the tools 
              you need to capture, organize, and rediscover your knowledge effortlessly.
            </p>
            <Button 
              size="lg" 
              onClick={() => navigate('/register')}
              className="btn-primary text-lg px-8 py-4 font-semibold"
            >
              <Zap className="mr-2 h-5 w-5" />
              Start Free Trial
            </Button>
          </div>
        </section>

        {/* Core Features */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Core Features</h2>
              <p className="text-xl text-muted-foreground">
                The foundation of intelligent knowledge management
              </p>
            </div>
            <div className="grid lg:grid-cols-2 gap-8">
              {coreFeatures.map((feature, index) => (
                <Card key={index} className="card-elevated hover:-translate-y-1">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                        <feature.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{feature.title}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {feature.description}
                    </p>
                    <div className="space-y-2">
                      {feature.highlights.map((highlight, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Advanced Features */}
        <section className="py-16 bg-muted/20">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Advanced Capabilities</h2>
              <p className="text-xl text-muted-foreground">
                Professional tools for power users and teams
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {advancedFeatures.map((feature, index) => (
                <Card key={index} className="text-center card-elevated hover:-translate-y-1">
                  <CardHeader>
                    <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-2xl flex items-center justify-center">
                      <feature.icon className={`h-8 w-8 ${feature.color}`} />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-blue-600 text-white">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Experience These Features?</h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who have transformed their knowledge management with Accio.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={() => navigate('/register')} 
                className="bg-white text-primary hover:bg-white/95 text-lg px-8 py-4 font-semibold"
              >
                <Zap className="mr-2 h-5 w-5" />
                Start Free Today
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={() => navigate('/pricing')} 
                className="border-white/50 text-white hover:bg-white/10 text-lg px-8 py-4 font-semibold"
              >
                View Pricing
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
