
import React from 'react';
import { LayoutDashboard, PlusCircle, FolderOpen, BarChart2 } from 'lucide-react';

export interface NavLinkType {
  name: string;
  path: string;
  icon: React.ReactNode | null;
  authRequired: boolean;
}

export const getNavLinks = (): NavLinkType[] => {
  return [
    { 
      name: 'Dashboard', 
      path: '/dashboard', 
      icon: <LayoutDashboard className="h-4 w-4 mr-2" aria-hidden="true" />, 
      authRequired: true 
    },
    { 
      name: 'Save Content', 
      path: '/save', 
      icon: <PlusCircle className="h-4 w-4 mr-2" aria-hidden="true" />, 
      authRequired: true 
    },
    { 
      name: 'Collections', 
      path: '/collections', 
      icon: <FolderOpen className="h-4 w-4 mr-2" aria-hidden="true" />, 
      authRequired: true 
    },
    { 
      name: 'Analytics', 
      path: '/analytics', 
      icon: <BarChart2 className="h-4 w-4 mr-2" aria-hidden="true" />, 
      authRequired: true 
    },
    { 
      name: 'About', 
      path: '/about', 
      icon: null, 
      authRequired: false 
    },
    { 
      name: 'Pricing', 
      path: '/pricing', 
      icon: null, 
      authRequired: false 
    },
    { 
      name: 'Contact', 
      path: '/contact', 
      icon: null, 
      authRequired: false 
    },
  ];
};
