
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Spacing, Typography } from '@/components/ui/design-system';
import { OptimizedCard } from '@/components/ui/optimized-card';

const OptimizedHeroSection: React.FC = () => {
  return (
    <Spacing.Section size="lg" className="bg-gradient-to-br from-primary/10 to-background">
      <Spacing.Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Column: Hero Text and Call-to-Action */}
          <div className="space-y-6">
            <Typography.H1 className="!text-balance">
              Unlock Your Knowledge Potential with AI
            </Typography.H1>
            <Typography.Lead>
              Accio is your AI-powered knowledge library, designed to help you capture, organize, and connect information effortlessly.
            </Typography.Lead>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="xl" className="group">
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg">
                Explore Features
              </Button>
            </div>
          </div>

          {/* Right Column: Enhanced Card Showcase */}
          <div className="relative">
            <OptimizedCard elevated interactive className="bg-gradient-to-br from-primary/5 to-muted/5 shadow-lg">
              <div className="p-6 space-y-4">
                <Typography.H3>
                  AI-Powered Knowledge Management
                </Typography.H3>
                <Typography.Body size="sm">
                  Automatically extract key insights, generate summaries, and organize your content with AI.
                </Typography.Body>
                <Button variant="secondary" size="sm">
                  Learn More
                </Button>
              </div>
            </OptimizedCard>
          </div>
        </div>
      </Spacing.Container>
    </Spacing.Section>
  );
};

export default OptimizedHeroSection;
