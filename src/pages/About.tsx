
import React from 'react';
import UnifiedPageLayout from '@/components/layout/UnifiedPageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Brain,
  Users,
  Target,
  Heart,
  Award,
  Globe,
  Lightbulb,
  Shield,
  Zap,
  CheckCircle,
  ArrowRight,
  Quote
} from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  const values = [
    {
      icon: Brain,
      title: "Innovation First",
      description: "We push the boundaries of what's possible in knowledge management through cutting-edge AI technology."
    },
    {
      icon: Users,
      title: "User-Centric",
      description: "Every feature we build starts with understanding our users' real needs and challenges."
    },
    {
      icon: Shield,
      title: "Privacy & Security",
      description: "Your knowledge is precious. We protect it with enterprise-grade security and complete privacy."
    },
    {
      icon: Heart,
      title: "Empowerment",
      description: "We believe in empowering individuals and teams to achieve more through better knowledge management."
    }
  ];

  const milestones = [
    {
      year: "2020",
      title: "The Idea",
      description: "Founded with a vision to solve information overload for knowledge workers worldwide."
    },
    {
      year: "2021",
      title: "First Product",
      description: "Launched our MVP with basic knowledge capture and organization features."
    },
    {
      year: "2022",
      title: "AI Integration",
      description: "Introduced AI-powered tagging and search, revolutionizing how users find information."
    },
    {
      year: "2023",
      title: "Team Growth",
      description: "Expanded to 50+ team members across engineering, design, and customer success."
    },
    {
      year: "2024",
      title: "Global Scale",
      description: "Serving 100,000+ users across 150+ countries with advanced knowledge management."
    }
  ];

  const team = [
    {
      name: "Sarah Chen",
      role: "Co-Founder & CEO",
      bio: "Former VP of Product at a leading tech company, passionate about democratizing knowledge management.",
      image: "/api/placeholder/200/200"
    },
    {
      name: "Marcus Rodriguez",
      role: "Co-Founder & CTO",
      bio: "AI researcher with 15+ years experience building intelligent systems at scale.",
      image: "/api/placeholder/200/200"
    },
    {
      name: "Emily Foster",
      role: "Head of Design",
      bio: "Award-winning designer focused on creating intuitive experiences for complex workflows.",
      image: "/api/placeholder/200/200"
    },
    {
      name: "David Kim",
      role: "VP of Engineering",
      bio: "Infrastructure expert who's built systems serving millions of users at top tech companies.",
      image: "/api/placeholder/200/200"
    }
  ];

  const stats = [
    { value: "100K+", label: "Active Users" },
    { value: "10M+", label: "Items Organized" },
    { value: "150+", label: "Countries" },
    { value: "99.9%", label: "Uptime" }
  ];

  return (
    <UnifiedPageLayout
      title="About Us - Our Mission & Story | Accio"
      description="Learn about Accio's mission to transform knowledge management through AI. Meet our team and discover our journey."
    >
      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="container text-center">
          <Badge variant="outline" className="mb-6">
            <Heart className="h-3 w-3 mr-1" />
            Our Story
          </Badge>
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            Building the future of
            <span className="text-primary block">knowledge management</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed">
            We believe that everyone should have access to their knowledge when they need it most. 
            Accio was born from the frustration of losing important information and the conviction 
            that AI can solve this universal problem.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Our mission is simple yet ambitious
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                We're on a mission to eliminate information chaos and empower every knowledge 
                worker to build their personal intelligence engine. Through AI-powered organization 
                and semantic search, we're making human knowledge infinitely more accessible and actionable.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Democratize Knowledge Management</h3>
                    <p className="text-muted-foreground">Make powerful knowledge tools accessible to everyone, not just enterprises.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Amplify Human Intelligence</h3>
                    <p className="text-muted-foreground">Use AI to enhance human capabilities, not replace them.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Preserve Privacy</h3>
                    <p className="text-muted-foreground">Ensure your knowledge remains private and secure, always.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <Card className="border-0 shadow-xl">
                <CardContent className="p-8">
                  <Quote className="h-12 w-12 text-primary mb-6" />
                  <blockquote className="text-lg italic mb-6">
                    "The best way to organize information is not to organize it at all, 
                    but to make it so intelligent that it organizes itself."
                  </blockquote>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">SC</span>
                    </div>
                    <div>
                      <div className="font-semibold">Sarah Chen</div>
                      <div className="text-sm text-muted-foreground">Co-Founder & CEO</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Our values guide everything we do</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              These principles shape our culture, our product decisions, and our relationships 
              with users and each other.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="border-0 shadow-lg text-center group hover:shadow-xl transition-all">
                <CardHeader>
                  <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="leading-relaxed">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Our journey so far</h2>
            <p className="text-xl text-muted-foreground">
              From a simple idea to a platform used by thousands worldwide
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex gap-8 group">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
                      {milestone.year}
                    </div>
                    {index < milestones.length - 1 && (
                      <div className="w-0.5 h-16 bg-gradient-to-b from-primary/20 to-transparent mt-4" />
                    )}
                  </div>
                  <div className="flex-1 pb-8">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {milestone.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Meet our team</h2>
            <p className="text-xl text-muted-foreground">
              The passionate people building the future of knowledge management
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="border-0 shadow-lg text-center group hover:shadow-xl transition-all">
                <CardContent className="p-6">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                    <Users className="h-12 w-12 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg mb-1">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {member.bio}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 via-primary/5 to-background">
        <div className="container text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to join our mission?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Whether you're looking to transform your knowledge management or want to help us build 
            the future, we'd love to connect with you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6" asChild>
              <Link to="/register">
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6" asChild>
              <Link to="/contact">
                Get in Touch
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </UnifiedPageLayout>
  );
};

export default About;
