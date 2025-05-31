
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Users, Shield, AlertTriangle, CreditCard, Ban } from 'lucide-react';

const TermsOfService = () => {
  const lastUpdated = '2024-01-15';

  const sections = [
    {
      icon: Users,
      title: 'Acceptance of Terms',
      content: `By accessing and using Accio, you accept and agree to be bound by the terms and provision of this agreement.

These Terms of Service govern your use of the Accio platform, including all content, services, and features available through our website and mobile applications.

If you do not agree to abide by the above, please do not use this service.`
    },
    {
      icon: FileText,
      title: 'Use License',
      content: `Permission is granted to temporarily access and use Accio for personal and commercial purposes under the following conditions:

• You must not modify or copy the materials
• You must not use the materials for any commercial purpose without our written consent
• You must not attempt to reverse engineer any software contained on Accio
• You must not remove any copyright or other proprietary notations from the materials

This license shall automatically terminate if you violate any of these restrictions and may be terminated by us at any time.`
    },
    {
      icon: Shield,
      title: 'User Accounts',
      content: `When you create an account with us, you must provide information that is accurate, complete, and current at all times.

You are responsible for:
• Safeguarding the password and all activities under your account
• Maintaining the security of your account credentials
• Immediately notifying us of any unauthorized use of your account
• Ensuring that your use of the service complies with all applicable laws

We reserve the right to refuse service, terminate accounts, or remove content at our sole discretion.`
    },
    {
      icon: CreditCard,
      title: 'Payment Terms',
      content: `Some features of Accio require payment of fees. You agree to pay all applicable fees for your chosen plan.

• Fees are non-refundable except as required by law or as specifically permitted in our refund policy
• We reserve the right to change our fees at any time with 30 days notice
• Your continued use of paid services after fee changes constitutes acceptance of the new fees
• Failed payments may result in suspension or termination of your account

All payments are processed securely through trusted third-party payment processors.`
    },
    {
      icon: Ban,
      title: 'Prohibited Uses',
      content: `You may not use Accio for any unlawful purpose or to solicit others to perform unlawful acts. You may not:

• Violate any international, federal, provincial, or state regulations, rules, or laws
• Transmit or upload any material that contains viruses, trojan horses, or other harmful code
• Infringe upon or violate our intellectual property rights or the intellectual property rights of others
• Harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate
• Submit false or misleading information
• Upload or transmit content that is illegal, harmful, threatening, abusive, or objectionable`
    },
    {
      icon: AlertTriangle,
      title: 'Disclaimer',
      content: `The information on Accio is provided on an "as is" basis. To the fullest extent permitted by law, we exclude:

• All representations and warranties relating to this website and its contents
• All liability for any direct, indirect, or consequential loss or damage incurred by any user

We do not warrant that:
• The service will be constantly available or uninterrupted
• The information will be accurate or reliable
• The quality of any products or services purchased will meet your expectations`
    }
  ];

  return (
    <>
      <Helmet>
        <title>Terms of Service - Accio</title>
        <meta name="description" content="Read Accio's Terms of Service to understand your rights and responsibilities when using our AI-powered knowledge management platform." />
      </Helmet>

      <main className="min-h-screen bg-background">
        {/* Header */}
        <section className="py-24 bg-gradient-to-br from-primary/5 to-blue-600/5">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-12">
              <FileText className="h-16 w-16 text-primary mx-auto mb-6" />
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Terms of Service
              </h1>
              <p className="text-xl text-muted-foreground">
                Please read these terms carefully before using our service. 
                These terms govern your relationship with Accio.
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
                <CardTitle className="text-2xl">Agreement Overview</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <p className="text-muted-foreground leading-relaxed">
                  Welcome to Accio! These Terms of Service ("Terms") govern your use of our 
                  AI-powered knowledge management platform operated by Accio Inc. ("us", "we", or "our").
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Our service allows you to organize, search, and manage your knowledge using 
                  artificial intelligence. By using our service, you agree to be bound by these Terms. 
                  If you disagree with any part of these terms, then you may not access the service.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Terms Sections */}
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

        {/* Intellectual Property */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">Intellectual Property Rights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-gray max-w-none">
                  <p className="text-muted-foreground leading-relaxed">
                    The service and its original content, features, and functionality are and will 
                    remain the exclusive property of Accio Inc. and its licensors. The service is 
                    protected by copyright, trademark, and other laws. Our trademarks and trade dress 
                    may not be used in connection with any product or service without our prior written consent.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mt-4">
                    You retain ownership of any content you upload to our service. By uploading content, 
                    you grant us a non-exclusive, worldwide, royalty-free license to use, reproduce, 
                    and display such content solely for the purpose of providing our service to you.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Privacy */}
        <section className="py-16 bg-muted/20">
          <div className="container mx-auto px-4 max-w-4xl">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">Privacy Policy</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-gray max-w-none">
                  <p className="text-muted-foreground leading-relaxed">
                    Your privacy is important to us. Our Privacy Policy explains how we collect, 
                    use, and protect your information when you use our service. By using our service, 
                    you agree to the collection and use of information in accordance with our Privacy Policy.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mt-4">
                    We do not use your personal content to train our AI models. Your data remains 
                    private and is processed solely to provide you with our service features.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Termination */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">Termination</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-gray max-w-none">
                  <p className="text-muted-foreground leading-relaxed">
                    We may terminate or suspend your account immediately, without prior notice or 
                    liability, for any reason whatsoever, including without limitation if you breach the Terms.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mt-4">
                    You may terminate your account at any time by contacting us. Upon termination, 
                    your right to use the service will cease immediately. You will have 30 days to 
                    export your data before it is permanently deleted from our systems.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Changes to Terms */}
        <section className="py-16 bg-muted/20">
          <div className="container mx-auto px-4 max-w-4xl">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">Changes to Terms</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-gray max-w-none">
                  <p className="text-muted-foreground leading-relaxed">
                    We reserve the right, at our sole discretion, to modify or replace these Terms 
                    at any time. If a revision is material, we will try to provide at least 30 days 
                    notice prior to any new terms taking effect.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mt-4">
                    By continuing to access or use our service after those revisions become effective, 
                    you agree to be bound by the revised terms.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-6">Questions About These Terms?</h2>
            <p className="text-xl mb-8 opacity-90">
              If you have any questions about these Terms of Service, please contact us.
            </p>
            <div className="space-y-4">
              <p className="opacity-90">
                <strong>Email:</strong> legal@accio.app
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

export default TermsOfService;
