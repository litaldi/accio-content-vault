
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  label: string;
  href: string;
  isCurrentPage?: boolean;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
  className?: string;
}

const routeLabels: Record<string, string> = {
  '/': 'Home',
  '/features': 'Features',
  '/how-it-works': 'How It Works',
  '/pricing': 'Pricing',
  '/login': 'Sign In',
  '/register': 'Sign Up',
  '/profile': 'Profile',
  '/dashboard': 'Dashboard',
  '/search': 'Search',
  '/collections': 'Collections',
  '/settings': 'Settings'
};

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className }) => {
  const location = useLocation();
  
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    if (items) return items;
    
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [
      { label: 'Home', href: '/' }
    ];
    
    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const isLast = index === pathSegments.length - 1;
      
      breadcrumbs.push({
        label: routeLabels[currentPath] || segment.charAt(0).toUpperCase() + segment.slice(1),
        href: currentPath,
        isCurrentPage: isLast
      });
    });
    
    return breadcrumbs.length > 1 ? breadcrumbs : [];
  };

  const breadcrumbItems = generateBreadcrumbs();
  
  if (breadcrumbItems.length <= 1) return null;

  return (
    <nav 
      aria-label="Breadcrumb" 
      className={cn("flex items-center space-x-1 text-sm", className)}
    >
      <ol className="flex items-center space-x-1">
        {breadcrumbItems.map((item, index) => (
          <li key={item.href} className="flex items-center">
            {index > 0 && (
              <ArrowRight className="h-3 w-3 text-muted-foreground mx-2" />
            )}
            {item.isCurrentPage ? (
              <span 
                className="text-foreground font-medium"
                aria-current="page"
              >
                {item.label}
              </span>
            ) : (
              <Link
                to={item.href}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {index === 0 && <Home className="h-3 w-3 mr-1 inline" />}
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
