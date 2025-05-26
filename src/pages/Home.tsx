
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Brain, 
  Search, 
  FolderOpen, 
  BarChart3, 
  ArrowRight,
  Sparkles,
  Shield,
  Zap
} from 'lucide-react';

const Home: React.FC = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Organization',
      description: 'Intelligent content categorization and smart tagging powered by advanced AI'
    },
    {
      icon: Search,
      title: 'Smart Search',
      description: 'Find anything instantly with natural language search and semantic understanding'
    },
    {
      icon: FolderOpen,
      title: 'Dynamic Collections',
      description: 'Organize content automatically with intelligent collections that adapt to your needs'
    },
    {
      icon: BarChart3,
      title: 'Insightful Analytics',
      description: 'Track your knowledge growth with detailed insights and personalized recommendations'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Accio - Your Personal Knowledge Sanctuary</title>
        <meta name="description" content="Organize, discover, and grow your knowledge with AI-powered insights and seamless content management." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium">
              <Sparkles className="h-4 w-4" />
              Your Personal Knowledge Sanctuary
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Remember Everything You Discover Online
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Accio transforms how you capture, organize, and rediscover knowledge. 
              Save content from anywhere, let AI organize it intelligently, and find insights that matter.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button asChild size="lg" className="gap-2 shadow-lg">
                <Link to="/features">
                  <Zap className="h-5 w-5" />
                  Explore Features
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="gap-2">
                <Link to="/contact">
                  Learn More
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="container mx-auto px-4 py-20">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Powerful Features</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience the next generation of knowledge management with AI-powered tools designed for modern learners.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground text-center">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Trust Section */}
        <section className="container mx-auto px-4 py-20">
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-8 text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Shield className="h-6 w-6 text-primary" />
                <h3 className="text-2xl font-bold">Built for Privacy & Security</h3>
              </div>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Your knowledge is precious. That's why Accio is built with privacy-first principles, 
                end-to-end encryption, and complete data ownership. Your information stays yours, always.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-20 text-center">
          <div className="max-w-2xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to Transform Your Knowledge?
            </h2>
            <p className="text-lg text-muted-foreground">
              Join thousands of learners, researchers, and professionals who trust Accio 
              to organize their digital knowledge.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="gap-2 shadow-lg">
                <Link to="/dashboard">
                  <Sparkles className="h-5 w-5" />
                  Get Started Free
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/contact">
                  Contact Sales
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
