
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import EnhancedNavigation from '@/components/navigation/EnhancedNavigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import ImprovedSearch from './ImprovedSearch';

const Search = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Search - Accio</title>
        <meta name="description" content="Search your knowledge library with AI-powered intelligence" />
      </Helmet>
      
      <EnhancedNavigation />
      
      <main className="flex-grow">
        <div className="border-b bg-card/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/dashboard')}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Dashboard
              </Button>
              <div className="h-4 w-px bg-border" />
              <h1 className="text-2xl font-bold">Search</h1>
            </div>
          </div>
        </div>
        
        <ImprovedSearch />
      </main>
    </div>
  );
};

export default Search;
