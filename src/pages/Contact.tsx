
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Typography, Layout, Card } from '@/components/design-system/DesignSystem';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { 
  Mail, 
  MessageSquare, 
  Clock, 
  MapPin, 
  Phone,
  Send,
  CheckCircle
} from 'lucide-react';

const Contact: React.FC = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
    inquiryType: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast({
      title: "Message sent successfully!",
      description: "We'll get back to you within 24 hours.",
    });

    setFormData({
      name: '',
      email: '',
      company: '',
      subject: '',
      message: '',
      inquiryType: ''
    });
    setIsSubmitting(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Get help from our support team',
      contact: 'support@accio.com',
      availability: '24/7 response'
    },
    {
      icon: MessageSquare,
      title: 'Live Chat',
      description: 'Chat with our team in real-time',
      contact: 'Available in app',
      availability: 'Mon-Fri, 9AM-6PM PST'
    },
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Speak directly with our experts',
      contact: '+1 (555) 123-4567',
      availability: 'Mon-Fri, 9AM-6PM PST'
    }
  ];

  const officeLocations = [
    {
      city: 'San Francisco',
      address: '123 Innovation Drive, Suite 100, San Francisco, CA 94105',
      timezone: 'Pacific Time'
    },
    {
      city: 'New York',
      address: '456 Tech Avenue, Floor 25, New York, NY 10001',
      timezone: 'Eastern Time'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Contact Us - Accio</title>
        <meta name="description" content="Get in touch with the Accio team for support or partnership opportunities." />
      </Helmet>

      {/* Hero Section */}
      <Layout.Section spacing="default" background="primary">
        <Layout.Container size="lg" className="text-center">
          <Typography.H1 className="mb-4">Get in Touch</Typography.H1>
          <Typography.Lead className="max-w-2xl mx-auto">
            Have questions about Accio? Need help getting started? Our team is here to help you 
            build your knowledge empire.
          </Typography.Lead>
        </Layout.Container>
      </Layout.Section>

      <Layout.Section spacing="lg">
        <Layout.Container size="lg">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <Typography.H2 className="mb-6">Send us a message</Typography.H2>
              
              <Card.Root>
                <Card.Content className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          required
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          required
                          placeholder="john@company.com"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="company">Company</Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                        placeholder="Your Company"
                      />
                    </div>

                    <div>
                      <Label htmlFor="inquiryType">Type of Inquiry</Label>
                      <Select onValueChange={(value) => handleInputChange('inquiryType', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select inquiry type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General Question</SelectItem>
                          <SelectItem value="support">Technical Support</SelectItem>
                          <SelectItem value="sales">Sales Inquiry</SelectItem>
                          <SelectItem value="partnership">Partnership</SelectItem>
                          <SelectItem value="feedback">Feature Request</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => handleInputChange('subject', e.target.value)}
                        required
                        placeholder="How can we help you?"
                      />
                    </div>

                    <div>
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        required
                        placeholder="Tell us more about your inquiry..."
                        rows={5}
                      />
                    </div>

                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>Sending...</>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </Card.Content>
              </Card.Root>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <Typography.H2 className="mb-6">Other ways to reach us</Typography.H2>
                
                <div className="space-y-6">
                  {contactMethods.map((method, index) => (
                    <Card.Root key={index}>
                      <Card.Content className="p-4">
                        <div className="flex items-start gap-4">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <method.icon className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <Typography.H3 className="text-lg mb-1">{method.title}</Typography.H3>
                            <Typography.Body className="text-sm text-muted-foreground mb-2">
                              {method.description}
                            </Typography.Body>
                            <Typography.Body className="font-medium">{method.contact}</Typography.Body>
                            <Typography.Body className="text-sm text-muted-foreground">
                              {method.availability}
                            </Typography.Body>
                          </div>
                        </div>
                      </Card.Content>
                    </Card.Root>
                  ))}
                </div>
              </div>

              {/* Office Locations */}
              <div>
                <Typography.H2 className="mb-6">Our Offices</Typography.H2>
                
                <div className="space-y-4">
                  {officeLocations.map((office, index) => (
                    <Card.Root key={index}>
                      <Card.Content className="p-4">
                        <div className="flex items-start gap-3">
                          <MapPin className="h-5 w-5 text-primary mt-1" />
                          <div>
                            <Typography.H3 className="text-lg mb-1">{office.city}</Typography.H3>
                            <Typography.Body className="text-sm text-muted-foreground mb-1">
                              {office.address}
                            </Typography.Body>
                            <Typography.Body className="text-sm text-muted-foreground">
                              {office.timezone}
                            </Typography.Body>
                          </div>
                        </div>
                      </Card.Content>
                    </Card.Root>
                  ))}
                </div>
              </div>

              {/* FAQ Link */}
              <Card.Root>
                <Card.Content className="p-6 text-center">
                  <Typography.H3 className="mb-2">Need help right away?</Typography.H3>
                  <Typography.Body className="text-muted-foreground mb-4">
                    Check out our help center for instant answers to common questions.
                  </Typography.Body>
                  <Button variant="outline" className="w-full">
                    Visit Help Center
                  </Button>
                </Card.Content>
              </Card.Root>
            </div>
          </div>
        </Layout.Container>
      </Layout.Section>

      {/* Response Time */}
      <Layout.Section spacing="default" background="muted">
        <Layout.Container size="default" className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Clock className="h-6 w-6 text-primary" />
            <Typography.H3>Quick Response Times</Typography.H3>
          </div>
          <Typography.Body className="text-muted-foreground">
            We typically respond to all inquiries within 24 hours. For urgent technical issues, 
            our support team is available via live chat during business hours.
          </Typography.Body>
        </Layout.Container>
      </Layout.Section>
    </div>
  );
};

export default Contact;
