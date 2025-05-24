
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

interface NavbarDesktopLinksProps {
  isLoggedIn: boolean;
  currentPath: string;
}

const NavbarDesktopLinks: React.FC<NavbarDesktopLinksProps> = ({ isLoggedIn, currentPath }) => {
  // Public routes available to all users
  const publicLinks = [
    { path: '/about', label: 'About' },
    { path: '/pricing', label: 'Pricing' },
    { path: '/contact', label: 'Contact' },
    { path: '/faq', label: 'FAQ' }
  ];

  // Private routes for logged-in users
  const privateLinks = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/collections', label: 'Collections' },
    { path: '/analytics', label: 'Analytics' }
  ];

  // Determine which links to show based on auth state
  const links = isLoggedIn ? [...privateLinks] : [...publicLinks];

  return (
    <nav className="hidden md:flex" role="navigation" aria-label="Main navigation">
      <NavigationMenu>
        <NavigationMenuList>
          {links.map((link) => (
            <NavigationMenuItem key={link.path}>
              <Link
                to={link.path}
                className={cn(
                  navigationMenuTriggerStyle(),
                  "bg-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                  currentPath === link.path && "bg-accent text-accent-foreground"
                )}
                aria-current={currentPath === link.path ? 'page' : undefined}
              >
                {link.label}
              </Link>
            </NavigationMenuItem>
          ))}
          
          {/* Features submenu with dropdown */}
          <NavigationMenuItem>
            <NavigationMenuTrigger 
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              aria-label="Features menu"
            >
              Features
            </NavigationMenuTrigger>
            <NavigationMenuContent className="bg-popover border border-border shadow-lg">
              <ul className="grid gap-3 p-4 w-[400px] md:w-[500px] lg:w-[600px] grid-cols-2" role="list">
                <li className="col-span-2">
                  <NavigationMenuLink asChild>
                    <Link
                      to="/features"
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    >
                      <span className="mb-2 mt-4 text-lg font-medium">
                        All Features
                      </span>
                      <span className="text-sm leading-tight text-muted-foreground">
                        Explore all of our powerful features
                      </span>
                    </Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <Link 
                      to="/features#ai-tagging" 
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    >
                      <div className="text-sm font-medium leading-none">AI Tagging</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Automatic content tagging with AI
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <Link 
                      to="/features#semantic-search" 
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    >
                      <div className="text-sm font-medium leading-none">Semantic Search</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Find content by meaning, not just keywords
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
                {isLoggedIn && (
                  <>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link 
                          to="/playground" 
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                        >
                          <div className="text-sm font-medium leading-none">Playground</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Test and experiment with features
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link 
                          to="/save" 
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                        >
                          <div className="text-sm font-medium leading-none">Save Content</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Add content to your library
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </>
                )}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* Additional navigation for helpful pages */}
          {!isLoggedIn && (
            <NavigationMenuItem>
              <NavigationMenuTrigger
                className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                aria-label="More pages menu"
              >
                More
              </NavigationMenuTrigger>
              <NavigationMenuContent className="bg-popover border border-border shadow-lg">
                <ul className="grid gap-3 p-4 w-[300px] grid-cols-1" role="list">
                  <li>
                    <NavigationMenuLink asChild>
                      <Link 
                        to="/blog" 
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                      >
                        <div className="text-sm font-medium leading-none">Blog</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Latest news and updates
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link 
                        to="/privacy" 
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                      >
                        <div className="text-sm font-medium leading-none">Privacy</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          How we protect your data
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link 
                        to="/terms" 
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                      >
                        <div className="text-sm font-medium leading-none">Terms</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Terms of service
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          )}
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
};

export default NavbarDesktopLinks;
