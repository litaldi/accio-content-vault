
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, Search, Shield, Zap, BookOpen, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { ResponsiveContainer } from '@/components/ui/responsive-container';
import { ResponsiveGrid } from '@/components/ui/responsive-grid';

const Index: React.FC = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Organization',
      description: 'Automatically categorize and tag your content with advanced AI algorithms.'
    },
    {
      icon: Search,
      title: 'Intelligent Search',
      description: 'Find exactly what you need with semantic search and natural language queries.'
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Your data is protected with military-grade encryption and security protocols.'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Access your knowledge instantly with our optimized performance architecture.'
    },
    {
      icon: BookOpen,
      title: 'Rich Content Support',
      description: 'Store and organize PDFs, documents, images, videos, and web content.'
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
        <title>Accio - Your Personal Knowledge Sanctuary</title>
        <meta name="description" content="Transform scattered information into organized intelligence with AI-powered knowledge management. Secure, fast, and intuitive." />
        <meta property="og:title" content="Accio - Your Personal Knowledge Sanctuary" />
        <meta property="og:description" content="Transform scattered information into organized intelligence with AI-powered knowledge management." />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 bg-gradient-to-br from-primary/5 via-background to-blue-500/5">
          <ResponsiveContainer maxWidth="xl" padding="lg">
            <div className="text-center space-y-8">
              <Badge variant="outline" className="mx-auto">
                ✨ AI-Powered Knowledge Management
              </Badge>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                Your Personal{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Knowledge Sanctuary
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Transform scattered information into organized intelligence. 
                Capture, organize, and discover your knowledge with the power of AI.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                {user ? (
                  <Button size="lg" className="text-lg px-8 py-6" asChild>
                    <Link to="/dashboard">Go to Dashboard</Link>
                  </Button>
                ) : (
                  <>
                    <Button size="lg" className="text-lg px-8 py-6" asChild>
                      <Link to="/register">Get Started Free</Link>
                    </Button>
                    <Button variant="outline" size="lg" className="text-lg px-8 py-6" asChild>
                      <Link to="/features">Learn More</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </ResponsiveContainer>
        </section>

        {/* Features Section */}
        <section className="py-20 lg:py-32">
          <ResponsiveContainer maxWidth="xl" padding="lg">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl md:text-4xl font-bold">
                Powerful Features for Modern Knowledge Workers
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Everything you need to capture, organize, and leverage your knowledge effectively.
              </p>
            </div>

            <ResponsiveGrid 
              cols={{ default: 1, sm: 2, lg: 3 }}
              gap="lg"
            >
              {features.map((feature, index) => (
                <Card key={index} className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-primary" />
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
          </ResponsiveContainer>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary/5">
          <ResponsiveContainer maxWidth="lg" padding="lg">
            <div className="text-center space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold">
                Ready to Transform Your Knowledge Management?
              </h2>
              <p className="text-xl text-muted-foreground">
                Join thousands of professionals who trust Accio with their most valuable asset: knowledge.
              </p>
              {!user && (
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="text-lg px-8 py-6" asChild>
                    <Link to="/register">Start Your Journey</Link>
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

export default Index;
