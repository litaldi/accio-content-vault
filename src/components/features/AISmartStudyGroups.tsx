
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Users, 
  Brain, 
  Star, 
  Clock,
  MessageCircle,
  Target,
  TrendingUp,
  Award,
  Plus,
  Settings
} from 'lucide-react';

interface StudyGroup {
  id: string;
  name: string;
  topic: string;
  members: number;
  maxMembers: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  matchScore: number;
  nextSession: string;
  activeNow: boolean;
  description: string;
  tags: string[];
}

interface GroupMember {
  id: string;
  name: string;
  avatar?: string;
  level: string;
  contribution: number;
  online: boolean;
}

export const AISmartStudyGroups: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'discover' | 'my-groups' | 'create'>('discover');
  
  const [suggestedGroups] = useState<StudyGroup[]>([
    {
      id: '1',
      name: 'Advanced React Patterns Study Circle',
      topic: 'React Development',
      members: 8,
      maxMembers: 12,
      level: 'advanced',
      matchScore: 94,
      nextSession: 'Tomorrow, 7:00 PM',
      activeNow: true,
      description: 'Deep dive into advanced React patterns, hooks, and performance optimization',
      tags: ['React', 'JavaScript', 'Frontend', 'Performance']
    },
    {
      id: '2',
      name: 'Machine Learning Fundamentals',
      topic: 'Artificial Intelligence',
      members: 15,
      maxMembers: 20,
      level: 'intermediate',
      matchScore: 87,
      nextSession: 'Friday, 6:30 PM',
      activeNow: false,
      description: 'Learn ML algorithms, data preprocessing, and model evaluation together',
      tags: ['Machine Learning', 'Python', 'Data Science', 'Algorithms']
    },
    {
      id: '3',
      name: 'System Design Interview Prep',
      topic: 'Software Engineering',
      members: 6,
      maxMembers: 10,
      level: 'advanced',
      matchScore: 91,
      nextSession: 'Sunday, 3:00 PM',
      activeNow: false,
      description: 'Practice system design problems and share solutions',
      tags: ['System Design', 'Architecture', 'Scalability', 'Interviews']
    }
  ]);

  const [myGroups] = useState<StudyGroup[]>([
    suggestedGroups[0],
    {
      id: '4',
      name: 'TypeScript Best Practices',
      topic: 'Programming Languages',
      members: 5,
      maxMembers: 8,
      level: 'intermediate',
      matchScore: 100,
      nextSession: 'Today, 8:00 PM',
      activeNow: true,
      description: 'Master TypeScript advanced features and patterns',
      tags: ['TypeScript', 'JavaScript', 'Types', 'Best Practices']
    }
  ]);

  const [groupMembers] = useState<GroupMember[]>([
    {
      id: '1',
      name: 'Alex Chen',
      level: 'Advanced',
      contribution: 92,
      online: true
    },
    {
      id: '2',
      name: 'Sarah Kim',
      level: 'Intermediate',
      contribution: 88,
      online: true
    },
    {
      id: '3',
      name: 'Marcus Johnson',
      level: 'Advanced',
      contribution: 95,
      online: false
    }
  ]);

  const getLevelColor = (level: StudyGroup['level']) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
    }
  };

  const renderDiscoverTab = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">AI-Recommended Study Groups</h3>
        <Badge variant="secondary">Smart Matching</Badge>
      </div>
      
      {suggestedGroups.map((group) => (
        <Card key={group.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-medium">{group.name}</h4>
                  {group.activeNow && (
                    <Badge variant="default" className="text-xs">
                      Live Now
                    </Badge>
                  )}
                  <Badge className={`text-xs ${getLevelColor(group.level)}`}>
                    {group.level}
                  </Badge>
                </div>
                
                <p className="text-sm text-muted-foreground mb-2">{group.description}</p>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                  <span className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {group.members}/{group.maxMembers} members
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {group.nextSession}
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {group.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="text-right ml-4">
                <div className="flex items-center gap-1 mb-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm font-medium">{group.matchScore}%</span>
                </div>
                <div className="text-xs text-muted-foreground mb-3">AI Match</div>
                <Button size="sm">
                  <Plus className="h-3 w-3 mr-1" />
                  Join Group
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderMyGroupsTab = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">My Study Groups</h3>
        <Button size="sm" variant="outline">
          <Settings className="h-3 w-3 mr-1" />
          Manage
        </Button>
      </div>
      
      {myGroups.map((group) => (
        <Card key={group.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-medium">{group.name}</h4>
                  {group.activeNow && (
                    <Badge variant="default" className="text-xs">
                      Live Now
                    </Badge>
                  )}
                </div>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <span className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {group.members} members
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {group.nextSession}
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  {groupMembers.slice(0, 3).map((member) => (
                    <div key={member.id} className="flex items-center gap-1">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-xs">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      {member.online && (
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                      )}
                    </div>
                  ))}
                  <span className="text-xs text-muted-foreground">+{group.members - 3} more</span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <MessageCircle className="h-3 w-3 mr-1" />
                  Chat
                </Button>
                <Button size="sm">
                  {group.activeNow ? 'Join Session' : 'View Details'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      
      {/* Group Performance */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Award className="h-4 w-4 text-primary" />
            <h4 className="font-medium">Your Group Performance</h4>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-bold">94%</div>
              <div className="text-xs text-muted-foreground">Participation</div>
            </div>
            <div>
              <div className="text-lg font-bold">87</div>
              <div className="text-xs text-muted-foreground">Contribution Score</div>
            </div>
            <div>
              <div className="text-lg font-bold">12</div>
              <div className="text-xs text-muted-foreground">Sessions Attended</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            AI Smart Study Groups
            <Badge variant="secondary">Collaborative Learning</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Tab Navigation */}
          <div className="flex gap-2">
            {[
              { key: 'discover', label: 'Discover Groups', icon: TrendingUp },
              { key: 'my-groups', label: 'My Groups', icon: Users },
              { key: 'create', label: 'Create Group', icon: Plus }
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
          {activeTab === 'discover' && renderDiscoverTab()}
          {activeTab === 'my-groups' && renderMyGroupsTab()}
          {activeTab === 'create' && (
            <div className="text-center py-8">
              <Plus className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-medium mb-2">Create a New Study Group</h3>
              <p className="text-muted-foreground mb-4">Start a collaborative learning journey with like-minded learners</p>
              <Button>Create Group</Button>
            </div>
          )}

          {/* AI Matching Insights */}
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Brain className="h-4 w-4 text-primary" />
                <h4 className="font-medium">AI Matching Intelligence</h4>
              </div>
              <ul className="space-y-1 text-sm">
                <li>• Groups matched based on your learning style and pace</li>
                <li>• AI considers your skill level and learning goals</li>
                <li>• Real-time compatibility scoring with group members</li>
                <li>• Optimal group size recommendations for maximum engagement</li>
              </ul>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};
