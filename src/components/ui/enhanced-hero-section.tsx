
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookmarkPlus, Search, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { copy } from '@/utils/copy';

const EnhancedHeroSection = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-background via-background to-muted/30">
      <div className="container mx-auto max-w-6xl text-center">
        {/* Main headline */}
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
          {copy.headlines.hero}
        </h1>
        
        {/* Subheadline */}
        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
          {copy.headlines.subhero}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button size="lg" className="text-lg px-8 py-6" asChild>
            <Link to="/register">
              {copy.buttons.getStarted}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" className="text-lg px-8 py-6" asChild>
            <Link to="/features">
              {copy.buttons.exploreFeatures}
            </Link>
          </Button>
        </div>

        {/* Key benefits */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="flex flex-col items-center text-center p-6">
            <div className="p-3 rounded-full bg-primary/10 mb-4">
              <BookmarkPlus className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Save Everything</h3>
            <p className="text-muted-foreground">{copy.benefits.saveAnything}</p>
          </div>
          
          <div className="flex flex-col items-center text-center p-6">
            <div className="p-3 rounded-full bg-primary/10 mb-4">
              <Zap className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">AI Organizes</h3>
            <p className="text-muted-foreground">{copy.benefits.aiOrganization}</p>
          </div>
          
          <div className="flex flex-col items-center text-center p-6">
            <div className="p-3 rounded-full bg-primary/10 mb-4">
              <Search className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Find Instantly</h3>
            <p className="text-muted-foreground">{copy.benefits.findFast}</p>
          </div>
        </div>

        {/* Social proof */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-4">
            {copy.social.companies}
          </p>
          <div className="flex justify-center items-center gap-6 text-sm text-muted-foreground">
            <span>{copy.social.userCount} users</span>
            <span>•</span>
            <span>{copy.social.rating}</span>
            <span>•</span>
            <span>{copy.trust.freeTrial}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnhancedHeroSection;
