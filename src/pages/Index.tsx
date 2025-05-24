
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import EnhancedHeroSection from '@/components/home/EnhancedHeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import CTASection from '@/components/home/CTASection';
import PricingSection from '@/components/home/PricingSection';
import FAQSection from '@/components/home/FAQSection';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, FileText, Users, Settings, BarChart, FolderOpen, HelpCircle, Mail, Shield, BookOpen } from 'lucide-react';

const Index = () => {
  const { user, signOut } = useAuth();

  const handleLogout = () => {
    signOut();
  };

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
    <div className="min-h-screen flex flex-col">
      <Navbar isLoggedIn={!!user} onLogout={handleLogout} />
      
      <main className="flex-grow">
        <EnhancedHeroSection />
        
        {/* Pages Overview Section */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Explore Our Platform</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Discover all the features and pages available in Accio. Whether you're browsing as a guest or logged in as a user, we have something for everyone.
              </p>
            </div>

            {user ? (
              // Show protected pages for authenticated users
              <div className="mb-12">
                <h3 className="text-2xl font-semibold mb-6 text-center">Your Dashboard & Tools</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {protectedPages.map((page) => (
                    <Card key={page.path} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <page.icon className="h-6 w-6 text-primary" />
                          <CardTitle className="text-lg">{page.title}</CardTitle>
                        </div>
                        <CardDescription>{page.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button asChild className="w-full">
                          <Link to={page.path}>
                            Visit {page.title}
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
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
                <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle>Create Account</CardTitle>
                      <CardDescription>Sign up to start building your knowledge library</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button asChild className="w-full">
                        <Link to="/register">
                          Sign Up Free
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle>Sign In</CardTitle>
                      <CardDescription>Already have an account? Welcome back!</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button asChild variant="outline" className="w-full">
                        <Link to="/login">
                          Sign In
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {/* Public pages available to everyone */}
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-center">Learn More</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {publicPages.map((page) => (
                  <Card key={page.path} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <page.icon className="h-5 w-5 text-primary" />
                        <CardTitle className="text-base">{page.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <CardDescription className="text-sm mb-3">{page.description}</CardDescription>
                      <Button asChild variant="ghost" size="sm" className="w-full">
                        <Link to={page.path}>
                          Visit
                          <ArrowRight className="ml-2 h-3 w-3" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        <FeaturesSection />
        <PricingSection />
        <FAQSection />
        <CTASection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
