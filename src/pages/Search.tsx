
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import MainLayout from '@/components/layout/MainLayout';
import { Helmet } from 'react-helmet-async';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search as SearchIcon, Filter } from 'lucide-react';

const Search: React.FC = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Searching for:', searchQuery);
  };

  return (
    <MainLayout isLoggedIn={!!user} user={user}>
      <Helmet>
        <title>Search - Accio</title>
        <meta name="description" content="Search through your knowledge library" />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Search Your Library</h1>
          <p className="text-muted-foreground">Find anything in your saved content instantly.</p>
        </div>

        <form onSubmit={handleSearch} className="flex gap-4 mb-8">
          <div className="flex-1 relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search your content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button type="submit">
            Search
          </Button>
          <Button variant="outline" type="button">
            <Filter className="h-4 w-4" />
          </Button>
        </form>

        <div className="text-center py-12">
          <p className="text-muted-foreground">No content to search yet. Start by saving some content!</p>
        </div>
      </div>
    </MainLayout>
  );
};

export default Search;
