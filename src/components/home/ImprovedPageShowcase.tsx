
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { cn } from '@/lib/utils';

const ImprovedPageShowcase: React.FC = () => {
  const { preferences } = useAccessibility();

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            See Accio in Action
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience how easy it is to build your personal knowledge library
          </p>
        </div>
        
        <div className="relative max-w-5xl mx-auto">
          <Card className={cn(
            "overflow-hidden shadow-2xl border-0",
            preferences.reduceAnimations ? '' : 'hover:scale-[1.02] transition-transform duration-300'
          )}>
            <CardContent className="p-0">
              <div className="aspect-video bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Interactive Demo Coming Soon</h3>
                  <p className="text-muted-foreground">
                    Explore the full Accio experience
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ImprovedPageShowcase;
