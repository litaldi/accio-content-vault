
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  Search, 
  Zap, 
  Shield, 
  Users, 
  ArrowRight, 
  Check, 
  Star,
  FileText,
  Tag,
  Link as LinkIcon,
  Smartphone,
  Cloud,
  BarChart3
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Features = () => {
  const mainFeatures = [
    {
      icon: Brain,
      title: 'AI-Powered Organization',
      description: 'Automatically categorize and tag your content using advanced machine learning algorithms.',
      benefits: [
        'Smart content categorization',
        'Automatic tagging',
        'Context-aware organization',
        'Learning from your patterns'
      ]
    },
    {
      icon: Search,
      title: 'Semantic Search',
      description: 'Find content by describing what you remember, not just exact keywords.',
      benefits: [
        'Natural language queries',
        'Context-based results',
        'Cross-document search',
        'Instant suggestions'
      ]
    },
    {
      icon: Zap,
      title: 'Quick Capture',
      description: 'Save content from anywhere with our browser extension and mobile apps.',
      benefits: [
        'One-click web clipping',
        'Mobile app integration',
        'Email forwarding',
        'API integrations'
      ]
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-level encryption and compliance with industry security standards.',
      benefits: [
        'End-to-end encryption',
        'SOC 2 compliance',
        'GDPR compliant',
        'Role-based access'
      ]
    }
  ];

  const additionalFeatures = [
    { icon: Users, title: 'Team Collaboration', description: 'Share knowledge bases and collaborate in real-time' },
    { icon: FileText, title: 'Rich Text Support', description: 'Format your content with full rich text editing' },
    { icon: Tag, title: 'Smart Tagging', description: 'AI suggests relevant tags for your content' },
    { icon: LinkIcon, title: 'Link Management', description: 'Save and organize links with automatic metadata' },
    { icon: Smartphone, title: 'Mobile Apps', description: 'Access your knowledge on iOS and Android' },
    { icon: Cloud, title: 'Cloud Sync', description: 'Seamless synchronization across all devices' },
    { icon: BarChart3, title: 'Analytics', description: 'Insights into your knowledge usage patterns' },
    { icon: Star, title: 'Favorites', description: 'Mark important content for quick access' }
  ];

  return (
    <>
      <Helmet>
        <title>Features - Accio</title>
        <meta name="description" content="Discover Accio's powerful AI-driven features for knowledge management and organization. Transform how you save, organize, and find information." />
      </Helmet>

      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-24 bg-gradient-to-br from-primary/5 to-blue-600/5">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <Badge variant="secondary" className="mb-6">
                <Brain className="h-3 w-3 mr-1" />
                Powered by Advanced AI
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Features That Transform
                <span className="block bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                  How You Work
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                Discover the powerful features that make Accio the most intelligent 
                knowledge management platform for modern professionals.
              </p>
              <Button size="lg" asChild>
                <Link to="/register">
                  Try All Features Free
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Main Features */}
        <section className="py-24">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Core Features</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                These are the features that set Accio apart from traditional knowledge management tools.
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12">
              {mainFeatures.map((feature, index) => (
                <Card key={index} className="p-8 border-0 shadow-xl">
                  <CardHeader className="pb-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                      <feature.icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-2xl mb-3">{feature.title}</CardTitle>
                    <CardDescription className="text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {feature.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-center">
                          <Check className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
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

        {/* Additional Features Grid */}
        <section className="py-24 bg-muted/20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Everything You Need</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                A comprehensive set of tools to manage your knowledge effectively.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {additionalFeatures.map((feature, index) => (
                <Card key={index} className="p-6 text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Integration Section */}
        <section className="py-24">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Seamless Integrations</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Connect Accio with your favorite tools and platforms.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-6 text-center">
                <CardHeader>
                  <CardTitle className="text-xl">Browser Extensions</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Save content from any website with our Chrome, Firefox, and Safari extensions.
                  </p>
                  <Badge variant="outline">Chrome</Badge>
                  <Badge variant="outline" className="ml-2">Firefox</Badge>
                  <Badge variant="outline" className="ml-2">Safari</Badge>
                </CardContent>
              </Card>
              
              <Card className="p-6 text-center">
                <CardHeader>
                  <CardTitle className="text-xl">Productivity Apps</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Integrate with your workflow using our API and app connections.
                  </p>
                  <Badge variant="outline">Slack</Badge>
                  <Badge variant="outline" className="ml-2">Notion</Badge>
                  <Badge variant="outline" className="ml-2">Zapier</Badge>
                </CardContent>
              </Card>
              
              <Card className="p-6 text-center">
                <CardHeader>
                  <CardTitle className="text-xl">Developer API</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Build custom integrations with our comprehensive REST API.
                  </p>
                  <Badge variant="outline">REST API</Badge>
                  <Badge variant="outline" className="ml-2">Webhooks</Badge>
                  <Badge variant="outline" className="ml-2">SDKs</Badge>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Experience These Features?</h2>
            <p className="text-xl mb-8 opacity-90">
              Start your free trial today and see how Accio can transform your knowledge management.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" asChild>
                <Link to="/register">Start Free Trial</Link>
              </Button>
              <Button variant="outline" size="lg" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
                <Link to="/pricing">View Pricing</Link>
              </Button>
            </div>
            <p className="text-sm opacity-75 mt-6">
              No credit card required. All features included in trial.
            </p>
          </div>
        </section>
      </main>
    </>
  );
};

export default Features;
