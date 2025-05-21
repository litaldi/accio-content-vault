
import React from 'react';
import { Link } from 'react-router-dom';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';

interface NavbarDesktopLinksProps {
  isLoggedIn: boolean;
  currentPath: string;
}

const NavbarDesktopLinks: React.FC<NavbarDesktopLinksProps> = ({ isLoggedIn, currentPath }) => {
  const isActive = (path: string) => currentPath === path;
  
  if (isLoggedIn) {
    return (
      <nav className="hidden md:flex gap-6">
        {[
          { path: '/dashboard', label: 'Dashboard' },
          { path: '/collections', label: 'Collections' },
          { path: '/analytics', label: 'Analytics' }
        ].map(item => (
          <Link 
            key={item.path} 
            to={item.path} 
            className={`text-sm font-medium transition-colors relative py-1 ${
              isActive(item.path) 
                ? 'text-primary' 
                : 'text-muted-foreground hover:text-primary'
            }`}
            aria-current={isActive(item.path) ? 'page' : undefined}
          >
            {item.label}
            {isActive(item.path) && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full" aria-hidden="true" />
            )}
          </Link>
        ))}
      </nav>
    );
  }
  
  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link to="/about" className={navigationMenuTriggerStyle()}>
            About
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-[400px] p-4 grid grid-cols-2 gap-3">
              <Link to="/pricing" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                <div className="text-sm font-medium leading-none">Pricing</div>
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">View our pricing plans and options</p>
              </Link>
              <Link to="/faq" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                <div className="text-sm font-medium leading-none">FAQ</div>
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">Get answers to common questions</p>
              </Link>
              <Link to="/contact" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                <div className="text-sm font-medium leading-none">Contact</div>
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">Get in touch with our support team</p>
              </Link>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavbarDesktopLinks;
