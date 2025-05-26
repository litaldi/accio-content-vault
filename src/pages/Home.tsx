
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Search,
  FolderOpen,
  BarChart3,
  Sparkles,
  ArrowRight,
  Shield,
  Zap,
  Globe,
  Users,
  CheckCircle,
  Star
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { EnterpriseTypography, TrustSignals } from '@/components/ui/enterprise-design-system';

const Home: React.FC = () => {
  const features = [
    {
      icon: Search,
      title: 'Smart Search',
      description: 'Find content instantly with AI-powered semantic search and natural language queries.',
      href: '/search'
    },
    {
      icon: FolderOpen,
      title: 'Intelligent Collections',
      description: 'Organize content automatically with smart collections and AI-powered categorization.',
      href: '/collections'
    },
    {
      icon: BarChart3,
      title: 'Learning Analytics',
      description: 'Track your learning progress with detailed insights and personalized recommendations.',
      href: '/analytics'
    },
    {
      icon: Sparkles,
      title: 'AI Features',
      description: 'Experience cutting-edge AI tools for content summarization, organization, and discovery.',
      href: '/features'
    }
  ];

  const benefits = [
    {
      icon: Zap,
      title: 'Save Time',
      description: 'Reduce content discovery time by 80% with intelligent search and organization'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Enterprise-grade security with end-to-end encryption and privacy controls'
    },
    {
      icon: Globe,
      title: 'Works Everywhere',
      description: 'Access your content from any device with seamless cross-platform sync'
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Share collections and insights with your team for collaborative learning'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Senior Developer',
      company: 'TechCorp',
      content: 'Accio has transformed how I manage technical documentation. The AI search is incredible!',
      rating: 5
    },
    {
      name: 'Mike Rodriguez',
      role: 'Product Manager',
      company: 'StartupXYZ',
      content: 'The smart collections feature automatically organizes my research. It\'s like having a personal assistant.',
      rating: 5
    },
    {
      name: 'Elena Kowalski',
      role: 'UX Designer',
      company: 'DesignStudio',
      content: 'Finally, a tool that understands context. The learning analytics help me track my skill development.',
      rating: 5
    }
  ];

  return (
    <>
      <Helmet>
        <title>Accio - AI-Powered Content Management & Learning Platform</title>
        <meta 
          name="description" 
          content="Transform your content management with AI-powered search, smart collections, and learning analytics. Save time, boost productivity, and accelerate your learning journey." 
        />
        <meta name="keywords" content="AI content management, smart search, learning analytics, productivity tools, knowledge management" />
        <meta property="og:title" content="Accio - AI-Powered Content Management & Learning Platform" />
        <meta property="og:description" content="Transform your content management with AI-powered search, smart collections, and learning analytics." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/" />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-blue-50/50 to-purple-50/30 dark:from-primary/10 dark:via-blue-950/20 dark:to-purple-950/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-32">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <div className="space-y-4">
              <Badge variant="secondary" className="text-sm px-3 py-1">
                <Sparkles className="h-4 w-4 mr-2" aria-hidden="true" />
                AI-Powered Platform
              </Badge>
              
              <EnterpriseTypography.Hero className="mx-auto">
                Transform Your Content Management with{' '}
                <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                  Intelligent AI
                </span>
              </EnterpriseTypography.Hero>
              
              <EnterpriseTypography.Lead className="mx-auto">
                Discover, organize, and learn from your content like never before. 
                Accio combines powerful AI with intuitive design to revolutionize 
                how you manage knowledge and accelerate learning.
              </EnterpriseTypography.Lead>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button asChild size="lg" className="text-lg px-8 py-3">
                <Link to="/dashboard">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-3">
                <Link to="/features">
                  Explore AI Features
                </Link>
              </Button>
            </div>

            <TrustSignals className="justify-center" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <EnterpriseTypography.H2>
              Powerful Features for Modern Learning
            </EnterpriseTypography.H2>
            <EnterpriseTypography.Lead>
              Everything you need to manage, discover, and learn from your content efficiently
            </EnterpriseTypography.Lead>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card 
                  key={index} 
                  className="group hover:shadow-lg transition-all duration-300 hover:border-primary/20 hover:-translate-y-1"
                >
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-center mb-4">
                      {feature.description}
                    </p>
                    <Button asChild variant="ghost" className="w-full group-hover:bg-primary/5">
                      <Link to={feature.href}>
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 sm:py-20 lg:py-32 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <EnterpriseTypography.H2>
              Why Choose Accio?
            </EnterpriseTypography.H2>
            <EnterpriseTypography.Lead>
              Experience the future of content management with these key benefits
            </EnterpriseTypography.Lead>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="text-center space-y-4">
                  <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon className="h-8 w-8 text-primary" aria-hidden="true" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 sm:py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <EnterpriseTypography.H2>
              Trusted by Professionals Worldwide
            </EnterpriseTypography.H2>
            <EnterpriseTypography.Lead>
              See what our users say about their experience with Accio
            </EnterpriseTypography.Lead>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="h-full">
                <CardContent className="p-6 space-y-4">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star 
                        key={i} 
                        className="h-5 w-5 fill-yellow-400 text-yellow-400" 
                        aria-hidden="true" 
                      />
                    ))}
                  </div>
                  
                  <blockquote className="text-muted-foreground italic">
                    "{testimonial.content}"
                  </blockquote>
                  
                  <div className="border-t pt-4">
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 lg:py-32 bg-gradient-to-r from-primary to-blue-600 text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              Ready to Transform Your Learning?
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Join thousands of professionals who have revolutionized their content management with Accio's AI-powered platform.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-3">
              <Link to="/dashboard">
                Start Your Free Trial
                <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
              </Link>
            </Button>
            
            <Button asChild size="lg" variant="outline" className="text-lg px-8 py-3 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <Link to="/contact">
                Contact Sales
              </Link>
            </Button>
          </div>

          <div className="flex items-center justify-center gap-6 text-sm opacity-80">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" aria-hidden="true" />
              <span>Free 14-day trial</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" aria-hidden="true" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" aria-hidden="true" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
