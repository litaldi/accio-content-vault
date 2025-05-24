
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, FileText, Users, Settings, BarChart, FolderOpen, HelpCircle, Mail, Shield, BookOpen, Sparkles, Play } from 'lucide-react';

const ImprovedPageShowcase: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Public pages available to all users
  const publicPages = [
    { path: '/about', title: 'About', description: 'Learn about our mission and team', icon: BookOpen, color: 'text-blue-600' },
    { path: '/features', title: 'Features', description: 'Explore our powerful AI features', icon: Sparkles, color: 'text-purple-600' },
    { path: '/pricing', title: 'Pricing', description: 'Simple, transparent pricing', icon: Users, color: 'text-green-600' },
    { path: '/contact', title: 'Contact', description: 'Get in touch with our team', icon: Mail, color: 'text-orange-600' },
    { path: '/faq', title: 'FAQ', description: 'Find answers to common questions', icon: HelpCircle, color: 'text-indigo-600' },
    { path: '/blog', title: 'Blog', description: 'Latest insights and updates', icon: FileText, color: 'text-cyan-600' },
    { path: '/privacy', title: 'Privacy', description: 'How we protect your data', icon: Shield, color: 'text-emerald-600' },
    { path: '/playground', title: 'Demo', description: 'Try Accio without signing up', icon: Play, color: 'text-pink-600' },
  ];

  // Protected pages for authenticated users
  const protectedPages = [
    { path: '/dashboard', title: 'Dashboard', description: 'Your personal command center', icon: BarChart, color: 'text-blue-600' },
    { path: '/save', title: 'Save Content', description: 'Add content to your library', icon: FileText, color: 'text-green-600' },
    { path: '/collections', title: 'Collections', description: 'Organize your knowledge', icon: FolderOpen, color: 'text-purple-600' },
    { path: '/analytics', title: 'Analytics', description: 'Insights about your usage', icon: BarChart, color: 'text-orange-600' },
    { path: '/settings', title: 'Settings', description: 'Customize your experience', icon: Settings, color: 'text-gray-600' },
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-muted/30 to-background" aria-labelledby="page-showcase-heading">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 id="page-showcase-heading" className="text-3xl md:text-4xl font-bold mb-6">
            Explore Everything Accio Offers
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Whether you're browsing as a guest or managing your personal knowledge library, 
            discover all the features and pages available to help you organize your digital life.
          </p>
        </div>

        {user ? (
          // Show protected pages for authenticated users
          <div className="mb-16">
            <div className="text-center mb-10">
              <h3 className="text-2xl font-semibold mb-4 text-primary">Welcome back! Your Tools Await</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Access your personal dashboard and manage your knowledge library with these powerful tools.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" role="region" aria-label="User dashboard tools">
              {protectedPages.map((page) => (
                <Card key={page.path} className="hover:shadow-lg transition-all duration-300 group hover:-translate-y-1 border-2 hover:border-primary/20">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`p-2 rounded-lg bg-accent ${page.color} bg-opacity-10`}>
                        <page.icon className={`h-6 w-6 ${page.color} group-hover:scale-110 transition-transform`} aria-hidden="true" />
                      </div>
                      <CardTitle className="text-xl">{page.title}</CardTitle>
                    </div>
                    <CardDescription className="text-base">{page.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      onClick={() => navigate(page.path)}
                      className="w-full group/btn"
                      variant="outline"
                      aria-label={`Go to ${page.title}`}
                    >
                      <span>Open {page.title}</span>
                      <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" aria-hidden="true" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          // Show auth options for guests
          <div className="mb-16">
            <div className="text-center mb-10">
              <h3 className="text-2xl font-semibold mb-4 text-primary">Ready to Get Started?</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Create your free account or sign in to start building your personal knowledge library today.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto mb-12" role="region" aria-label="Authentication options">
              <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary/50">
                <CardHeader className="text-center pb-4">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <Sparkles className="h-6 w-6 text-primary" aria-hidden="true" />
                  </div>
                  <CardTitle className="text-xl">Create Free Account</CardTitle>
                  <CardDescription className="text-base">
                    Start building your knowledge library with AI-powered organization
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={() => navigate('/register')}
                    className="w-full text-lg py-6"
                    aria-label="Sign up for a free account"
                  >
                    <span>Start Free</span>
                    <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                  </Button>
                  <p className="text-xs text-muted-foreground text-center mt-3">
                    No credit card required • 2 minute setup
                  </p>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary/50">
                <CardHeader className="text-center pb-4">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-primary" aria-hidden="true" />
                  </div>
                  <CardTitle className="text-xl">Welcome Back</CardTitle>
                  <CardDescription className="text-base">
                    Sign in to access your personal knowledge library and continue organizing
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={() => navigate('/login')}
                    variant="outline" 
                    className="w-full text-lg py-6 border-2"
                    aria-label="Sign in to your account"
                  >
                    <span>Sign In</span>
                    <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                  </Button>
                  <p className="text-xs text-muted-foreground text-center mt-3">
                    Secure access to your content
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Public pages available to everyone */}
        <div>
          <div className="text-center mb-10">
            <h3 className="text-2xl font-semibold mb-4">Learn More About Accio</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our features, read our blog, get support, and learn how Accio can transform your digital workflow.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4" role="region" aria-label="Public pages">
            {publicPages.map((page) => (
              <Card key={page.path} className="hover:shadow-md transition-all duration-300 group hover:-translate-y-1">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <page.icon className={`h-5 w-5 ${page.color} group-hover:scale-110 transition-transform`} aria-hidden="true" />
                    <CardTitle className="text-lg">{page.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="text-sm mb-4 line-clamp-2">{page.description}</CardDescription>
                  <Button 
                    onClick={() => navigate(page.path)}
                    variant="ghost" 
                    size="sm" 
                    className="w-full group/btn justify-between"
                    aria-label={`Visit ${page.title} page`}
                  >
                    <span>Explore</span>
                    <ArrowRight className="h-3 w-3 group-hover/btn:translate-x-1 transition-transform" aria-hidden="true" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImprovedPageShowcase;
