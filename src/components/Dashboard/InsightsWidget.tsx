
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, BarChart3, Eye, Target, Zap } from 'lucide-react';

interface Metric {
  id: string;
  label: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  trend?: 'up' | 'down' | 'neutral';
  description?: string;
}

interface InsightsWidgetProps {
  title: string;
  metrics: Metric[];
  onViewDetails: () => void;
}

const InsightsWidget: React.FC<InsightsWidgetProps> = ({
  title,
  metrics,
  onViewDetails
}) => {
  const getTrendIcon = (trend?: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-3 w-3 text-green-600" />;
      case 'down': return <TrendingDown className="h-3 w-3 text-red-600" />;
      default: return null;
    }
  };

  const getTrendColor = (trend?: string) => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            {title}
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onViewDetails}>
            <Eye className="h-4 w-4 mr-1" />
            Details
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {metrics.map((metric) => (
            <div key={metric.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{metric.label}</span>
                {metric.trend && (
                  <div className="flex items-center gap-1">
                    {getTrendIcon(metric.trend)}
                  </div>
                )}
              </div>
              
              <div className="space-y-1">
                <div className="text-2xl font-bold">{metric.value}</div>
                {metric.change !== undefined && (
                  <div className={`flex items-center gap-1 text-xs ${getTrendColor(metric.trend)}`}>
                    <span>{metric.change > 0 ? '+' : ''}{metric.change}%</span>
                    {metric.changeLabel && <span>{metric.changeLabel}</span>}
                  </div>
                )}
                {metric.description && (
                  <p className="text-xs text-muted-foreground">{metric.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Key Insights Section */}
        <div className="mt-6 pt-4 border-t">
          <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
            <Zap className="h-4 w-4 text-primary" />
            Key Insights
          </h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2 p-2 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
              <Target className="h-4 w-4 text-blue-600" />
              <span className="text-sm text-blue-700 dark:text-blue-400">
                Your content engagement is up 23% this week
              </span>
            </div>
            <div className="flex items-center gap-2 p-2 bg-green-50 dark:bg-green-950/20 rounded-lg">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span className="text-sm text-green-700 dark:text-green-400">
                Best performance on Tuesday afternoons
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InsightsWidget;
