
import React from 'react';
import { Helmet } from 'react-helmet-async';
import MainNavigation from '@/components/navigation/MainNavigation';
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
  Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Features = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Organization",
      description: "Automatically categorize and tag your content with superhuman intelligence",
      benefits: ["Smart auto-tagging", "Content relationships", "Pattern recognition"],
      color: "purple"
    },
    {
      icon: Zap,
      title: "Lightning-Fast Search",
      description: "Find anything in your knowledge base in under 3 seconds",
      benefits: ["Natural language search", "Instant results", "Context-aware"],
      color: "blue"
    },
    {
      icon: Smartphone,
      title: "Cross-Device Sync",
      description: "Access your knowledge empire from anywhere, anytime",
      benefits: ["Real-time sync", "Offline access", "Universal compatibility"],
      color: "green"
    },
    {
      icon: Shield,
      title: "Fort Knox Security",
      description: "Your brilliant ideas are protected with enterprise-grade security",
      benefits: ["End-to-end encryption", "Privacy-first", "GDPR compliant"],
      color: "orange"
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Share knowledge and collaborate with your team seamlessly",
      benefits: ["Shared collections", "Team insights", "Permission controls"],
      color: "pink"
    },
    {
      icon: Search,
      title: "Smart Discovery",
      description: "Discover connections and insights you never knew existed",
      benefits: ["Related content", "Trend analysis", "Knowledge gaps"],
      color: "indigo"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Features - AI-Powered Knowledge Management | Accio</title>
        <meta name="description" content="Discover Accio's powerful features: AI organization, lightning search, cross-device sync, and more. Transform your productivity today." />
        <meta name="keywords" content="AI features, knowledge management, smart search, productivity tools, team collaboration" />
      </Helmet>

      <MainNavigation />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-primary/5 via-blue-50 to-purple-50 dark:from-primary/10 dark:via-blue-950/30 dark:to-purple-950/30">
          <div className="container mx-auto px-4 max-w-6xl text-center">
            <Badge variant="secondary" className="mb-6 px-6 py-3 text-sm font-semibold bg-gradient-to-r from-green-50 to-blue-50 border-green-200 text-green-800 dark:from-green-900/30 dark:to-blue-900/30 dark:border-green-700 dark:text-green-200">
              <Sparkles className="h-4 w-4 mr-2" />
              Powered by Advanced AI Technology
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Features That Make You
              <span className="bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent block mt-2">
                10x More Productive
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Discover the powerful features that transform scattered information into organized intelligence. 
              Every feature is designed to save you time and boost your productivity.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2 shadow-lg" asChild>
                <Link to="/register">
                  <Sparkles className="h-5 w-5" />
                  Start Free Trial
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/dashboard">See Demo</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Everything You Need to Build Your Knowledge Empire
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Each feature is crafted to eliminate friction and amplify your intellectual capabilities
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="hover:shadow-xl transition-all group border-0 bg-gradient-to-br from-background to-accent/10">
                  <CardHeader className="pb-4">
                    <div className={`w-16 h-16 rounded-2xl bg-${feature.color}-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <feature.icon className={`h-8 w-8 text-${feature.color}-500`} />
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {feature.title}
                    </CardTitle>
                    <CardDescription className="text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {feature.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-primary/5 to-blue-50 dark:from-primary/10 dark:to-blue-950/30">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Productivity?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join 50,000+ professionals who've already revolutionized their knowledge management
            </p>
            <Button size="lg" className="gap-2 shadow-lg" asChild>
              <Link to="/register">
                <Sparkles className="h-5 w-5" />
                Start Building Your Empire
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Features;
