
import React from 'react';
import { Badge } from '@/components/ui/badge';

const SocialProofSection: React.FC = () => {
  const companies = [
    { name: 'TechFlow', logo: '🏢' },
    { name: 'CreativeHub', logo: '🎨' },
    { name: 'DataSync', logo: '📊' },
    { name: 'DesignLab', logo: '✨' },
    { name: 'CloudBase', logo: '☁️' },
    { name: 'StartupCo', logo: '🚀' },
    { name: 'InnovateLab', logo: '💡' },
    { name: 'TeamFlow', logo: '🤝' }
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
    <section className="py-16 border-b border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Company Logos */}
        <div className="text-center mb-12">
          <p className="text-muted-foreground mb-8 font-medium">
            Trusted by knowledge workers at leading companies
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {companies.map((company, index) => (
              <div key={index} className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
                <span className="text-2xl" aria-hidden="true">{company.logo}</span>
                <span className="text-lg font-semibold text-foreground/80">{company.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Press Mentions */}
        <div className="text-center mb-12">
          <p className="text-muted-foreground mb-6 font-medium">
            Featured in
          </p>
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
              <h3 className="text-2xl sm:text-3xl font-bold leading-tight text-primary">{stat.number}</h3>
              <p className="text-base leading-relaxed mb-4 text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;
