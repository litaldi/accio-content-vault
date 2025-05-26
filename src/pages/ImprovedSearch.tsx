
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { OptimizedCard } from '@/components/ui/optimized-card';

const ImprovedSearch: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Improved Search | Accio</title>
        <meta name="description" content="Experience the improved search functionality." />
      </Helmet>

      <div className="container mx-auto py-12">
        <h1 className="text-3xl font-bold mb-6">Improved Search</h1>

        <div className="flex items-center mb-6">
          <Input type="text" placeholder="Enter your search query" className="mr-4" />
          <Button>Search</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <OptimizedCard key={index} hover elevated interactive>
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">Result {index + 1}</h2>
                <p className="text-gray-600">
                  This is a sample search result. Click to view more details.
                </p>
              </div>
            </OptimizedCard>
          ))}
        </div>
      </div>
    </>
  );
};

export default ImprovedSearch;
