
import React from 'react';
import { Button } from '@/components/ui/button';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import { Plus, ArrowRight, Sparkles } from 'lucide-react';
import { 
  AnimatedIllustration,
  MotivationalHeader,
  QuickActionCards,
  BenefitsSection,
  SocialProofFooter,
  SuccessStory
} from './EmptyState/index';

interface ImprovedEmptyStateProps {
  onAddContent: () => void;
}

const ImprovedEmptyState: React.FC<ImprovedEmptyStateProps> = ({ onAddContent }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 animate-fade-in">
      <div className="text-center max-w-5xl mx-auto">
        <AnimatedIllustration />
        <MotivationalHeader />

        {/* Enhanced primary action with more excitement */}
        <div className="mb-16">
          <EnhancedButton 
            onClick={onAddContent}
            variant="premium"
            size="xl"
            icon={<Plus className="h-6 w-6" />}
            rightIcon={<ArrowRight className="h-6 w-6" />}
            className="mb-4 group"
          >
            Start Your Knowledge Collection
          </EnhancedButton>
          
          <p className="text-sm text-muted-foreground font-medium flex items-center justify-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            No setup required • Works instantly • Free forever
            <Sparkles className="h-4 w-4 text-primary" />
          </p>
        </div>

        <QuickActionCards onAddContent={onAddContent} />
        <BenefitsSection />

        <SocialProofFooter />
        <SuccessStory />
      </div>
    </div>
  );
};

export { ImprovedEmptyState };
