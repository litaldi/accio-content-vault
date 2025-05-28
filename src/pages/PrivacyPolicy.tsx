
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Lock, Eye, UserCheck } from 'lucide-react';

const PrivacyPolicy = () => {
  const lastUpdated = 'January 1, 2024';

  const sections = [
    {
      title: 'Information We Collect',
      icon: Eye,
      content: [
        {
          subtitle: 'Information You Provide',
          text: 'We collect information you provide directly, such as account information, content you save, and communications with our support team.'
        },
        {
          subtitle: 'Automatically Collected Information',
          text: 'We automatically collect certain information about your device and usage patterns, including IP address, browser type, and interaction with our services.'
        },
        {
          subtitle: 'Content and Usage Data',
          text: 'We collect the content you save, organize, and search to provide our AI-powered features and improve your experience.'
        }
      ]
    },
    {
      title: 'How We Use Your Information',
      icon: UserCheck,
      content: [
        {
          subtitle: 'Service Provision',
          text: 'We use your information to provide, maintain, and improve our knowledge management services, including AI-powered organization and search.'
        },
        {
          subtitle: 'Communication',
          text: 'We may use your information to send you service-related communications, updates, and promotional messages (which you can opt out of).'
        },
        {
          subtitle: 'Analytics and Improvement',
          text: 'We analyze usage patterns to improve our services, develop new features, and enhance user experience.'
        }
      ]
    },
    {
      title: 'Information Sharing',
      icon: Shield,
      content: [
        {
          subtitle: 'Service Providers',
          text: 'We may share information with trusted service providers who assist us in operating our services, subject to confidentiality agreements.'
        },
        {
          subtitle: 'Legal Requirements',
          text: 'We may disclose information if required by law, legal process, or to protect the rights, property, or safety of Accio, our users, or others.'
        },
        {
          subtitle: 'Business Transfers',
          text: 'In the event of a merger, acquisition, or sale of assets, user information may be transferred as part of the transaction.'
        }
      ]
    },
    {
      title: 'Data Security',
      icon: Lock,
      content: [
        {
          subtitle: 'Encryption',
          text: 'All data is encrypted in transit using TLS and at rest using industry-standard AES-256 encryption.'
        },
        {
          subtitle: 'Access Controls',
          text: 'We implement strict access controls and authentication measures to protect your data from unauthorized access.'
        },
        {
          subtitle: 'Regular Audits',
          text: 'We conduct regular security audits and assessments to identify and address potential vulnerabilities.'
        }
      ]
    }
  ];

  return (
    <>
      <Helmet>
        <title>Privacy Policy - How We Protect Your Data | Accio</title>
        <meta name="description" content="Learn how Accio protects your privacy and data. Our comprehensive privacy policy explains data collection, usage, sharing, and security practices." />
      </Helmet>

      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-24 bg-gradient-to-br from-primary/5 to-blue-600/5">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-6">
                <Shield className="h-3 w-3 mr-1" />
                Privacy Policy
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                Your Privacy Matters
              </h1>
              <p className="text-xl text-muted-foreground mb-4 leading-relaxed">
                We're committed to protecting your privacy and being transparent about how we collect, 
                use, and protect your information.
              </p>
              <p className="text-sm text-muted-foreground">
                Last updated: {lastUpdated}
              </p>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <Card className="p-8 border-0 shadow-lg mb-12">
              <h2 className="text-2xl font-bold mb-4">Introduction</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                This Privacy Policy describes how Accio ("we," "our," or "us") collects, uses, and protects 
                your information when you use our knowledge management platform and related services.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                By using our services, you agree to the collection and use of information in accordance 
                with this policy. We will not use or share your information except as described in this 
                Privacy Policy.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We are committed to protecting your privacy and ensuring you have a positive experience 
                on our platform while benefiting from our knowledge management tools.
              </p>
            </Card>

            {/* Main Sections */}
            <div className="space-y-8">
              {sections.map((section, index) => (
                <Card key={index} className="p-8">
                  <CardHeader className="pb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <section.icon className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{section.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {section.content.map((item, itemIndex) => (
                      <div key={itemIndex}>
                        <h4 className="font-semibold mb-2">{item.subtitle}</h4>
                        <p className="text-muted-foreground leading-relaxed">{item.text}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Additional Sections */}
            <div className="mt-12 space-y-8">
              <Card className="p-8">
                <CardTitle className="text-xl mb-6">Your Rights and Choices</CardTitle>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Access and Portability</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      You have the right to access your personal information and export your data in a 
                      portable format at any time through your account settings.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Correction and Deletion</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      You can update, correct, or delete your personal information through your account 
                      settings or by contacting our support team.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Communication Preferences</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      You can opt out of promotional communications at any time by following the unsubscribe 
                      links in our emails or updating your preferences in your account.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-8">
                <CardTitle className="text-xl mb-6">Data Retention</CardTitle>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We retain your information for as long as your account is active or as needed to provide 
                  you services. If you wish to cancel your account or request that we no longer use your 
                  information, please contact us.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  We will retain and use your information as necessary to comply with our legal obligations, 
                  resolve disputes, and enforce our agreements.
                </p>
              </Card>

              <Card className="p-8">
                <CardTitle className="text-xl mb-6">International Data Transfers</CardTitle>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Your information may be transferred to and maintained on computers located outside of your 
                  state, province, country, or other governmental jurisdiction where data protection laws may 
                  differ from those of your jurisdiction.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  We will take all steps reasonably necessary to ensure that your data is treated securely 
                  and in accordance with this Privacy Policy.
                </p>
              </Card>

              <Card className="p-8">
                <CardTitle className="text-xl mb-6">Children's Privacy</CardTitle>
                <p className="text-muted-foreground leading-relaxed">
                  Our services are not intended for children under 13 years of age. We do not knowingly 
                  collect personally identifiable information from children under 13. If you are a parent 
                  or guardian and believe your child has provided us with personal information, please contact us.
                </p>
              </Card>

              <Card className="p-8">
                <CardTitle className="text-xl mb-6">Changes to This Privacy Policy</CardTitle>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We may update our Privacy Policy from time to time. We will notify you of any changes by 
                  posting the new Privacy Policy on this page and updating the "Last updated" date.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  You are advised to review this Privacy Policy periodically for any changes. Changes to 
                  this Privacy Policy are effective when they are posted on this page.
                </p>
              </Card>

              <Card className="p-8 bg-primary/5 border-primary/20">
                <CardTitle className="text-xl mb-6">Contact Us</CardTitle>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  If you have any questions about this Privacy Policy, please contact us:
                </p>
                <div className="space-y-2 text-muted-foreground">
                  <p>Email: privacy@accio.app</p>
                  <p>Address: 123 Innovation Drive, Suite 400, San Francisco, CA 94105</p>
                  <p>Phone: +1 (555) 123-4567</p>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default PrivacyPolicy;
