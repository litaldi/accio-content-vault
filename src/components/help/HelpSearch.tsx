
import React from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export const HelpSearch: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto mb-16">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search for help articles, tutorials, or FAQs..."
          className="pl-12 h-12 text-lg"
        />
      </div>
    </div>
  );
};
