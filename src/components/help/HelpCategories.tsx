
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Book, Video, Search, MessageCircle, ArrowRight } from 'lucide-react';

const helpCategories = [
  {
    icon: Book,
    title: 'Getting Started',
    description: 'Learn the basics of using Accio to organize your knowledge',
    link: '/help/getting-started'
  },
  {
    icon: Search,
    title: 'Search & Discovery',
    description: 'Master AI-powered search and content discovery features',
    link: '/help/search'
  },
  {
    icon: Video,
    title: 'Video Tutorials',
    description: 'Watch step-by-step guides and best practices',
    link: '/help/tutorials'
  },
  {
    icon: MessageCircle,
    title: 'FAQ',
    description: 'Find answers to frequently asked questions',
    link: '/help/faq'
  }
];

export const HelpCategories: React.FC = () => {
  return (
    <div className="mb-16">
      <h2 className="text-2xl font-bold mb-8 text-center">Browse Help Topics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {helpCategories.map((category, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="text-center">
              <category.icon className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle className="text-lg">{category.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center mb-4">
                {category.description}
              </CardDescription>
              <Button variant="outline" className="w-full" asChild>
                <a href={category.link}>
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
