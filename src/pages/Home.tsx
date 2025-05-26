
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
  Shield,
  Zap,
  Globe,
  Smartphone,
  ArrowRight,
  CheckCircle,
  Star,
  Users,
  TrendingUp,
  Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Organization',
      description: 'Let artificial intelligence automatically categorize and organize your knowledge base.'
    },
    {
      icon: Search,
      title: 'Semantic Search',
      description: 'Find exactly what you need with natural language search that understands context.'
    },
    {
      icon: FolderOpen,
      title: 'Smart Collections',
      description: 'Organize content into intelligent collections that adapt to your workflow.'
    },
    {
      icon: BarChart3,
      title: 'Insightful Analytics',
      description: 'Track your knowledge growth and discover patterns in your learning journey.'
    }
  ];

  const benefits = [
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-level encryption and security protocols'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Optimized performance for instant access'
    },
    {
      icon: Globe,
      title: 'Universal Access',
      description: 'Access your knowledge from anywhere'
    },
    {
      icon: Smartphone,
      title: 'Mobile Ready',
      description: 'Fully responsive on all devices'
    }
  ];

  const stats = [
    { label: 'Active Users', value: '10,000+', icon: Users },
    { label: 'Knowledge Items', value: '1M+', icon: Brain },
    { label: 'Satisfaction Rate', value: '98%', icon: Star },
    { label: 'Growth Rate', value: '150%', icon: TrendingUp }
  ];

  return (
    <>
      <Helmet>
        <title>Accio - AI-Powered Knowledge Management Platform</title>
        <meta name="description" content="Transform how you capture, organize, and access knowledge with Accio's AI-powered platform. Build your personal knowledge sanctuary and discover insights like never before." />
        <meta name="keywords" content="knowledge management, AI, organization, search, productivity, learning" />
      </Helmet>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-blue-500/5">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="outline" className="mb-6">
            <Sparkles className="h-3 w-3 mr-1" />
            AI-Powered Knowledge Management
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Organize Your Knowledge with 
            <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent block sm:inline">
              {" "}AI Intelligence
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Transform scattered information into actionable insights with Accio's smart knowledge management platform. 
            Capture, organize, and discover your knowledge like never before.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" asChild>
              <Link to="/dashboard">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/playground">Try Demo</Link>
            </Button>
          </div>
          
          {/* Trust Signals */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Free 14-day trial</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>2-minute setup</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features for Modern Knowledge Workers</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to build, organize, and leverage your personal knowledge base
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </div>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" asChild>
              <Link to="/features">
                Explore All Features
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Built for Performance & Security</h2>
            <p className="text-xl text-muted-foreground">
              Enterprise-grade platform with modern standards for security, performance, and accessibility
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center hover:bg-card/80 transition-colors">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Knowledge Management?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of knowledge workers who have already revolutionized how they capture, 
            organize, and access information with Accio.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/dashboard">
                Start Building Your Knowledge Base
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/contact">Talk to Sales</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
