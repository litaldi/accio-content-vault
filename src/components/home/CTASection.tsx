
import React from 'react';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import { ArrowRight, Users, Clock, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Typography, Spacing } from '@/components/ui/design-system';

const CTASection: React.FC = () => {
  return (
    <Spacing.Section size="lg" className="bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground">
      <Spacing.Container size="lg">
        <div className="text-center max-w-4xl mx-auto">
          <Typography.H2 className="mb-6 text-white">
            Ready to Transform Your Knowledge Management?
          </Typography.H2>
          <Typography.Body size="lg" className="mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
            Join 10,000+ professionals who've already discovered the power of organized, AI-enhanced knowledge. 
            Your future self will thank you.
          </Typography.Body>

          {/* Benefits List */}
          <div className="flex flex-wrap justify-center gap-6 mb-12 text-sm">
            {[
              "Start free, upgrade when ready",
              "No credit card required",
              "Setup in under 30 seconds",
              "Cancel anytime, keep your data"
            ].map((benefit, index) => (
              <div key={index} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <CheckCircle className="h-4 w-4 text-green-300" />
                <span className="font-medium text-white">{benefit}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <EnhancedButton 
              asChild 
              size="xl" 
              className="bg-white text-primary hover:bg-white/95 shadow-2xl"
            >
              <Link to="/register">
                Create My Free Account
                <ArrowRight className="h-5 w-5" />
              </Link>
            </EnhancedButton>
            <EnhancedButton 
              asChild 
              variant="outline" 
              size="xl"
              className="border-2 border-white/60 hover:bg-white/15 hover:border-white text-white"
            >
              <Link to="/contact">
                Schedule a Demo
              </Link>
            </EnhancedButton>
          </div>

          {/* Social Proof */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex items-center justify-center gap-3">
              <Users className="h-6 w-6 text-primary-foreground/80" />
              <div>
                <div className="text-2xl font-bold text-white">10,000+</div>
                <div className="text-sm text-primary-foreground/80">Happy Users</div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Clock className="h-6 w-6 text-primary-foreground/80" />
              <div>
                <div className="text-2xl font-bold text-white">< 30 sec</div>
                <div className="text-sm text-primary-foreground/80">Setup Time</div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <CheckCircle className="h-6 w-6 text-green-300" />
              <div>
                <div className="text-2xl font-bold text-white">Free</div>
                <div className="text-sm text-primary-foreground/80">Forever Plan</div>
              </div>
            </div>
          </div>

          {/* Urgency Message */}
          <div className="mt-8 p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
            <Typography.Body className="text-primary-foreground/90 mb-0">
              💡 <strong>Pro tip:</strong> The sooner you start organizing, the more time you'll save. 
              Users typically save 5+ hours per week within their first month.
            </Typography.Body>
          </div>
        </div>
      </Spacing.Container>
    </Spacing.Section>
  );
};

export default CTASection;
