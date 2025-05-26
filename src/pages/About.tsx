
import React from 'react';
import { Helmet } from 'react-helmet-async';
import MainNavigation from '@/components/navigation/MainNavigation';
import ImprovedFooter from '@/components/layout/ImprovedFooter';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users, Target, Heart, Zap, Brain, Globe } from 'lucide-react';

const About = () => {
  const team = [
    {
      name: "Alex Chen",
      role: "CEO & Founder",
      bio: "Former Google PM with 10+ years building productivity tools. Passionate about solving information overload.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Maria Rodriguez", 
      role: "CTO & Co-Founder",
      bio: "AI researcher from Stanford. Led machine learning teams at Microsoft and OpenAI.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "David Kim",
      role: "Head of Design", 
      bio: "UX designer focused on making complex tools simple. Previously at Notion and Linear.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    }
  ];

  const values = [
    {
      icon: Brain,
      title: "Intelligence First",
      description: "We believe AI should amplify human intelligence, not replace it. Our tools make you smarter, not dependent."
    },
    {
      icon: Heart,
      title: "Human-Centered",
      description: "Technology serves people, not the other way around. Every feature is designed with empathy and care."
    },
    {
      icon: Zap,
      title: "Effortless Power",
      description: "Complex capabilities with simple interfaces. Advanced features that anyone can use."
    },
    {
      icon: Globe,
      title: "Universal Access",
      description: "Knowledge tools should work for everyone, everywhere. We build for inclusion and accessibility."
    }
  ];

  const milestones = [
    { year: "2023", event: "Founded by Alex and Maria after frustrating experiences with existing knowledge tools" },
    { year: "2023", event: "Launched MVP and gained first 100 beta users within 2 weeks" },
    { year: "2024", event: "Reached 1,000 users and launched AI-powered organization features" },
    { year: "2024", event: "Crossed 10,000 users and expanded to team collaboration features" },
    { year: "2024", event: "Became #1 rated knowledge management tool on Product Hunt" }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>About - Accio Knowledge Engine</title>
        <meta name="description" content="Learn about Accio's mission to transform how people manage and discover knowledge. Meet our team and discover our story." />
      </Helmet>

      <MainNavigation />

      <main className="flex-grow" id="main-content">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-background via-primary/5 to-blue-500/5">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About
              <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent block">
                Accio
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              We're on a mission to transform how people manage and discover knowledge, 
              making information chaos a thing of the past.
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">The problem that started it all</h2>
                <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    As a product manager at Google, Alex spent hours every week searching for that 
                    perfect article he'd bookmarked months ago. Despite having access to the world's 
                    best search technology at work, his personal knowledge was a complete mess.
                  </p>
                  <p>
                    Maria, working on AI research at Stanford, faced the same frustration. Brilliant 
                    research papers were buried in folders, important insights were scattered across 
                    dozens of documents, and valuable knowledge was effectively lost.
                  </p>
                  <p>
                    They realized millions of knowledge workers faced this same problem: 
                    <strong className="text-foreground"> we can find anything on the internet, 
                    but we can't find anything in our own information.</strong>
                  </p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-primary/10 to-blue-500/10 rounded-3xl p-8">
                <blockquote className="text-lg italic text-center">
                  "We have access to infinite information, but zero organization. 
                  That's the paradox of knowledge work in 2024."
                </blockquote>
                <div className="text-center mt-4 text-muted-foreground">
                  — Alex Chen, CEO & Founder
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-muted/20">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Our values guide everything we build</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                These principles shape every product decision, every line of code, 
                and every interaction with our community.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="text-center p-6 border-0 bg-background hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-2xl flex items-center justify-center">
                      <value.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{value.description}</p>
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
              <h2 className="text-3xl font-bold mb-4">Meet the team</h2>
              <p className="text-xl text-muted-foreground">
                Passionate builders solving real problems for knowledge workers everywhere.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <Card key={index} className="text-center border-0 bg-background hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <img 
                      src={member.avatar} 
                      alt={member.name}
                      className="w-24 h-24 mx-auto rounded-full object-cover mb-4"
                    />
                    <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                    <p className="text-primary font-medium mb-4">{member.role}</p>
                    <p className="text-muted-foreground text-sm leading-relaxed">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-20 bg-muted/20">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Our journey so far</h2>
              <p className="text-xl text-muted-foreground">
                From a simple idea to a tool trusted by thousands of professionals worldwide.
              </p>
            </div>

            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex gap-6 items-start">
                  <div className="flex-shrink-0 w-20 text-right">
                    <Badge variant="outline" className="font-semibold">
                      {milestone.year}
                    </Badge>
                  </div>
                  <div className="flex-shrink-0 w-4 h-4 bg-primary rounded-full mt-1"></div>
                  <div className="flex-grow">
                    <p className="text-muted-foreground leading-relaxed">{milestone.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-6">
              Want to be part of our mission?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Whether you're looking to join our team, partner with us, or just want to 
              transform your own productivity, we'd love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-4">
                Join Our Team
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                Get in Touch
              </Button>
            </div>
          </div>
        </section>
      </main>

      <ImprovedFooter />
    </div>
  );
};

export default About;
