
import React from 'react';
import { useLocation } from 'react-router-dom';
import MainNavigation from '@/components/navigation/MainNavigation';
import MarketingFooter from '@/components/marketing/MarketingFooter';
import FooterNavigation from '@/components/navigation/FooterNavigation';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const location = useLocation();

  // Define route groups for better organization
  const publicRoutes = ['/', '/features', '/ai-features', '/pricing', '/help', '/contact', '/blog', '/about', '/privacy', '/terms', '/tutorials', '/accessibility'];
  const authRoutes = ['/login', '/register'];
  const protectedRoutes = ['/dashboard', '/profile', '/saved', '/save', '/collections', '/activity', '/settings', '/search'];

  const isPublicRoute = publicRoutes.includes(location.pathname);
  const isAuthRoute = authRoutes.includes(location.pathname);
  const isProtectedRoute = protectedRoutes.some(route => location.pathname.startsWith(route));

  // Show main navigation on public routes
  const shouldShowMainNav = isPublicRoute;
  
  // Show marketing footer on public routes (not auth or protected routes)
  const shouldShowMarketingFooter = isPublicRoute;
  
  // Show mobile footer navigation (handles its own visibility logic)
  const shouldShowMobileNav = true;

  return (
    <div className="flex flex-col min-h-screen">
      {shouldShowMainNav && <MainNavigation />}
      
      <main 
        className="flex-1" 
        role="main" 
        id="main-content" 
        tabIndex={-1}
        aria-label="Main content"
      >
        {children}
      </main>
      
      {/* Footer sections */}
      {shouldShowMarketingFooter && <MarketingFooter />}
      {shouldShowMobileNav && <FooterNavigation />}
      
      {/* Add bottom padding for mobile nav when needed */}
      {isProtectedRoute && <div className="md:hidden h-20" aria-hidden="true" />}
    </div>
  );
};
