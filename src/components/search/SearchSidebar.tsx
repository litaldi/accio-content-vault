import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { OptimizedCard } from '@/components/ui/optimized-card';

interface SearchSidebarProps {
  isSemanticSearch: boolean;
  setIsSemanticSearch: (value: boolean) => void;
  relevanceThreshold: number;
  setRelevanceThreshold: (value: number) => void;
}

const SearchSidebar: React.FC<SearchSidebarProps> = ({
  isSemanticSearch,
  setIsSemanticSearch,
  relevanceThreshold,
  setRelevanceThreshold,
}) => {
  return (
    <OptimizedCard className="space-y-6">
      <OptimizedCardHeader>
        <OptimizedCardTitle>Search Options</OptimizedCardTitle>
        <OptimizedCardDescription>
          Customize your search experience
        </OptimizedCardDescription>
      </OptimizedCardHeader>
      <OptimizedCardContent className="space-y-4">
        <div>
          <Label htmlFor="semantic-search" className="text-sm">
            Semantic Search
          </Label>
          <Switch
            id="semantic-search"
            checked={isSemanticSearch}
            onCheckedChange={setIsSemanticSearch}
          />
        </div>
        <div>
          <Label htmlFor="relevance-threshold" className="text-sm">
            Relevance Threshold
          </Label>
          <Slider
            id="relevance-threshold"
            defaultValue={[relevanceThreshold]}
            max={100}
            step={1}
            onValueChange={(value) => setRelevanceThreshold(value[0])}
          />
        </div>
      </OptimizedCardContent>
    </OptimizedCard>
  );
};

export default SearchSidebar;
