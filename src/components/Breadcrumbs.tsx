
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbsProps {
  items?: {
    label: string;
    href?: string;
  }[];
  className?: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items = [], className = '' }) => {
  const location = useLocation();
  
  // If no items are provided, generate them from the current path
  const breadcrumbItems = items.length > 0 ? items : generateBreadcrumbs(location.pathname);
  
  return (
    <nav aria-label="Breadcrumb" className={`mb-6 ${className}`}>
      <ol className="flex flex-wrap items-center space-x-1 text-sm">
        <li className="flex items-center">
          <Link 
            to="/" 
            className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Home"
          >
            <Home className="h-4 w-4" aria-hidden="true" />
          </Link>
        </li>
        
        {breadcrumbItems.map((item, index) => (
          <li key={index} className="flex items-center">
            <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground" aria-hidden="true" />
            
            {item.href && index < breadcrumbItems.length - 1 ? (
              <Link 
                to={item.href} 
                className="text-muted-foreground hover:text-foreground hover:underline transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-foreground font-medium" aria-current={index === breadcrumbItems.length - 1 ? "page" : undefined}>
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

// Helper function to generate breadcrumb items from a path
const generateBreadcrumbs = (path: string) => {
  const parts = path.split('/').filter(Boolean);
  
  return parts.map((part, index) => {
    // Create a prettier label from the path part
    const label = part
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    // Create the href for this breadcrumb
    const href = `/${parts.slice(0, index + 1).join('/')}`;
    
    return { label, href };
  });
};

export default Breadcrumbs;
