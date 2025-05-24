
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Sparkles, TrendingUp, Clock } from 'lucide-react';

interface WelcomeHeaderProps {
  userName?: string;
  totalContent: number;
  recentActivity: number;
  onAddContent: () => void;
}

const WelcomeHeader: React.FC<WelcomeHeaderProps> = ({
  userName = "there",
  totalContent,
  recentActivity,
  onAddContent
}) => {
  const navigate = useNavigate();
  
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  const getMotivationalMessage = () => {
    if (totalContent === 0) return "Ready to start building your knowledge library?";
    if (totalContent < 10) return "Great start! Keep adding valuable content.";
    if (totalContent < 50) return "Your knowledge library is growing nicely!";
    return "Impressive collection! You're becoming a knowledge master.";
  };

  return (
    <div className="mb-8 space-y-6">
      {/* Welcome Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-3xl p-8 border border-primary/10">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/20 to-transparent rounded-bl-full -mr-16 -mt-16" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-primary/15 to-transparent rounded-tr-full -ml-12 -mb-12" />
        
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                {getGreeting()}, {userName}! 👋
              </h1>
              <p className="text-lg text-muted-foreground mb-4 max-w-2xl">
                {getMotivationalMessage()}
              </p>
              
              {/* Quick Stats */}
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2 bg-white/60 dark:bg-gray-800/60 rounded-full px-4 py-2 backdrop-blur-sm">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span className="font-medium">{totalContent} items saved</span>
                </div>
                {recentActivity > 0 && (
                  <div className="flex items-center gap-2 bg-white/60 dark:bg-gray-800/60 rounded-full px-4 py-2 backdrop-blur-sm">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="font-medium">{recentActivity} recent</span>
                  </div>
                )}
                <div className="flex items-center gap-2 bg-white/60 dark:bg-gray-800/60 rounded-full px-4 py-2 backdrop-blur-sm">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <span className="font-medium">Last active today</span>
                </div>
              </div>
            </div>
            
            {/* CTA Section */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={onAddContent}
                size="lg"
                className="group shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 px-8 py-4 text-lg font-semibold"
              >
                <Plus className="mr-2 h-5 w-5 transition-transform group-hover:rotate-90" />
                Add Content
                <Sparkles className="ml-2 h-4 w-4 opacity-70 group-hover:opacity-100 transition-opacity" />
              </Button>
              
              <Button
                variant="outline"
                onClick={() => navigate('/analytics')}
                size="lg"
                className="border-2 hover:border-primary/50 px-6 py-4 font-medium"
              >
                View Analytics
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Quick Actions Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="group cursor-pointer hover:shadow-md transition-all duration-300 border-2 hover:border-primary/30" onClick={() => navigate('/save')}>
          <CardContent className="p-4 text-center">
            <div className="w-12 h-12 mx-auto mb-3 bg-blue-500/10 rounded-full flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
              <Plus className="h-6 w-6 text-blue-500" />
            </div>
            <h3 className="font-semibold text-sm mb-1">Quick Save</h3>
            <p className="text-xs text-muted-foreground">Add new content</p>
          </CardContent>
        </Card>
        
        <Card className="group cursor-pointer hover:shadow-md transition-all duration-300 border-2 hover:border-primary/30" onClick={() => navigate('/collections')}>
          <CardContent className="p-4 text-center">
            <div className="w-12 h-12 mx-auto mb-3 bg-purple-500/10 rounded-full flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
              <Sparkles className="h-6 w-6 text-purple-500" />
            </div>
            <h3 className="font-semibold text-sm mb-1">Collections</h3>
            <p className="text-xs text-muted-foreground">Organize content</p>
          </CardContent>
        </Card>
        
        <Card className="group cursor-pointer hover:shadow-md transition-all duration-300 border-2 hover:border-primary/30">
          <CardContent className="p-4 text-center">
            <div className="w-12 h-12 mx-auto mb-3 bg-green-500/10 rounded-full flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
              <TrendingUp className="h-6 w-6 text-green-500" />
            </div>
            <h3 className="font-semibold text-sm mb-1">Recent</h3>
            <p className="text-xs text-muted-foreground">Latest additions</p>
          </CardContent>
        </Card>
        
        <Card className="group cursor-pointer hover:shadow-md transition-all duration-300 border-2 hover:border-primary/30" onClick={() => navigate('/analytics')}>
          <CardContent className="p-4 text-center">
            <div className="w-12 h-12 mx-auto mb-3 bg-orange-500/10 rounded-full flex items-center justify-center group-hover:bg-orange-500/20 transition-colors">
              <Clock className="h-6 w-6 text-orange-500" />
            </div>
            <h3 className="font-semibold text-sm mb-1">Insights</h3>
            <p className="text-xs text-muted-foreground">Usage patterns</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WelcomeHeader;
