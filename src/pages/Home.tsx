
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Brain, Search, Shield, Zap, CheckCircle, Star, Users, Globe, Clock, Sparkles, Play, TrendingUp, BookOpen, Target, Rocket, Award, Heart } from 'lucide-react';
import { Typography, Layout, Interactive, animations, accessibility } from '@/components/ui/enhanced-design-system';
import { copy } from '@/utils/copy';

const Home: React.FC = () => {
  const keyBenefits = [
    {
      icon: Zap,
      title: "Save Instantly",
      description: "Capture any content with one click from any website or app",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: Brain,
      title: "Smart Organization",
      description: "AI automatically categorizes and tags everything perfectly",
      color: "from-purple-500 to-blue-500"
    },
    {
      icon: Search,
      title: "Find Anything",
      description: "Natural language search finds exactly what you need in seconds",
      color: "from-green-500 to-teal-500"
    }
  ];

  const valueProps = [
    { icon: Target, text: "Never lose important information again" },
    { icon: Clock, text: "Save 5+ hours weekly on research and organization" }, 
    { icon: Brain, text: "Discover hidden insights in your knowledge" },
    { icon: TrendingUp, text: "Build expertise that compounds over time" }
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

  const testimonials = [
    {
      quote: "Accio transformed how I manage my research. I can finally find everything I've saved instantly!",
      author: "Sarah Chen",
      role: "Research Scientist",
      avatar: "SC"
    },
    {
      quote: "The AI organization is incredible. It knows exactly where to put things before I even think about it.",
      author: "Marcus Johnson",
      role: "Product Manager",
      avatar: "MJ"
    },
    {
      quote: "I save 10+ hours every week just on finding and organizing information. Game changer.",
      author: "Elena Rodriguez",
      role: "Consultant",
      avatar: "ER"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Accio - Transform Information Into Personal Intelligence</title>
        <meta name="description" content="Never lose valuable information again. Accio helps you capture, organize, and rediscover everything that matters with intelligent AI-powered tools." />
        <meta name="keywords" content="knowledge management, AI organization, personal intelligence, information capture, smart search" />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        {/* Enhanced Hero Section */}
        <Layout.Section size="xl" background="accent" className="relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-blue-500/5" />
          <div className="absolute inset-0 bg-grid-pattern opacity-5" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
          
          <Layout.Container className="relative z-10">
            <div className="text-center max-w-6xl mx-auto">
              {/* Social Proof Badge */}
              <div className={cn("mb-8", animations.fadeIn)}>
                <Interactive.Badge variant="info" className="text-sm px-6 py-3 border bg-card/50 backdrop-blur-sm">
                  <Star className="h-4 w-4 fill-current" />
                  Trusted by 50,000+ Knowledge Workers
                </Interactive.Badge>
              </div>
              
              {/* Hero Headline */}
              <div className={cn("mb-8", animations.fadeIn)} style={{ animationDelay: '200ms' }}>
                <Typography.Hero className="mb-6">
                  Transform Information Into
                  <span className="bg-gradient-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent block mt-2">
                    Personal Intelligence
                  </span>
                </Typography.Hero>
              </div>
              
              {/* Hero Subheadline */}
              <div className={cn("mb-12", animations.fadeIn)} style={{ animationDelay: '400ms' }}>
                <Typography.Lead className="max-w-5xl mx-auto">
                  Stop losing valuable insights in digital chaos. Accio captures, organizes, and transforms 
                  <strong className="text-foreground"> any content into searchable knowledge</strong> that grows smarter with every addition.
                </Typography.Lead>
              </div>
              
              {/* CTA Buttons */}
              <div className={cn("flex flex-col sm:flex-row gap-6 justify-center mb-16", animations.fadeIn)} style={{ animationDelay: '600ms' }}>
                <Button 
                  size="lg" 
                  className={cn(
                    "text-lg px-10 py-6 shadow-xl group bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90",
                    animations.hoverGlow,
                    accessibility.focusRing
                  )} 
                  asChild
                >
                  <Link to="/register">
                    <Sparkles className="mr-3 h-5 w-5 group-hover:rotate-12 transition-transform" />
                    Start Building for Free
                    <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className={cn(
                    "text-lg px-10 py-6 border-2 hover:bg-primary/5 group backdrop-blur-sm",
                    animations.hoverLift,
                    accessibility.focusRing
                  )} 
                  asChild
                >
                  <Link to="/features">
                    <Play className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" />
                    See How It Works
                  </Link>
                </Button>
              </div>

              {/* Key Benefits */}
              <Layout.Grid cols="3" gap="lg" className={cn("mb-16", animations.fadeIn)} style={{ animationDelay: '800ms' }}>
                {keyBenefits.map((benefit, index) => (
                  <Interactive.Card 
                    key={index}
                    variant="glass"
                    interactive
                    className={cn("p-6 text-center", animations.stagger)}
                    style={{ animationDelay: `${800 + index * 100}ms` }}
                  >
                    <div className={cn("w-16 h-16 rounded-2xl bg-gradient-to-r", benefit.color, "flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform")}>
                      <benefit.icon className="h-8 w-8 text-white" />
                    </div>
                    <Typography.H4 className="mb-3">{benefit.title}</Typography.H4>
                    <Typography.Body size="sm" className="leading-relaxed">{benefit.description}</Typography.Body>
                  </Interactive.Card>
                ))}
              </Layout.Grid>

              {/* Trust Stats */}
              <Layout.Grid cols="4" gap="lg" className={cn("max-w-4xl mx-auto", animations.fadeIn)} style={{ animationDelay: '1000ms' }}>
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="flex items-center justify-center mb-3">
                      <stat.icon className="h-5 w-5 text-primary mr-2" />
                      <span className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                        {stat.value}
                      </span>
                    </div>
                    <Typography.Caption>{stat.label}</Typography.Caption>
                  </div>
                ))}
              </Layout.Grid>
            </div>
          </Layout.Container>
        </Layout.Section>

        {/* Enhanced Features Section */}
        <Layout.Section size="lg" background="muted">
          <Layout.Container>
            <div className="text-center mb-20">
              <Interactive.Badge variant="default" className="mb-6 text-sm px-4 py-2">
                <Zap className="h-4 w-4 mr-2" />
                Powerful Features
              </Interactive.Badge>
              <Typography.H1 className="mb-6">
                Everything You Need to Master
                <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent block">
                  Your Knowledge
                </span>
              </Typography.H1>
              <Typography.Lead className="max-w-4xl mx-auto">
                From instant capture to intelligent discovery, Accio provides all the tools 
                you need to transform scattered information into organized intelligence.
              </Typography.Lead>
            </div>

            <Layout.Grid cols="3" gap="lg" className="mb-20">
              {features.map((feature, index) => (
                <Interactive.Card 
                  key={index} 
                  variant="elevated"
                  interactive
                  className={cn("overflow-hidden", animations.fadeIn)}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <CardHeader className="pb-4">
                    <div className={cn("w-16 h-16 rounded-2xl bg-gradient-to-r", feature.color, "flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300")}>
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Typography.Body size="default">
                      {feature.description}
                    </Typography.Body>
                  </CardContent>
                </Interactive.Card>
              ))}
            </Layout.Grid>

            {/* Value Propositions */}
            <Layout.Grid cols="2" gap="lg" className="items-center">
              <div className="space-y-8">
                <div>
                  <Typography.H2 className="mb-6">
                    Why Choose Accio?
                  </Typography.H2>
                  <Typography.Body size="lg" className="mb-8">
                    Join thousands of professionals who've transformed how they manage knowledge.
                  </Typography.Body>
                </div>
                
                <div className="space-y-6">
                  {valueProps.map((prop, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mt-0.5">
                        <prop.icon className="h-4 w-4 text-green-600 dark:text-green-400" />
                      </div>
                      <Typography.Body size="lg" className="font-medium text-foreground">
                        {prop.text}
                      </Typography.Body>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="relative">
                <Interactive.Card variant="glass" className="p-10">
                  <div className="text-center space-y-6">
                    <Interactive.Badge variant="info">
                      <Rocket className="h-4 w-4 mr-2" />
                      Quick Start
                    </Interactive.Badge>
                    <Typography.H3>Ready in 30 Seconds</Typography.H3>
                    <Typography.Body size="lg">
                      No complex setup, no training required. Install our browser extension 
                      and start capturing knowledge immediately.
                    </Typography.Body>
                    <Button size="lg" className={cn("w-full group", accessibility.focusRing)} asChild>
                      <Link to="/register">
                        Get Started Now
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </div>
                </Interactive.Card>
              </div>
            </Layout.Grid>
          </Layout.Container>
        </Layout.Section>

        {/* Testimonials Section */}
        <Layout.Section size="lg">
          <Layout.Container>
            <div className="text-center mb-16">
              <Interactive.Badge variant="success" className="mb-6">
                <Heart className="h-4 w-4 mr-2" />
                Loved by Users
              </Interactive.Badge>
              <Typography.H2 className="mb-6">What Our Users Say</Typography.H2>
              <Typography.Lead>
                See how Accio is transforming knowledge management for professionals worldwide
              </Typography.Lead>
            </div>

            <Layout.Grid cols="3" gap="lg">
              {testimonials.map((testimonial, index) => (
                <Interactive.Card 
                  key={index}
                  variant="elevated"
                  className={cn("p-6", animations.fadeIn)}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="space-y-4">
                    <Typography.Body className="text-foreground italic">
                      "{testimonial.quote}"
                    </Typography.Body>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-primary to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <div className="font-semibold text-sm">{testimonial.author}</div>
                        <Typography.Caption>{testimonial.role}</Typography.Caption>
                      </div>
                    </div>
                  </div>
                </Interactive.Card>
              ))}
            </Layout.Grid>
          </Layout.Container>
        </Layout.Section>

        {/* Enhanced Final CTA Section */}
        <Layout.Section size="lg" background="accent">
          <Layout.Container className="text-center">
            <div className="max-w-4xl mx-auto">
              <Interactive.Badge variant="info" className="mb-6">
                <Award className="h-4 w-4 mr-2" />
                Start Your Journey
              </Interactive.Badge>
              
              <Typography.H1 className="mb-6">
                Ready to Transform Your Knowledge?
              </Typography.H1>
              
              <Typography.Lead className="mb-12 max-w-3xl mx-auto">
                Join over 50,000 professionals who've revolutionized how they capture, 
                organize, and leverage information. Start building your personal intelligence today.
              </Typography.Lead>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
                <Button 
                  size="lg" 
                  className={cn(
                    "text-lg px-10 py-6 shadow-xl bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90",
                    animations.hoverGlow,
                    accessibility.focusRing
                  )} 
                  asChild
                >
                  <Link to="/register">
                    <Sparkles className="mr-3 h-5 w-5" />
                    Start Building for Free
                    <ArrowRight className="ml-3 h-5 w-5" />
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className={cn(
                    "text-lg px-10 py-6 border-2 backdrop-blur-sm",
                    animations.hoverLift,
                    accessibility.focusRing
                  )} 
                  asChild
                >
                  <Link to="/contact">
                    Get in Touch
                  </Link>
                </Button>
              </div>
              
              <div className="flex flex-wrap justify-center items-center gap-8 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-muted-foreground">No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-500" />
                  <span className="text-muted-foreground">14-day free trial</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-purple-500" />
                  <span className="text-muted-foreground">Setup in 30 seconds</span>
                </div>
              </div>
            </div>
          </Layout.Container>
        </Layout.Section>
      </div>
    </>
  );
};

export default Home;
