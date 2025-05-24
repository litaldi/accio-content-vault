
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, CheckCircle, XCircle } from 'lucide-react';
import { useOnboardingContext } from '@/contexts/OnboardingContext';

export const OnboardingSettings: React.FC = () => {
  const { completed, skipped, preferences, resetOnboarding } = useOnboardingContext();

  const handleRestart = () => {
    if (confirm('This will restart the onboarding flow. Are you sure?')) {
      resetOnboarding();
      // Refresh the page to trigger onboarding
      window.location.reload();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Onboarding Status
          {completed && <Badge variant="default" className="bg-green-100 text-green-800">Completed</Badge>}
          {skipped && <Badge variant="secondary">Skipped</Badge>}
          {!completed && !skipped && <Badge variant="outline">Not Started</Badge>}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Status */}
        <div className="flex items-center gap-3">
          {completed ? (
            <CheckCircle className="h-5 w-5 text-green-500" />
          ) : skipped ? (
            <XCircle className="h-5 w-5 text-orange-500" />
          ) : (
            <div className="h-5 w-5 rounded-full border-2 border-muted-foreground" />
          )}
          <span className="text-sm">
            {completed ? 'Onboarding completed' : skipped ? 'Onboarding skipped' : 'Onboarding not started'}
          </span>
        </div>

        {/* Preferences */}
        {preferences && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Your Preferences:</h4>
            <div className="text-sm text-muted-foreground space-y-1">
              {preferences.role && <p>Role: {preferences.role}</p>}
              {preferences.primaryGoal && <p>Goal: {preferences.primaryGoal}</p>}
              {preferences.contentTypes.length > 0 && (
                <p>Content Types: {preferences.contentTypes.join(', ')}</p>
              )}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="pt-4 border-t">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRestart}
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Restart Onboarding
          </Button>
          <p className="text-xs text-muted-foreground mt-2">
            This will reset your onboarding progress and preferences
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
