
import React, { useState } from 'react';
import { MessageSquare, Send, Star, ThumbsUp, ThumbsDown, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EnhancedInput } from '@/components/ui/enhanced-input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface FeedbackWidgetProps {
  className?: string;
  variant?: 'floating' | 'inline';
  showRating?: boolean;
}

export const FeedbackWidget: React.FC<FeedbackWidgetProps> = ({
  className,
  variant = 'floating',
  showRating = true
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<'rating' | 'feedback'>('rating');
  const [rating, setRating] = useState<number>(0);
  const [feedback, setFeedback] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleQuickRating = (type: 'positive' | 'negative') => {
    setRating(type === 'positive' ? 5 : 2);
    setStep('feedback');
  };

  const handleStarRating = (value: number) => {
    setRating(value);
    if (value >= 4) {
      // Skip to success for high ratings
      handleSubmit(value, '');
    } else {
      setStep('feedback');
    }
  };

  const handleSubmit = async (ratingValue = rating, feedbackValue = feedback) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: 'Thank you for your feedback!',
        description: 'Your input helps us improve the experience.'
      });
      
      // Reset form
      setIsOpen(false);
      setStep('rating');
      setRating(0);
      setFeedback('');
      setEmail('');
    } catch (error) {
      toast({
        title: 'Failed to submit feedback',
        description: 'Please try again or contact support.',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (variant === 'floating') {
    return (
      <>
        {/* Floating trigger button */}
        <div className={cn("fixed bottom-6 right-6 z-50", className)}>
          {!isOpen ? (
            <Button
              onClick={() => setIsOpen(true)}
              variant="default"
              size="lg"
              className="rounded-full w-14 h-14 shadow-2xl hover:shadow-3xl"
              aria-label="Give feedback"
            >
              <MessageSquare className="h-5 w-5" />
            </Button>
          ) : (
            <Card className="w-80 shadow-2xl border-2">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-lg">Share your feedback</CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="h-6 w-6"
                >
                  <X className="h-4 w-4" />
                </Button>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {step === 'rating' && showRating ? (
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      How was your experience?
                    </p>
                    
                    {/* Quick rating buttons */}
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuickRating('positive')}
                        className="flex-1"
                      >
                        <ThumbsUp className="h-4 w-4 mr-2" />
                        Good
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuickRating('negative')}
                        className="flex-1"
                      >
                        <ThumbsDown className="h-4 w-4 mr-2" />
                        Needs work
                      </Button>
                    </div>
                    
                    <div className="text-center">
                      <span className="text-xs text-muted-foreground">or rate with stars</span>
                    </div>
                    
                    {/* Star rating */}
                    <div className="flex justify-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => handleStarRating(star)}
                          className={cn(
                            "transition-colors hover:text-yellow-400",
                            star <= rating ? "text-yellow-400" : "text-muted-foreground"
                          )}
                        >
                          <Star className="h-6 w-6 fill-current" />
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">
                        Tell us more (optional)
                      </label>
                      <Textarea
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        placeholder="What could we improve?"
                        className="mt-1"
                        rows={3}
                      />
                    </div>
                    
                    <EnhancedInput
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email (optional)"
                      description="We'll only use this to follow up on your feedback"
                    />
                    
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setStep('rating')}
                        className="flex-1"
                      >
                        Back
                      </Button>
                      <Button
                        onClick={() => handleSubmit()}
                        disabled={isSubmitting}
                        size="sm"
                        className="flex-1"
                      >
                        <Send className="h-4 w-4 mr-2" />
                        Send
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </>
    );
  }

  // Inline variant
  return (
    <Card className={cn("max-w-md", className)}>
      <CardHeader>
        <CardTitle>We'd love your feedback</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Similar content but adapted for inline use */}
        <div className="space-y-4">
          <Textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="How can we improve your experience?"
            rows={4}
          />
          <Button
            onClick={() => handleSubmit()}
            disabled={isSubmitting}
            className="w-full"
          >
            <Send className="h-4 w-4 mr-2" />
            Send Feedback
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
