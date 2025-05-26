
import React from 'react';
import { Helmet } from 'react-helmet-async';
import ResponsiveNavigation from '@/components/navigation/ResponsiveNavigation';
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
      color: "purple",
      badge: "Most Popular"
    },
    {
      icon: Zap,
      title: "Lightning-Fast Search",
      description: "Find anything in your knowledge base in under 3 seconds",
      benefits: ["Natural language search", "Instant results", "Context-aware", "Semantic understanding"],
      color: "blue",
      badge: "Super Fast"
    },
    {
      icon: Smartphone,
      title: "Cross-Device Sync",
      description: "Access your knowledge empire from anywhere, anytime",
      benefits: ["Real-time sync", "Offline access", "Universal compatibility", "Cloud backup"],
      color: "green"
    },
    {
      icon: Shield,
      title: "Fort Knox Security",
      description: "Your brilliant ideas are protected with enterprise-grade security",
      benefits: ["End-to-end encryption", "Privacy-first", "GDPR compliant", "Zero-trust architecture"],
      color: "orange"
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Share knowledge and collaborate with your team seamlessly",
      benefits: ["Shared collections", "Team insights", "Permission controls", "Activity tracking"],
      color: "pink"
    },
    {
      icon: Search,
      title: "Smart Discovery",
      description: "Discover connections and insights you never knew existed",
      benefits: ["Related content", "Trend analysis", "Knowledge gaps", "Insight suggestions"],
      color: "indigo"
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
        <title>Features - AI-Powered Knowledge Management Revolution | Accio</title>
        <meta name="description" content="Discover Accio's powerful features: AI organization, lightning search, cross-device sync, team collaboration, and more. Transform your productivity today." />
        <meta name="keywords" content="AI features, knowledge management, smart search, productivity tools, team collaboration, information organization" />
        <link rel="canonical" href="/features" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
      </Helmet>

      <ResponsiveNavigation />

      <main className="flex-grow">
        {/* Hero Section - Responsive */}
        <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-primary/5 via-blue-50 to-purple-50 dark:from-primary/10 dark:via-blue-950/30 dark:to-purple-950/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl text-center">
            <Badge variant="secondary" className="mb-6 sm:mb-8 px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-semibold bg-gradient-to-r from-green-50 to-blue-50 border-green-200 text-green-800 dark:from-green-900/30 dark:to-blue-900/30 dark:border-green-700 dark:text-green-200">
              <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
              Powered by Advanced AI Technology
            </Badge>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 leading-tight">
              Features That Make You
              <span className="bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent block mt-2">
                10x More Productive
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 sm:mb-10 max-w-3xl mx-auto leading-relaxed">
              Discover the powerful features that transform scattered information into organized intelligence. 
              Every feature is designed to save you time and amplify your intellectual capabilities.
            </p>

            {/* Stats Row - Responsive Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-3">
                    <stat.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-primary mb-1">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Button size="lg" className="gap-2 shadow-lg px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg" asChild>
                <Link to="/register">
                  <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" />
                  Start Your Free Trial
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg" asChild>
                <Link to="/dashboard">Experience the Demo</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Grid - Responsive */}
        <section className="py-12 sm:py-16 lg:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
                Everything You Need to Build Your
                <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent block">
                  Knowledge Empire
                </span>
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Each feature is crafted to eliminate friction and amplify your intellectual capabilities. 
                Stop losing brilliant ideas and start building your digital brain.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="hover:shadow-2xl transition-all duration-300 group border-0 bg-gradient-to-br from-background to-accent/10 hover:scale-105">
                  <CardHeader className="pb-4 sm:pb-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-${feature.color}-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <feature.icon className={`h-6 w-6 sm:h-8 sm:w-8 text-${feature.color}-500`} />
                      </div>
                      {feature.badge && (
                        <Badge variant="secondary" className="text-xs bg-gradient-to-r from-primary/10 to-blue-50 text-primary border-primary/20">
                          {feature.badge}
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-lg sm:text-xl group-hover:text-primary transition-colors duration-300">
                      {feature.title}
                    </CardTitle>
                    <CardDescription className="text-sm sm:text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 sm:space-y-3">
                      {feature.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                          <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 flex-shrink-0" />
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

        {/* CTA Section - Responsive */}
        <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-primary/5 to-blue-50 dark:from-primary/10 dark:to-blue-950/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8">
              Ready to Transform Your 
              <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent block">
                Productivity Forever?
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed">
              Join 50,000+ professionals who've already revolutionized their knowledge management. 
              Your future self will thank you for starting today.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Button size="lg" className="gap-2 shadow-lg px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg" asChild>
                <Link to="/register">
                  <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" />
                  Start Building Your Empire
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg" asChild>
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
