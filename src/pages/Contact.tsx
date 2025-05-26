
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Mail, 
  MessageCircle, 
  Phone, 
  MapPin,
  Clock,
  Send
} from 'lucide-react';

const Contact: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Contact form submitted');
  };

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Get help via email within 24 hours',
      contact: 'support@accio.com',
      action: 'Send Email'
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Chat with our support team in real-time',
      contact: 'Available 9 AM - 6 PM EST',
      action: 'Start Chat'
    },
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Speak directly with our experts',
      contact: '+1 (555) 123-4567',
      action: 'Call Now'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Contact Us - Accio | Get Help & Support</title>
        <meta name="description" content="Get in touch with the Accio team. We're here to help with questions, support, and feedback about your knowledge management journey." />
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We're here to help you make the most of your knowledge management journey. 
              Reach out with questions, feedback, or just to say hello.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="h-5 w-5" />
                  Send us a Message
                </CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" required />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea 
                      id="message" 
                      rows={6} 
                      required 
                      placeholder="Tell us how we can help you..."
                    />
                  </div>
                  
                  <Button type="submit" className="w-full">
                    Send Message
                    <Send className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Methods & Info */}
            <div className="space-y-8">
              {/* Contact Methods */}
              <div>
                <h2 className="text-2xl font-semibold mb-6">Other Ways to Reach Us</h2>
                <div className="space-y-4">
                  {contactMethods.map((method, index) => (
                    <Card key={index}>
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <method.icon className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold mb-1">{method.title}</h3>
                            <p className="text-sm text-muted-foreground mb-2">{method.description}</p>
                            <p className="text-sm font-medium mb-3">{method.contact}</p>
                            <Button variant="outline" size="sm">
                              {method.action}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Office Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Our Office
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="font-medium">Accio Headquarters</p>
                    <p className="text-sm text-muted-foreground">
                      123 Innovation Drive<br />
                      Tech City, TC 12345<br />
                      United States
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Monday - Friday, 9:00 AM - 6:00 PM EST</span>
                  </div>
                </CardContent>
              </Card>

              {/* FAQ Link */}
              <Card>
                <CardContent className="p-6 text-center">
                  <h3 className="font-semibold mb-2">Looking for Quick Answers?</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Check out our frequently asked questions for instant help.
                  </p>
                  <Button variant="outline">
                    View FAQ
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
