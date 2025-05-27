
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SkipLink } from '@/components/ui/skip-link';

interface PageWrapperProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
}

export const PageWrapper: React.FC<PageWrapperProps> = ({
  children,
  title = 'Accio - Your Personal Knowledge Sanctuary',
  description = 'Transform scattered information into organized intelligence with AI-powered knowledge management.',
  className = ''
}) => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
      </Helmet>
      
      <SkipLink href="#main-content">Skip to main content</SkipLink>
      
      <main 
        id="main-content" 
        className={className}
        role="main"
        aria-label="Main content"
      >
        {children}
      </main>
    </>
  );
};

export default PageWrapper;
