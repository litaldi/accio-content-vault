
import React from 'react';
import { Lightbulb } from 'lucide-react';
import { RecommendationCard } from './RecommendationCard';

interface Recommendation {
  id: number;
  title: string;
  type: string;
  relevanceScore: number;
  reason: string;
  readingTime: string;
  category: string;
  tags: string[];
  source: string;
  difficulty: string;
}

interface RecommendationsListProps {
  recommendations: Recommendation[];
}

export const RecommendationsList: React.FC<RecommendationsListProps> = ({ recommendations }) => {
  return (
    <div>
      <h4 className="font-medium mb-3 flex items-center gap-2">
        <Lightbulb className="h-4 w-4" />
        Recommended for You
      </h4>
      <div className="space-y-4">
        {recommendations.map((rec) => (
          <RecommendationCard key={rec.id} recommendation={rec} />
        ))}
      </div>
    </div>
  );
};
