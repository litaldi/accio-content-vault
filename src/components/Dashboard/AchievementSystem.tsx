
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Star, Target, Zap, BookOpen, Clock } from 'lucide-react';
import { SavedContent } from '@/types';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  progress: number;
  target: number;
  unlocked: boolean;
  unlockedAt?: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface AchievementSystemProps {
  content: SavedContent[];
  isVisible?: boolean;
}

const AchievementSystem: React.FC<AchievementSystemProps> = ({ 
  content, 
  isVisible = true 
}) => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [newUnlocks, setNewUnlocks] = useState<string[]>([]);

  const calculateAchievements = (contentList: SavedContent[]): Achievement[] => {
    const totalContent = contentList.length;
    const tagsCount = contentList.reduce((acc, item) => acc + item.tags.length, 0);
    const thisWeekContent = contentList.filter(item => {
      const itemDate = new Date(item.created_at);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return itemDate > weekAgo;
    }).length;

    const streakDays = calculateStreak(contentList);

    return [
      {
        id: 'first-save',
        title: 'Getting Started',
        description: 'Save your first piece of content',
        icon: <BookOpen className="h-4 w-4" />,
        progress: Math.min(totalContent, 1),
        target: 1,
        unlocked: totalContent >= 1,
        rarity: 'common'
      },
      {
        id: 'content-collector',
        title: 'Content Collector',
        description: 'Save 10 pieces of content',
        icon: <Target className="h-4 w-4" />,
        progress: Math.min(totalContent, 10),
        target: 10,
        unlocked: totalContent >= 10,
        rarity: 'common'
      },
      {
        id: 'knowledge-builder',
        title: 'Knowledge Builder',
        description: 'Save 50 pieces of content',
        icon: <Star className="h-4 w-4" />,
        progress: Math.min(totalContent, 50),
        target: 50,
        unlocked: totalContent >= 50,
        rarity: 'rare'
      },
      {
        id: 'tag-master',
        title: 'Tag Master',
        description: 'Accumulate 100 tags across all content',
        icon: <Trophy className="h-4 w-4" />,
        progress: Math.min(tagsCount, 100),
        target: 100,
        unlocked: tagsCount >= 100,
        rarity: 'epic'
      },
      {
        id: 'weekly-warrior',
        title: 'Weekly Warrior',
        description: 'Save 7 pieces of content in one week',
        icon: <Zap className="h-4 w-4" />,
        progress: Math.min(thisWeekContent, 7),
        target: 7,
        unlocked: thisWeekContent >= 7,
        rarity: 'rare'
      },
      {
        id: 'streak-starter',
        title: 'Streak Starter',
        description: 'Save content for 3 consecutive days',
        icon: <Clock className="h-4 w-4" />,
        progress: Math.min(streakDays, 3),
        target: 3,
        unlocked: streakDays >= 3,
        rarity: 'rare'
      }
    ];
  };

  const calculateStreak = (contentList: SavedContent[]): number => {
    const today = new Date();
    let streakDays = 0;
    
    for (let i = 0; i < 30; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(checkDate.getDate() - i);
      
      const hasContentOnDay = contentList.some(item => {
        const itemDate = new Date(item.created_at);
        return itemDate.toDateString() === checkDate.toDateString();
      });
      
      if (hasContentOnDay) {
        streakDays++;
      } else if (i > 0) {
        break;
      }
    }
    
    return streakDays;
  };

  useEffect(() => {
    const newAchievements = calculateAchievements(content);
    const previousAchievements = achievements;
    
    // Check for new unlocks
    const newlyUnlocked = newAchievements.filter(achievement => 
      achievement.unlocked && 
      !previousAchievements.find(prev => prev.id === achievement.id && prev.unlocked)
    );
    
    if (newlyUnlocked.length > 0) {
      setNewUnlocks(newlyUnlocked.map(a => a.id));
      // Clear new unlocks after 5 seconds
      setTimeout(() => setNewUnlocks([]), 5000);
    }
    
    setAchievements(newAchievements);
  }, [content]);

  const getRarityColor = (rarity: Achievement['rarity']) => {
    switch (rarity) {
      case 'common': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'rare': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'epic': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'legendary': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const unlockedAchievements = achievements.filter(a => a.unlocked);
  const nextAchievement = achievements.find(a => !a.unlocked && a.progress > 0);

  if (!isVisible || achievements.length === 0) return null;

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-sm flex items-center gap-2">
            <Trophy className="h-4 w-4 text-yellow-500" />
            Achievements
          </h3>
          <Badge variant="outline" className="text-xs">
            {unlockedAchievements.length}/{achievements.length}
          </Badge>
        </div>

        {/* Progress Summary */}
        <div className="mb-4">
          <div className="flex justify-between text-xs text-muted-foreground mb-1">
            <span>Progress</span>
            <span>{Math.round((unlockedAchievements.length / achievements.length) * 100)}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary rounded-full h-2 transition-all duration-500" 
              style={{ width: `${(unlockedAchievements.length / achievements.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Next Achievement */}
        {nextAchievement && (
          <div className="mb-4 p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              {nextAchievement.icon}
              <span className="font-medium text-sm">{nextAchievement.title}</span>
            </div>
            <p className="text-xs text-muted-foreground mb-2">{nextAchievement.description}</p>
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>Progress</span>
              <span>{nextAchievement.progress}/{nextAchievement.target}</span>
            </div>
            <div className="w-full bg-muted rounded-full h-1.5">
              <div 
                className="bg-primary rounded-full h-1.5 transition-all duration-500" 
                style={{ width: `${(nextAchievement.progress / nextAchievement.target) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Recent Unlocks */}
        {unlockedAchievements.slice(0, 3).map((achievement) => (
          <div 
            key={achievement.id} 
            className={`flex items-center gap-3 p-2 rounded-lg transition-all ${
              newUnlocks.includes(achievement.id) 
                ? 'bg-primary/10 border border-primary/20 animate-pulse' 
                : 'hover:bg-muted/30'
            }`}
          >
            <div className="text-yellow-500">{achievement.icon}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-medium text-xs">{achievement.title}</span>
                <Badge className={`text-xs h-4 px-1 ${getRarityColor(achievement.rarity)}`}>
                  {achievement.rarity}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-1">
                {achievement.description}
              </p>
            </div>
            {newUnlocks.includes(achievement.id) && (
              <Badge variant="outline" className="text-xs animate-bounce">
                New!
              </Badge>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default AchievementSystem;
