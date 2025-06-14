
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Send, 
  Mail, 
  MessageSquare, 
  Clock,
  Shield,
  CheckCircle
} from 'lucide-react';
import { useEnhancedToast } from '@/components/feedback/ToastEnhancer';
import { LoadingSpinner } from '@/components/ui/enhanced-loading';
import { 
  validateEmailEnhanced, 
  sanitizeInput, 
  contactRateLimiter,
  CSRFManager 
} from '@/utils/unified-security';

interface ContactFormData {
  name: string;
  email: string;
  company: string;
  category: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    company: '',
    category: 'general',
    message: ''
  });

  const { showSuccess, showError } = useEnhancedToast();

  const categories = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'sales', label: 'Sales & Pricing' },
    { value: 'support', label: 'Technical Support' },
    { value: 'partnership', label: 'Partnership' },
    { value: 'feedback', label: 'Product Feedback' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Rate limiting check
    const rateLimitCheck = contactRateLimiter.canAttempt('contact-form');
    if (!rateLimitCheck.allowed) {
      showError('Too Many Attempts', 'Please wait before submitting another message.');
      return;
    }

    // Validate required fields
    if (!formData.name || !formData.email || !formData.message) {
      showError('Required Fields Missing', 'Please fill in all required fields.');
      return;
    }

    // Validate email
    const emailValidation = validateEmailEnhanced(formData.email);
    if (!emailValidation.isValid) {
      showError('Invalid Email', emailValidation.message);
      return;
    }

    setIsSubmitting(true);

    try {
      // Sanitize inputs
      const sanitizedData = {
        name: sanitizeInput(formData.name, { maxLength: 100 }),
        email: formData.email.trim(),
        company: sanitizeInput(formData.company, { maxLength: 100 }),
        category: formData.category,
        message: sanitizeInput(formData.message, { maxLength: 2000 })
      };

      // Generate CSRF token
      const csrfToken = CSRFManager.generate();

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      showSuccess(
        'Message Sent Successfully!', 
        "Thank you for contacting us. We'll respond within 24 hours."
      );

      // Reset form
      setFormData({ name: '', email: '', company: '', category: 'general', message: '' });

    } catch (error) {
      showError(
        'Failed to Send Message', 
        'Please try again or email us directly at hello@accio.app'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Contact Form */}
      <Card className="enterprise-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <MessageSquare className="h-6 w-6 text-primary" />
            Send Us a Message
          </CardTitle>
          <p className="text-muted-foreground">
            We'd love to hear from you. Drop us a line and we'll get back to you shortly.
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contact-name">Full Name *</Label>
                <Input
                  id="contact-name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Your full name"
                  maxLength={100}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-email">Email Address *</Label>
                <Input
                  id="contact-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="your.email@company.com"
                  maxLength={254}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact-company">Company Name</Label>
              <Input
                id="contact-company"
                value={formData.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
                placeholder="Your company name"
                maxLength={100}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact-category">How Can We Help?</Label>
              <select
                id="contact-category"
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact-message">Your Message *</Label>
              <Textarea
                id="contact-message"
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                placeholder="Tell us how we can help you..."
                rows={5}
                maxLength={2000}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full gap-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <LoadingSpinner size="sm" />
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Send Message
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <div className="space-y-6">
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary mt-1" />
                <div>
                  <h4 className="font-medium">Email Support</h4>
                  <p className="text-sm text-muted-foreground">hello@accio.app</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    We typically respond within 24 hours.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-primary mt-1" />
                <div>
                  <h4 className="font-medium">Response Time</h4>
                  <p className="text-sm text-muted-foreground">
                    Business hours: Monday - Friday, 9 AM - 6 PM EST
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Emergency support available 24/7 for Enterprise customers.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-primary mt-1" />
                <div>
                  <h4 className="font-medium">Privacy & Security</h4>
                  <p className="text-sm text-muted-foreground">
                    Your information is encrypted and secure.
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    We never share your data with third parties.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              What to Expect
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Personalized response from our team</li>
              <li>• Follow-up if additional information is needed</li>
              <li>• Solutions tailored to your specific use case</li>
              <li>• Optional demo or consultation call</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContactForm;
