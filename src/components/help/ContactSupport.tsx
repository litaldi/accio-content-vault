
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, MessageCircle, Phone } from 'lucide-react';

const contactMethods = [
  {
    icon: Mail,
    title: 'Email Support',
    description: 'Get help via email within 24 hours',
    action: 'Contact Support',
    href: 'mailto:support@accio.app'
  },
  {
    icon: MessageCircle,
    title: 'Live Chat',
    description: 'Chat with our support team in real-time',
    action: 'Start Chat',
    href: '#'
  },
  {
    icon: Phone,
    title: 'Phone Support',
    description: 'Speak with our team directly',
    action: 'Schedule Call',
    href: '#'
  }
];

export const ContactSupport: React.FC = () => {
  return (
    <div className="mb-16">
      <h2 className="text-2xl font-bold mb-8 text-center">Contact Support</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {contactMethods.map((method, index) => (
          <Card key={index} className="text-center">
            <CardHeader>
              <method.icon className="h-8 w-8 text-primary mx-auto mb-4" />
              <CardTitle className="text-lg">{method.title}</CardTitle>
              <CardDescription>{method.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" asChild>
                <a href={method.href}>
                  {method.action}
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
