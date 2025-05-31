
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Eye, Lock, FileText, Users, Globe } from 'lucide-react';

const PrivacyPolicy = () => {
  const lastUpdated = '2024-01-15';

  const sections = [
    {
      icon: FileText,
      title: 'Information We Collect',
      content: `We collect information you provide directly to us, such as when you create an account, use our services, or contact us for support. This includes:

• Account information (name, email address, password)
• Content you upload or create (documents, notes, collections)
• Usage data (how you interact with our service)
• Device information (browser type, operating system)
• Communication data (support requests, feedback)`
    },
    {
      icon: Eye,
      title: 'How We Use Your Information',
      content: `We use the information we collect to:

• Provide, maintain, and improve our services
• Process transactions and send related information
• Send technical notices, updates, and security alerts
• Respond to your comments, questions, and customer service requests
• Communicate about products, services, and promotional offers
• Monitor and analyze trends, usage, and activities`
    },
    {
      icon: Users,
      title: 'Information Sharing',
      content: `We do not sell, trade, or otherwise transfer your personal information to third parties except in the following circumstances:

• With your explicit consent
• To comply with legal obligations
• To protect our rights and safety
• With service providers who assist in our operations (under strict confidentiality agreements)
• In connection with a business transfer or acquisition`
    },
    {
      icon: Lock,
      title: 'Data Security',
      content: `We implement appropriate technical and organizational measures to protect your personal information:

• Encryption in transit and at rest using AES-256
• Regular security audits and vulnerability assessments
• Access controls and authentication requirements
• Secure data centers with redundant backups
• SOC 2 Type II compliance
• Employee training on data protection practices`
    },
    {
      icon: Globe,
      title: 'Data Retention',
      content: `We retain your information for as long as necessary to provide our services and fulfill the purposes outlined in this policy:

• Account information: Until account deletion plus 30 days
• Content data: Until deletion by user or account termination
• Usage logs: 12 months for performance optimization
• Support communications: 3 years for quality assurance
• Legal compliance data: As required by applicable law`
    },
    {
      icon: Shield,
      title: 'Your Rights',
      content: `Depending on your location, you may have the following rights regarding your personal information:

• Access: Request a copy of your personal data
• Correction: Update or correct inaccurate information
• Deletion: Request deletion of your personal data
• Portability: Receive your data in a machine-readable format
• Objection: Object to certain processing activities
• Restriction: Request limitation of processing`
    }
  ];

  return (
    <>
      <Helmet>
        <title>Privacy Policy - Accio</title>
        <meta name="description" content="Learn how Accio protects your privacy and handles your personal information. Our commitment to data security and user privacy." />
      </Helmet>

      <main className="min-h-screen bg-background">
        {/* Header */}
        <section className="py-24 bg-gradient-to-br from-primary/5 to-blue-600/5">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-12">
              <Shield className="h-16 w-16 text-primary mx-auto mb-6" />
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Privacy Policy
              </h1>
              <p className="text-xl text-muted-foreground">
                Your privacy is important to us. This policy explains how we collect, 
                use, and protect your information.
              </p>
              <p className="text-sm text-muted-foreground mt-4">
                Last updated: {new Date(lastUpdated).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <Card className="border-0 shadow-lg mb-12">
              <CardHeader>
                <CardTitle className="text-2xl">Our Commitment to Privacy</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <p className="text-muted-foreground leading-relaxed">
                  At Accio, we believe that privacy is a fundamental right. This Privacy Policy 
                  explains how we collect, use, disclose, and safeguard your information when you 
                  use our knowledge management platform. We are committed to protecting your personal 
                  information and being transparent about our data practices.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  By using Accio, you agree to the collection and use of information in accordance 
                  with this policy. If you have any questions about this Privacy Policy, please 
                  contact us.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Policy Sections */}
        <section className="py-16 bg-muted/20">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="space-y-8">
              {sections.map((section, index) => (
                <Card key={index} className="border-0 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <section.icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{section.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-gray max-w-none">
                      <div className="text-muted-foreground whitespace-pre-line leading-relaxed">
                        {section.content}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* International Transfers */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">International Data Transfers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-gray max-w-none">
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Your information may be transferred to and processed in countries other than 
                    your country of residence. These countries may have different data protection 
                    laws than your country.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    When we transfer your personal information internationally, we implement 
                    appropriate safeguards to protect your information, including:
                  </p>
                  <ul className="text-muted-foreground space-y-2 mt-4">
                    <li>• Standard Contractual Clauses approved by the European Commission</li>
                    <li>• Adequacy decisions by relevant data protection authorities</li>
                    <li>• Other legally approved transfer mechanisms</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Children's Privacy */}
        <section className="py-16 bg-muted/20">
          <div className="container mx-auto px-4 max-w-4xl">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">Children's Privacy</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-gray max-w-none">
                  <p className="text-muted-foreground leading-relaxed">
                    Accio is not intended for use by children under the age of 13. We do not 
                    knowingly collect personal information from children under 13. If you become 
                    aware that a child has provided us with personal information, please contact us 
                    immediately. If we discover that a child under 13 has provided us with personal 
                    information, we will take steps to delete such information.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Changes to Policy */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">Changes to This Privacy Policy</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-gray max-w-none">
                  <p className="text-muted-foreground leading-relaxed">
                    We may update this Privacy Policy from time to time. We will notify you of any 
                    changes by posting the new Privacy Policy on this page and updating the "last 
                    updated" date. For significant changes, we may also send you an email notification.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mt-4">
                    You are advised to review this Privacy Policy periodically for any changes. 
                    Changes to this Privacy Policy are effective when they are posted on this page.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-6">Questions About Our Privacy Policy?</h2>
            <p className="text-xl mb-8 opacity-90">
              If you have any questions about this Privacy Policy or our data practices, 
              we're here to help.
            </p>
            <div className="space-y-4">
              <p className="opacity-90">
                <strong>Email:</strong> privacy@accio.app
              </p>
              <p className="opacity-90">
                <strong>Address:</strong> 123 Innovation St, San Francisco, CA 94105
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default PrivacyPolicy;
