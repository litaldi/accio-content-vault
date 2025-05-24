
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Upload, Share2, Download, Zap, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface QuickActionsPanelProps {
  onQuickAction: (action: string) => void;
}

const QuickActionsPanel: React.FC<QuickActionsPanelProps> = ({ onQuickAction }) => {
  const navigate = useNavigate();

  const quickActions = [
    {
      id: 'save-content',
      label: 'Save Content',
      description: 'Add new article, video, or note',
      icon: Plus,
      primary: true,
      action: () => navigate('/save')
    },
    {
      id: 'bulk-import',
      label: 'Bulk Import',
      description: 'Upload multiple files',
      icon: Upload,
      action: () => onQuickAction('bulk-import')
    },
    {
      id: 'share-collection',
      label: 'Share Collection',
      description: 'Share with team',
      icon: Share2,
      action: () => onQuickAction('share-collection')
    },
    {
      id: 'export-data',
      label: 'Export Data',
      description: 'Download your content',
      icon: Download,
      action: () => onQuickAction('export-data')
    }
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Zap className="h-5 w-5 text-primary" />
          Quick Actions
          <Badge variant="secondary" className="ml-auto text-xs">
            4 shortcuts
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {quickActions.map((action) => (
            <Button
              key={action.id}
              variant={action.primary ? "default" : "outline"}
              onClick={action.action}
              className="h-auto p-4 flex flex-col items-start gap-1 hover:scale-105 transition-transform"
            >
              <div className="flex items-center gap-2 w-full">
                <action.icon className="h-4 w-4" />
                <span className="font-medium text-sm">{action.label}</span>
              </div>
              <span className="text-xs text-muted-foreground text-left">
                {action.description}
              </span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActionsPanel;
