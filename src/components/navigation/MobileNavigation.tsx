
import React from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import NavigationLink from '@/components/common/NavigationLink';
import NavigationActions from './NavigationActions';
import { Menu, X } from 'lucide-react';

interface NavigationItem {
  name: string;
  href: string;
}

interface MobileNavigationProps {
  items: NavigationItem[];
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({
  items,
  isOpen,
  onOpenChange
}) => {
  const handleClose = () => onOpenChange(false);

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label="Open main menu"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          {isOpen ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" aria-hidden="true" />
          )}
        </Button>
      </SheetTrigger>
      <SheetContent id="mobile-menu" side="right" className="w-80">
        <div className="flex flex-col space-y-6 mt-8">
          <nav className="flex flex-col space-y-4" role="navigation" aria-label="Mobile navigation">
            {items.map((item) => (
              <NavigationLink
                key={item.href}
                to={item.href}
                className="flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                activeClassName="bg-accent text-accent-foreground"
                onClick={handleClose}
              >
                {item.name}
              </NavigationLink>
            ))}
          </nav>
          
          <div className="border-t pt-6">
            <NavigationActions variant="mobile" onClose={handleClose} />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavigation;
