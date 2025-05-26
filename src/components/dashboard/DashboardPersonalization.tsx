
import React, { useState } from 'react';
import { Settings, Eye, EyeOff, GripVertical, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

interface DashboardWidget {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  order: number;
  size: 'small' | 'medium' | 'large';
}

interface DashboardPersonalizationProps {
  onLayoutChange?: (widgets: DashboardWidget[]) => void;
}

export const DashboardPersonalization: React.FC<DashboardPersonalizationProps> = ({
  onLayoutChange
}) => {
  const { toast } = useToast();
  const [widgets, setWidgets] = useState<DashboardWidget[]>([
    {
      id: 'recent-activity',
      name: 'Recent Activity',
      description: 'Your latest saved content and actions',
      enabled: true,
      order: 1,
      size: 'medium'
    },
    {
      id: 'quick-stats',
      name: 'Quick Stats',
      description: 'Overview of your content library',
      enabled: true,
      order: 2,
      size: 'small'
    },
    {
      id: 'recommendations',
      name: 'Content Recommendations',
      description: 'AI-suggested content based on your interests',
      enabled: true,
      order: 3,
      size: 'medium'
    },
    {
      id: 'achievements',
      name: 'Achievement System',
      description: 'Track your learning progress and milestones',
      enabled: false,
      order: 4,
      size: 'small'
    },
    {
      id: 'trending-topics',
      name: 'Trending Topics',
      description: 'Popular content in your network',
      enabled: false,
      order: 5,
      size: 'large'
    },
    {
      id: 'search-insights',
      name: 'Search Insights',
      description: 'Analytics on your search patterns',
      enabled: false,
      order: 6,
      size: 'medium'
    }
  ]);

  const toggleWidget = (widgetId: string) => {
    const updatedWidgets = widgets.map(widget =>
      widget.id === widgetId ? { ...widget, enabled: !widget.enabled } : widget
    );
    setWidgets(updatedWidgets);
    onLayoutChange?.(updatedWidgets);
    
    const widget = widgets.find(w => w.id === widgetId);
    toast({
      title: widget?.enabled ? 'Widget disabled' : 'Widget enabled',
      description: `${widget?.name} ${widget?.enabled ? 'hidden from' : 'added to'} dashboard`,
    });
  };

  const changeWidgetSize = (widgetId: string, size: 'small' | 'medium' | 'large') => {
    const updatedWidgets = widgets.map(widget =>
      widget.id === widgetId ? { ...widget, size } : widget
    );
    setWidgets(updatedWidgets);
    onLayoutChange?.(updatedWidgets);
  };

  const moveWidget = (widgetId: string, direction: 'up' | 'down') => {
    const currentIndex = widgets.findIndex(w => w.id === widgetId);
    if (
      (direction === 'up' && currentIndex === 0) ||
      (direction === 'down' && currentIndex === widgets.length - 1)
    ) {
      return;
    }

    const newWidgets = [...widgets];
    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    
    // Swap positions
    [newWidgets[currentIndex], newWidgets[targetIndex]] = 
    [newWidgets[targetIndex], newWidgets[currentIndex]];
    
    // Update order values
    newWidgets.forEach((widget, index) => {
      widget.order = index + 1;
    });

    setWidgets(newWidgets);
    onLayoutChange?.(newWidgets);
  };

  const resetToDefault = () => {
    const defaultWidgets = widgets.map((widget, index) => ({
      ...widget,
      enabled: index < 3, // Enable first 3 widgets by default
      order: index + 1,
      size: 'medium' as const
    }));
    
    setWidgets(defaultWidgets);
    onLayoutChange?.(defaultWidgets);
    
    toast({
      title: 'Dashboard reset',
      description: 'Your dashboard has been reset to default layout',
    });
  };

  const enabledWidgets = widgets.filter(w => w.enabled).sort((a, b) => a.order - b.order);
  const disabledWidgets = widgets.filter(w => !w.enabled);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Settings className="h-4 w-4" />
          Customize Dashboard
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Dashboard Personalization
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Dashboard Layout</h3>
              <p className="text-sm text-muted-foreground">
                Customize which widgets appear on your dashboard and their arrangement
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={resetToDefault}>
              Reset to Default
            </Button>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Enabled Widgets */}
            <div>
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <Eye className="h-4 w-4 text-green-600" />
                Active Widgets ({enabledWidgets.length})
              </h4>
              <div className="space-y-2">
                {enabledWidgets.map((widget, index) => (
                  <Card key={widget.id}>
                    <CardContent className="p-3">
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-4 w-4 p-0"
                            onClick={() => moveWidget(widget.id, 'up')}
                            disabled={index === 0}
                          >
                            ↑
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-4 w-4 p-0"
                            onClick={() => moveWidget(widget.id, 'down')}
                            disabled={index === enabledWidgets.length - 1}
                          >
                            ↓
                          </Button>
                        </div>
                        
                        <GripVertical className="h-4 w-4 text-muted-foreground" />
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm">{widget.name}</span>
                            <Badge variant="outline" className="text-xs">
                              {widget.size}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">{widget.description}</p>
                        </div>
                        
                        <div className="flex items-center gap-1">
                          <select
                            value={widget.size}
                            onChange={(e) => changeWidgetSize(widget.id, e.target.value as any)}
                            className="text-xs border rounded px-1 py-0.5"
                          >
                            <option value="small">Small</option>
                            <option value="medium">Medium</option>
                            <option value="large">Large</option>
                          </select>
                          
                          <Switch
                            checked={widget.enabled}
                            onCheckedChange={() => toggleWidget(widget.id)}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Disabled Widgets */}
            <div>
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <EyeOff className="h-4 w-4 text-gray-400" />
                Available Widgets ({disabledWidgets.length})
              </h4>
              <div className="space-y-2">
                {disabledWidgets.map((widget) => (
                  <Card key={widget.id} className="opacity-60">
                    <CardContent className="p-3">
                      <div className="flex items-center gap-3">
                        <Plus className="h-4 w-4 text-muted-foreground" />
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm">{widget.name}</span>
                            <Badge variant="secondary" className="text-xs">
                              Disabled
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">{widget.description}</p>
                        </div>
                        
                        <Switch
                          checked={widget.enabled}
                          onCheckedChange={() => toggleWidget(widget.id)}
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Preview */}
          <div>
            <h4 className="font-medium mb-3">Layout Preview</h4>
            <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
              <div className="grid grid-cols-12 gap-2 min-h-32">
                {enabledWidgets.map((widget) => (
                  <div
                    key={widget.id}
                    className={`bg-white dark:bg-gray-800 border rounded p-2 flex items-center justify-center text-xs font-medium ${
                      widget.size === 'small' ? 'col-span-4' :
                      widget.size === 'medium' ? 'col-span-6' : 'col-span-12'
                    }`}
                  >
                    {widget.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
