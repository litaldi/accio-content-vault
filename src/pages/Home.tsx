
import React from 'react';
import { Link } from 'react-router-dom';
import UnifiedPageLayout from '@/components/layout/UnifiedPageLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Typography, Spacing, animations } from '@/components/ui/design-system';
import { 
  Brain, 
  Sparkles, 
  Search, 
  BookOpen, 
  TrendingUp, 
  Shield,
  ArrowRight,
  Play,
  Star,
  Users,
  Zap,
  Target
} from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Knowledge",
      description: "Transform any content into organized, searchable insights with advanced AI processing.",
      color: "from-blue-500 to-purple-600"
    },
    {
      icon: Search,
      title: "Smart Discovery",
      description: "Find exactly what you need with intelligent search across your entire knowledge base.",
      color: "from-green-500 to-blue-500"
    },
    {
      icon: BookOpen,
      title: "Organized Collections",
      description: "Create curated collections that grow smarter as you add more content.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: TrendingUp,
      title: "Insights & Analytics",
      description: "Track your learning patterns and discover knowledge gaps to optimize your growth.",
      color: "from-orange-500 to-red-500"
    }
  ];

  const benefits = [
    {
      icon: Zap,
      title: "10x Faster",
      description: "Process information 10 times faster than traditional methods"
    },
    {
      icon: Target,
      title: "99% Accuracy",
      description: "AI-powered content analysis with exceptional precision"
    },
    {
      icon: Users,
      title: "50K+ Users",
      description: "Trusted by professionals and learners worldwide"
    }
  ];

  return (
    <UnifiedPageLayout
      title="Accio - Transform Knowledge into Power"
      description="The intelligent knowledge management platform that turns information into actionable insights. Organize, discover, and grow your understanding with AI."
    >
      {/* Hero Section */}
      <Spacing.Section size="lg" className="bg-gradient-to-br from-primary/10 to-background">
        <Spacing.Container>
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="outline" className={`mb-6 ${animations.fadeIn}`}>
              <Sparkles className="h-3 w-3 mr-1" />
              AI-Powered Knowledge Engine
            </Badge>
            
            <Typography.H1 className={animations.slideUp}>
              Transform Knowledge into
              <span className="bg-gradient-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent"> Power</span>
            </Typography.H1>
            
            <Typography.Lead className={animations.slideUp}>
              The intelligent platform that captures, organizes, and transforms any content 
              into searchable knowledge. Stop losing valuable insights—start building your 
              personal knowledge sanctuary.
            </Typography.Lead>
            
            <div className={`flex flex-col sm:flex-row gap-4 justify-center mb-12 ${animations.fadeIn}`}>
              <Button size="xl" className="group" asChild>
                <Link to="/register">
                  Start Building Knowledge
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              
              <Button variant="outline" size="xl" className="group" asChild>
                <Link to="/features">
                  <Play className="mr-2 h-5 w-5" />
                  Watch Demo
                </Link>
              </Button>
            </div>
            
            {/* Social Proof */}
            <div className={`flex items-center justify-center gap-6 text-sm text-muted-foreground ${animations.fadeIn}`}>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="ml-2">4.9/5 from 2,000+ reviews</span>
              </div>
            </div>
          </div>
        </Spacing.Container>
      </Spacing.Section>

      {/* Benefits Section */}
      <Spacing.Section>
        <Spacing.Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className={`text-center ${animations.hoverLift}`}>
                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="h-8 w-8 text-primary" />
                </div>
                <Typography.H3 className="text-2xl font-bold mb-2">{benefit.title}</Typography.H3>
                <Typography.Body className="text-muted-foreground">{benefit.description}</Typography.Body>
              </div>
            ))}
          </div>
        </Spacing.Container>
      </Spacing.Section>

      {/* Features Section */}
      <Spacing.Section className="bg-gradient-to-br from-primary/5 to-background">
        <Spacing.Container>
          <div className="text-center mb-16">
            <Typography.H2>
              Everything you need to master knowledge
            </Typography.H2>
            <Typography.Body className="text-lg">
              Powerful features designed to transform how you capture, organize, and discover insights.
            </Typography.Body>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className={`bg-card border rounded-xl p-6 ${animations.hoverLift}`}>
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6`}>
                  <feature.icon className="h-7 w-7 text-white" />
                </div>
                <Typography.H3 className="text-xl font-semibold mb-3">{feature.title}</Typography.H3>
                <Typography.Body className="text-muted-foreground leading-relaxed">{feature.description}</Typography.Body>
              </div>
            ))}
          </div>
        </Spacing.Container>
      </Spacing.Section>

      {/* CTA Section */}
      <Spacing.Section>
        <Spacing.Container>
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-br from-primary/5 to-purple-500/5 rounded-3xl p-12 border border-primary/10">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-8">
                <Brain className="h-10 w-10 text-white" />
              </div>
              
              <Typography.H2 className="mb-4">
                Ready to transform your knowledge?
              </Typography.H2>
              
              <Typography.Body className="text-lg mb-8">
                Join thousands of professionals who've revolutionized their learning and 
                productivity with Accio. Start your free trial today.
              </Typography.Body>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="xl" className="group" asChild>
                  <Link to="/register">
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                
                <Button variant="outline" size="xl" asChild>
                  <Link to="/contact">
                    Talk to Sales
                  </Link>
                </Button>
              </div>
              
              <div className="flex items-center justify-center gap-4 mt-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Shield className="h-4 w-4" />
                  <span>Free 14-day trial</span>
                </div>
                <div className="w-1 h-1 bg-muted-foreground rounded-full" />
                <span>No credit card required</span>
                <div className="w-1 h-1 bg-muted-foreground rounded-full" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </Spacing.Container>
      </Spacing.Section>
    </UnifiedPageLayout>
  );
};

export default Home;
