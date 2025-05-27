
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
      title: "Never Lose Important Ideas Again",
      description: "Our AI instantly organizes everything you save, so brilliant insights don't slip through the cracks."
    },
    {
      icon: <Search className="h-6 w-6" />,
      title: "Find Anything in Seconds",
      description: "Stop digging through folders. Our smart search understands what you're looking for, even if you can't remember the exact words."
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "See Your Knowledge Growth",
      description: "Track how your knowledge expands over time and discover patterns in your learning journey."
    },
    {
      icon: <Share2 className="h-6 w-6" />,
      title: "Work With Your Favorite Tools",
      description: "Export to Notion, Obsidian, or any tool you love. Your knowledge stays flexible and portable."
    },
    {
      icon: <Tag className="h-6 w-6" />,
      title: "Zero Manual Organization",
      description: "Forget about filing systems. Our AI automatically tags and categorizes everything perfectly."
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Save From Anywhere, Instantly",
      description: "Whether you're on your phone, laptop, or tablet - capture brilliant content with one click."
    }
  ];

  const benefits = [
    "Save 5+ hours weekly on information management",
    "Never lose another brilliant idea or important article",
    "Find any saved content in under 10 seconds",
    "Build a searchable library of everything that matters",
    "Stop feeling overwhelmed by information chaos",
    "Access your knowledge from any device, anywhere"
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Product Manager",
      content: "I used to lose so many great ideas in bookmarks and notes. Now I actually USE what I save. Game-changer!",
      avatar: "SC"
    },
    {
      name: "Mike Rodriguez",
      role: "Developer",
      content: "Finally found something that gets better the more I use it. The AI actually understands my content.",
      avatar: "MR"
    },
    {
      name: "Dr. Emily Watson",
      role: "Researcher",
      content: "This is what every researcher needs. I can see exactly how my knowledge is growing and where the gaps are.",
      avatar: "EW"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Accio - Turn Information Chaos Into Your Competitive Advantage</title>
        <meta name="description" content="Stop losing brilliant ideas in digital clutter. Accio's AI transforms scattered information into organized, searchable knowledge you'll actually use." />
        <meta name="keywords" content="knowledge management, AI, productivity, information organization, digital workspace" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-accent/10">
          <div className="container mx-auto px-4 py-20 lg:py-32">
            <div className="text-center max-w-4xl mx-auto">
              <Badge variant="secondary" className="mb-6">
                <Zap className="h-3 w-3 mr-1" />
                Join 10,000+ Professionals Building Knowledge Empires
              </Badge>
              
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Stop Losing Brilliant Ideas in
                <br />
                <span className="text-primary">Digital Chaos</span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Transform scattered bookmarks, articles, and notes into a powerful knowledge system. 
                Our AI organizes everything so you can focus on what matters: using your insights to win.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {user ? (
                  <Button size="lg" asChild>
                    <Link to="/dashboard">
                      Continue Building Your Library
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                ) : (
                  <>
                    <Button size="lg" asChild>
                      <Link to="/register">
                        Start Building Your Knowledge Empire
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="outline" size="lg" asChild>
                      <Link to="/features">See How It Works</Link>
                    </Button>
                  </>
                )}
              </div>

              {/* Demo Account Notice */}
              <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  <strong>Try it instantly:</strong> demo@yourapp.com | Demo1234! (No signup required)
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                What You'll Achieve With Accio
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Real benefits that transform how you work with information every single day.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="h-full hover:shadow-lg transition-shadow">
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

        {/* Value Props Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                  Finally, A System That Actually Works
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Tired of bookmarks you never revisit? Notes you can't find? Information scattered 
                  across a dozen apps? Accio changes everything.
                </p>
                
                <div className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">5hrs</div>
                    <div className="text-sm text-muted-foreground">Saved Per Week</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">10sec</div>
                    <div className="text-sm text-muted-foreground">Average Search Time</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">95%</div>
                    <div className="text-sm text-muted-foreground">Find Success Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">0min</div>
                    <div className="text-sm text-muted-foreground">Setup Time</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Join The Knowledge Revolution
              </h2>
              <p className="text-xl text-muted-foreground">
                Professionals worldwide are building competitive advantages with organized knowledge.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <p className="text-muted-foreground mb-4 italic">"{testimonial.content}"</p>
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

        {/* Final CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Your Knowledge Empire Starts Today
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Stop letting brilliant ideas slip away. Start building the knowledge system that will 
                accelerate your success for years to come.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {user ? (
                  <Button size="lg" asChild>
                    <Link to="/dashboard">
                      Continue Your Journey
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                ) : (
                  <>
                    <Button size="lg" asChild>
                      <Link to="/register">
                        Yes, Build My Knowledge Empire
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="outline" size="lg" asChild>
                      <Link to="/features">Show Me The Magic First</Link>
                    </Button>
                  </>
                )}
              </div>
              
              <div className="flex items-center justify-center gap-6 mt-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  <span>Free forever plan</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>No credit card needed</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  <span>Start in 30 seconds</span>
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
