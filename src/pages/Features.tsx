
import React from 'react';
import { Helmet } from 'react-helmet-async';
import ModernNavigation from '@/components/navigation/ModernNavigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  Zap, 
  Search, 
  Smartphone,
  Shield,
  Users,
  ArrowRight,
  CheckCircle,
  Star,
  Clock,
  TrendingUp,
  Globe,
  FileText,
  Share,
  Lock
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Features = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Organization",
      description: "Automatically categorize and tag your content with intelligent analysis that learns from your behavior",
      benefits: ["Smart auto-tagging", "Content relationships", "Pattern recognition", "Context understanding"],
      highlight: "99% accuracy"
    },
    {
      icon: Zap,
      title: "Lightning-Fast Search", 
      description: "Find anything in your knowledge base in under 3 seconds with semantic search",
      benefits: ["Natural language search", "Instant results", "Context-aware", "Semantic understanding"],
      highlight: "Sub-second results"
    },
    {
      icon: Smartphone,
      title: "Cross-Device Sync",
      description: "Access your knowledge empire from anywhere, anytime with real-time sync",
      benefits: ["Real-time sync", "Offline access", "Universal compatibility", "Cloud backup"],
      highlight: "Works everywhere"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Your data is protected with bank-level security protocols and encryption",
      benefits: ["End-to-end encryption", "Privacy-first", "GDPR compliant", "Zero-trust architecture"],
      highlight: "SOC 2 compliant"
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Share knowledge and collaborate with your team seamlessly with advanced permissions",
      benefits: ["Shared collections", "Team insights", "Permission controls", "Activity tracking"],
      highlight: "Built for teams"
    },
    {
      icon: Globe,
      title: "Universal Capture",
      description: "Save content from any website, document, or file format with one click",
      benefits: ["Browser extension", "PDF support", "Image OCR", "Video transcription"],
      highlight: "500+ formats"
    }
  ];

  const stats = [
    { value: "5+ Hours", label: "Saved Weekly", icon: Clock },
    { value: "10x Faster", label: "Information Retrieval", icon: Zap },
    { value: "99.9%", label: "Uptime Guarantee", icon: TrendingUp },
    { value: "50,000+", label: "Happy Users", icon: Star }
  ];

  const useCases = [
    {
      title: "Research & Academia",
      description: "Organize papers, citations, and research notes with AI-powered connections",
      icon: FileText
    },
    {
      title: "Product Management",
      description: "Keep track of user feedback, market research, and competitive analysis",
      icon: TrendingUp
    },
    {
      title: "Content Creation",
      description: "Save inspiration, organize ideas, and build comprehensive content libraries",
      icon: Share
    },
    {
      title: "Legal Practice",
      description: "Manage case law, documents, and legal research with secure access controls",
      icon: Lock
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Features - AI-Powered Knowledge Management | Accio</title>
        <meta name="description" content="Discover Accio's powerful features: AI organization, lightning search, cross-device sync, team collaboration, and more." />
      </Helmet>

      <ModernNavigation />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-primary/5 via-background to-background">
          <div className="container text-center">
            <Badge variant="secondary" className="mb-6 bg-primary/10 text-primary border-primary/20">
              <Star className="h-3 w-3 mr-1" />
              Advanced AI Technology
            </Badge>
            
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
              Features that make you
              <span className="text-primary block">10x more productive</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Discover powerful features that transform scattered information into organized intelligence. 
              Every feature is designed to save you time and amplify your capabilities.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:bg-primary/20 transition-colors">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-2xl font-bold text-primary">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-primary hover:bg-primary/90">
                <Link to="/register">
                  Start Free Trial
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/dashboard">Try Demo</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-24">
          <div className="container">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4">Core Features</Badge>
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Everything you need to build your knowledge empire
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Each feature is crafted to eliminate friction and amplify your intellectual capabilities
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="border-0 bg-background/60 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 group">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <feature.icon className="h-6 w-6 text-primary" />
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {feature.highlight}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {feature.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                          <span className="text-muted-foreground">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="py-24 bg-muted/30">
          <div className="container">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4">Use Cases</Badge>
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Built for every knowledge worker
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                From research to product management, Accio adapts to your workflow
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {useCases.map((useCase, index) => (
                <Card key={index} className="border-0 bg-background/60 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 text-center">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <useCase.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{useCase.title}</h3>
                    <p className="text-sm text-muted-foreground">{useCase.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-br from-primary/10 via-primary/5 to-background">
          <div className="container text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Ready to transform your productivity?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who've revolutionized their knowledge management. 
              Start building your knowledge empire today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-primary hover:bg-primary/90">
                <Link to="/register">
                  Start Building Your Empire
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/help">Get Expert Help</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Features;
