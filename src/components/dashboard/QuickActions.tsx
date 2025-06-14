
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Link, Upload, Search, BookOpen, Tags } from 'lucide-react';

interface QuickActionsProps {
  onAddContent: () => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({ onAddContent }) => {
  const actions = [
    {
      icon: Plus,
      label: 'Add Content',
      description: 'Save a new URL or upload a file',
      onClick: onAddContent,
      variant: 'default' as const,
    },
    {
      icon: Link,
      label: 'Save URL',
      description: 'Quick save from clipboard',
      onClick: () => {
        navigator.clipboard.readText().then(text => {
          if (text.startsWith('http')) {
            onAddContent();
          }
        });
      },
      variant: 'outline' as const,
    },
    {
      icon: Upload,
      label: 'Upload File',
      description: 'PDF, images, documents',
      onClick: onAddContent,
      variant: 'outline' as const,
    },
    {
      icon: Search,
      label: 'Advanced Search',
      description: 'Find specific content',
      onClick: () => console.log('Advanced search'),
      variant: 'outline' as const,
    },
    {
      icon: BookOpen,
      label: 'Collections',
      description: 'Organize your knowledge',
      onClick: () => console.log('Collections'),
      variant: 'outline' as const,
    },
    {
      icon: Tags,
      label: 'Manage Tags',
      description: 'Organize and clean up tags',
      onClick: () => console.log('Tags'),
      variant: 'outline' as const,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant={action.variant}
              className="h-auto p-4 flex flex-col items-center gap-2 text-center"
              onClick={action.onClick}
            >
              <action.icon className="h-5 w-5" />
              <div>
                <div className="font-medium text-sm">{action.label}</div>
                <div className="text-xs text-muted-foreground hidden md:block">
                  {action.description}
                </div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
