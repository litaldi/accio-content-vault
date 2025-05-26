
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
    });
  }, [title, description, toast]);

  return null;
};

export default ActionFeedback;
