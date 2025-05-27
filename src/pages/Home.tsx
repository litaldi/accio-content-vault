
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Brain, Search, Shield, Zap, CheckCircle, Star, Users, Globe, Clock } from 'lucide-react';
import { copy } from '@/utils/copy';

const Home: React.FC = () => {
  const benefits = [
    {
      icon: Brain,
      title: "AI That Actually Gets It",
      description: "Smart organization that learns from your habits and automatically categorizes everything perfectly.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Search,
      title: "Find Anything in Seconds",
      description: "Natural language search that understands what you mean, not just what you type.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Shield,
      title: "Your Data, Your Rules",
      description: "Enterprise security with complete privacy. Your knowledge stays yours, always.",
      color: "from-green-500 to-emerald-500"
    }
  ];

  const valueProps = [
    "Never lose important information again",
    "Save hours every week on research and organization", 
    "Discover insights you never knew existed",
    "Build knowledge that compounds over time"
  ];

  const stats = [
    { value: "50K+", label: "Knowledge Builders", icon: Users },
    { value: "2M+", label: "Ideas Captured", icon: Brain },
    { value: "99.9%", label: "Uptime Guarantee", icon: Clock },
    { value: "150+", label: "Countries Served", icon: Globe }
  ];

  return (
    <>
      <Helmet>
        <title>Accio - Turn Information Into Intelligence</title>
        <meta name="description" content="Transform scattered information into organized intelligence. Capture, organize, and rediscover everything that matters with AI-powered knowledge management." />
        <meta name="keywords" content="knowledge management, AI organization, personal intelligence, information capture" />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
          <div className="container relative z-10 text-center">
            <Badge variant="outline" className="mb-6 animate-fade-in">
              <Star className="h-3 w-3 mr-1" />
              Trusted by 50,000+ Knowledge Builders
            </Badge>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-fade-in">
              {copy.headlines.hero}
              <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent block mt-2">
                That Actually Works
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in">
              {copy.headlines.subhero} Stop drowning in bookmarks, notes, and forgotten insights. 
              <strong className="text-foreground"> Start building your personal intelligence engine today.</strong>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in">
              <Button size="lg" className="text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all group" asChild>
                <Link to="/register">
                  {copy.buttons.getStarted}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 border-2" asChild>
                <Link to="/features">
                  {copy.buttons.seeHowItWorks}
                </Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto animate-fade-in">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <stat.icon className="h-5 w-5 text-primary mr-2" />
                    <span className="text-2xl font-bold text-primary">{stat.value}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-muted/30">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Why Knowledge Workers Choose Accio
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Everything you need to transform information overload into organized intelligence
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {benefits.map((benefit, index) => (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer">
                  <CardHeader className="pb-4">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${benefit.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <benefit.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {benefit.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="leading-relaxed text-base">
                      {benefit.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Value Props */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-6">
                  What Makes Accio Different?
                </h3>
                <div className="space-y-4">
                  {valueProps.map((prop, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-lg">{prop}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="relative">
                <Card className="border-0 shadow-2xl">
                  <CardContent className="p-8">
                    <div className="space-y-6">
                      <div className="text-center">
                        <Badge className="mb-4">
                          <Zap className="h-3 w-3 mr-1" />
                          Quick Setup
                        </Badge>
                        <h4 className="text-xl font-bold mb-2">Get Started in Minutes</h4>
                        <p className="text-muted-foreground">
                          No complex setup, no training required. Just sign up and start capturing knowledge.
                        </p>
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
              Ready to Transform Your Knowledge?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who've revolutionized how they capture, organize, and use information.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button size="lg" className="text-lg px-8 py-6 shadow-lg" asChild>
                <Link to="/register">
                  {copy.buttons.signUp}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6" asChild>
                <Link to="/contact">
                  {copy.buttons.contact}
                </Link>
              </Button>
            </div>
            
            <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>{copy.trust.noCredit}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-blue-500" />
                <span>{copy.trust.freeTrial}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-purple-500" />
                <span>{copy.trust.setupTime}</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
