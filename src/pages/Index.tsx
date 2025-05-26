
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '@/contexts/AuthContext';
import MainLayout from '@/components/layout/MainLayout';
import ImprovedHeroSection from '@/components/home/ImprovedHeroSection';
import { EnhancedCard, EnhancedCardContent, EnhancedCardDescription, EnhancedCardHeader, EnhancedCardTitle } from '@/components/ui/enhanced-card';
import { Button } from '@/components/ui/button';
import { Search, BookOpen, BarChart3, Settings, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const isLoggedIn = !!user;

  const quickActions = [
    {
      title: "Search Content",
      description: "Find anything in your knowledge library instantly",
      icon: Search,
      action: () => navigate('/search'),
      color: "bg-blue-500"
    },
    {
      title: "Dashboard",
      description: "View your saved content and insights",
      icon: BookOpen,
      action: () => navigate('/dashboard'),
      color: "bg-green-500"
    },
    {
      title: "Analytics",
      description: "Track your knowledge growth",
      icon: BarChart3,
      action: () => navigate('/analytics'),
      color: "bg-purple-500"
    },
    {
      title: "Settings",
      description: "Customize your experience",
      icon: Settings,
      action: () => navigate('/settings'),
      color: "bg-orange-500"
    }
  ];

  return (
    <MainLayout isLoggedIn={isLoggedIn} user={user}>
      <Helmet>
        <title>Accio - AI-Powered Knowledge Management | Save, Organize, Find Everything</title>
        <meta name="description" content="Transform scattered bookmarks into an AI-powered knowledge engine. Save anything, find everything, achieve 10x productivity. Trusted by 10K+ professionals." />
        <meta name="keywords" content="knowledge management, AI, productivity, content organization, search, bookmarks, notes, research" />
        <meta property="og:title" content="Accio - AI-Powered Knowledge Management" />
        <meta property="og:description" content="Turn scattered bookmarks into an AI-powered knowledge engine. Save anything, find everything, achieve more." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Accio - Your AI Knowledge Engine" />
        <meta name="twitter:description" content="Save anything, find everything, achieve 10x productivity with AI-powered organization." />
        <link rel="canonical" href="https://accio.app/" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#3B82F6" />
      </Helmet>

      <div className="space-y-16">
        <ImprovedHeroSection />
        
        {/* Quick Access Section for returning users */}
        {isLoggedIn && (
          <section className="py-16 bg-muted/20" aria-labelledby="quick-access-heading">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 id="quick-access-heading" className="text-3xl font-bold mb-4">Welcome back!</h2>
                <p className="text-xl text-muted-foreground">
                  Quick access to your most used features
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                {quickActions.map((action) => (
                  <EnhancedCard 
                    key={action.title}
                    interactive
                    elevated
                    onClick={action.action}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        action.action();
                      }
                    }}
                    aria-label={`${action.title}: ${action.description}`}
                    className="group hover:scale-105 transition-all duration-200"
                  >
                    <EnhancedCardHeader className="text-center">
                      <div className={`w-12 h-12 mx-auto mb-4 ${action.color} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <action.icon className="h-6 w-6 text-white" aria-hidden="true" />
                      </div>
                      <EnhancedCardTitle className="text-lg">{action.title}</EnhancedCardTitle>
                      <EnhancedCardDescription>{action.description}</EnhancedCardDescription>
                    </EnhancedCardHeader>
                    <EnhancedCardContent>
                      <Button 
                        variant="outline" 
                        className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          action.action();
                        }}
                      >
                        <Sparkles className="h-4 w-4 mr-2" />
                        Access Now
                      </Button>
                    </EnhancedCardContent>
                  </EnhancedCard>
                ))}
              </div>
            </div>
          </section>
        )}
        
        {/* Features Preview Section */}
        <section className="py-16" aria-labelledby="features-heading">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 id="features-heading" className="text-3xl font-bold mb-4">
                Everything you need to organize knowledge
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Powerful features designed to help you capture, organize, and find information effortlessly.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  title: "AI-Powered Search",
                  description: "Find anything instantly with intelligent semantic search that understands context and meaning.",
                  icon: Search,
                },
                {
                  title: "Smart Organization",
                  description: "Automatically categorize and tag your content with AI-driven organization systems.",
                  icon: BookOpen,
                },
                {
                  title: "Powerful Analytics",
                  description: "Track your knowledge growth and discover patterns in your saved content.",
                  icon: BarChart3,
                }
              ].map((feature) => (
                <div key={feature.title} className="text-center space-y-4">
                  <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default Index;
