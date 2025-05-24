
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Shield, 
  Lock, 
  Zap, 
  Globe, 
  Award, 
  Users,
  Clock,
  FileText
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const TrustSignalsSection: React.FC = () => {
  const trustSignals = [
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-level encryption and security protocols',
      badges: ['SOC 2 Compliant', 'GDPR Ready']
    },
    {
      icon: Lock,
      title: 'Data Protection',
      description: 'Your data is encrypted at rest and in transit',
      badges: ['256-bit Encryption', 'Zero Knowledge']
    },
    {
      icon: Zap,
      title: '99.99% Uptime',
      description: 'Reliable performance you can count on',
      badges: ['SLA Guarantee', 'Global CDN']
    },
    {
      icon: Globe,
      title: 'Global Compliance',
      description: 'Meets international privacy standards',
      badges: ['CCPA', 'Privacy Shield']
    }
  ];

  const performanceStats = [
    {
      icon: Users,
      number: '10,000+',
      label: 'Active Users',
      description: 'Trusted by professionals worldwide'
    },
    {
      icon: Clock,
      number: '99.99%',
      label: 'Uptime',
      description: 'Reliable service 24/7/365'
    },
    {
      icon: Award,
      number: '4.9/5',
      label: 'User Rating',
      description: 'Highest customer satisfaction'
    },
    {
      icon: FileText,
      number: '2M+',
      label: 'Items Organized',
      description: 'Helping teams stay organized'
    }
  ];

  return (
    <section className="py-20 lg:py-24 bg-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight mb-6">
            Enterprise-Grade Security & Performance
          </h2>
          <p className="text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto text-muted-foreground">
            Your data security and privacy are our top priorities. We maintain the highest standards of protection and compliance.
          </p>
        </div>

        {/* Trust Signals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {trustSignals.map((signal, index) => (
            <Card key={index} className="text-center border-border/50 bg-background/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                  <signal.icon className="h-6 w-6 text-primary" />
                </div>
                <p className="font-semibold mb-2">
                  {signal.title}
                </p>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {signal.description}
                </p>
                <div className="space-y-2">
                  {signal.badges.map((badge, badgeIndex) => (
                    <Badge key={badgeIndex} variant="outline" className="text-xs">
                      {badge}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Performance Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {performanceStats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <stat.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold leading-tight text-primary mb-2">
                {stat.number}
              </h3>
              <p className="font-semibold mb-2">
                {stat.label}
              </p>
              <p className="text-sm text-muted-foreground">
                {stat.description}
              </p>
            </div>
          ))}
        </div>

        {/* Security Certifications */}
        <div className="text-center bg-background/80 backdrop-blur-sm rounded-2xl border border-border/50 p-8">
          <h3 className="text-2xl sm:text-3xl font-bold leading-tight mb-4">
            Certified & Compliant
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            We maintain the highest standards of security and compliance to protect your data and ensure peace of mind.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              'SOC 2 Type II',
              'GDPR Compliant',
              'ISO 27001',
              'CCPA Ready',
              'Privacy Shield',
              'HIPAA Compatible'
            ].map((cert, index) => (
              <Badge key={index} variant="outline" className="px-4 py-2">
                {cert}
              </Badge>
            ))}
          </div>
        </div>

        {/* Money Back Guarantee */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-4 bg-green-50 border border-green-200 rounded-full px-6 py-3">
            <Shield className="h-5 w-5 text-green-600" />
            <p className="font-semibold text-green-800 mb-0">
              30-Day Money-Back Guarantee • No Questions Asked
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSignalsSection;
