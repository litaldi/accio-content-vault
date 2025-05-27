
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Brain, Search, Shield, Zap, CheckCircle, Star, Users, Globe, Clock, Sparkles, Play, TrendingUp, BookOpen, Target } from 'lucide-react';
import { copy } from '@/utils/copy';

const Home: React.FC = () => {
  const keyBenefits = [
    {
      icon: Zap,
      title: "Save Instantly",
      description: "Capture any content with one click from any website or app"
    },
    {
      icon: Brain,
      title: "Smart Organization",
      description: "AI automatically categorizes and tags everything perfectly"
    },
    {
      icon: Search,
      title: "Find Anything",
      description: "Natural language search finds exactly what you need in seconds"
    }
  ];

  const valueProps = [
    "Never lose important information again",
    "Save 5+ hours weekly on research and organization", 
    "Discover hidden insights in your knowledge",
    "Build expertise that compounds over time"
  ];

  const features = [
    {
      icon: BookOpen,
      title: "Effortlessly Capture Everything",
      description: "Save articles, PDFs, videos, and notes from anywhere. Our browser extension and mobile apps make capturing knowledge as simple as breathing.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Target,
      title: "Discover What You Need, When You Need It",
      description: "Ask questions in plain English and find the exact information you're looking for. No more digging through endless folders or bookmarks.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: TrendingUp,
      title: "Watch Your Knowledge Grow",
      description: "Track your learning patterns, identify knowledge gaps, and get personalized recommendations to expand your expertise strategically.",
      color: "from-green-500 to-emerald-500"
    }
  ];

  const stats = [
    { value: "50K+", label: "Active Users", icon: Users },
    { value: "2M+", label: "Items Saved", icon: Brain },
    { value: "99.9%", label: "Uptime", icon: Clock },
    { value: "150+", label: "Countries", icon: Globe }
  ];

  return (
    <>
      <Helmet>
        <title>Accio - Transform Information Into Personal Intelligence</title>
        <meta name="description" content="Never lose valuable information again. Accio helps you capture, organize, and rediscover everything that matters with intelligent AI-powered tools." />
        <meta name="keywords" content="knowledge management, AI organization, personal intelligence, information capture, smart search" />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-blue-500/5" />
          <div className="absolute inset-0 bg-grid-pattern opacity-5" />
          
          <div className="container relative z-10">
            <div className="text-center max-w-5xl mx-auto">
              <Badge variant="outline" className="mb-8 animate-fade-in text-sm px-4 py-2">
                <Star className="h-4 w-4 mr-2" />
                Trusted by 50,000+ Knowledge Workers
              </Badge>
              
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight mb-8 animate-fade-in">
                Transform Information Into
                <span className="bg-gradient-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent block mt-2">
                  Personal Intelligence
                </span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed animate-fade-in">
                Stop losing valuable insights in digital chaos. Accio captures, organizes, and transforms 
                <strong className="text-foreground"> any content into searchable knowledge</strong> that grows smarter with every addition.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16 animate-fade-in">
                <Button size="lg" className="text-lg px-10 py-6 shadow-xl hover:shadow-2xl transition-all group bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90" asChild>
                  <Link to="/register">
                    <Sparkles className="mr-3 h-5 w-5 group-hover:rotate-12 transition-transform" />
                    Start Building for Free
                    <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-10 py-6 border-2 hover:bg-primary/5 group" asChild>
                  <Link to="/features">
                    <Play className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" />
                    See How It Works
                  </Link>
                </Button>
              </div>

              {/* Key Benefits */}
              <div className="grid md:grid-cols-3 gap-8 mb-16 animate-fade-in">
                {keyBenefits.map((benefit, index) => (
                  <div 
                    key={index}
                    className="bg-card/50 backdrop-blur border rounded-xl p-6 hover:bg-card/80 transition-all duration-300 group"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <benefit.icon className="h-8 w-8 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
                  </div>
                ))}
              </div>

              {/* Trust Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto animate-fade-in">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <stat.icon className="h-5 w-5 text-primary mr-2" />
                      <span className="text-2xl lg:text-3xl font-bold text-primary">{stat.value}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-muted/30">
          <div className="container">
            <div className="text-center mb-20">
              <Badge variant="secondary" className="mb-6 text-sm px-4 py-2">
                <Zap className="h-4 w-4 mr-2" />
                Powerful Features
              </Badge>
              <h2 className="text-3xl lg:text-5xl font-bold mb-6">
                Everything You Need to Master
                <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent block">
                  Your Knowledge
                </span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                From instant capture to intelligent discovery, Accio provides all the tools 
                you need to transform scattered information into organized intelligence.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 mb-20">
              {features.map((feature, index) => (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-500 group cursor-pointer overflow-hidden">
                  <CardHeader className="pb-4">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="leading-relaxed text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Value Propositions */}
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div>
                  <h3 className="text-3xl font-bold mb-6">
                    Why Choose Accio?
                  </h3>
                  <p className="text-lg text-muted-foreground mb-8">
                    Join thousands of professionals who've transformed how they manage knowledge.
                  </p>
                </div>
                
                <div className="space-y-6">
                  {valueProps.map((prop, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mt-0.5">
                        <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                      </div>
                      <span className="text-lg font-medium">{prop}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="relative">
                <Card className="border-0 shadow-2xl bg-gradient-to-br from-card to-card/50 backdrop-blur">
                  <CardContent className="p-10">
                    <div className="text-center space-y-6">
                      <Badge className="bg-gradient-to-r from-primary to-blue-600 text-white">
                        <Zap className="h-4 w-4 mr-2" />
                        Quick Start
                      </Badge>
                      <h4 className="text-2xl font-bold">Ready in 30 Seconds</h4>
                      <p className="text-muted-foreground text-lg leading-relaxed">
                        No complex setup, no training required. Install our browser extension 
                        and start capturing knowledge immediately.
                      </p>
                      <Button size="lg" className="w-full group" asChild>
                        <Link to="/register">
                          Get Started Now
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary/10 via-primary/5 to-background">
          <div className="container text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl lg:text-5xl font-bold mb-6">
                Ready to Transform Your Knowledge?
              </h2>
              <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
                Join over 50,000 professionals who've revolutionized how they capture, 
                organize, and leverage information. Start building your personal intelligence today.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
                <Button size="lg" className="text-lg px-10 py-6 shadow-xl bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90" asChild>
                  <Link to="/register">
                    <Sparkles className="mr-3 h-5 w-5" />
                    Start Building for Free
                    <ArrowRight className="ml-3 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-10 py-6 border-2" asChild>
                  <Link to="/contact">
                    Get in Touch
                  </Link>
                </Button>
              </div>
              
              <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-500" />
                  <span>14-day free trial</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-purple-500" />
                  <span>Setup in 30 seconds</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
