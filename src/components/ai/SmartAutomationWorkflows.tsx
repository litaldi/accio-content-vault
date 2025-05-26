
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  Zap, 
  Play,
  Pause,
  Settings,
  CheckCircle,
  Clock,
  Tag,
  Bell,
  Filter,
  Send
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AutomationRule {
  id: string;
  name: string;
  description: string;
  trigger: string;
  action: string;
  isActive: boolean;
  executionCount: number;
  icon: React.ComponentType<{ className?: string }>;
}

interface SmartAutomationWorkflowsProps {
  className?: string;
}

export const SmartAutomationWorkflows: React.FC<SmartAutomationWorkflowsProps> = ({
  className
}) => {
  const [automations, setAutomations] = useState<AutomationRule[]>([
    {
      id: 'auto-tag',
      name: 'Smart Auto-Tagging',
      description: 'Automatically tag content based on AI analysis',
      trigger: 'When new content is saved',
      action: 'Apply relevant tags using AI',
      isActive: true,
      executionCount: 127,
      icon: Tag
    },
    {
      id: 'weekly-digest',
      name: 'Weekly Learning Digest',
      description: 'Compile and send weekly summary of saved content',
      trigger: 'Every Sunday at 6 PM',
      action: 'Generate and email content summary',
      isActive: true,
      executionCount: 8,
      icon: Send
    },
    {
      id: 'duplicate-filter',
      name: 'Duplicate Content Filter',
      description: 'Prevent saving duplicate or similar content',
      trigger: 'Before saving any content',
      action: 'Check for duplicates and warn user',
      isActive: false,
      executionCount: 23,
      icon: Filter
    },
    {
      id: 'reminder-system',
      name: 'Smart Reminders',
      description: 'Remind you to review saved content based on importance',
      trigger: 'Based on content priority and time',
      action: 'Send notification to review content',
      isActive: true,
      executionCount: 45,
      icon: Bell
    },
    {
      id: 'collection-organizer',
      name: 'Auto-Collection Organization',
      description: 'Automatically organize content into relevant collections',
      trigger: 'When content reaches threshold',
      action: 'Create collections and move content',
      isActive: false,
      executionCount: 12,
      icon: CheckCircle
    }
  ]);

  const { toast } = useToast();

  const toggleAutomation = (id: string) => {
    setAutomations(prev => 
      prev.map(automation => 
        automation.id === id 
          ? { ...automation, isActive: !automation.isActive }
          : automation
      )
    );

    const automation = automations.find(a => a.id === id);
    if (automation) {
      toast({
        title: `Automation ${automation.isActive ? 'Disabled' : 'Enabled'}`,
        description: `${automation.name} is now ${automation.isActive ? 'inactive' : 'active'}.`,
      });
    }
  };

  const executeNow = (id: string) => {
    const automation = automations.find(a => a.id === id);
    if (!automation) return;

    // Simulate execution
    setAutomations(prev => 
      prev.map(a => 
        a.id === id 
          ? { ...a, executionCount: a.executionCount + 1 }
          : a
      )
    );

    toast({
      title: "Automation Executed",
      description: `${automation.name} has been run successfully.`,
    });
  };

  const totalExecutions = automations.reduce((sum, auto) => sum + auto.executionCount, 0);
  const activeAutomations = automations.filter(auto => auto.isActive).length;

  return (
    <div className={className}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            Smart Automation Workflows
            <Badge variant="secondary">AI-Driven</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Overview Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{activeAutomations}</div>
              <div className="text-xs text-muted-foreground">Active Workflows</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{totalExecutions}</div>
              <div className="text-xs text-muted-foreground">Total Executions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">98%</div>
              <div className="text-xs text-muted-foreground">Success Rate</div>
            </div>
          </div>

          {/* Automation Rules */}
          <div className="space-y-4">
            <h3 className="font-medium">Available Automations</h3>
            <div className="space-y-3">
              {automations.map((automation) => (
                <Card key={automation.id} className={`transition-all duration-200 ${
                  automation.isActive ? 'border-primary/20 bg-primary/5' : ''
                }`}>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${
                            automation.isActive ? 'bg-primary/10' : 'bg-muted'
                          }`}>
                            <automation.icon className={`h-4 w-4 ${
                              automation.isActive ? 'text-primary' : 'text-muted-foreground'
                            }`} />
                          </div>
                          <div>
                            <h4 className="font-medium">{automation.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {automation.description}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {automation.executionCount} runs
                          </Badge>
                          <Switch
                            checked={automation.isActive}
                            onCheckedChange={() => toggleAutomation(automation.id)}
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="font-medium">Trigger: </span>
                          <span className="text-muted-foreground">{automation.trigger}</span>
                        </div>
                        <div>
                          <span className="font-medium">Action: </span>
                          <span className="text-muted-foreground">{automation.action}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between pt-2 border-t">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          Last run: 2 hours ago
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            disabled={!automation.isActive}
                            onClick={() => executeNow(automation.id)}
                          >
                            <Play className="h-3 w-3 mr-1" />
                            Run Now
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Settings className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950">
            <CardContent className="p-4">
              <h4 className="font-medium mb-3">🚀 Automation Benefits</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Save 2+ hours per week</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Consistent organization</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Never miss important content</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>AI-powered intelligence</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};
