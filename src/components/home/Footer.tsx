
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border py-8 px-4" role="contentinfo">
      <div className="max-w-6xl mx-auto">
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Accio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
