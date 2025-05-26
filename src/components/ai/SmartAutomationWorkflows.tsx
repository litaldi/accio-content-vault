
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
  Plus,
  Clock,
  Target,
  Filter,
  Bell,
  Mail,
  Calendar,
  RefreshCw
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AutomationRule {
  id: string;
  name: string;
  description: string;
  trigger: string;
  action: string;
  enabled: boolean;
  frequency: 'immediate' | 'daily' | 'weekly';
  lastRun?: Date;
  runsCount: number;
}

interface SmartAutomationWorkflowsProps {
  className?: string;
}

export const SmartAutomationWorkflows: React.FC<SmartAutomationWorkflowsProps> = ({ className }) => {
  const [workflows, setWorkflows] = useState<AutomationRule[]>([
    {
      id: '1',
      name: 'Auto-Tag New Content',
      description: 'Automatically tag incoming content based on AI analysis',
      trigger: 'New content saved',
      action: 'Apply smart tags',
      enabled: true,
      frequency: 'immediate',
      lastRun: new Date(Date.now() - 2 * 60 * 60 * 1000),
      runsCount: 47
    },
    {
      id: '2',
      name: 'Weekly Learning Digest',
      description: 'Send summary of unread content and learning progress',
      trigger: 'Every Monday 9 AM',
      action: 'Send email digest',
      enabled: true,
      frequency: 'weekly',
      lastRun: new Date(Date.now() - 24 * 60 * 60 * 1000),
      runsCount: 12
    },
    {
      id: '3',
      name: 'Smart Content Cleanup',
      description: 'Archive old, untagged content automatically',
      trigger: 'Content older than 3 months',
      action: 'Archive and suggest tags',
      enabled: false,
      frequency: 'weekly',
      runsCount: 0
    }
  ]);
  
  const [isCreating, setIsCreating] = useState(false);
  const { toast } = useToast();

  const toggleWorkflow = (id: string) => {
    setWorkflows(prev => prev.map(workflow => 
      workflow.id === id 
        ? { ...workflow, enabled: !workflow.enabled }
        : workflow
    ));
    
    const workflow = workflows.find(w => w.id === id);
    toast({
      title: workflow?.enabled ? "Workflow Disabled" : "Workflow Enabled",
      description: `${workflow?.name} has been ${workflow?.enabled ? 'disabled' : 'enabled'}.`,
    });
  };

  const runWorkflow = async (id: string) => {
    const workflow = workflows.find(w => w.id === id);
    if (!workflow) return;

    setWorkflows(prev => prev.map(w => 
      w.id === id 
        ? { ...w, lastRun: new Date(), runsCount: w.runsCount + 1 }
        : w
    ));

    toast({
      title: "Workflow Executed",
      description: `${workflow.name} has been run successfully.`,
    });
  };

  const createNewWorkflow = async () => {
    setIsCreating(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newWorkflow: AutomationRule = {
        id: Date.now().toString(),
        name: 'Custom Workflow',
        description: 'A new automation workflow',
        trigger: 'Custom trigger',
        action: 'Custom action',
        enabled: false,
        frequency: 'daily',
        runsCount: 0
      };

      setWorkflows(prev => [newWorkflow, ...prev]);
      
      toast({
        title: "Workflow Created!",
        description: "New automation workflow has been created.",
      });
    } finally {
      setIsCreating(false);
    }
  };

  const getFrequencyColor = (frequency: string) => {
    switch (frequency) {
      case 'immediate': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'daily': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      default: return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
    }
  };

  const formatLastRun = (date?: Date) => {
    if (!date) return 'Never';
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${Math.floor(diffHours / 24)}d ago`;
  };

  return (
    <div className={className}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            Smart Automation Workflows
            <Badge variant="secondary">Intelligent</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Create New Workflow */}
          <div className="flex items-center justify-between p-4 border border-dashed border-muted-foreground/25 rounded-lg">
            <div>
              <h3 className="font-medium">Create New Workflow</h3>
              <p className="text-sm text-muted-foreground">Automate repetitive tasks with AI-powered rules</p>
            </div>
            <Button
              onClick={createNewWorkflow}
              disabled={isCreating}
              className="gap-2"
            >
              {isCreating ? (
                <>
                  <div className="w-4 h-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                  Creating...
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4" />
                  Create
                </>
              )}
            </Button>
          </div>

          {/* Active Workflows */}
          <div className="space-y-4">
            <h3 className="font-medium">Your Automation Workflows</h3>
            {workflows.map((workflow) => (
              <Card key={workflow.id} className={`${workflow.enabled ? 'ring-1 ring-primary/20' : ''}`}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-medium">{workflow.name}</h4>
                        <Badge className={getFrequencyColor(workflow.frequency)} variant="outline">
                          {workflow.frequency}
                        </Badge>
                        {workflow.enabled && (
                          <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-950">
                            Active
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{workflow.description}</p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div className="flex items-center gap-2">
                          <Target className="h-3 w-3 text-muted-foreground" />
                          <span><strong>Trigger:</strong> {workflow.trigger}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Zap className="h-3 w-3 text-muted-foreground" />
                          <span><strong>Action:</strong> {workflow.action}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span><strong>Last run:</strong> {formatLastRun(workflow.lastRun)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <RefreshCw className="h-3 w-3 text-muted-foreground" />
                          <span><strong>Runs:</strong> {workflow.runsCount}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end gap-2">
                      <Switch
                        checked={workflow.enabled}
                        onCheckedChange={() => toggleWorkflow(workflow.id)}
                      />
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => runWorkflow(workflow.id)}
                          className="gap-1"
                        >
                          <Play className="h-3 w-3" />
                          Run
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="gap-1"
                        >
                          <Settings className="h-3 w-3" />
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Workflow Templates */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm">Popular Workflow Templates</h4>
            <div className="grid gap-3">
              {[
                {
                  icon: Bell,
                  name: 'Smart Notifications',
                  description: 'Get notified about important content updates',
                  trigger: 'High-priority content detected'
                },
                {
                  icon: Mail,
                  name: 'Content Recommendations',
                  description: 'Daily personalized content suggestions',
                  trigger: 'Based on reading patterns'
                },
                {
                  icon: Calendar,
                  name: 'Learning Reminders',
                  description: 'Schedule review sessions for saved content',
                  trigger: 'Time-based scheduling'
                },
                {
                  icon: Filter,
                  name: 'Auto-Organization',
                  description: 'Automatically organize content into collections',
                  trigger: 'Content similarity analysis'
                }
              ].map((template, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 border border-muted-foreground/20 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                >
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <template.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h5 className="font-medium text-sm">{template.name}</h5>
                    <p className="text-xs text-muted-foreground">{template.description}</p>
                  </div>
                  <Button size="sm" variant="outline">
                    Use Template
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Automation Stats */}
          <div className="bg-gradient-to-r from-primary/5 to-blue-500/5 p-4 rounded-lg">
            <h4 className="font-medium mb-3">Automation Impact</h4>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">2.5h</div>
                <div className="text-xs text-muted-foreground">Time Saved</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">94%</div>
                <div className="text-xs text-muted-foreground">Accuracy</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">156</div>
                <div className="text-xs text-muted-foreground">Tasks Automated</div>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-orange-50 dark:bg-orange-950 p-3 rounded-lg text-sm">
            <h4 className="font-medium mb-1">⚡ Automation Tips:</h4>
            <ul className="text-muted-foreground space-y-1">
              <li>• Start with simple workflows and gradually add complexity</li>
              <li>• Monitor workflow performance and adjust triggers as needed</li>
              <li>• Use templates to quickly set up common automation patterns</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
