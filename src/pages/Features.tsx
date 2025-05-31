
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, Search, FolderOpen, BarChart3, Smartphone, 
  Cloud, Shield, Zap, Users, Globe, Bot, FileText,
  Download, Share2, Lock, Wifi, Target, Clock
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Features = () => {
  const coreFeatures = [
    {
      icon: Brain,
      title: 'AI-Powered Organization',
      description: 'Automatically categorize and tag your content with advanced machine learning algorithms.',
      benefits: ['Smart content analysis', 'Automatic tagging', 'Context understanding'],
      isPopular: true
    },
    {
      icon: Search,
      title: 'Semantic Search',
      description: 'Find content by describing what you remember, not just exact keywords.',
      benefits: ['Natural language queries', 'Context-aware results', 'Instant discovery'],
      isNew: false
    },
    {
      icon: FolderOpen,
      title: 'Smart Collections',
      description: 'Dynamic content organization that adapts to your workflow and preferences.',
      benefits: ['Auto-organizing folders', 'Custom taxonomies', 'Flexible structures'],
      isNew: false
    },
    {
      icon: BarChart3,
      title: 'Knowledge Analytics',
      description: 'Insights into your learning patterns and information consumption habits.',
      benefits: ['Usage patterns', 'Knowledge gaps', 'Learning insights'],
      isNew: true
    }
  ];

  const advancedFeatures = [
    {
      icon: Smartphone,
      title: 'Cross-Platform Sync',
      description: 'Access your knowledge base from any device, anywhere',
      category: 'Accessibility'
    },
    {
      icon: Cloud,
      title: 'Cloud Storage',
      description: 'Secure cloud backup with unlimited storage capacity',
      category: 'Storage'
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-level encryption and compliance standards',
      category: 'Security'
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Share collections and collaborate on knowledge bases',
      category: 'Collaboration'
    },
    {
      icon: Bot,
      title: 'AI Assistant',
      description: 'Chat with your knowledge base using natural language',
      category: 'AI'
    },
    {
      icon: Download,
      title: 'Offline Access',
      description: 'Access important content without internet connection',
      category: 'Accessibility'
    }
  ];

  const integrations = [
    {
      name: 'Browser Extension',
      description: 'Save content from any website with one click',
      icon: Globe
    },
    {
      name: 'Mobile App',
      description: 'Capture and access knowledge on the go',
      icon: Smartphone
    },
    {
      name: 'API Access',
      description: 'Integrate with your favorite tools and workflows',
      icon: Share2
    },
    {
      name: 'File Import',
      description: 'Import from PDFs, documents, and other formats',
      icon: FileText
    }
  ];

  return (
    <>
      <Helmet>
        <title>Features - Accio AI Knowledge Management</title>
        <meta name="description" content="Discover Accio's powerful AI-driven features for knowledge management, semantic search, smart organization, and team collaboration." />
      </Helmet>

      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-24 bg-gradient-to-br from-primary/5 to-blue-600/5">
          <div className="container mx-auto px-4 max-w-6xl text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Powerful Features for{' '}
              <span className="text-primary">Smart Knowledge</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Discover how Accio's advanced AI and intuitive design can transform 
              the way you capture, organize, and leverage information.
            </p>
            <Button size="lg" asChild>
              <Link to="/register">Try All Features Free</Link>
            </Button>
          </div>
        </section>

        {/* Core Features */}
        <section className="py-24">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Core Features</h2>
              <p className="text-lg text-muted-foreground">
                The foundation of intelligent knowledge management
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {coreFeatures.map((feature, index) => (
                <Card key={index} className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  {feature.isPopular && (
                    <Badge className="absolute top-4 right-4 bg-primary">
                      Most Popular
                    </Badge>
                  )}
                  {feature.isNew && (
                    <Badge variant="secondary" className="absolute top-4 right-4">
                      New
                    </Badge>
                  )}
                  
                  <CardHeader className="pb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <ul className="space-y-2">
                      {feature.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-center text-sm">
                          <Zap className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Advanced Features Grid */}
        <section className="py-24 bg-muted/20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Advanced Capabilities</h2>
              <p className="text-lg text-muted-foreground">
                Professional tools for power users and teams
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {advancedFeatures.map((feature, index) => (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-0">
                  <CardHeader className="text-center">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
                      <feature.icon className="h-5 w-5 text-primary" />
                    </div>
                    <Badge variant="outline" className="text-xs mb-2 w-fit mx-auto">
                      {feature.category}
                    </Badge>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Integrations */}
        <section className="py-24">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Seamless Integrations</h2>
              <p className="text-lg text-muted-foreground">
                Connect Accio to your existing workflow and tools
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {integrations.map((integration, index) => (
                <Card key={index} className="text-center border-0 bg-gradient-to-br from-background to-muted/30 hover:shadow-lg transition-all duration-300">
                  <CardHeader className="pb-2">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <integration.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{integration.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">{integration.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-6">Experience the Full Power of Accio</h2>
            <p className="text-xl mb-8 opacity-90">
              Start your free trial today and discover how AI can revolutionize your knowledge management.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" asChild>
                <Link to="/register">Start Free Trial</Link>
              </Button>
              <Button variant="outline" size="lg" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
                <Link to="/pricing">View Pricing</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Features;
