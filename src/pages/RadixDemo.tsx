
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { RadixShowcase } from '@/components/RadixShowcase';

const RadixDemo: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Radix UI Demo - Accio</title>
        <meta name="description" content="Demonstration of Radix UI components in our application" />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <RadixShowcase />
      </div>
    </>
  );
};

export default RadixDemo;
