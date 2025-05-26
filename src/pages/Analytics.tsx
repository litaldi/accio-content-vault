
import React from 'react';
import { Helmet } from 'react-helmet-async';

const Analytics: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Analytics - Accio | Knowledge Insights</title>
        <meta name="description" content="Gain insights into your knowledge patterns with detailed analytics. Track your learning progress and content engagement." />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Analytics & Insights</h1>
          
          <div className="bg-card rounded-lg p-8 shadow-sm border">
            <h2 className="text-xl font-semibold mb-4">Track Your Knowledge Growth</h2>
            <p className="text-muted-foreground mb-6">
              Get detailed insights into how you're building and using your knowledge base. 
              Understand your learning patterns, content engagement, and productivity trends.
            </p>
            
            <div className="space-y-4">
              <h3 className="font-medium">Analytics features coming soon:</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Content creation and consumption metrics</li>
                <li>• Knowledge base growth tracking</li>
                <li>• Search pattern analysis</li>
                <li>• Most accessed content reports</li>
                <li>• Learning progress visualization</li>
                <li>• Productivity insights and recommendations</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Analytics;
