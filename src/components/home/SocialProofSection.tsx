
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Typography, Spacing } from '@/components/ui/design-system';

const SocialProofSection: React.FC = () => {
  const companies = [
    { name: 'Google', logo: '🏢' },
    { name: 'Microsoft', logo: '🏢' },
    { name: 'Netflix', logo: '🎬' },
    { name: 'Figma', logo: '🎨' },
    { name: 'Notion', logo: '📝' },
    { name: 'Slack', logo: '💬' },
    { name: 'Spotify', logo: '🎵' },
    { name: 'Airbnb', logo: '🏠' }
  ];

  const pressMentions = [
    { name: 'Product Hunt', badge: '#1 Product of the Day' },
    { name: 'TechCrunch', badge: 'Featured Startup' },
    { name: 'The Verge', badge: 'Editor\'s Choice' },
    { name: 'Fast Company', badge: 'Most Innovative' }
  ];

  const stats = [
    { number: '10K+', label: 'teams in 22 countries' },
    { number: '2M+', label: 'items organized' },
    { number: '99.9%', label: 'uptime guarantee' }
  ];

  return (
    <Spacing.Section size="md" className="border-b border-border/50">
      <Spacing.Container size="lg">
        {/* Company Logos */}
        <div className="text-center mb-12">
          <Typography.Body className="text-muted-foreground mb-8 font-medium">
            Trusted by knowledge workers at leading companies
          </Typography.Body>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {companies.map((company, index) => (
              <div key={index} className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
                <span className="text-2xl">{company.logo}</span>
                <span className="text-lg font-semibold text-foreground/80">{company.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Press Mentions */}
        <div className="text-center mb-12">
          <Typography.Body className="text-muted-foreground mb-6 font-medium">
            Featured in
          </Typography.Body>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {pressMentions.map((mention, index) => (
              <Badge key={index} variant="outline" className="px-4 py-2 text-sm">
                <span className="font-semibold">{mention.name}</span>
                <span className="mx-2">•</span>
                <span className="text-muted-foreground">{mention.badge}</span>
              </Badge>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="space-y-2">
              <Typography.H3 className="text-primary">{stat.number}</Typography.H3>
              <Typography.Body className="text-muted-foreground">{stat.label}</Typography.Body>
            </div>
          ))}
        </div>
      </Spacing.Container>
    </Spacing.Section>
  );
};

export default SocialProofSection;
