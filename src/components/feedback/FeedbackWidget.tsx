
import React, { useState } from 'react';
import { MessageSquare, Send, Star, ThumbsUp, ThumbsDown, X } from 'lucide-react';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import { EnhancedCard, EnhancedCardContent, EnhancedCardHeader, EnhancedCardTitle } from '@/components/ui/enhanced-card';
import { EnhancedInput } from '@/components/ui/enhanced-input';
import { Textarea } from '@/components/ui/textarea';
import { useEnhancedToast } from './ToastEnhancer';
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
  const { showSuccess, showError } = useEnhancedToast();

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
      
      showSuccess(
        'Thank you for your feedback!',
        'Your input helps us improve the experience.'
      );
      
      // Reset form
      setIsOpen(false);
      setStep('rating');
      setRating(0);
      setFeedback('');
      setEmail('');
    } catch (error) {
      showError(
        'Failed to submit feedback',
        'Please try again or contact support.'
      );
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
            <EnhancedButton
              onClick={() => setIsOpen(true)}
              variant="default"
              size="lg"
              className="rounded-full w-14 h-14 shadow-2xl hover:shadow-3xl"
              leftIcon={<MessageSquare className="h-5 w-5" />}
              aria-label="Give feedback"
            />
          ) : (
            <EnhancedCard className="w-80 shadow-2xl border-2">
              <EnhancedCardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <EnhancedCardTitle className="text-lg">Share your feedback</EnhancedCardTitle>
                <EnhancedButton
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="h-6 w-6"
                >
                  <X className="h-4 w-4" />
                </EnhancedButton>
              </EnhancedCardHeader>
              
              <EnhancedCardContent className="space-y-4">
                {step === 'rating' && showRating ? (
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      How was your experience?
                    </p>
                    
                    {/* Quick rating buttons */}
                    <div className="flex gap-2">
                      <EnhancedButton
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuickRating('positive')}
                        className="flex-1"
                        leftIcon={<ThumbsUp className="h-4 w-4" />}
                      >
                        Good
                      </EnhancedButton>
                      <EnhancedButton
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuickRating('negative')}
                        className="flex-1"
                        leftIcon={<ThumbsDown className="h-4 w-4" />}
                      >
                        Needs work
                      </EnhancedButton>
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
                      <EnhancedButton
                        variant="outline"
                        size="sm"
                        onClick={() => setStep('rating')}
                        className="flex-1"
                      >
                        Back
                      </EnhancedButton>
                      <EnhancedButton
                        onClick={() => handleSubmit()}
                        loading={isSubmitting}
                        size="sm"
                        className="flex-1"
                        leftIcon={<Send className="h-4 w-4" />}
                      >
                        Send
                      </EnhancedButton>
                    </div>
                  </div>
                )}
              </EnhancedCardContent>
            </EnhancedCard>
          )}
        </div>
      </>
    );
  }

  // Inline variant
  return (
    <EnhancedCard className={cn("max-w-md", className)}>
      <EnhancedCardHeader>
        <EnhancedCardTitle>We'd love your feedback</EnhancedCardTitle>
      </EnhancedCardHeader>
      <EnhancedCardContent>
        {/* Similar content but adapted for inline use */}
        <div className="space-y-4">
          <Textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="How can we improve your experience?"
            rows={4}
          />
          <EnhancedButton
            onClick={() => handleSubmit()}
            loading={isSubmitting}
            className="w-full"
            leftIcon={<Send className="h-4 w-4" />}
          >
            Send Feedback
          </EnhancedButton>
        </div>
      </EnhancedCardContent>
    </EnhancedCard>
  );
};
