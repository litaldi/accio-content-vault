
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, X, LogOut, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavLink {
  name: string;
  path: string;
  icon: React.ReactNode | null;
  authRequired: boolean;
}

interface MobileNavigationProps {
  links: NavLink[];
  isActiveRoute: (path: string) => boolean;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  isLoggedIn: boolean;
  onLogout?: () => void;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({ 
  links, 
  isActiveRoute, 
  isOpen, 
  setIsOpen, 
  isLoggedIn, 
  onLogout 
}) => {
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>ReadSmart</SheetTitle>
        </SheetHeader>
        <div className="mt-6 flex flex-col space-y-3">
          {links.map((link) => (
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
                <span>{link.name}</span>
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
                  <span>Settings</span>
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
                    <span>Logout</span>
                  </Button>
                </SheetClose>
              )}
            </>
          ) : (
            <div className="pt-4 mt-4 border-t flex flex-col gap-2">
              <SheetClose asChild>
                <Button variant="outline" asChild>
                  <Link to="/login">
                    <span>Login</span>
                  </Link>
                </Button>
              </SheetClose>
              
              <SheetClose asChild>
                <Button asChild>
                  <Link to="/register">
                    <span>Sign Up</span>
                  </Link>
                </Button>
              </SheetClose>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavigation;
