
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ImprovedUnifiedLayout from '@/components/layout/ImprovedUnifiedLayout';
import { Search as SearchIcon, Filter, SortDesc } from 'lucide-react';

const Search: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <ImprovedUnifiedLayout>
      <Helmet>
        <title>Search - Accio</title>
        <meta name="description" content="Search through your saved content and collections." />
      </Helmet>

      <div className="py-8 space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Search Your Content</h1>
          <p className="text-muted-foreground">
            Find anything in your knowledge library instantly with AI-powered search.
          </p>
        </div>

        {/* Search Interface */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <SearchIcon className="h-5 w-5" />
              Search
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Search for articles, documents, collections..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
                aria-label="Search query"
              />
              <Button>
                <SearchIcon className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
              <Button variant="outline" size="sm">
                <SortDesc className="h-4 w-4 mr-2" />
                Sort
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Search Results Placeholder */}
        <Card>
          <CardContent className="py-12 text-center">
            <SearchIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Start Searching</h3>
            <p className="text-muted-foreground">
              Enter a search term to find your saved content
            </p>
          </CardContent>
        </Card>
      </div>
    </ImprovedUnifiedLayout>
  );
};

export default Search;
