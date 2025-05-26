
import React from 'react';
import { Helmet } from 'react-helmet-async';
import CleanNavigation from '@/components/navigation/CleanNavigation';
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
  TrendingUp
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Features = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Organization",
      description: "Automatically categorize and tag your content with intelligent analysis",
      benefits: ["Smart auto-tagging", "Content relationships", "Pattern recognition", "Context understanding"]
    },
    {
      icon: Zap,
      title: "Lightning-Fast Search", 
      description: "Find anything in your knowledge base in under 3 seconds",
      benefits: ["Natural language search", "Instant results", "Context-aware", "Semantic understanding"]
    },
    {
      icon: Smartphone,
      title: "Cross-Device Sync",
      description: "Access your knowledge empire from anywhere, anytime",
      benefits: ["Real-time sync", "Offline access", "Universal compatibility", "Cloud backup"]
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Your data is protected with bank-level security protocols",
      benefits: ["End-to-end encryption", "Privacy-first", "GDPR compliant", "Zero-trust architecture"]
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Share knowledge and collaborate with your team seamlessly",
      benefits: ["Shared collections", "Team insights", "Permission controls", "Activity tracking"]
    },
    {
      icon: Search,
      title: "Smart Discovery",
      description: "Discover connections and insights you never knew existed",
      benefits: ["Related content", "Trend analysis", "Knowledge gaps", "Insight suggestions"]
    }
  ];

  const stats = [
    { value: "5+ Hours", label: "Saved Weekly", icon: Clock },
    { value: "10x Faster", label: "Information Retrieval", icon: Zap },
    { value: "99.9%", label: "Uptime Guarantee", icon: TrendingUp },
    { value: "50,000+", label: "Happy Users", icon: Star }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Features - AI-Powered Knowledge Management | Accio</title>
        <meta name="description" content="Discover Accio's powerful features: AI organization, lightning search, cross-device sync, team collaboration, and more." />
      </Helmet>

      <CleanNavigation />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 bg-muted/30">
          <div className="container text-center">
            <Badge variant="secondary" className="mb-6">
              <Star className="h-3 w-3 mr-1" />
              Advanced AI Technology
            </Badge>
            
            <h1 className="text-4xl font-bold mb-6">
              Features that make you
              <span className="text-primary block">10x more productive</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Discover powerful features that transform scattered information into organized intelligence. 
              Every feature is designed to save you time and amplify your capabilities.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-2xl font-bold text-primary">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
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
        <section className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Everything you need to build your knowledge empire
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Each feature is crafted to eliminate friction and amplify your intellectual capabilities
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                    <CardDescription>
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

        {/* CTA Section */}
        <section className="py-16 bg-primary/5">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to transform your productivity?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who've revolutionized their knowledge management. 
              Start building your knowledge empire today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
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
