
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Sparkles, 
  Filter, 
  Star, 
  Clock,
  Eye,
  BookOpen,
  Video,
  Headphones,
  FileText,
  TrendingUp,
  Target,
  Zap
} from 'lucide-react';

interface CuratedContent {
  id: string;
  title: string;
  type: 'article' | 'video' | 'podcast' | 'course' | 'book';
  source: string;
  relevanceScore: number;
  qualityScore: number;
  estimatedTime: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  summary: string;
  trending: boolean;
  aiReason: string;
}

interface CurationFilter {
  contentTypes: string[];
  difficulty: string[];
  timeRange: string;
  topics: string[];
}

export const AIContentCurationEngine: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'personalized' | 'trending' | 'recommended'>('personalized');
  const [showFilters, setShowFilters] = useState(false);
  
  const [curatedContent] = useState<CuratedContent[]>([
    {
      id: '1',
      title: 'Advanced React Server Components: A Deep Dive',
      type: 'article',
      source: 'React Blog',
      relevanceScore: 96,
      qualityScore: 94,
      estimatedTime: '12 min read',
      difficulty: 'advanced',
      tags: ['React', 'Server Components', 'Next.js', 'Performance'],
      summary: 'Comprehensive guide to React Server Components, covering implementation patterns and performance benefits.',
      trending: true,
      aiReason: 'Matches your React expertise and recent RSC search queries'
    },
    {
      id: '2',
      title: 'Machine Learning Engineering Best Practices',
      type: 'video',
      source: 'ML Conference 2024',
      relevanceScore: 89,
      qualityScore: 91,
      estimatedTime: '45 min watch',
      difficulty: 'intermediate',
      tags: ['Machine Learning', 'MLOps', 'Engineering', 'Best Practices'],
      summary: 'Industry experts share battle-tested approaches to building and deploying ML systems at scale.',
      trending: false,
      aiReason: 'Aligns with your learning path in AI and engineering practices'
    },
    {
      id: '3',
      title: 'The Psychology of Effective Learning',
      type: 'podcast',
      source: 'Learning Science Podcast',
      relevanceScore: 85,
      qualityScore: 88,
      estimatedTime: '35 min listen',
      difficulty: 'beginner',
      tags: ['Learning Science', 'Psychology', 'Memory', 'Productivity'],
      summary: 'Neuroscientist explains evidence-based techniques for improving learning retention and speed.',
      trending: false,
      aiReason: 'Supports your goal of optimizing learning efficiency'
    },
    {
      id: '4',
      title: 'System Design Masterclass: Scaling to Millions',
      type: 'course',
      source: 'Tech Academy',
      relevanceScore: 92,
      qualityScore: 95,
      estimatedTime: '6 hours',
      difficulty: 'advanced',
      tags: ['System Design', 'Scalability', 'Architecture', 'Distributed Systems'],
      summary: 'Hands-on course covering real-world system design challenges and solutions.',
      trending: true,
      aiReason: 'Perfect for your upcoming system design interviews'
    }
  ]);

  const [curationStats] = useState({
    totalCurated: 1247,
    qualityFiltered: 892,
    personalizedToday: 23,
    savedForLater: 156
  });

  const getTypeIcon = (type: CuratedContent['type']) => {
    switch (type) {
      case 'article': return FileText;
      case 'video': return Video;
      case 'podcast': return Headphones;
      case 'course': return BookOpen;
      case 'book': return BookOpen;
    }
  };

  const getDifficultyColor = (difficulty: CuratedContent['difficulty']) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            AI Content Curation Engine
            <Badge variant="secondary">Intelligent Discovery</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Curation Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Filter className="h-4 w-4 text-blue-500" />
                  <span className="font-medium">Curated</span>
                </div>
                <div className="text-2xl font-bold">{curationStats.totalCurated}</div>
                <div className="text-xs text-muted-foreground">Total sources</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="font-medium">Quality</span>
                </div>
                <div className="text-2xl font-bold">{curationStats.qualityFiltered}</div>
                <div className="text-xs text-muted-foreground">High quality</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="h-4 w-4 text-green-500" />
                  <span className="font-medium">Today</span>
                </div>
                <div className="text-2xl font-bold">{curationStats.personalizedToday}</div>
                <div className="text-xs text-muted-foreground">Personalized</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="h-4 w-4 text-purple-500" />
                  <span className="font-medium">Saved</span>
                </div>
                <div className="text-2xl font-bold">{curationStats.savedForLater}</div>
                <div className="text-xs text-muted-foreground">For later</div>
              </CardContent>
            </Card>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {[
                { key: 'personalized', label: 'Personalized', icon: Target },
                { key: 'trending', label: 'Trending', icon: TrendingUp },
                { key: 'recommended', label: 'AI Recommended', icon: Sparkles }
              ].map((filter) => {
                const Icon = filter.icon;
                return (
                  <Button
                    key={filter.key}
                    variant={activeFilter === filter.key ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setActiveFilter(filter.key as any)}
                    className="gap-2"
                  >
                    <Icon className="h-3 w-3" />
                    {filter.label}
                  </Button>
                );
              })}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="gap-2"
            >
              <Filter className="h-3 w-3" />
              Filters
            </Button>
          </div>

          {/* Content Grid */}
          <div className="space-y-4">
            {curatedContent.map((content) => {
              const TypeIcon = getTypeIcon(content.type);
              return (
                <Card key={content.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <TypeIcon className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium">{content.title}</h4>
                            {content.trending && (
                              <Badge variant="default" className="text-xs">
                                <TrendingUp className="h-2 w-2 mr-1" />
                                Trending
                              </Badge>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-4 mb-2 text-sm text-muted-foreground">
                            <span>{content.source}</span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {content.estimatedTime}
                            </span>
                            <Badge className={`text-xs ${getDifficultyColor(content.difficulty)}`}>
                              {content.difficulty}
                            </Badge>
                          </div>
                          
                          <p className="text-sm text-muted-foreground mb-2">{content.summary}</p>
                          
                          <div className="flex flex-wrap gap-1 mb-2">
                            {content.tags.map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Zap className="h-3 w-3" />
                            <span>AI: {content.aiReason}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right ml-4">
                        <div className="space-y-2 mb-3">
                          <div>
                            <div className="text-xs text-muted-foreground">Relevance</div>
                            <div className="flex items-center gap-1">
                              <Progress value={content.relevanceScore} className="w-12 h-1" />
                              <span className="text-xs font-medium">{content.relevanceScore}%</span>
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-muted-foreground">Quality</div>
                            <div className="flex items-center gap-1">
                              <Progress value={content.qualityScore} className="w-12 h-1" />
                              <span className="text-xs font-medium">{content.qualityScore}%</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex gap-1">
                          <Button size="sm" variant="outline">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button size="sm">
                            Save
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* AI Curation Insights */}
          <Card className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="h-4 w-4 text-primary" />
                <h4 className="font-medium">AI Curation Intelligence</h4>
              </div>
              <ul className="space-y-1 text-sm">
                <li>• AI analyzes millions of sources daily for quality and relevance</li>
                <li>• Content scored based on your learning patterns and goals</li>
                <li>• Real-time trend detection across your interest areas</li>
                <li>• Personalized difficulty assessment for optimal challenge level</li>
              </ul>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};
