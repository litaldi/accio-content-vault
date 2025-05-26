
import React from 'react';
import NavigationLink from '@/components/common/NavigationLink';
import { cn } from '@/lib/utils';

interface NavigationItem {
  name: string;
  href: string;
}

interface DesktopNavigationProps {
  items: NavigationItem[];
}

const DesktopNavigation: React.FC<DesktopNavigationProps> = ({ items }) => {
  return (
    <div className="hidden md:flex items-center space-x-8">
      {items.map((item) => (
        <NavigationLink
          key={item.href}
          to={item.href}
          className={cn(
            "relative px-3 py-2 text-sm font-medium transition-colors duration-200",
            "hover:text-primary focus-visible:outline-none focus-visible:ring-2",
            "focus-visible:ring-primary focus-visible:ring-offset-2 rounded-md",
            "after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full",
            "after:scale-x-0 after:bg-primary after:transition-transform after:duration-200",
            "hover:after:scale-x-100"
          )}
          activeClassName="text-primary after:scale-x-100"
          aria-label={`Go to ${item.name}`}
        >
          {item.name}
        </NavigationLink>
      ))}
    </div>
  );
};

export default DesktopNavigation;
