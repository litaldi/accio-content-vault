
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import EnhancedUnifiedLayout from '@/components/layout/EnhancedUnifiedLayout';
import { UnifiedTypography, UnifiedSpacing } from '@/components/ui/unified-design-system';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Mail, MessageSquare, HelpCircle, Send } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
      });

      // Reset form
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      toast({
        title: "Error sending message",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const contactOptions = [
    {
      title: "General Support",
      description: "Questions about features, pricing, or your account",
      icon: HelpCircle,
      email: "support@accio.app"
    },
    {
      title: "Technical Issues",
      description: "Bug reports, technical problems, or integration help",
      icon: MessageSquare,
      email: "tech@accio.app"
    },
    {
      title: "Business Inquiries",
      description: "Partnerships, press, or enterprise solutions",
      icon: Mail,
      email: "business@accio.app"
    }
  ];

  return (
    <EnhancedUnifiedLayout>
      <Helmet>
        <title>Contact Us - Accio Knowledge Library</title>
        <meta name="description" content="Get in touch with our team for support, questions, or feedback about Accio." />
      </Helmet>

      <UnifiedSpacing.Section>
        <UnifiedSpacing.Container>
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <UnifiedTypography.H1>Get in Touch</UnifiedTypography.H1>
              <UnifiedTypography.Lead>
                Have a question or need help? We're here to assist you.
              </UnifiedTypography.Lead>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Contact Options */}
              <div className="lg:col-span-1 space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-4">How can we help?</h3>
                  <div className="space-y-4">
                    {contactOptions.map((option, index) => (
                      <Card key={index} className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                            <option.icon className="h-5 w-5 text-primary" />
                          </div>
                          <div className="space-y-1">
                            <h4 className="font-medium text-sm">{option.title}</h4>
                            <p className="text-xs text-muted-foreground">{option.description}</p>
                            <a 
                              href={`mailto:${option.email}`}
                              className="text-xs text-primary hover:underline"
                            >
                              {option.email}
                            </a>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Response Time */}
                <Card className="p-4 bg-muted/50">
                  <h4 className="font-medium text-sm mb-2">Response Time</h4>
                  <p className="text-xs text-muted-foreground">
                    We typically respond within 24 hours during business days. 
                    For urgent technical issues, we aim to respond within 4 hours.
                  </p>
                </Card>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Send us a Message</CardTitle>
                    <CardDescription>
                      Fill out the form below and we'll get back to you as soon as possible.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="name" className="text-sm font-medium">
                            Name <span className="text-destructive">*</span>
                          </label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            required
                            placeholder="Your full name"
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="email" className="text-sm font-medium">
                            Email <span className="text-destructive">*</span>
                          </label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            required
                            placeholder="your@email.com"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="subject" className="text-sm font-medium">
                          Subject <span className="text-destructive">*</span>
                        </label>
                        <Input
                          id="subject"
                          value={formData.subject}
                          onChange={(e) => handleInputChange('subject', e.target.value)}
                          required
                          placeholder="What's this about?"
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-medium">
                          Message <span className="text-destructive">*</span>
                        </label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) => handleInputChange('message', e.target.value)}
                          required
                          placeholder="Tell us more about your question or issue..."
                          rows={6}
                        />
                      </div>

                      <Button 
                        type="submit" 
                        size="lg" 
                        className="w-full" 
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          'Sending...'
                        ) : (
                          <>
                            <Send className="h-4 w-4 mr-2" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </UnifiedSpacing.Container>
      </UnifiedSpacing.Section>
    </EnhancedUnifiedLayout>
  );
};

export default Contact;
