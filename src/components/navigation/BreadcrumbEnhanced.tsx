
import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ComponentType<{ className?: string }>;
  current?: boolean;
}

interface BreadcrumbEnhancedProps {
  items?: BreadcrumbItem[];
  showHome?: boolean;
  className?: string;
}

const routeLabels: Record<string, string> = {
  '/': 'Home',
  '/dashboard': 'Dashboard',
  '/save': 'Save Content',
  '/settings': 'Settings',
  '/analytics': 'Analytics',
  '/collections': 'Collections',
  '/pricing': 'Pricing',
  '/about': 'About',
  '/contact': 'Contact'
};

export const BreadcrumbEnhanced: React.FC<BreadcrumbEnhancedProps> = ({
  items,
  showHome = true,
  className
}) => {
  const location = useLocation();

  // Auto-generate breadcrumbs if not provided
  const breadcrumbItems = items || (() => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const generatedItems: BreadcrumbItem[] = [];

    if (showHome && location.pathname !== '/') {
      generatedItems.push({
        label: 'Home',
        href: '/',
        icon: Home
      });
    }

    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const isLast = index === pathSegments.length - 1;
      
      generatedItems.push({
        label: routeLabels[currentPath] || segment.charAt(0).toUpperCase() + segment.slice(1),
        href: isLast ? undefined : currentPath,
        current: isLast
      });
    });

    return generatedItems;
  })();

  if (breadcrumbItems.length <= 1) {
    return null;
  }

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("flex items-center space-x-1 text-sm text-muted-foreground mb-6", className)}
    >
      <ol className="flex items-center space-x-1">
        {breadcrumbItems.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground/60" aria-hidden="true" />
            )}
            
            {item.href ? (
              <Link
                to={item.href}
                className={cn(
                  "flex items-center gap-1.5 hover:text-foreground transition-colors",
                  "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 rounded-sm px-1 py-0.5"
                )}
              >
                {item.icon && <item.icon className="h-3.5 w-3.5" />}
                {item.label}
              </Link>
            ) : (
              <span
                className={cn(
                  "flex items-center gap-1.5 font-medium",
                  item.current && "text-foreground"
                )}
                aria-current={item.current ? "page" : undefined}
              >
                {item.icon && <item.icon className="h-3.5 w-3.5" />}
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
