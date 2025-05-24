
import React from 'react';

const SuccessStory: React.FC = () => {
  return (
    <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 rounded-xl border border-green-200/50 dark:border-green-800/50">
      <p className="text-sm font-medium text-green-700 dark:text-green-300 mb-2">💡 Success Story</p>
      <p className="text-sm text-green-600 dark:text-green-400 italic">
        "I went from scattered bookmarks to a searchable knowledge base in minutes. 
        Accio helped me organize 3 years of research effortlessly!" - Sarah K.
      </p>
    </div>
  );
};

export { SuccessStory };
