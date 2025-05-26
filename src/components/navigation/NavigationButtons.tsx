
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
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
        <Button
          variant="ghost"
          size="sm"
          onClick={handleBack}
          aria-label="Go back to previous page"
          className="inline-flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      )}
      
      {showHomeButton && !isHomePage && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleHome}
          aria-label="Go to homepage"
          className="inline-flex items-center gap-2"
        >
          <Home className="h-4 w-4" />
          Home
        </Button>
      )}

      {!isDashboard && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleDashboard}
          aria-label="Go to dashboard"
        >
          Dashboard
        </Button>
      )}

      <Button
        variant="outline"
        size="sm"
        onClick={handleSearch}
        aria-label="Search content"
        className="inline-flex items-center gap-2"
      >
        <Search className="h-4 w-4" />
        <span className="hidden sm:inline">Search</span>
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={handleSettings}
        aria-label="Open settings"
        className="inline-flex items-center gap-2"
      >
        <Settings className="h-4 w-4" />
        <span className="hidden sm:inline">Settings</span>
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={handleHelp}
        aria-label="Get help"
        className="inline-flex items-center gap-2"
      >
        <HelpCircle className="h-4 w-4" />
        <span className="hidden sm:inline">Help</span>
      </Button>
    </div>
  );
};

export default NavigationButtons;
