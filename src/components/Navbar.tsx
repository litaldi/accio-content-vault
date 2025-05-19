
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/ModeToggle';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Menu, X, LogOut, Settings, LayoutDashboard, PlusCircle, FolderOpen, BarChart2 } from 'lucide-react';

interface NavbarProps {
  isLoggedIn?: boolean;
  onLogout?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  isLoggedIn = false,
  onLogout
}) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };
  
  const navLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard className="h-4 w-4 mr-2" aria-hidden="true" />, authRequired: true },
    { name: 'Save Content', path: '/save', icon: <PlusCircle className="h-4 w-4 mr-2" aria-hidden="true" />, authRequired: true },
    { name: 'Collections', path: '/collections', icon: <FolderOpen className="h-4 w-4 mr-2" aria-hidden="true" />, authRequired: true },
    { name: 'Analytics', path: '/analytics', icon: <BarChart2 className="h-4 w-4 mr-2" aria-hidden="true" />, authRequired: true },
    { name: 'About', path: '/about', icon: null, authRequired: false },
    { name: 'Pricing', path: '/pricing', icon: null, authRequired: false },
    { name: 'Contact', path: '/contact', icon: null, authRequired: false },
  ];
  
  const filteredLinks = navLinks.filter(link => !link.authRequired || isLoggedIn);
  
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4">
        <Link to="/" className="mr-6 flex items-center space-x-2">
          <span className="font-bold text-xl">ReadSmart</span>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {filteredLinks.slice(0, 4).map((link) => (
              <NavigationMenuItem key={link.path}>
                <Link to={link.path} legacyBehavior passHref>
                  <NavigationMenuLink
                    className={navigationMenuTriggerStyle()}
                    active={isActiveRoute(link.path)}
                  >
                    {link.name}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
            
            {filteredLinks.length > 4 && (
              <NavigationMenuItem>
                <NavigationMenuTrigger>More</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 w-[200px]">
                    {filteredLinks.slice(4).map((link) => (
                      <li key={link.path}>
                        <Link to={link.path} legacyBehavior passHref>
                          <NavigationMenuLink
                            className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${
                              isActiveRoute(link.path) ? 'bg-accent text-accent-foreground' : ''
                            }`}
                          >
                            {link.name}
                          </NavigationMenuLink>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            )}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex-1" />

        <div className="flex items-center space-x-2">
          <ModeToggle />
          
          {isLoggedIn ? (
            <div className="hidden sm:flex space-x-2">
              <Button variant="outline" size="sm" asChild>
                <Link to="/settings">
                  <Settings className="h-4 w-4 mr-2" aria-hidden="true" />
                  Settings
                </Link>
              </Button>
              
              {onLogout && (
                <Button variant="ghost" size="sm" onClick={onLogout}>
                  <LogOut className="h-4 w-4 mr-2" aria-hidden="true" />
                  Logout
                </Button>
              )}
            </div>
          ) : (
            <div className="hidden sm:flex space-x-2">
              <Button variant="outline" size="sm" asChild>
                <Link to="/login">Login</Link>
              </Button>
              
              <Button size="sm" asChild>
                <Link to="/register">Sign Up</Link>
              </Button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <span className="sr-only">Toggle menu</span>
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="h-6 w-6" aria-hidden="true" />
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>ReadSmart</SheetTitle>
              </SheetHeader>
              <div className="mt-6 flex flex-col space-y-3">
                {filteredLinks.map((link) => (
                  <SheetClose key={link.path} asChild>
                    <Link 
                      to={link.path}
                      className={`flex items-center py-2 px-3 rounded-md transition-colors ${
                        isActiveRoute(link.path) 
                          ? 'bg-primary/10 text-primary font-medium' 
                          : 'hover:bg-accent hover:text-accent-foreground'
                      }`}
                    >
                      {link.icon}
                      {link.name}
                    </Link>
                  </SheetClose>
                ))}
                
                {isLoggedIn ? (
                  <>
                    <SheetClose asChild>
                      <Link
                        to="/settings"
                        className="flex items-center py-2 px-3 rounded-md transition-colors hover:bg-accent hover:text-accent-foreground"
                      >
                        <Settings className="h-4 w-4 mr-2" aria-hidden="true" />
                        Settings
                      </Link>
                    </SheetClose>
                    
                    {onLogout && (
                      <SheetClose asChild>
                        <Button 
                          variant="ghost" 
                          className="flex justify-start py-2 px-3 h-auto font-normal"
                          onClick={onLogout}
                        >
                          <LogOut className="h-4 w-4 mr-2" aria-hidden="true" />
                          Logout
                        </Button>
                      </SheetClose>
                    )}
                  </>
                ) : (
                  <div className="pt-4 mt-4 border-t flex flex-col gap-2">
                    <SheetClose asChild>
                      <Button variant="outline" asChild>
                        <Link to="/login">Login</Link>
                      </Button>
                    </SheetClose>
                    
                    <SheetClose asChild>
                      <Button asChild>
                        <Link to="/register">Sign Up</Link>
                      </Button>
                    </SheetClose>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
