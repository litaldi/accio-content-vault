
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  RefreshCw,
  TrendingUp,
  Users,
  Filter
} from 'lucide-react';
import { RecommendationFilters } from './recommendation/RecommendationFilters';
import { LearningGoalsProgress } from './recommendation/LearningGoalsProgress';
import { RecommendationsList } from './recommendation/RecommendationsList';

export const ContentRecommendationEngine = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [refreshing, setRefreshing] = useState(false);

  const categories = [
    { id: 'all', label: 'All Recommendations', count: 12 },
    { id: 'trending', label: 'Trending Now', count: 4 },
    { id: 'learning', label: 'Learning Paths', count: 3 },
    { id: 'similar', label: 'Similar Content', count: 5 }
  ];

  const recommendations = [
    {
      id: 1,
      title: "Advanced React Patterns for 2024",
      type: "article",
      relevanceScore: 95,
      reason: "Based on your recent reading about React hooks",
      readingTime: "8 min",
      category: "trending",
      tags: ['React', 'JavaScript', 'Frontend'],
      source: "Dev Blog",
      difficulty: "Advanced"
    },
    {
      id: 2,
      title: "Machine Learning Fundamentals",
      type: "course",
      relevanceScore: 88,
      reason: "Complements your AI knowledge interests",
      readingTime: "2.5 hours",
      category: "learning",
      tags: ['AI', 'Machine Learning', 'Python'],
      source: "Learning Platform",
      difficulty: "Beginner"
    },
    {
      id: 3,
      title: "Productivity Systems That Actually Work",
      type: "video",
      relevanceScore: 92,
      reason: "Similar to your saved productivity content",
      readingTime: "12 min",
      category: "similar",
      tags: ['Productivity', 'Organization', 'Efficiency'],
      source: "YouTube",
      difficulty: "Easy"
    },
    {
      id: 4,
      title: "The Future of Knowledge Work",
      type: "research",
      relevanceScore: 85,
      reason: "Trending in your professional network",
      readingTime: "15 min",
      category: "trending",
      tags: ['Future of Work', 'Knowledge Management'],
      source: "Research Journal",
      difficulty: "Medium"
    }
  ];

  const filteredRecommendations = selectedCategory === 'all' 
    ? recommendations 
    : recommendations.filter(rec => rec.category === selectedCategory);

  const learningGoals = [
    { goal: "Master React Development", progress: 75, nextStep: "Learn Context API" },
    { goal: "AI & Machine Learning", progress: 30, nextStep: "Study Neural Networks" },
    { goal: "Productivity Optimization", progress: 60, nextStep: "Time Blocking Methods" }
  ];

  const handleRefresh = async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              Content Recommendation Engine
              <Badge variant="secondary">AI-Powered</Badge>
            </CardTitle>
            <Button variant="outline" size="sm" onClick={handleRefresh} disabled={refreshing}>
              <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <RecommendationFilters
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />

          <LearningGoalsProgress goals={learningGoals} />

          <RecommendationsList recommendations={filteredRecommendations} />

          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <TrendingUp className="h-4 w-4 mr-2" />
              View Trending
            </Button>
            <Button variant="outline" size="sm">
              <Users className="h-4 w-4 mr-2" />
              Community Picks
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Customize Preferences
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
