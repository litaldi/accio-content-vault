
import React, { useState } from 'react';
import UnifiedPageLayout from '@/components/layout/UnifiedPageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  CheckCircle,
  Globe,
  Users,
  Headphones
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Message sent successfully!",
      description: "We'll get back to you within 24 hours.",
      action: <CheckCircle className="h-4 w-4" />,
    });
    
    setFormData({
      name: '',
      email: '',
      company: '',
      subject: '',
      message: ''
    });
    setIsSubmitting(false);
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Support",
      description: "Get help via email",
      contact: "support@accio.app",
      availability: "24/7 response",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat with our team",
      contact: "Available in-app",
      availability: "Mon-Fri 9AM-6PM PST",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Call us directly",
      contact: "+1 (555) 123-4567",
      availability: "Business hours only",
      color: "from-purple-500 to-pink-500"
    }
  ];

  const offices = [
    {
      city: "San Francisco",
      address: "123 Innovation Drive, Suite 100",
      timezone: "PST",
      phone: "+1 (555) 123-4567"
    },
    {
      city: "New York",
      address: "456 Tech Avenue, Floor 15",
      timezone: "EST",
      phone: "+1 (555) 987-6543"
    },
    {
      city: "London",
      address: "789 Knowledge Street, Building A",
      timezone: "GMT",
      phone: "+44 20 1234 5678"
    }
  ];

  const supportTypes = [
    { icon: Users, title: "Sales Inquiry", description: "Learn about our plans and pricing" },
    { icon: Headphones, title: "Technical Support", description: "Get help with your account or features" },
    { icon: Globe, title: "Partnership", description: "Explore collaboration opportunities" },
    { icon: MessageCircle, title: "General Question", description: "Any other questions or feedback" }
  ];

  return (
    <UnifiedPageLayout
      title="Contact Us - Get in Touch | Accio"
      description="Get in touch with our team for support, sales inquiries, or general questions. We're here to help you succeed with Accio."
    >
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-primary/5 via-background to-background">
        <div className="container text-center">
          <Badge variant="outline" className="mb-6">
            <MessageCircle className="h-3 w-3 mr-1" />
            Get in Touch
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            We'd love to hear from you
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Have questions about Accio? Need help getting started? Want to explore partnerships? 
            Our team is here to help you succeed.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">How can we help you today?</h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {contactMethods.map((method, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all group cursor-pointer">
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 rounded-lg bg-gradient-to-r ${method.color} flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                    <method.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">{method.title}</CardTitle>
                  <CardDescription>{method.description}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="font-semibold text-primary mb-2">{method.contact}</p>
                  <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {method.availability}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Support Types */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {supportTypes.map((type, index) => (
              <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <type.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">{type.title}</h3>
                  <p className="text-sm text-muted-foreground">{type.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Send us a message</h2>
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          required
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          required
                          className="mt-2"
                        />
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="company">Company</Label>
                        <Input
                          id="company"
                          value={formData.company}
                          onChange={(e) => setFormData({...formData, company: e.target.value})}
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="subject">Subject *</Label>
                        <Input
                          id="subject"
                          value={formData.subject}
                          onChange={(e) => setFormData({...formData, subject: e.target.value})}
                          required
                          className="mt-2"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        required
                        rows={6}
                        className="mt-2 resize-none"
                        placeholder="Tell us how we can help you..."
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full" 
                      size="lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        "Sending..."
                      ) : (
                        <>
                          Send Message
                          <Send className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Office Locations */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Our offices</h2>
              <div className="space-y-6">
                {offices.map((office, index) => (
                  <Card key={index} className="border-0 shadow-sm">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <MapPin className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-2">{office.city}</h3>
                          <p className="text-muted-foreground mb-2">{office.address}</p>
                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {office.timezone}
                            </div>
                            <div className="flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              {office.phone}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Quick Stats */}
              <Card className="border-0 shadow-sm mt-8">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Response times</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Email support</span>
                      <span className="font-medium">< 24 hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Live chat</span>
                      <span className="font-medium">< 5 minutes</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Phone support</span>
                      <span className="font-medium">Immediate</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ CTA */}
      <section className="py-16">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Looking for quick answers?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Check out our comprehensive help center with guides, tutorials, and FAQs.
          </p>
          <Button size="lg" variant="outline" asChild>
            <a href="/help">
              Visit Help Center
            </a>
          </Button>
        </div>
      </section>
    </UnifiedPageLayout>
  );
};

export default Contact;
