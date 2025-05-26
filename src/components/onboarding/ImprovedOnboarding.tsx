
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { copy } from '@/utils/copy';

interface ImprovedOnboardingProps {
  onComplete?: () => void;
}

const ImprovedOnboarding: React.FC<ImprovedOnboardingProps> = ({ onComplete }) => {
  const steps = [
    {
      title: 'Welcome to Accio',
      description: 'Get started with your knowledge management journey',
      completed: true
    },
    {
      title: 'Set up your profile',
      description: 'Customize your account settings',
      completed: false
    },
    {
      title: 'Add your first content',
      description: 'Start building your knowledge base',
      completed: false
    }
  ];

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">{copy.onboarding.welcome}</h1>
        <p className="text-muted-foreground">{copy.onboarding.getStarted}</p>
      </div>

      <div className="space-y-6">
        {steps.map((step, index) => (
          <Card key={index} className={step.completed ? 'border-green-200 bg-green-50' : ''}>
            <CardHeader>
              <div className="flex items-center gap-3">
                {step.completed ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : (
                  <div className="h-5 w-5 rounded-full border-2 border-muted-foreground" />
                )}
                <CardTitle className="text-lg">{step.title}</CardTitle>
              </div>
              <CardDescription>{step.description}</CardDescription>
            </CardHeader>
            {!step.completed && (
              <CardContent>
                <Button size="sm">
                  Continue <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      <div className="text-center mt-8">
        <Button onClick={onComplete}>
          Complete Onboarding
        </Button>
      </div>
    </div>
  );
};

export default ImprovedOnboarding;
