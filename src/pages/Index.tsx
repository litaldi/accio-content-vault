
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isLoggedIn={false} />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="hero-gradient py-20 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Remember everything you discover online
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
              Accio organizes your online content with AI-powered tagging and powerful search.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                size="lg"
                onClick={() => navigate('/register')}
                className="bg-white text-primary hover:bg-white/90"
              >
                Get Started - Free
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate('/login')}
                className="text-white border-white hover:bg-white/10"
              >
                Login
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 bg-background">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">How Accio Works</h2>
            
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="p-6 rounded-lg border border-border bg-card">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-primary">1</span>
                </div>
                <h3 className="text-xl font-medium mb-2">Save Content</h3>
                <p className="text-muted-foreground">
                  Save articles, posts, and links with a single click directly from your browser.
                </p>
              </div>
              
              <div className="p-6 rounded-lg border border-border bg-card">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-primary">2</span>
                </div>
                <h3 className="text-xl font-medium mb-2">Auto-Tagging</h3>
                <p className="text-muted-foreground">
                  Our AI automatically categorizes your content with relevant tags.
                </p>
              </div>
              
              <div className="p-6 rounded-lg border border-border bg-card">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-primary">3</span>
                </div>
                <h3 className="text-xl font-medium mb-2">Find Anything</h3>
                <p className="text-muted-foreground">
                  Search and discover your saved content with powerful search.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-secondary">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to organize your online life?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join Accio today and never lose important content again.
            </p>
            <Button size="lg" onClick={() => navigate('/register')}>
              Sign Up Free
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-background border-t border-border py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Accio. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
