
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
  ArrowRight,
  Sparkles,
  Zap,
  Shield,
  Link as LinkIcon,
  FileText,
  Globe,
  Smartphone,
  Clock,
  Users,
  Star
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Features: React.FC = () => {
  const coreFeatures = [
    {
      icon: Brain,
      title: 'AI-Powered Content Analysis',
      description: 'Advanced machine learning algorithms automatically analyze, categorize, and extract insights from your content.',
      benefits: ['Automatic tagging and categorization', 'Content similarity detection', 'Key concept extraction', 'Sentiment analysis'],
      color: 'bg-blue-500/10 text-blue-600 border-blue-200'
    },
    {
      icon: Search,
      title: 'Semantic Search Engine',
      description: 'Find information using natural language queries. Our AI understands context and meaning, not just keywords.',
      benefits: ['Natural language queries', 'Context-aware results', 'Cross-content connections', 'Instant suggestions'],
      color: 'bg-green-500/10 text-green-600 border-green-200'
    },
    {
      icon: FolderOpen,
      title: 'Smart Collections',
      description: 'Content automatically organizes into intelligent collections based on topics, themes, and relationships.',
      benefits: ['Auto-generated collections', 'Custom organization rules', 'Nested hierarchies', 'Visual knowledge maps'],
      color: 'bg-purple-500/10 text-purple-600 border-purple-200'
    },
    {
      icon: BarChart3,
      title: 'Analytics & Insights',
      description: 'Understand your knowledge patterns, discover trends, and track your learning journey over time.',
      benefits: ['Knowledge growth tracking', 'Usage pattern analysis', 'Content recommendations', 'Learning insights'],
      color: 'bg-orange-500/10 text-orange-600 border-orange-200'
    }
  ];

  const additionalFeatures = [
    {
      icon: LinkIcon,
      title: 'Universal Integrations',
      description: 'Connect with your favorite tools and platforms for seamless workflow integration.',
      items: ['Google Drive, Dropbox, OneDrive', 'Notion, Obsidian, Roam', 'Slack, Teams, Discord', 'GitHub, GitLab, Jira']
    },
    {
      icon: Shield,
      title: 'Security & Privacy',
      description: 'Enterprise-grade security with end-to-end encryption and complete data ownership.',
      items: ['End-to-end encryption', 'SOC 2 compliance', 'GDPR compliant', 'Self-hosted options']
    },
    {
      icon: Smartphone,
      title: 'Cross-Platform Access',
      description: 'Access your knowledge from anywhere with native apps and responsive web interface.',
      items: ['Web application', 'Mobile apps (iOS/Android)', 'Desktop applications', 'Browser extensions']
    },
    {
      icon: Users,
      title: 'Collaboration Tools',
      description: 'Share knowledge and collaborate with team members while maintaining privacy controls.',
      items: ['Team workspaces', 'Sharing controls', 'Collaborative editing', 'Permission management']
    }
  ];

  const useCases = [
    {
      title: 'Researchers',
      description: 'Manage literature reviews, track citations, and discover connections between papers.',
      icon: FileText,
      example: 'Automatically categorize research papers by methodology and find related studies.'
    },
    {
      title: 'Content Creators',
      description: 'Organize inspiration, track ideas, and maintain a searchable library of references.',
      icon: Sparkles,
      example: 'Save articles, images, and notes, then quickly find relevant content for your next piece.'
    },
    {
      title: 'Students',
      description: 'Build a comprehensive knowledge base from lectures, readings, and research.',
      icon: Star,
      example: 'Create study guides automatically from your notes and reading materials.'
    },
    {
      title: 'Professionals',
      description: 'Stay organized with industry insights, best practices, and professional development.',
      icon: Users,
      example: 'Track market trends and competitive intelligence in an organized, searchable format.'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Features - AI-Powered Knowledge Management | Accio</title>
        <meta name="description" content="Discover Accio's powerful features: AI content analysis, semantic search, smart collections, and deep analytics for your personal knowledge management." />
        <meta name="keywords" content="AI features, semantic search, knowledge management features, content analysis, smart organization" />
      </Helmet>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-blue-500/5">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="outline" className="mb-6">
            <Zap className="h-3 w-3 mr-1" />
            Powerful AI Features
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Every Feature Built for
            <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent block">
              Intelligent Knowledge Work
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Discover how Accio's advanced AI capabilities transform the way you collect, organize, 
            and discover information.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/playground">
                <Brain className="mr-2 h-4 w-4" />
                Try Interactive Demo
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/register">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Core AI Capabilities</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Four foundational features that make Accio the most intelligent knowledge management platform.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {coreFeatures.map((feature, index) => (
              <Card key={index} className={`group hover:shadow-xl transition-all duration-300 border-2 ${feature.color}`}>
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </div>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
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

      {/* Additional Features */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Complete Feature Set</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need for professional knowledge management, from integrations to security.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {additionalFeatures.map((feature, index) => (
              <Card key={index} className="bg-background hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <feature.icon className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </div>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-2">
                    {feature.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-1 h-1 bg-primary rounded-full flex-shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Perfect for Every Knowledge Worker</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              See how different professionals use Accio to transform their relationship with information.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {useCases.map((useCase, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <useCase.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{useCase.title}</CardTitle>
                  </div>
                  <CardDescription className="text-base leading-relaxed mb-4">
                    {useCase.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground italic">
                      Example: {useCase.example}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-blue-600/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Experience the Future of Knowledge Management
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Ready to see these features in action? Try our interactive playground or start your free account today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/playground">
                <Brain className="mr-2 h-4 w-4" />
                Try Interactive Demo
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/register">
                Start Free Account
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="flex items-center justify-center gap-6 mt-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>Setup in minutes</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;
