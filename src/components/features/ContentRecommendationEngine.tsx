
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  Brain, 
  BookOpen, 
  Clock,
  Star,
  Eye,
  ArrowRight,
  Filter,
  Refresh,
  Target,
  Lightbulb,
  Users
} from 'lucide-react';

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

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Advanced': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'article': return '📄';
      case 'course': return '🎓';
      case 'video': return '🎥';
      case 'research': return '🔬';
      default: return '📝';
    }
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
              <Refresh className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Category Filters */}
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.label}
                  <Badge variant="secondary" className="ml-2">
                    {category.count}
                  </Badge>
                </Button>
              ))}
            </div>
          </div>

          {/* Learning Goals Progress */}
          <div>
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <Target className="h-4 w-4" />
              Your Learning Goals
            </h4>
            <div className="space-y-3">
              {learningGoals.map((goal, index) => (
                <Card key={index} className="bg-muted/20">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium">{goal.goal}</h5>
                      <span className="text-sm text-muted-foreground">{goal.progress}%</span>
                    </div>
                    <Progress value={goal.progress} className="mb-2" />
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Next: {goal.nextStep}</span>
                      <Button variant="ghost" size="sm">
                        <ArrowRight className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div>
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              Recommended for You
            </h4>
            <div className="space-y-4">
              {filteredRecommendations.map((rec) => (
                <Card key={rec.id} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="text-2xl">{getTypeIcon(rec.type)}</div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h5 className="font-medium">{rec.title}</h5>
                          <Badge variant="outline" className="ml-2">
                            {rec.relevanceScore}% match
                          </Badge>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-3">{rec.reason}</p>
                        
                        <div className="flex items-center gap-2 mb-3">
                          {rec.tags.map(tag => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {rec.readingTime}
                            </span>
                            <span>{rec.source}</span>
                            <div className="flex items-center gap-1">
                              <div className={`w-2 h-2 rounded-full ${getDifficultyColor(rec.difficulty)}`}></div>
                              <span>{rec.difficulty}</span>
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <BookOpen className="h-3 w-3" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Star className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
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
