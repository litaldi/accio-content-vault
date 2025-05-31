
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Mail, Phone, MapPin, Clock, MessageCircle, Users, Building } from 'lucide-react';

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
    type: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    try {
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
        type: ''
      });
    } catch (error) {
      toast({
        title: "Error sending message",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email',
      description: 'Send us an email and we\'ll respond within 24 hours',
      value: 'hello@accio.app',
      action: 'mailto:hello@accio.app'
    },
    {
      icon: Phone,
      title: 'Phone',
      description: 'Call us during business hours for immediate assistance',
      value: '+1 (555) 123-4567',
      action: 'tel:+15551234567'
    },
    {
      icon: MapPin,
      title: 'Office',
      description: 'Visit our headquarters in San Francisco',
      value: '123 Innovation St, San Francisco, CA 94105',
      action: '#'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      description: 'Monday to Friday, 9 AM to 6 PM PST',
      value: 'Mon-Fri: 9 AM - 6 PM PST',
      action: '#'
    }
  ];

  const contactTypes = [
    {
      icon: MessageCircle,
      title: 'General Inquiry',
      description: 'Questions about features, pricing, or getting started'
    },
    {
      icon: Users,
      title: 'Sales',
      description: 'Interested in team or enterprise plans'
    },
    {
      icon: Building,
      title: 'Partnership',
      description: 'Explore integration or partnership opportunities'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Contact Us - Get in Touch with Accio</title>
        <meta name="description" content="Contact Accio for support, sales inquiries, or partnership opportunities. We're here to help you with your knowledge management needs." />
      </Helmet>

      <main className="min-h-screen bg-background">
        {/* Header */}
        <section className="py-24 bg-gradient-to-br from-primary/5 to-blue-600/5">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Get in{' '}
              <span className="text-primary">Touch</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Have questions? We'd love to hear from you. Send us a message and 
              we'll respond as soon as possible.
            </p>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-16 bg-muted/20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactMethods.map((method, index) => (
                <Card key={index} className="border-0 shadow-lg text-center hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <method.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{method.title}</CardTitle>
                    <CardDescription className="text-sm">
                      {method.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {method.action.startsWith('#') ? (
                      <p className="text-sm font-medium">{method.value}</p>
                    ) : (
                      <a 
                        href={method.action}
                        className="text-sm font-medium text-primary hover:underline"
                      >
                        {method.value}
                      </a>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-24">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Contact Types */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-6">What can we help you with?</h2>
                {contactTypes.map((type, index) => (
                  <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardHeader className="pb-4">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                          <type.icon className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{type.title}</CardTitle>
                          <CardDescription className="text-sm">
                            {type.description}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>

              {/* Form */}
              <div className="lg:col-span-2">
                <Card className="border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-2xl">Send us a message</CardTitle>
                    <CardDescription>
                      Fill out the form below and we'll get back to you as soon as possible.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Name *</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            placeholder="Your full name"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            placeholder="your@email.com"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="company">Company</Label>
                          <Input
                            id="company"
                            value={formData.company}
                            onChange={(e) => handleInputChange('company', e.target.value)}
                            placeholder="Your company name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="type">Inquiry Type</Label>
                          <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select inquiry type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="general">General Inquiry</SelectItem>
                              <SelectItem value="sales">Sales</SelectItem>
                              <SelectItem value="support">Technical Support</SelectItem>
                              <SelectItem value="partnership">Partnership</SelectItem>
                              <SelectItem value="press">Press & Media</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject *</Label>
                        <Input
                          id="subject"
                          value={formData.subject}
                          onChange={(e) => handleInputChange('subject', e.target.value)}
                          placeholder="Brief description of your inquiry"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Message *</Label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) => handleInputChange('message', e.target.value)}
                          placeholder="Tell us more about your inquiry..."
                          className="min-h-[120px]"
                          required
                        />
                      </div>

                      <Button 
                        type="submit" 
                        size="lg" 
                        className="w-full"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </Button>

                      <p className="text-xs text-muted-foreground text-center">
                        By submitting this form, you agree to our privacy policy and 
                        consent to receive communications from Accio.
                      </p>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Alternative Contact */}
        <section className="py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-6">Need immediate assistance?</h2>
            <p className="text-xl mb-8 opacity-90">
              For urgent matters or if you prefer to speak directly with our team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" asChild>
                <a href="mailto:hello@accio.app">
                  <Mail className="h-4 w-4 mr-2" />
                  Email Us Directly
                </a>
              </Button>
              <Button variant="outline" size="lg" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
                <a href="tel:+15551234567">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Now
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Contact;
