
import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface WelcomeBenefitsProps {
  userName?: string;
}

const WelcomeBenefits: React.FC<WelcomeBenefitsProps> = ({ userName }) => {
  const benefits = [
    'Unlimited content saving',
    'AI-powered organization',
    'Smart search & discovery',
    'Export to popular tools',
    'Mobile & web access',
  ];

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-primary">
          Welcome{userName ? ` ${userName}` : ''}! 🎉
        </CardTitle>
        <p className="text-muted-foreground">
          You now have access to all these powerful features:
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
              <span className="font-medium">{benefit}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WelcomeBenefits;
