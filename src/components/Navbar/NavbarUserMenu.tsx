
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { BarChart, FolderOpen, LogOut, Settings } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface NavbarUserMenuProps {
  handleLogout: () => void;
  getUserInitials: () => string;
}

const NavbarUserMenu: React.FC<NavbarUserMenuProps> = ({ handleLogout, getUserInitials }) => {
  const navigate = useNavigate();
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full" aria-label="User menu">
          <Avatar className="h-8 w-8 transition-transform hover:scale-105">
            <AvatarFallback className="bg-primary/10 text-primary">{getUserInitials()}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 animate-scale-in">
        <DropdownMenuItem onClick={() => navigate('/dashboard')} className="cursor-pointer transition-colors">
          Dashboard
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate('/collections')} className="cursor-pointer transition-colors">
          <FolderOpen className="mr-2 h-4 w-4" aria-hidden="true" />
          <span>Collections</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate('/analytics')} className="cursor-pointer transition-colors">
          <BarChart className="mr-2 h-4 w-4" aria-hidden="true" />
          <span>Analytics</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate('/settings')} className="cursor-pointer transition-colors">
          <Settings className="mr-2 h-4 w-4" aria-hidden="true" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer transition-colors text-destructive focus:text-destructive">
          <LogOut className="mr-2 h-4 w-4" aria-hidden="true" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavbarUserMenu;
