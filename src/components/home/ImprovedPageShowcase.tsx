
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, FileText, Users, Settings, BarChart, FolderOpen, HelpCircle, Mail, Shield, BookOpen } from 'lucide-react';

const ImprovedPageShowcase: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Public pages available to all users
  const publicPages = [
    { path: '/about', title: 'About', description: 'Learn more about Accio', icon: BookOpen },
    { path: '/features', title: 'Features', description: 'Explore our powerful features', icon: FileText },
    { path: '/pricing', title: 'Pricing', description: 'Choose your plan', icon: Users },
    { path: '/contact', title: 'Contact', description: 'Get in touch with us', icon: Mail },
    { path: '/faq', title: 'FAQ', description: 'Frequently asked questions', icon: HelpCircle },
    { path: '/blog', title: 'Blog', description: 'Latest news and updates', icon: FileText },
    { path: '/privacy', title: 'Privacy Policy', description: 'How we protect your data', icon: Shield },
    { path: '/terms', title: 'Terms of Service', description: 'Terms and conditions', icon: FileText },
  ];

  // Protected pages for authenticated users
  const protectedPages = [
    { path: '/dashboard', title: 'Dashboard', description: 'Your main workspace', icon: BarChart },
    { path: '/save', title: 'Save Content', description: 'Add new content to your library', icon: FileText },
    { path: '/collections', title: 'Collections', description: 'Organize your content', icon: FolderOpen },
    { path: '/analytics', title: 'Analytics', description: 'View your usage statistics', icon: BarChart },
    { path: '/settings', title: 'Account Settings', description: 'Manage your account', icon: Settings },
  ];

  return (
    <section className="py-16 px-4 bg-muted/30" aria-labelledby="page-showcase-heading">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 id="page-showcase-heading" className="text-3xl font-bold mb-4">
            Explore Our Platform
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover all the features and pages available in Accio. Whether you're browsing as a guest or logged in as a user, we have something for everyone.
          </p>
        </div>

        {user ? (
          // Show protected pages for authenticated users
          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-6 text-center">Your Dashboard & Tools</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" role="region" aria-label="User dashboard tools">
              {protectedPages.map((page) => (
                <Card key={page.path} className="hover:shadow-lg transition-shadow group">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <page.icon className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" aria-hidden="true" />
                      <CardTitle className="text-lg">{page.title}</CardTitle>
                    </div>
                    <CardDescription>{page.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      onClick={() => navigate(page.path)}
                      className="w-full group"
                      aria-label={`Go to ${page.title}`}
                    >
                      <span>Visit {page.title}</span>
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          // Show auth options for guests
          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-6 text-center">Get Started</h3>
            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto" role="region" aria-label="Authentication options">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>Create Account</CardTitle>
                  <CardDescription>Sign up to start building your knowledge library</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={() => navigate('/register')}
                    className="w-full"
                    aria-label="Sign up for a free account"
                  >
                    <span>Sign Up Free</span>
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  </Button>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>Sign In</CardTitle>
                  <CardDescription>Already have an account? Welcome back!</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={() => navigate('/login')}
                    variant="outline" 
                    className="w-full"
                    aria-label="Sign in to your account"
                  >
                    <span>Sign In</span>
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Public pages available to everyone */}
        <div>
          <h3 className="text-2xl font-semibold mb-6 text-center">Learn More</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4" role="region" aria-label="Public pages">
            {publicPages.map((page) => (
              <Card key={page.path} className="hover:shadow-md transition-shadow group">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <page.icon className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" aria-hidden="true" />
                    <CardTitle className="text-base">{page.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="text-sm mb-3">{page.description}</CardDescription>
                  <Button 
                    onClick={() => navigate(page.path)}
                    variant="ghost" 
                    size="sm" 
                    className="w-full group"
                    aria-label={`Visit ${page.title} page`}
                  >
                    <span>Visit</span>
                    <ArrowRight className="ml-2 h-3 w-3 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
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
