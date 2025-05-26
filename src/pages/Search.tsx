
import React from 'react';
import { Helmet } from 'react-helmet-async';

const Search: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Search - Accio | Find Your Knowledge</title>
        <meta name="description" content="Search your knowledge base with AI-powered semantic search. Find exactly what you need, when you need it." />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Search Your Knowledge</h1>
          
          <div className="bg-card rounded-lg p-8 shadow-sm border">
            <h2 className="text-xl font-semibold mb-4">Coming Soon</h2>
            <p className="text-muted-foreground mb-6">
              Our powerful AI-driven search feature is currently in development. 
              Soon you'll be able to find any piece of information in your knowledge base 
              using natural language queries.
            </p>
            
            <div className="space-y-4">
              <h3 className="font-medium">What you can expect:</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Semantic search that understands context and meaning</li>
                <li>• Natural language queries like "show me articles about productivity from last month"</li>
                <li>• Instant results with relevance scoring</li>
                <li>• Advanced filters and sorting options</li>
                <li>• Search across all your content types and sources</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
