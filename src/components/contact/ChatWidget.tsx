
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Modal } from '@/components/ui/modal';
import { Badge } from '@/components/ui/badge';
import { 
  MessageCircle, 
  Send, 
  CheckCircle, 
  Paperclip, 
  X,
  Headphones
} from 'lucide-react';
import { useEnhancedToast } from '@/components/feedback/ToastEnhancer';
import { EnhancedLoading } from '@/components/ui/enhanced-loading';
import { cn } from '@/lib/utils';

interface ContactFormData {
  name: string;
  email: string;
  category: string;
  message: string;
}

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    category: 'general',
    message: ''
  });

  const { showSuccess, showError } = useEnhancedToast();

  const categories = [
    { value: 'general', label: 'General Question', icon: '💬' },
    { value: 'bug', label: 'Bug Report', icon: '🐛' },
    { value: 'feedback', label: 'Feedback', icon: '💡' },
    { value: 'feature', label: 'Feature Request', icon: '✨' },
    { value: 'support', label: 'Technical Support', icon: '🔧' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.message.trim()) {
      showError('Message Required', 'Please enter your message before sending.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsSuccess(true);
      showSuccess(
        'Message Sent Successfully!', 
        "Thank you for reaching out. We'll get back to you within 24 hours."
      );

      // Reset form after showing success
      setTimeout(() => {
        setFormData({ name: '', email: '', category: 'general', message: '' });
        setIsSuccess(false);
        setIsOpen(false);
      }, 3000);

    } catch (error) {
      showError(
        'Failed to Send Message', 
        'Please try again or contact us directly at support@accio.com'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const selectedCategory = categories.find(cat => cat.value === formData.category);

  if (isSuccess) {
    return (
      <Modal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        className="max-w-md"
      >
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-green-700 dark:text-green-300 mb-2">
            Message Sent Successfully!
          </h3>
          <p className="text-muted-foreground mb-4">
            Thank you for reaching out. We'll get back to you within 24 hours.
          </p>
          <Badge variant="outline" className="text-green-600 border-green-300">
            <CheckCircle className="h-3 w-3 mr-1" />
            We've got your message
          </Badge>
        </div>
      </Modal>
    );
  }

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className={cn(
            "h-14 w-14 rounded-full shadow-lg hover:shadow-xl",
            "bg-primary hover:bg-primary/90 text-primary-foreground",
            "transition-all duration-300 hover:scale-110",
            "group relative"
          )}
          aria-label="Open chat"
        >
          <MessageCircle className="h-6 w-6 group-hover:scale-110 transition-transform" />
          
          {/* Pulse animation */}
          <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20" />
          
          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-background border rounded-lg shadow-md text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            Need help? Chat with us
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-border" />
          </div>
        </Button>
      </div>

      {/* Chat Modal */}
      <Modal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        title="Contact Our Team"
        description="We're here to help! Send us a message and we'll get back to you shortly."
        className="max-w-md"
      >
        <div className="space-y-6">
          {/* Welcome Message */}
          <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="p-2 bg-blue-500 rounded-full">
              <Headphones className="h-4 w-4 text-white" />
            </div>
            <div>
              <h4 className="font-medium text-blue-900 dark:text-blue-100">
                👋 How can we help you today?
              </h4>
              <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                Send us a message and we'll respond within 24 hours
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field */}
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Your name"
                className="transition-all focus:ring-2 focus:ring-primary/20"
              />
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email">Email (optional)</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="your.email@company.com"
                className="transition-all focus:ring-2 focus:ring-primary/20"
              />
              <p className="text-xs text-muted-foreground">
                Leave your email if you'd like us to follow up
              </p>
            </div>

            {/* Category Selection */}
            <div className="space-y-2">
              <Label htmlFor="category">What's this about?</Label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.icon} {category.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Message Field */}
            <div className="space-y-2">
              <Label htmlFor="message">Message *</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                placeholder="Tell us what's on your mind..."
                rows={4}
                className="transition-all focus:ring-2 focus:ring-primary/20 resize-none"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || !formData.message.trim()}
                className="flex-1 gap-2"
              >
                {isSubmitting ? (
                  <EnhancedLoading state="loading" size="sm" />
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Send Message
                  </>
                )}
              </Button>
            </div>
          </form>

          {/* Footer */}
          <div className="pt-4 border-t text-center">
            <p className="text-xs text-muted-foreground">
              🔒 Your information is secure and will only be used to respond to your message
            </p>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ChatWidget;
