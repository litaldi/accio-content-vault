
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface EnhancedNavigationProps {
  isLoggedIn: boolean;
}

export const EnhancedNavigation: React.FC<EnhancedNavigationProps> = ({ isLoggedIn }) => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate(isLoggedIn ? '/dashboard' : '/register');
  };

  const handleLearnMore = () => {
    const featuresSection = document.getElementById('features-section');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="bg-background/80 backdrop-blur-sm border border-border rounded-full px-4 py-2 shadow-lg">
      <div className="flex items-center gap-4">
        <Button 
          onClick={handleGetStarted}
          size="sm"
          className="rounded-full"
        >
          {isLoggedIn ? 'Dashboard' : 'Get Started'}
        </Button>
        <Button 
          variant="ghost" 
          onClick={handleLearnMore}
          size="sm"
          className="rounded-full"
        >
          Learn More
        </Button>
      </div>
    </nav>
  );
};
