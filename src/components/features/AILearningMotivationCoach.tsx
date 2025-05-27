
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Heart, 
  Zap, 
  Trophy, 
  Target,
  TrendingUp,
  Flame,
  Star,
  Calendar,
  MessageCircle,
  Lightbulb,
  Award,
  Clock
} from 'lucide-react';

interface MotivationMetric {
  id: string;
  name: string;
  value: number;
  trend: 'up' | 'down' | 'stable';
  target: number;
  unit: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  earnedDate: string;
  category: 'learning' | 'consistency' | 'challenge' | 'social';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface MotivationMessage {
  id: string;
  type: 'encouragement' | 'challenge' | 'celebration' | 'tip';
  message: string;
  action?: string;
  timestamp: string;
}

export const AILearningMotivationCoach: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'achievements' | 'coach'>('dashboard');
  
  const [motivationMetrics] = useState<MotivationMetric[]>([
    {
      id: '1',
      name: 'Learning Streak',
      value: 12,
      trend: 'up',
      target: 30,
      unit: 'days'
    },
    {
      id: '2',
      name: 'Motivation Level',
      value: 85,
      trend: 'stable',
      target: 90,
      unit: '%'
    },
    {
      id: '3',
      name: 'Weekly Goals',
      value: 4,
      trend: 'up',
      target: 5,
      unit: '/5'
    },
    {
      id: '4',
      name: 'Challenge Completion',
      value: 78,
      trend: 'up',
      target: 85,
      unit: '%'
    }
  ]);

  const [recentAchievements] = useState<Achievement[]>([
    {
      id: '1',
      title: 'Week Warrior',
      description: 'Completed learning goals for 7 consecutive days',
      earnedDate: '2024-01-15',
      category: 'consistency',
      rarity: 'rare'
    },
    {
      id: '2',
      title: 'Knowledge Seeker',
      description: 'Explored 5 new topics this month',
      earnedDate: '2024-01-12',
      category: 'learning',
      rarity: 'common'
    },
    {
      id: '3',
      title: 'Challenge Master',
      description: 'Completed a difficult learning challenge',
      earnedDate: '2024-01-10',
      category: 'challenge',
      rarity: 'epic'
    }
  ]);

  const [coachMessages] = useState<MotivationMessage[]>([
    {
      id: '1',
      type: 'encouragement',
      message: "You're on fire! 🔥 Your 12-day learning streak shows incredible dedication. Keep pushing forward!",
      action: 'Continue Streak',
      timestamp: '2 hours ago'
    },
    {
      id: '2',
      type: 'challenge',
      message: "Ready for a challenge? Try tackling that advanced React topic you've been putting off.",
      action: 'Accept Challenge',
      timestamp: '1 day ago'
    },
    {
      id: '3',
      type: 'celebration',
      message: "🎉 Congratulations on earning the 'Week Warrior' achievement! Your consistency is inspiring.",
      timestamp: '2 days ago'
    },
    {
      id: '4',
      type: 'tip',
      message: "💡 Pro tip: Your focus is highest at 9 AM. Consider scheduling important learning sessions then.",
      action: 'Schedule Session',
      timestamp: '3 days ago'
    }
  ]);

