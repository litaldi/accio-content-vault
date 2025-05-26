
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
  ArrowRight,
  Sparkles,
  Zap,
  Shield,
  Globe,
  Star,
  Quote
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Analysis',
      description: 'Let artificial intelligence understand and organize your content automatically.',
      color: 'bg-blue-500/10 text-blue-600'
    },
    {
      icon: Search,
      title: 'Semantic Search',
      description: 'Find information using natural language, not just keywords.',
      color: 'bg-green-500/10 text-green-600'
    },
    {
      icon: FolderOpen,
      title: 'Smart Collections',
      description: 'Content organizes itself into meaningful, discoverable groups.',
      color: 'bg-purple-500/10 text-purple-600'
    },
    {
      icon: BarChart3,
      title: 'Deep Insights',
      description: 'Understand your knowledge patterns and growth over time.',
      color: 'bg-orange-500/10 text-orange-600'
    }
  ];

  const testimonials = [
    {
      quote: "Accio transformed how I manage my research. It's like having a personal librarian who never forgets.",
      author: "Dr. Sarah Chen",
      role: "Research Scientist"
    },
    {
      quote: "Finally, a knowledge base that thinks like I do. The AI insights are genuinely helpful.",
      author: "Marcus Johnson",
      role: "Product Manager"
    },
    {
      quote: "I can find any piece of information in seconds. It's changed my entire workflow.",
      author: "Elena Rodriguez",
      role: "Content Creator"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Accio - AI-Powered Knowledge Management</title>
        <meta name="description" content="Transform how you collect, organize, and discover knowledge with Accio's AI-powered platform. Your personal knowledge sanctuary awaits." />
        <meta name="keywords" content="knowledge management, AI, personal knowledge base, semantic search, content organization" />
      </Helmet>

      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-primary/5 via-background to-blue-500/5">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="outline" className="mb-6 px-4 py-2">
            <Sparkles className="h-3 w-3 mr-1" />
            AI-Powered Knowledge Management
          </Badge>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Your Knowledge,
            <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent block">
              Intelligently Organized
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Transform how you collect, organize, and discover information with AI that understands your content and helps you think better.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button size="lg" className="text-lg px-8 py-6" asChild>
              <Link to="/register">
                <Brain className="mr-2 h-5 w-5" />
                Start Your Knowledge Journey
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6" asChild>
              <Link to="/playground">
                Try the Demo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>

          {/* Hero Visual */}
          <div className="relative max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-primary/20 to-blue-600/20 rounded-2xl p-8 backdrop-blur-sm border shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-background/50 backdrop-blur-sm border-primary/20">
                  <CardHeader className="pb-3">
                    <Brain className="h-8 w-8 text-primary mb-2" />
                    <CardTitle className="text-sm">AI Analysis</CardTitle>
                  </CardHeader>
                  <CardContent className="text-xs text-muted-foreground">
                    Understanding your content automatically
                  </CardContent>
                </Card>
                
                <Card className="bg-background/50 backdrop-blur-sm border-primary/20">
                  <CardHeader className="pb-3">
                    <Search className="h-8 w-8 text-primary mb-2" />
                    <CardTitle className="text-sm">Smart Search</CardTitle>
                  </CardHeader>
                  <CardContent className="text-xs text-muted-foreground">
                    Find anything with natural language
                  </CardContent>
                </Card>
                
                <Card className="bg-background/50 backdrop-blur-sm border-primary/20">
                  <CardHeader className="pb-3">
                    <BarChart3 className="h-8 w-8 text-primary mb-2" />
                    <CardTitle className="text-sm">Deep Insights</CardTitle>
                  </CardHeader>
                  <CardContent className="text-xs text-muted-foreground">
                    Discover patterns in your knowledge
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Knowledge Management, Reimagined
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Stop struggling with scattered information. Let AI help you build a knowledge base that grows smarter with you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-0 bg-background">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How Accio Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to transform your information chaos into organized knowledge.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center group">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Collect</h3>
              <p className="text-muted-foreground">
                Add articles, notes, documents, and ideas from anywhere. Accio accepts all formats and sources.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Organize</h3>
              <p className="text-muted-foreground">
                Our AI automatically categorizes, tags, and connects your content, finding patterns you might miss.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Discover</h3>
              <p className="text-muted-foreground">
                Search naturally, explore connections, and gain insights that help you think better and work smarter.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Loved by Knowledge Workers</h2>
            <p className="text-xl text-muted-foreground">
              See how Accio is transforming the way people work with information.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-background border-0 shadow-lg">
                <CardHeader>
                  <Quote className="h-8 w-8 text-primary/40 mb-4" />
                  <CardDescription className="text-base leading-relaxed text-foreground">
                    "{testimonial.quote}"
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="font-medium">{testimonial.author}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-blue-600/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Build Your Knowledge Sanctuary?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who've transformed their relationship with information using Accio.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6" asChild>
              <Link to="/register">
                <Sparkles className="mr-2 h-5 w-5" />
                Start Free Today
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6" asChild>
              <Link to="/features">Learn More</Link>
            </Button>
          </div>
          
          <div className="flex items-center justify-center gap-6 mt-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>Secure & Private</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              <span>Lightning Fast</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              <span>Works Everywhere</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
