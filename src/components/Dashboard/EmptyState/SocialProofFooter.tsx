
import React from 'react';

const SocialProofFooter: React.FC = () => {
  return (
    <div className="text-center space-y-6">
      <p className="text-muted-foreground mb-6 text-lg">
        Join thousands of learners building their knowledge empire
      </p>
      
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-muted-foreground">
        <span className="flex items-center gap-2 bg-white/60 dark:bg-gray-800/60 rounded-full px-4 py-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          Browser extension available
        </span>
        <span className="flex items-center gap-2 bg-white/60 dark:bg-gray-800/60 rounded-full px-4 py-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-300"></div>
          Mobile sharing supported
        </span>
        <span className="flex items-center gap-2 bg-white/60 dark:bg-gray-800/60 rounded-full px-4 py-2">
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-700"></div>
          Offline access ready
        </span>
      </div>
    </div>
  );
};

export { SocialProofFooter };