  const getRarityColor = (rarity: Achievement['rarity']) => {
    switch (rarity) {
      case 'common': return 'bg-gray-100 text-gray-800';
      case 'rare': return 'bg-blue-100 text-blue-800';
      case 'epic': return 'bg-purple-100 text-purple-800';
      case 'legendary': return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getCategoryIcon = (category: Achievement['category']) => {
    switch (category) {
      case 'learning': return Lightbulb;
      case 'consistency': return Flame;
      case 'challenge': return Target;
      case 'social': return MessageCircle;
    }
  };

  const getMessageIcon = (type: MotivationMessage['type']) => {
    switch (type) {
      case 'encouragement': return Heart;
      case 'challenge': return Target;
      case 'celebration': return Trophy;
      case 'tip': return Lightbulb;
    }
  };

  const getMessageColor = (type: MotivationMessage['type']) => {
    switch (type) {
      case 'encouragement': return 'border-l-red-500 bg-red-50 dark:bg-red-900/20';
      case 'challenge': return 'border-l-orange-500 bg-orange-50 dark:bg-orange-900/20';
      case 'celebration': return 'border-l-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
      case 'tip': return 'border-l-blue-500 bg-blue-50 dark:bg-blue-900/20';
    }
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Motivation Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {motivationMetrics.map((metric) => (
          <Card key={metric.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-sm">{metric.name}</span>
                {metric.trend === 'up' && <TrendingUp className="h-3 w-3 text-green-500" />}
              </div>
              <div className="text-2xl font-bold mb-1">
                {metric.value}{metric.unit === '%' ? '%' : metric.unit === 'days' ? 'd' : metric.unit}
              </div>
              <div className="text-xs text-muted-foreground">
                Target: {metric.target}{metric.unit === '%' ? '%' : metric.unit === 'days' ? 'd' : metric.unit}
              </div>
              {metric.unit === '%' && (
                <Progress value={metric.value} className="h-1 mt-2" />
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Current Streak */}
      <Card className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Flame className="h-6 w-6 text-orange-500" />
                <h3 className="font-semibold">Current Learning Streak</h3>
              </div>
              <div className="text-3xl font-bold text-orange-600 mb-1">12 Days</div>
              <p className="text-muted-foreground">Your longest streak this year!</p>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold">18 days</div>
              <div className="text-xs text-muted-foreground">to beat your record</div>
              <Button size="sm" className="mt-2">
                <Zap className="h-3 w-3 mr-1" />
                Keep Going
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">This Week's Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2 mb-4">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
              <div key={day} className="text-center">
                <div className="text-xs font-medium mb-1">{day}</div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${
                  index < 5 ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {index < 5 ? '✓' : '○'}
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <div className="text-sm text-muted-foreground">5/7 days completed</div>
            <Progress value={71} className="h-2 mt-2" />
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button className="h-16 flex-col gap-1">
          <Target className="h-5 w-5" />
          <span>Set Daily Goal</span>
        </Button>
        <Button variant="outline" className="h-16 flex-col gap-1">
          <Calendar className="h-5 w-5" />
          <span>Schedule Learning</span>
        </Button>
        <Button variant="outline" className="h-16 flex-col gap-1">
          <Trophy className="h-5 w-5" />
          <span>View Challenges</span>
        </Button>
      </div>
    </div>
  );

  const renderAchievements = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Your Achievements</h3>
        <Badge variant="secondary">{recentAchievements.length} earned</Badge>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recentAchievements.map((achievement) => {
          const CategoryIcon = getCategoryIcon(achievement.category);
          return (
            <Card key={achievement.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <CategoryIcon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium">{achievement.title}</h4>
                      <Badge className={`text-xs ${getRarityColor(achievement.rarity)}`}>
                        {achievement.rarity}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {achievement.description}
                    </p>
                    <div className="text-xs text-muted-foreground">
                      Earned on {achievement.earnedDate}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Achievement Categories */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { name: 'Learning', icon: Lightbulb, count: 8 },
          { name: 'Consistency', icon: Flame, count: 5 },
          { name: 'Challenge', icon: Target, count: 3 },
          { name: 'Social', icon: MessageCircle, count: 2 }
        ].map((category) => {
          const Icon = category.icon;
          return (
            <Card key={category.name}>
              <CardContent className="p-4 text-center">
                <Icon className="h-6 w-6 mx-auto mb-2 text-primary" />
                <div className="font-medium">{category.name}</div>
                <div className="text-sm text-muted-foreground">{category.count} earned</div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );

  const renderCoach = () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Heart className="h-5 w-5 text-primary" />
        <h3 className="font-semibold">Your AI Learning Coach</h3>
      </div>
      
      {coachMessages.map((message) => {
        const MessageIcon = getMessageIcon(message.type);
        return (
          <Card key={message.id} className={`border-l-4 ${getMessageColor(message.type)}`}>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <MessageIcon className="h-5 w-5 text-primary mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm mb-2">{message.message}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {message.timestamp}
                    </span>
                    {message.action && (
                      <Button size="sm" variant="outline">
                        {message.action}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
      
      <Card className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="h-4 w-4 text-primary" />
            <h4 className="font-medium">Motivation Boost</h4>
          </div>
          <p className="text-sm mb-3">
            "Remember why you started. Every expert was once a beginner. Every winner was once a loser. 
            Every champion was once a contender that refused to give up."
          </p>
          <Button size="sm">
            <Heart className="h-3 w-3 mr-1" />
            Get Daily Motivation
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-primary" />
            AI Learning Motivation Coach
            <Badge variant="secondary">Personal Support</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Tab Navigation */}
          <div className="flex gap-2">
            {[
              { key: 'dashboard', label: 'Dashboard', icon: TrendingUp },
              { key: 'achievements', label: 'Achievements', icon: Trophy },
              { key: 'coach', label: 'AI Coach', icon: Heart }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <Button
                  key={tab.key}
                  variant={activeTab === tab.key ? 'default' : 'outline'}
                  onClick={() => setActiveTab(tab.key as any)}
                  className="gap-2"
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </Button>
              );
            })}
          </div>

          {/* Tab Content */}
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'achievements' && renderAchievements()}
          {activeTab === 'coach' && renderCoach()}
        </CardContent>
      </Card>
    </div>
  );
};
