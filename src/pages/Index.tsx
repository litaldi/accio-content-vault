
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { Brain, Search, Tag, BarChart3, Share2, Zap, ArrowRight, CheckCircle, Users, Shield, Globe } from 'lucide-react';

const Index = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: <Brain className="h-6 w-6" />,
      title: "AI-Powered Organization",
      description: "Automatically categorize and tag your content with advanced AI algorithms."
    },
    {
      icon: <Search className="h-6 w-6" />,
      title: "Smart Search & Discovery",
      description: "Find exactly what you need with semantic search and intelligent recommendations."
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Analytics & Insights",
      description: "Track your learning patterns and content engagement with detailed analytics."
    },
    {
      icon: <Share2 className="h-6 w-6" />,
      title: "Export & Integration",
      description: "Seamlessly export to popular tools and integrate with your existing workflow."
    },
    {
      icon: <Tag className="h-6 w-6" />,
      title: "Smart Tagging",
      description: "Automatically generate relevant tags and organize content intelligently."
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Instant Capture",
      description: "Save content from anywhere with our browser extension and mobile apps."
    }
  ];

  const benefits = [
    "Unlimited content saving and organization",
    "AI-powered content analysis and tagging",
    "Advanced search with semantic understanding",
    "Detailed analytics and learning insights",
    "Export to popular productivity tools",
    "Mobile and web access across all devices"
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Product Manager",
      content: "Accio has transformed how I organize research. The AI tagging is incredibly accurate and saves me hours of manual work.",
      avatar: "SC"
    },
    {
      name: "Mike Rodriguez",
      role: "Developer",
      content: "The semantic search is a game-changer. I can find relevant content even when I don't remember the exact keywords.",
      avatar: "MR"
    },
    {
      name: "Dr. Emily Watson",
      role: "Researcher",
      content: "Perfect for academic research. The analytics help me track my reading progress and identify knowledge gaps.",
      avatar: "EW"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Accio - AI-Powered Knowledge Management</title>
        <meta name="description" content="Transform how you save, organize, and discover knowledge with AI-powered content management. Never lose important information again." />
        <meta name="keywords" content="knowledge management, AI, content organization, research tool, productivity" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-accent/10">
          <div className="container mx-auto px-4 py-20 lg:py-32">
            <div className="text-center max-w-4xl mx-auto">
              <Badge variant="secondary" className="mb-6">
                <Zap className="h-3 w-3 mr-1" />
                AI-Powered Knowledge Engine
              </Badge>
              
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Never Lose Important
                <br />
                <span className="text-primary">Information Again</span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Accio uses advanced AI to help you save, organize, and rediscover content effortlessly. 
                Turn information overload into organized knowledge.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {user ? (
                  <Button size="lg" asChild>
                    <Link to="/dashboard">
                      Go to Dashboard
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                ) : (
                  <>
                    <Button size="lg" asChild>
                      <Link to="/register">
                        Get Started Free
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="outline" size="lg" asChild>
                      <Link to="/login">Sign In</Link>
                    </Button>
                  </>
                )}
              </div>

              {/* Demo Account Notice */}
              <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  <strong>Try the demo:</strong> Email: demo@yourapp.com | Password: Demo1234!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Powerful Features for Modern Knowledge Workers
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Everything you need to transform information chaos into organized, searchable knowledge.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="h-full">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 text-primary">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
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
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                  Everything You Need in One Platform
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Accio combines the best of AI technology with intuitive design to create 
                  the ultimate knowledge management experience.
                </p>
                
                <div className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">10K+</div>
                    <div className="text-sm text-muted-foreground">Content Items Organized</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">95%</div>
                    <div className="text-sm text-muted-foreground">Search Accuracy</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">5h</div>
                    <div className="text-sm text-muted-foreground">Time Saved Weekly</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                    <div className="text-sm text-muted-foreground">Access Anywhere</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Trusted by Knowledge Workers Worldwide
              </h2>
              <p className="text-xl text-muted-foreground">
                See how Accio is helping professionals organize their digital knowledge.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <p className="text-muted-foreground mb-4">"{testimonial.content}"</p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <div className="font-semibold">{testimonial.name}</div>
                        <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Ready to Transform Your Knowledge Management?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Join thousands of professionals who have already organized their digital knowledge with Accio.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {user ? (
                  <Button size="lg" asChild>
                    <Link to="/dashboard">
                      Go to Dashboard
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                ) : (
                  <>
                    <Button size="lg" asChild>
                      <Link to="/register">
                        Start Your Free Account
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="outline" size="lg" asChild>
                      <Link to="/login">Sign In</Link>
                    </Button>
                  </>
                )}
              </div>
              
              <div className="flex items-center justify-center gap-6 mt-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  <span>Secure & Private</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>Team Collaboration</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  <span>Access Anywhere</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Index;
