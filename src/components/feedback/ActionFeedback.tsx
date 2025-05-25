
import React from 'react';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, AlertCircle, Info, XCircle } from 'lucide-react';

interface ActionFeedbackProps {
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  description?: string;
  actionable?: {
    label: string;
    action: () => void;
  };
}

const ActionFeedback: React.FC<ActionFeedbackProps> = ({ 
  type, 
  title, 
  description, 
  actionable 
}) => {
  const { toast } = useToast();

  React.useEffect(() => {
    toast({
      title: title,
      description: description,
      action: actionable ? {
        action: (
          <div 
            className="rounded-md bg-muted/50 px-3 py-2 text-sm font-medium cursor-pointer hover:bg-muted" 
            onClick={actionable.action}
          >
            {actionable.label}
          </div>
        )
      } : undefined,
    });
  }, [title, description, actionable, toast]);

  return null;
};

export default ActionFeedback;
