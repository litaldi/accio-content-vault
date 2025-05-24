
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart3, TrendingUp, Target, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { enhancedAnalyticsService, TagInsights } from '@/services/enhancedAnalyticsService';

interface DashboardStatsProps {
  tagStats: {
    confirmed: number;
    rejected: number;
  };
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ tagStats }) => {
  const [insights, setInsights] = useState<TagInsights | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Load enhanced tag insights
    const tagInsights = enhancedAnalyticsService.getTagInsights();
    setInsights(tagInsights);
  }, []);

  const confirmationRate = tagStats.confirmed + tagStats.rejected > 0 
    ? ((tagStats.confirmed / (tagStats.confirmed + tagStats.rejected)) * 100)
    : 0;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Quick Stats
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Tag Statistics */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-green-600" />
              <span className="text-sm">Confirmed Tags</span>
            </div>
            <span className="font-semibold text-green-600">{tagStats.confirmed}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-red-600" />
              <span className="text-sm">Rejected Tags</span>
            </div>
            <span className="font-semibold text-red-600">{tagStats.rejected}</span>
          </div>

          <div className="flex items-center justify-between border-t pt-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              <span className="text-sm">Accuracy Rate</span>
            </div>
            <span className="font-semibold text-primary">{confirmationRate.toFixed(1)}%</span>
          </div>
        </div>

        {/* Enhanced Insights Preview */}
        {insights && (
          <div className="border-t pt-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Total Tags</span>
              <span className="font-medium">{insights.totalTags}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Top Tag</span>
              <span className="font-medium">
                {insights.topConfirmedTags[0]?.name || 'None'}
              </span>
            </div>
          </div>
        )}

        {/* Progress Bar for Accuracy */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Tag Quality</span>
            <span className="font-medium">{confirmationRate.toFixed(0)}%</span>
          </div>
          <div className="w-full bg-secondary rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300" 
              style={{ width: `${Math.min(confirmationRate, 100)}%` }}
            />
          </div>
        </div>

        {/* Action Button */}
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full mt-4"
          onClick={() => navigate('/analytics')}
        >
          <Activity className="h-4 w-4 mr-2" />
          View Full Analytics
        </Button>
      </CardContent>
    </Card>
  );
};

export default DashboardStats;
