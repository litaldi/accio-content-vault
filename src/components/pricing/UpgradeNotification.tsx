
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Crown, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

interface UpgradeNotificationProps {
  feature: string;
  currentPlan: string;
  usagePercent?: number;
  onDismiss?: () => void;
}

const UpgradeNotification: React.FC<UpgradeNotificationProps> = ({
  feature,
  currentPlan,
  usagePercent,
  onDismiss,
}) => {
  const getUpgradeTarget = () => {
    switch (currentPlan) {
      case 'free':
        return { plan: 'Pro', icon: Zap, color: 'text-blue-600' };
      case 'pro':
        return { plan: 'Team', icon: Crown, color: 'text-purple-600' };
      default:
        return { plan: 'Enterprise', icon: Crown, color: 'text-orange-600' };
    }
  };

  const target = getUpgradeTarget();
  const TargetIcon = target.icon;

  return (
    <Alert className="border-primary/20 bg-primary/5">
      <TargetIcon className={`h-4 w-4 ${target.color}`} />
      <AlertTitle className="flex items-center gap-2">
        {usagePercent && usagePercent >= 80 ? 'Almost at your limit!' : 'Unlock more power'}
        <Badge variant="outline" className={target.color}>
          {currentPlan} → {target.plan}
        </Badge>
      </AlertTitle>
      <AlertDescription className="mt-2">
        <p className="mb-3">
          {usagePercent && usagePercent >= 80
            ? `You've used ${usagePercent}% of your ${feature} limit. Upgrade to ${target.plan} for unlimited access.`
            : `Get unlimited ${feature} and advanced features with ${target.plan}.`}
        </p>
        <div className="flex items-center gap-3">
          <Button size="sm" asChild>
            <Link to="/pricing" className="gap-2">
              <TargetIcon className="h-3 w-3" />
              Upgrade to {target.plan}
              <ArrowRight className="h-3 w-3" />
            </Link>
          </Button>
          {onDismiss && (
            <Button variant="ghost" size="sm" onClick={onDismiss}>
              Dismiss
            </Button>
          )}
        </div>
      </AlertDescription>
    </Alert>
  );
};

export default UpgradeNotification;
