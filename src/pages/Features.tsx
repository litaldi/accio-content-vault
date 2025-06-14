
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  Search, 
  Shield, 
  Zap, 
  BookOpen, 
  Users, 
  FileText, 
  Mic, 
  BarChart3,
  Globe,
  Lock,
  Smartphone
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { ResponsiveContainer } from '@/components/ui/responsive-container';
import { ResponsiveGrid } from '@/components/ui/responsive-grid';

const Features: React.FC = () => {
  const { user } = useAuth();

  const coreFeatures = [
    {
      icon: Brain,
      title: 'AI-Powered Organization',
      description: 'Automatically categorize and tag your content with advanced AI algorithms that understand context and meaning.',
      badge: 'Core Feature'
    },
    {
      icon: Search,
      title: 'Intelligent Search',
      description: 'Find exactly what you need with semantic search, natural language queries, and instant results.',
      badge: 'Core Feature'
    },
    {
      icon: FileText,
      title: 'Rich Content Support',
      description: 'Store and organize PDFs, documents, images, videos, web content, and more in one unified platform.',
      badge: 'Core Feature'
    },
    {
      icon: Mic,
      title: 'Voice Search',
      description: 'Search your knowledge base using voice commands for hands-free content discovery.',
      badge: 'Premium'
    }
  ];

  const securityFeatures = [
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Military-grade encryption, OWASP compliance, and comprehensive security monitoring.'
    },
    {
      icon: Lock,
      title: 'Privacy First',
      description: 'Your data stays yours. No tracking, no ads, no unauthorized access to your content.'
    },
    {
      icon: Globe,
      title: 'Secure Cloud Storage',
      description: 'Redundant backups across multiple secure data centers with 99.9% uptime guarantee.'
    }
  ];

  const productivityFeatures = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Access your knowledge instantly with our optimized performance architecture.'
    },
    {
      icon: BarChart3,
      title: 'Analytics & Insights',
      description: 'Track your learning patterns and knowledge growth with detailed analytics.'
    },
    {
      icon: Smartphone,
      title: 'Cross-Platform Access',
      description: 'Access your knowledge from any device - desktop, tablet, or mobile.'
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Share knowledge and collaborate with your team in secure workspaces.'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Features - Accio</title>
        <meta name="description" content="Discover all the powerful features that make Accio the ultimate knowledge management platform." />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-blue-500/5">
          <ResponsiveContainer maxWidth="xl" padding="lg">
            <div className="text-center space-y-6">
              <Badge variant="outline" className="mx-auto">
                🚀 Powerful Features
              </Badge>
              
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                Everything You Need for{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Knowledge Management
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Discover how Accio transforms the way you capture, organize, and leverage your knowledge
                with cutting-edge AI and enterprise-grade security.
              </p>
            </div>
          </ResponsiveContainer>
        </section>

        {/* Core Features */}
        <section className="py-20">
          <ResponsiveContainer maxWidth="xl" padding="lg">
            <div className="space-y-12">
              <div className="text-center space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold">Core Features</h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  The foundation of your knowledge management experience
                </p>
              </div>

              <ResponsiveGrid cols={{ default: 1, md: 2 }} gap="lg">
                {coreFeatures.map((feature, index) => (
                  <Card key={index} className="h-full hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-4">
                        <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <feature.icon className="h-6 w-6 text-primary" />
                        </div>
                        <Badge variant={feature.badge === 'Premium' ? 'default' : 'secondary'}>
                          {feature.badge}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </ResponsiveGrid>
            </div>
          </ResponsiveContainer>
        </section>

        {/* Security Features */}
        <section className="py-20 bg-muted/30">
          <ResponsiveContainer maxWidth="xl" padding="lg">
            <div className="space-y-12">
              <div className="text-center space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold">Security & Privacy</h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Your data is protected with industry-leading security measures
                </p>
              </div>

              <ResponsiveGrid cols={{ default: 1, md: 3 }} gap="lg">
                {securityFeatures.map((feature, index) => (
                  <Card key={index} className="h-full">
                    <CardHeader>
                      <div className="h-12 w-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center mb-4">
                        <feature.icon className="h-6 w-6 text-green-600 dark:text-green-400" />
                      </div>
                      <CardTitle>{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{feature.description}</CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </ResponsiveGrid>
            </div>
          </ResponsiveContainer>
        </section>

        {/* Productivity Features */}
        <section className="py-20">
          <ResponsiveContainer maxWidth="xl" padding="lg">
            <div className="space-y-12">
              <div className="text-center space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold">Productivity & Collaboration</h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Tools designed to enhance your productivity and team collaboration
                </p>
              </div>

              <ResponsiveGrid cols={{ default: 1, sm: 2, lg: 4 }} gap="lg">
                {productivityFeatures.map((feature, index) => (
                  <Card key={index} className="h-full">
                    <CardHeader>
                      <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mb-4">
                        <feature.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{feature.description}</CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </ResponsiveGrid>
            </div>
          </ResponsiveContainer>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary/5">
          <ResponsiveContainer maxWidth="lg" padding="lg">
            <div className="text-center space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold">
                Ready to Experience These Features?
              </h2>
              <p className="text-xl text-muted-foreground">
                Start your knowledge management journey today with full access to all features.
              </p>
              {user ? (
                <Button size="lg" className="text-lg px-8 py-6" asChild>
                  <Link to="/dashboard">Go to Dashboard</Link>
                </Button>
              ) : (
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="text-lg px-8 py-6" asChild>
                    <Link to="/register">Get Started Free</Link>
                  </Button>
                  <Button variant="outline" size="lg" className="text-lg px-8 py-6" asChild>
                    <Link to="/login">Sign In</Link>
                  </Button>
                </div>
              )}
            </div>
          </ResponsiveContainer>
        </section>
      </div>
    </>
  );
};

export default Features;
