
import React from 'react';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, AlertCircle, Info, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ActionFeedbackProps {
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  description?: string;
  duration?: number;
  actionable?: {
    label: string;
    action: () => void;
  };
}

const ActionFeedback: React.FC<ActionFeedbackProps> = ({ 
  type, 
  title, 
  description, 
  duration = 4000,
  actionable 
}) => {
  const { toast } = useToast();

  const icons = {
    success: CheckCircle,
    error: XCircle,
    warning: AlertCircle,
    info: Info
  };

  const Icon = icons[type];

  React.useEffect(() => {
    toast({
      title: (
        <div className="flex items-center gap-2">
          <Icon className={cn(
            "h-4 w-4",
            type === 'success' && "text-green-500",
            type === 'error' && "text-destructive",
            type === 'warning' && "text-yellow-500",
            type === 'info' && "text-primary"
          )} />
          <span>{title}</span>
        </div>
      ),
      description: description,
      duration: duration,
      action: actionable ? (
        <div 
          className="rounded-md bg-muted/50 px-3 py-2 text-sm font-medium cursor-pointer hover:bg-muted" 
          onClick={actionable.action}
        >
          {actionable.label}
        </div>
      ) : undefined,
    });
  }, []);

  return null;
};

export default ActionFeedback;
