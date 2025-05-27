
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Typography, Spacing } from '@/components/ui/design-system';
import { EnhancedSearchInterface } from '@/components/search/EnhancedSearchInterface';
import { SmartSearchResults } from '@/components/search/SmartSearchResults';
import { mockContents } from '@/lib/mock-data';

const Search: React.FC = () => {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [currentQuery, setCurrentQuery] = useState('');

  const handleSearchResults = (results: any[]) => {
    setSearchResults(results);
  };

  const handleQueryChange = (query: string) => {
    setCurrentQuery(query);
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>AI-Powered Search - Accio</title>
        <meta name="description" content="Search through your knowledge base with natural language queries and AI-powered discovery." />
      </Helmet>

      <Spacing.Section size="lg">
        <Spacing.Container>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Typography.H1 className="mb-4">
                AI-Powered Search & Discovery
              </Typography.H1>
              <Typography.Lead>
                Ask questions in natural language and discover insights across all your content
              </Typography.Lead>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Search Interface */}
              <div className="lg:col-span-1">
                <EnhancedSearchInterface
                  content={mockContents}
                  onResults={handleSearchResults}
                  onQueryChange={handleQueryChange}
                />
              </div>

              {/* Search Results */}
              <div className="lg:col-span-2">
                <SmartSearchResults
                  results={searchResults}
                  query={currentQuery}
                />
              </div>
            </div>
          </div>
        </Spacing.Container>
      </Spacing.Section>
    </div>
  );
};

export default Search;
