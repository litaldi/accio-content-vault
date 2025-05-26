
import React from 'react';
import UnifiedPageLayout from '@/components/layout/UnifiedPageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  Zap, 
  Search, 
  Shield,
  Users,
  Cloud,
  Smartphone,
  FileText,
  Tag,
  Network,
  Star,
  CheckCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Features = () => {
  const mainFeatures = [
    {
      icon: Brain,
      title: "AI-Powered Organization",
      description: "Our intelligent system automatically categorizes and connects your knowledge, creating meaningful relationships between your ideas.",
      highlights: ["Smart tagging", "Auto-categorization", "Concept linking", "Pattern recognition"]
    },
    {
      icon: Zap,
      title: "Lightning Fast Search",
      description: "Find anything in seconds with our semantic search that understands context, not just keywords.",
      highlights: ["Semantic understanding", "Context-aware results", "Instant suggestions", "Natural language queries"]
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Your data stays private and secure with end-to-end encryption and enterprise-grade security measures.",
      highlights: ["End-to-end encryption", "GDPR compliant", "Zero-knowledge architecture", "Regular security audits"]
    }
  ];

  const additionalFeatures = [
    { icon: Users, title: "Team Collaboration", description: "Share knowledge seamlessly with your team" },
    { icon: Cloud, title: "Cloud Sync", description: "Access your knowledge from anywhere, anytime" },
    { icon: Smartphone, title: "Mobile Ready", description: "Fully responsive design for all devices" },
    { icon: FileText, title: "Rich Content", description: "Support for text, images, documents, and more" },
    { icon: Tag, title: "Smart Tags", description: "Intelligent tagging system for better organization" },
    { icon: Network, title: "Knowledge Graph", description: "Visualize connections between your ideas" }
  ];

  return (
    <UnifiedPageLayout
      title="Features - Accio Knowledge Engine"
      description="Discover all the powerful features that make Accio the ultimate AI-powered knowledge management platform."
    >
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-primary/5 via-background to-background">
        <div className="container text-center">
          <Badge variant="outline" className="mb-6">
            <Star className="h-3 w-3 mr-1" />
            Features Overview
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Everything you need to build your
            <span className="text-primary block">knowledge empire</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Powerful features designed to amplify your intellectual capabilities and transform 
            how you work with information.
          </p>
          <Button size="lg" asChild>
            <Link to="/register">
              Start Free Trial
            </Link>
          </Button>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Core Features</h2>
            <p className="text-xl text-muted-foreground">
              The foundation of intelligent knowledge management
            </p>
          </div>

          <div className="grid gap-12 lg:gap-16">
            {mainFeatures.map((feature, index) => (
              <div key={index} className={`grid lg:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                        <feature.icon className="h-8 w-8 text-primary" />
                      </div>
                      <CardTitle className="text-2xl">{feature.title}</CardTitle>
                      <CardDescription className="text-lg leading-relaxed">
                        {feature.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {feature.highlights.map((highlight, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-primary" />
                            <span className="text-sm">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
                <div className={`bg-gradient-to-br from-primary/10 to-transparent rounded-lg p-8 flex items-center justify-center ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                  <feature.icon className="h-32 w-32 text-primary/60" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Features Grid */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Additional Features</h2>
            <p className="text-lg text-muted-foreground">
              Even more ways to enhance your knowledge workflow
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalFeatures.map((feature, index) => (
              <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container">
          <Card className="border-0 bg-gradient-to-r from-primary/10 to-transparent">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of professionals who've transformed their knowledge management. 
                Start your free trial today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link to="/register">Start Free Trial</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/contact">Contact Sales</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </UnifiedPageLayout>
  );
};

export default Features;
