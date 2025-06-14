
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface NavigationLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
  onClick?: () => void;
  external?: boolean;
}

const NavigationLink: React.FC<NavigationLinkProps> = ({
  to,
  children,
  className = '',
  activeClassName = '',
  onClick,
  external = false
}) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  const baseClassName = cn(
    'transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md',
    className,
    isActive && activeClassName
  );

  if (external) {
    return (
      <a
        href={to}
        className={baseClassName}
        onClick={onClick}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      to={to}
      className={baseClassName}
      onClick={onClick}
      aria-current={isActive ? 'page' : undefined}
    >
      {children}
    </Link>
  );
};

export default NavigationLink;
