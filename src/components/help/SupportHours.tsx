
import React from 'react';
import { Clock } from 'lucide-react';

export const SupportHours: React.FC = () => {
  return (
    <div className="text-center mt-12 p-6 bg-muted/30 rounded-lg">
      <Clock className="h-8 w-8 text-primary mx-auto mb-4" />
      <h3 className="text-lg font-semibold mb-2">Support Hours</h3>
      <p className="text-muted-foreground">
        Monday - Friday: 9:00 AM - 6:00 PM EST<br />
        Weekend: Emergency support only
      </p>
    </div>
  );
};
