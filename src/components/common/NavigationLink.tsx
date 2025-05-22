
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface NavigationLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
  exact?: boolean;
  onClick?: () => void;
  ariaLabel?: string;
  ['aria-haspopup']?: boolean;
  ['aria-expanded']?: boolean;
  ['data-testid']?: string;
}

/**
 * Accessible navigation link component that handles active states
 * and provides consistent styling across the application
 */
const NavigationLink: React.FC<NavigationLinkProps> = ({
  to,
  children,
  className = '',
  activeClassName = 'text-primary font-medium',
  exact = false,
  onClick,
  ariaLabel,
  'aria-haspopup': ariaHasPopup,
  'aria-expanded': ariaExpanded,
  'data-testid': dataTestId,
}) => {
  const location = useLocation();
  const isActive = exact 
    ? location.pathname === to 
    : location.pathname.startsWith(to);

  // Create an aria description for screen readers if link is active
  const ariaDescription = isActive 
    ? 'Current page' 
    : undefined;

  return (
    <Link
      to={to}
      className={cn(
        "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus:ring-offset-2",
        className,
        isActive && activeClassName
      )}
      onClick={(e) => {
        // If we're already on this page and it's the same URL, prevent navigation
        if (isActive && location.pathname === to) {
          e.preventDefault();
        }
        
        // Call the onClick handler if provided
        if (onClick) onClick();
      }}
      aria-current={isActive ? 'page' : undefined}
      aria-label={ariaLabel}
      aria-describedby={isActive ? ariaDescription : undefined}
      aria-haspopup={ariaHasPopup}
      aria-expanded={ariaExpanded}
      data-testid={dataTestId}
    >
      {children}
    </Link>
  );
};

export default NavigationLink;
