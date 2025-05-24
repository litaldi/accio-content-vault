
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AccessibleButton } from '@/components/ui/accessible-button';
import { ArrowLeft, Home, Search, Settings, HelpCircle, Bell } from 'lucide-react';

interface NavigationButtonsProps {
  showBackButton?: boolean;
  showHomeButton?: boolean;
  customBackPath?: string;
  className?: string;
}

export const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  showBackButton = true,
  showHomeButton = true,
  customBackPath,
  className = "flex items-center gap-2"
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    if (customBackPath) {
      navigate(customBackPath);
    } else {
      navigate(-1);
    }
  };

  const handleHome = () => {
    navigate('/');
  };

  const handleDashboard = () => {
    navigate('/dashboard');
  };

  const handleSearch = () => {
    navigate('/search');
  };

  const handleSettings = () => {
    navigate('/settings');
  };

  const handleHelp = () => {
    navigate('/help');
  };

  // Don't show back button on home page
  const isHomePage = location.pathname === '/';
  const isDashboard = location.pathname === '/dashboard';

  return (
    <div className={className} role="navigation" aria-label="Page navigation">
      {showBackButton && !isHomePage && (
        <AccessibleButton
          variant="ghost"
          size="sm"
          onClick={handleBack}
          leftIcon={<ArrowLeft className="h-4 w-4" />}
          aria-label="Go back to previous page"
          description="Navigate to the previous page in your browsing history"
        >
          Back
        </AccessibleButton>
      )}
      
      {showHomeButton && !isHomePage && (
        <AccessibleButton
          variant="ghost"
          size="sm"
          onClick={handleHome}
          leftIcon={<Home className="h-4 w-4" />}
          aria-label="Go to homepage"
          description="Navigate to the main homepage"
        >
          Home
        </AccessibleButton>
      )}

      {!isDashboard && (
        <AccessibleButton
          variant="ghost"
          size="sm"
          onClick={handleDashboard}
          aria-label="Go to dashboard"
          description="Navigate to your personal dashboard"
        >
          Dashboard
        </AccessibleButton>
      )}

      <AccessibleButton
        variant="outline"
        size="sm"
        onClick={handleSearch}
        leftIcon={<Search className="h-4 w-4" />}
        aria-label="Search content"
        description="Search through your saved content and knowledge library"
      >
        <span className="hidden sm:inline">Search</span>
      </AccessibleButton>

      <AccessibleButton
        variant="outline"
        size="sm"
        onClick={handleSettings}
        leftIcon={<Settings className="h-4 w-4" />}
        aria-label="Open settings"
        description="Access application settings and preferences"
      >
        <span className="hidden sm:inline">Settings</span>
      </AccessibleButton>

      <AccessibleButton
        variant="outline"
        size="sm"
        onClick={handleHelp}
        leftIcon={<HelpCircle className="h-4 w-4" />}
        aria-label="Get help"
        description="Access help documentation and support"
      >
        <span className="hidden sm:inline">Help</span>
      </AccessibleButton>
    </div>
  );
};

export default NavigationButtons;
