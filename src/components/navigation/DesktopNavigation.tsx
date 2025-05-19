
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

interface NavLink {
  name: string;
  path: string;
  icon: React.ReactNode | null;
  authRequired: boolean;
}

interface DesktopNavigationProps {
  links: NavLink[];
  isActiveRoute: (path: string) => boolean;
}

const DesktopNavigation: React.FC<DesktopNavigationProps> = ({ links, isActiveRoute }) => {
  // Custom styling for menu items
  const menuItemStyles = (isActive: boolean) => 
    `inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 ${isActive ? 'bg-accent/50' : ''}`;
  
  // Custom styling for dropdown items
  const dropdownItemStyles = (isActive: boolean) =>
    `block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${isActive ? 'bg-accent text-accent-foreground' : ''}`;
  
  const mainLinks = links.slice(0, 4);
  const moreLinks = links.slice(4);
  
  return (
    <div className="hidden md:block">
      <NavigationMenu>
        <NavigationMenuList>
          {mainLinks.map((link) => (
            <NavigationMenuItem key={link.path}>
              <Link 
                to={link.path} 
                className={menuItemStyles(isActiveRoute(link.path))}
              >
                {link.name}
              </Link>
            </NavigationMenuItem>
          ))}
          
          {moreLinks.length > 0 && (
            <NavigationMenuItem>
              <NavigationMenuTrigger>More</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 w-[200px]">
                  {moreLinks.map((link) => (
                    <li key={link.path}>
                      <Link 
                        to={link.path}
                        className={dropdownItemStyles(isActiveRoute(link.path))}
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          )}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default DesktopNavigation;
