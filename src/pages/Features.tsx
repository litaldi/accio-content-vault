
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  Search, 
  FolderOpen, 
  BarChart3, 
  Shield,
  Zap,
  Globe,
  Smartphone,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Features: React.FC = () => {
  const mainFeatures = [
    {
      icon: Brain,
      title: 'AI-Powered Organization',
      description: 'Intelligent content categorization and smart tagging powered by advanced AI algorithms.',
      benefits: ['Auto-categorization', 'Smart tagging', 'Content analysis', 'Pattern recognition']
    },
    {
      icon: Search,
      title: 'Semantic Search',
      description: 'Find anything instantly with natural language search and semantic understanding.',
      benefits: ['Natural language queries', 'Context-aware results', 'Instant search', 'Smart filtering']
    },
    {
      icon: FolderOpen,
      title: 'Dynamic Collections',
      description: 'Organize content automatically with intelligent collections that adapt to your needs.',
      benefits: ['Auto-organization', 'Custom collections', 'Smart grouping', 'Easy management']
    },
    {
      icon: BarChart3,
      title: 'Insightful Analytics',
      description: 'Track your knowledge growth with detailed analytics and progress insights.',
      benefits: ['Usage tracking', 'Growth metrics', 'Content insights', 'Performance data']
    }
  ];

  const additionalFeatures = [
    { icon: Shield, title: 'Enterprise Security', description: 'Bank-level security with end-to-end encryption' },
    { icon: Zap, title: 'Lightning Fast', description: 'Optimized performance for instant content access' },
    { icon: Globe, title: 'Universal Access', description: 'Access your knowledge from anywhere, anytime' },
    { icon: Smartphone, title: 'Mobile Ready', description: 'Fully responsive design for all devices' }
  ];

  return (
    <>
      <Helmet>
        <title>Features - Accio | AI-Powered Knowledge Management</title>
        <meta name="description" content="Discover Accio's powerful features including AI organization, semantic search, dynamic collections, and insightful analytics for knowledge management." />
      </Helmet>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-blue-500/5">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="outline" className="mb-6">
            <Brain className="h-3 w-3 mr-1" />
            Powered by AI
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Features That 
            <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent block sm:inline">
              {" "}Empower Knowledge
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Discover how Accio transforms the way you capture, organize, and access knowledge 
            with cutting-edge AI technology and intuitive design.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/playground">
                Try Features Demo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/dashboard">Get Started Free</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Core Features</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to build and maintain your personal knowledge sanctuary
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {mainFeatures.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </div>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Additional Benefits</h2>
            <p className="text-xl text-muted-foreground">
              Built with modern standards for security, performance, and accessibility
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalFeatures.map((feature, index) => (
              <Card key={index} className="text-center hover:bg-card/80 transition-colors">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
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
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Knowledge?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of users who have already revolutionized their knowledge management with Accio.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/dashboard">
                Start Building Knowledge
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/contact">Talk to Sales</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;
