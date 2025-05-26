
import React from 'react';
import { Helmet } from 'react-helmet-async';
import MainNavigation from '@/components/navigation/MainNavigation';
import ImprovedFooter from '@/components/layout/ImprovedFooter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Target, Award, Heart, Zap, Shield } from 'lucide-react';

const About = () => {
  const teamMembers = [
    {
      name: "Sarah Chen",
      role: "Founder & CEO",
      description: "Former Google researcher passionate about knowledge organization",
      icon: Users
    },
    {
      name: "Marcus Rodriguez", 
      role: "CTO",
      description: "AI expert with 10+ years in machine learning and NLP",
      icon: Zap
    },
    {
      name: "Emily Johnson",
      role: "Head of Design",
      description: "UX designer focused on accessibility and user-centered design",
      icon: Heart
    }
  ];

  const values = [
    {
      title: "Privacy First",
      description: "Your data belongs to you. We use end-to-end encryption and never sell your information.",
      icon: Shield
    },
    {
      title: "Accessibility",
      description: "Knowledge should be accessible to everyone, regardless of ability or background.",
      icon: Users
    },
    {
      title: "Innovation",
      description: "We continuously push the boundaries of what's possible with AI and knowledge management.",
      icon: Zap
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>About Us - Accio Knowledge Engine</title>
        <meta name="description" content="Learn about Accio's mission to transform how people organize and access information through AI-powered knowledge management." />
      </Helmet>

      <MainNavigation />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-background via-primary/5 to-blue-500/5">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <Badge variant="outline" className="mb-6">Our Story</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Building the Future of
              <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent block">
                Knowledge Management
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              We believe that everyone deserves access to organized, searchable knowledge. 
              Our mission is to eliminate information chaos and help people focus on what matters most.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  In a world overflowing with information, we're building the tools to help people 
                  capture, organize, and rediscover their knowledge effortlessly. Accio combines 
                  the power of AI with intuitive design to create a personal knowledge engine 
                  that grows with you.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Started in 2024, we've helped over 10,000 professionals, researchers, and 
                  lifelong learners transform their relationship with information.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <Card className="text-center p-6">
                  <CardContent className="pt-6">
                    <div className="text-3xl font-bold text-primary mb-2">10K+</div>
                    <p className="text-sm text-muted-foreground">Active Users</p>
                  </CardContent>
                </Card>
                <Card className="text-center p-6">
                  <CardContent className="pt-6">
                    <div className="text-3xl font-bold text-primary mb-2">1M+</div>
                    <p className="text-sm text-muted-foreground">Items Saved</p>
                  </CardContent>
                </Card>
                <Card className="text-center p-6">
                  <CardContent className="pt-6">
                    <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
                    <p className="text-sm text-muted-foreground">Uptime</p>
                  </CardContent>
                </Card>
                <Card className="text-center p-6">
                  <CardContent className="pt-6">
                    <div className="text-3xl font-bold text-primary mb-2">4.9★</div>
                    <p className="text-sm text-muted-foreground">User Rating</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-muted/20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Values</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                The principles that guide everything we do
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-2xl flex items-center justify-center">
                      <value.icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle>{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
              <p className="text-xl text-muted-foreground">
                The people building the future of knowledge management
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center">
                      <member.icon className="h-10 w-10 text-white" />
                    </div>
                    <CardTitle>{member.name}</CardTitle>
                    <CardDescription className="text-primary font-medium">{member.role}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{member.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <ImprovedFooter />
    </div>
  );
};

export default About;
