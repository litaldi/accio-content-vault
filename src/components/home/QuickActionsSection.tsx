
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Typography, Spacing } from '@/components/ui/design-system';
import { QuickCaptureModal } from '@/components/features/QuickCaptureModal';
import { 
  Plus, 
  Search, 
  Bookmark, 
  TrendingUp,
  ArrowRight
} from 'lucide-react';

const QuickActionsSection: React.FC = () => {
  const [showQuickCapture, setShowQuickCapture] = useState(false);

  const quickActions = [
    {
      title: 'Quick Capture',
      description: 'Save a URL, note, or file instantly',
      icon: Plus,
      action: () => setShowQuickCapture(true),
      color: 'bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200'
    },
    {
      title: 'Smart Search',
      description: 'Find anything with AI-powered search',
      icon: Search,
      action: () => console.log('Navigate to search'),
      color: 'bg-purple-50 hover:bg-purple-100 text-purple-700 border-purple-200'
    },
    {
      title: 'Browse Collections',
      description: 'Explore your organized knowledge',
      icon: Bookmark,
      action: () => console.log('Navigate to collections'),
      color: 'bg-green-50 hover:bg-green-100 text-green-700 border-green-200'
    },
    {
      title: 'View Analytics',
      description: 'Track your learning progress',
      icon: TrendingUp,
      action: () => console.log('Navigate to analytics'),
      color: 'bg-orange-50 hover:bg-orange-100 text-orange-700 border-orange-200'
    }
  ];

  return (
    <>
      <Spacing.Section sectionSize="md">
        <Spacing.Container>
          <div className="text-center mb-12">
            <Typography.H2>
              Start Building Your Knowledge Empire
            </Typography.H2>
            <Typography.Lead className="max-w-2xl mx-auto">
              Take action now and begin organizing your digital knowledge with these powerful tools
            </Typography.Lead>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <Card 
                key={index} 
                className={`cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 ${action.color}`}
                onClick={action.action}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-white/50 flex items-center justify-center">
                    <action.icon className="h-6 w-6" />
                  </div>
                  <Typography.H4 className="mb-2">
                    {action.title}
                  </Typography.H4>
                  <Typography.Body size="sm" className="mb-4 opacity-80">
                    {action.description}
                  </Typography.Body>
                  <ArrowRight className="h-4 w-4 mx-auto opacity-60" />
                </CardContent>
              </Card>
            ))}
          </div>
        </Spacing.Container>
      </Spacing.Section>

      <QuickCaptureModal 
        isOpen={showQuickCapture} 
        onClose={() => setShowQuickCapture(false)} 
      />
    </>
  );
};

export default QuickActionsSection;
