
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import UnifiedTopNavigation from '@/components/navigation/UnifiedTopNavigation';
import GlobalFooter from '@/components/layout/GlobalFooter';
import { 
  Brain, 
  Zap, 
  Shield, 
  Search,
  BookmarkPlus,
  Tag,
  Network,
  ArrowRight,
  Star,
  CheckCircle,
  Users,
  Clock,
  Globe
} from 'lucide-react';

const ModernIndex = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Organization",
      description: "Smart categorization and automatic tagging of your knowledge with advanced AI.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Zap,
      title: "Lightning Search",
      description: "Find anything instantly with semantic search that understands context.",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Enterprise-grade security with end-to-end encryption for your data.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Network,
      title: "Knowledge Graph",
      description: "Visualize connections between your ideas and discover new insights.",
      color: "from-purple-500 to-pink-500"
    }
  ];

  const benefits = [
    "Never lose important information again",
    "Save hours of searching and organizing",
    "Discover hidden connections in your knowledge",
    "Work more efficiently with AI assistance"
  ];

  const stats = [
    { value: "50K+", label: "Active Users", icon: Users },
    { value: "1M+", label: "Items Saved", icon: BookmarkPlus },
    { value: "99.9%", label: "Uptime", icon: Clock },
    { value: "150+", label: "Countries", icon: Globe }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Accio - AI-Powered Knowledge Engine</title>
        <meta name="description" content="Transform scattered information into organized intelligence. Save, organize, and rediscover everything that matters with AI-powered knowledge management." />
        <meta name="keywords" content="knowledge management, AI organization, digital library, search, productivity" />
      </Helmet>

      <UnifiedTopNavigation />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
          <div className="container relative z-10 text-center">
            <Badge variant="outline" className="mb-6 animate-fade-in">
              <Star className="h-3 w-3 mr-1" />
              AI-Powered Knowledge Engine
            </Badge>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-fade-in">
              Transform scattered information into
              <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent block">
                organized intelligence
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in">
              Save, organize, and rediscover everything that matters. Accio's AI-powered platform 
              helps you build a personal knowledge empire that grows smarter with every interaction.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in">
              <Button size="lg" className="text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all" asChild>
                <Link to="/register">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6" asChild>
                <Link to="/features">
                  See How It Works
                </Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto animate-fade-in">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <stat.icon className="h-5 w-5 text-primary mr-2" />
                    <span className="text-2xl font-bold">{stat.value}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-muted/30">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Powerful features for modern knowledge workers
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Everything you need to capture, organize, and leverage your knowledge effectively
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer">
                  <CardHeader className="pb-4">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                  Why choose Accio for your knowledge management?
                </h2>
                <div className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-lg">{benefit}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8">
                  <Button size="lg" asChild>
                    <Link to="/features">
                      Explore All Features
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-2xl" />
                <Card className="border-0 shadow-2xl relative z-10">
                  <CardContent className="p-8">
                    <div className="space-y-6">
                      <div className="flex items-center gap-3">
                        <BookmarkPlus className="h-8 w-8 text-primary" />
                        <div>
                          <h3 className="font-semibold">Quick Capture</h3>
                          <p className="text-sm text-muted-foreground">Save content from anywhere</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Tag className="h-8 w-8 text-primary" />
                        <div>
                          <h3 className="font-semibold">Smart Tagging</h3>
                          <p className="text-sm text-muted-foreground">AI automatically organizes</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Search className="h-8 w-8 text-primary" />
                        <div>
                          <h3 className="font-semibold">Instant Search</h3>
                          <p className="text-sm text-muted-foreground">Find anything in seconds</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary/10 via-primary/5 to-background">
          <div className="container text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Ready to build your knowledge empire?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who've transformed their knowledge management. 
              Start your free trial today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-6 shadow-lg" asChild>
                <Link to="/register">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6" asChild>
                <Link to="/contact">
                  Talk to Sales
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <GlobalFooter />
    </div>
  );
};

export default ModernIndex;
