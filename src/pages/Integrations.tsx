
import React from 'react';
import { Helmet } from 'react-helmet-async';

const Integrations: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Integrations - Accio | Connect Your Tools</title>
        <meta name="description" content="Connect Accio with your favorite tools and platforms. Seamlessly integrate with your existing workflow." />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Integrations</h1>
          
          <div className="bg-card rounded-lg p-8 shadow-sm border">
            <h2 className="text-xl font-semibold mb-4">Connect Your Workflow</h2>
            <p className="text-muted-foreground mb-6">
              Seamlessly integrate Accio with your existing tools and platforms. 
              Bring content from multiple sources into your unified knowledge base.
            </p>
            
            <div className="space-y-4">
              <h3 className="font-medium">Planned integrations:</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Google Drive, Dropbox, and OneDrive</li>
                <li>• Slack, Discord, and Microsoft Teams</li>
                <li>• Notion, Obsidian, and Roam Research</li>
                <li>• GitHub, GitLab, and developer tools</li>
                <li>• RSS feeds and web content</li>
                <li>• Email platforms and calendars</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Integrations;
