
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
  Sparkles,
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
      description: "Automatically categorize and tag your content with superhuman intelligence",
      benefits: ["Smart auto-tagging", "Content relationships", "Pattern recognition", "Context understanding"],
      badge: "Most Popular"
    },
    {
      icon: Zap,
      title: "Lightning-Fast Search",
      description: "Find anything in your knowledge base in under 3 seconds",
      benefits: ["Natural language search", "Instant results", "Context-aware", "Semantic understanding"],
      badge: "Super Fast"
    },
    {
      icon: Smartphone,
      title: "Cross-Device Sync",
      description: "Access your knowledge empire from anywhere, anytime",
      benefits: ["Real-time sync", "Offline access", "Universal compatibility", "Cloud backup"]
    },
    {
      icon: Shield,
      title: "Fort Knox Security",
      description: "Your brilliant ideas are protected with enterprise-grade security",
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
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Features - AI-Powered Knowledge Management Revolution | Accio</title>
        <meta name="description" content="Discover Accio's powerful features: AI organization, lightning search, cross-device sync, team collaboration, and more. Transform your productivity today." />
        <link rel="canonical" href="/features" />
      </Helmet>

      <ModernNavigation />

      <main>
        {/* Hero Section */}
        <section className="section-spacing gradient-subtle">
          <div className="container mx-auto px-6 max-w-7xl text-center">
            <div className="animate-fade-in-up">
              <Badge className="badge-modern badge-success element-spacing-sm">
                <Sparkles className="h-4 w-4" />
                Powered by Advanced AI Technology
              </Badge>
              
              <h1 className="text-hero element-spacing-md">
                Features That Make You
                <span className="block bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                  10x More Productive
                </span>
              </h1>
              
              <p className="text-body-large text-muted-foreground element-spacing-lg max-w-3xl mx-auto">
                Discover the powerful features that transform scattered information into organized intelligence. 
                Every feature is designed to save you time and amplify your intellectual capabilities.
              </p>

              {/* Stats Row */}
              <div className="layout-grid layout-grid-4 element-spacing-lg">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <stat.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="text-title text-primary mb-1">{stat.value}</div>
                    <div className="text-caption">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="btn-primary" asChild>
                  <Link to="/dashboard">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Start Your Free Trial
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
                <Button variant="outline" className="btn-secondary" asChild>
                  <Link to="/dashboard">Experience the Demo</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="section-spacing">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="text-center element-spacing-lg">
              <h2 className="text-title element-spacing-md">
                Everything You Need to Build Your
                <span className="block bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                  Knowledge Empire
                </span>
              </h2>
              <p className="text-body-large text-muted-foreground max-w-3xl mx-auto">
                Each feature is crafted to eliminate friction and amplify your intellectual capabilities. 
                Stop losing brilliant ideas and start building your digital brain.
              </p>
            </div>

            <div className="layout-grid layout-grid-3 animate-stagger">
              {features.map((feature, index) => (
                <Card key={index} className="card-modern card-interactive">
                  <CardHeader className="pb-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                        <feature.icon className="h-8 w-8 text-primary" />
                      </div>
                      {feature.badge && (
                        <Badge className="badge-modern badge-primary text-xs">
                          {feature.badge}
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-subtitle">
                      {feature.title}
                    </CardTitle>
                    <CardDescription className="text-body">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {feature.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-sm">
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
        <section className="section-spacing gradient-primary">
          <div className="container mx-auto px-6 max-w-4xl text-center">
            <h2 className="text-title element-spacing-md">
              Ready to Transform Your 
              <span className="block bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Productivity Forever?
              </span>
            </h2>
            <p className="text-body-large text-muted-foreground element-spacing-lg">
              Join 50,000+ professionals who've already revolutionized their knowledge management. 
              Your future self will thank you for starting today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="btn-primary" asChild>
                <Link to="/dashboard">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Start Building Your Empire
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" className="btn-secondary" asChild>
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
