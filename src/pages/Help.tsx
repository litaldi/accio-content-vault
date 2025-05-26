
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UnifiedLayout } from '@/components/layout/UnifiedLayout';
import { 
  BookOpen, 
  MessageCircle, 
  Video, 
  FileText,
  Mail,
  ExternalLink
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Help = () => {
  const navigate = useNavigate();

  const helpCategories = [
    {
      title: 'Getting Started',
      description: 'Learn the basics of using Accio',
      icon: BookOpen,
      color: 'bg-blue-500',
      topics: [
        'Creating your first account',
        'Saving your first content',
        'Understanding AI organization',
        'Basic search techniques'
      ]
    },
    {
      title: 'Video Tutorials',
      description: 'Watch step-by-step guides',
      icon: Video,
      color: 'bg-green-500',
      topics: [
        'Complete walkthrough (5 min)',
        'Advanced search tips',
        'Team collaboration features',
        'Mobile app usage'
      ]
    },
    {
      title: 'Knowledge Base',
      description: 'Detailed guides and documentation',
      icon: FileText,
      color: 'bg-purple-500',
      topics: [
        'Feature documentation',
        'Integration guides',
        'Troubleshooting',
        'Best practices'
      ]
    },
    {
      title: 'Community Support',
      description: 'Connect with other users',
      icon: MessageCircle,
      color: 'bg-orange-500',
      topics: [
        'User community forum',
        'Feature requests',
        'Tips and tricks',
        'Success stories'
      ]
    }
  ];

  return (
    <UnifiedLayout>
      <Helmet>
        <title>Help & Support - Accio</title>
        <meta name="description" content="Get help with Accio's knowledge management platform. Tutorials, guides, and support resources." />
      </Helmet>

      <div className="max-w-6xl mx-auto py-12 space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Help & Support</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to get the most out of your knowledge management journey with Accio.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="text-center cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/faq')}>
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">FAQ</h3>
              <p className="text-sm text-muted-foreground">Quick answers to common questions</p>
            </CardContent>
          </Card>

          <Card className="text-center cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Video className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Video Guides</h3>
              <p className="text-sm text-muted-foreground">Step-by-step video tutorials</p>
            </CardContent>
          </Card>

          <Card className="text-center cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Contact Us</h3>
              <p className="text-sm text-muted-foreground">Get personalized support</p>
            </CardContent>
          </Card>
        </div>

        {/* Help Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {helpCategories.map((category) => (
            <Card key={category.title}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center`}>
                    <category.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle>{category.title}</CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {category.topics.map((topic, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground cursor-pointer">
                      <ExternalLink className="h-3 w-3" />
                      {topic}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Section */}
        <Card className="text-center">
          <CardContent className="pt-8">
            <Mail className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-semibold mb-2">Need Personal Help?</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Our support team is ready to help you succeed with Accio. We typically respond within 2 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button>
                <Mail className="h-4 w-4 mr-2" />
                Email Support
              </Button>
              <Button variant="outline">
                Schedule a Call
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </UnifiedLayout>
  );
};

export default Help;
