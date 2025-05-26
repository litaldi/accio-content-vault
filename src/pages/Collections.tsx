
import React from 'react';
import { Helmet } from 'react-helmet-async';

const Collections: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Collections - Accio | Organize Your Knowledge</title>
        <meta name="description" content="Organize your knowledge into smart collections. Let AI help you categorize and structure your information automatically." />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Collections</h1>
          
          <div className="bg-card rounded-lg p-8 shadow-sm border">
            <h2 className="text-xl font-semibold mb-4">Smart Organization</h2>
            <p className="text-muted-foreground mb-6">
              Collections help you organize your knowledge into meaningful groups. 
              Our AI can automatically suggest collections based on your content, 
              or you can create custom collections to suit your workflow.
            </p>
            
            <div className="space-y-4">
              <h3 className="font-medium">Features in development:</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• AI-powered auto-categorization</li>
                <li>• Custom collection creation and management</li>
                <li>• Nested collections for complex organization</li>
                <li>• Smart recommendations for content placement</li>
                <li>• Collection sharing and collaboration</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Collections;
