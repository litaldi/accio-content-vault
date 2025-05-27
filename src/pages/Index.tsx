import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Sparkles, PlayCircle, CheckCircle, Rocket, MessageCircle } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Accio - AI-Powered Knowledge Management</title>
        <meta name="description" content="Transform how you capture, organize, and discover knowledge with AI-powered tools designed for modern learners and professionals." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl lg:text-7xl font-bold mb-8 bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
              Your AI-Powered
              <br />
              Knowledge Empire
            </h1>
            
            <p className="text-xl lg:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
              Transform how you capture, organize, and discover knowledge with intelligent tools 
              designed for modern learners and professionals.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button size="lg" className="text-lg px-8 py-4 gap-3 shadow-lg hover:shadow-xl transition-all" asChild>
                <Link to="/register">
                  <Sparkles className="h-5 w-5" />
                  Start Your Journey
                </Link>
              </Button>
              
              <Button variant="outline" size="lg" className="text-lg px-8 py-4 gap-3" asChild>
                <Link to="/features">
                  <PlayCircle className="h-5 w-5" />
                  Watch Demo
                </Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Free to get started
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                No credit card required
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Privacy-first approach
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-4xl font-bold mb-8 text-center">
            Unlock the Power of Knowledge
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-6 bg-card rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-semibold mb-2">AI-Powered Insights</h3>
              <p className="text-muted-foreground">
                Automatically extract key insights and summaries from any content.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="p-6 bg-card rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-semibold mb-2">Smart Organization</h3>
              <p className="text-muted-foreground">
                Effortlessly categorize and tag your content for easy retrieval.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="p-6 bg-card rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-semibold mb-2">Seamless Integration</h3>
              <p className="text-muted-foreground">
                Connect with your favorite tools and platforms for a unified workflow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 bg-muted">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-8">
            What Our Users Are Saying
          </h2>
          
          {/* Testimonial 1 */}
          <div className="p-6 bg-card rounded-lg shadow-md">
            <p className="text-lg italic mb-4">
              "Accio has completely transformed how I manage my research. The AI insights are a game-changer!"
            </p>
            <p className="text-sm font-medium">
              - Sarah L., Researcher
            </p>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-24 px-4 bg-gradient-to-r from-primary/10 via-blue-50 to-purple-50 dark:from-primary/5 dark:via-blue-950 dark:to-purple-950">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Knowledge Management?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of learners and professionals who have revolutionized how they capture, 
            organize, and discover knowledge with Accio.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-4 gap-3 shadow-lg hover:shadow-xl transition-all" asChild>
              <Link to="/register">
                <Rocket className="h-5 w-5" />
                Get Started Free
              </Link>
            </Button>
            
            <Button variant="outline" size="lg" className="text-lg px-8 py-4 gap-3" asChild>
              <Link to="/contact">
                <MessageCircle className="h-5 w-5" />
                Talk to Sales
              </Link>
            </Button>
          </div>
          
          <p className="text-sm text-muted-foreground mt-6">
            Already have an account? {' '}
            <Link to="/login" className="text-primary hover:underline font-medium">
              Sign in here
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
};

export default Index;
