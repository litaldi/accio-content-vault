
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Zap, ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

interface UpgradeNotificationProps {
  feature: string;
  currentPlan: string;
  usagePercent: number;
}

const UpgradeNotification: React.FC<UpgradeNotificationProps> = ({
  feature,
  currentPlan,
  usagePercent
}) => {
  return (
    <Card className="border-orange-200 bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-950/20 dark:to-yellow-950/20">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center flex-shrink-0">
            <Zap className="h-6 w-6 text-orange-600 dark:text-orange-400" />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-orange-900 dark:text-orange-100">
                You're running low on {feature}
              </h3>
              <Badge variant="outline" className="border-orange-300 text-orange-700 dark:text-orange-300">
                {currentPlan}
              </Badge>
            </div>
            
            <p className="text-sm text-orange-700 dark:text-orange-200 mb-4">
              You've used {usagePercent}% of your monthly {feature} quota. 
              Upgrade to Pro for unlimited access and premium features.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild className="gap-2">
                <Link to="/pricing">
                  <Star className="h-4 w-4" />
                  Upgrade to Pro
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              
              <Button variant="outline" asChild>
                <Link to="/pricing">
                  View Plans
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UpgradeNotification;
