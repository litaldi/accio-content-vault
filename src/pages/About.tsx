
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { UnifiedLayout } from '@/components/layout/UnifiedLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Target, Heart, Zap, Shield, Globe, ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  const teamMembers = [
    {
      name: "Sarah Chen",
      role: "Founder & CEO",
      bio: "Former Google Product Manager with 8 years in knowledge management",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b647?auto=format&fit=crop&w=300&q=80"
    },
    {
      name: "Marcus Rodriguez", 
      role: "CTO",
      bio: "AI researcher and former Netflix engineer, passionate about semantic search",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80"
    },
    {
      name: "Emily Watson",
      role: "Head of Design",
      bio: "UX designer focused on accessibility and human-centered design",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80"
    }
  ];

  const values = [
    {
      icon: Users,
      title: "Human-Centered",
      description: "Every feature is designed with real user needs and workflows in mind."
    },
    {
      icon: Shield,
      title: "Privacy First",
      description: "Your knowledge is yours. We use encryption and never sell your data."
    },
    {
      icon: Zap,
      title: "Effortless Power",
      description: "Sophisticated AI that works invisibly, making complex tasks simple."
    },
    {
      icon: Globe,
      title: "Accessible to All",
      description: "Built with accessibility, internationalization, and inclusion at the core."
    }
  ];

  const milestones = [
    { year: "2023", event: "Founded with vision to solve information overload" },
    { year: "2023", event: "First AI-powered organization algorithm launched" },
    { year: "2024", event: "10,000+ users trust Accio with their knowledge" },
    { year: "2024", event: "Expanded to team collaboration features" }
  ];

  return (
    <UnifiedLayout>
      <Helmet>
        <title>About Accio - Our Mission to Organize Human Knowledge</title>
        <meta name="description" content="Learn about Accio's mission to make human knowledge accessible and organized. Meet our team and discover the story behind your AI knowledge assistant." />
      </Helmet>

      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <Badge className="mb-6 px-4 py-2 text-sm font-medium">Our Story</Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Making Knowledge
              <span className="text-primary block">Accessible to Everyone</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We believe that everyone deserves a powerful, intelligent way to capture, organize, 
              and access their knowledge. Accio was born from the frustration of losing important 
              information in the digital chaos.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">The Problem We're Solving</h2>
              <p className="text-muted-foreground leading-relaxed">
                Knowledge workers save thousands of articles, documents, and links every year, 
                but 80% of saved content is never accessed again. The problem isn't saving—it's 
                finding and organizing.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Traditional bookmarks and note apps fall short because they require manual 
                organization. We built Accio to be your intelligent knowledge companion that 
                understands context and connects ideas automatically.
              </p>
              <div className="flex items-center gap-4 pt-4">
                <Button asChild size="lg">
                  <Link to="/register">
                    Join Our Mission
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/help">Learn More</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl p-8 backdrop-blur-sm border">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Star className="h-5 w-5 text-yellow-500" />
                    <span className="font-semibold">4.9/5 user rating</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-blue-500" />
                    <span className="font-semibold">10,000+ happy users</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Target className="h-5 w-5 text-green-500" />
                    <span className="font-semibold">5 hours saved per week</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              These principles guide every decision we make and every feature we build.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We're a small but passionate team of builders, designers, and researchers.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <img 
                    src={member.image} 
                    alt={`${member.name} profile`}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Our Journey</h2>
            <p className="text-xl text-muted-foreground">
              From idea to helping thousands organize their knowledge.
            </p>
          </div>
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-center gap-6">
                <div className="flex-shrink-0 w-20 text-right">
                  <span className="text-2xl font-bold text-primary">{milestone.year}</span>
                </div>
                <div className="flex-shrink-0 w-4 h-4 rounded-full bg-primary"></div>
                <div className="flex-grow">
                  <p className="text-lg">{milestone.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Join Us in Organizing Human Knowledge</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Start building your personal knowledge engine today. Free plan available, no credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/register">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/help">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </UnifiedLayout>
  );
};

export default About;
