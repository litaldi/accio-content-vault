
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navigation from '@/components/layout/Navigation';

const Terms: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Terms of Service - Accio</title>
        <meta name="description" content="Terms of service for Accio knowledge management platform." />
      </Helmet>

      <Navigation />

      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
          
          <div className="prose prose-gray max-w-none">
            <p className="text-lg text-muted-foreground mb-8">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Acceptance of Terms</h2>
              <p>
                By accessing and using Accio, you accept and agree to be bound by the terms 
                and provision of this agreement.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Use License</h2>
              <p>
                Permission is granted to temporarily use Accio for personal, non-commercial 
                transitory viewing only. This is the grant of a license, not a transfer of title.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Disclaimer</h2>
              <p>
                The materials on Accio are provided on an 'as is' basis. Accio makes no warranties, 
                expressed or implied, and hereby disclaims and negates all other warranties.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Limitations</h2>
              <p>
                In no event shall Accio or its suppliers be liable for any damages arising 
                out of the use or inability to use the materials on Accio.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
              <p>
                If you have any questions about these terms, please contact us at 
                legal@accio.com.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Terms;
