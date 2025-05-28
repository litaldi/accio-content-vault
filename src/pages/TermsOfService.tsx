
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Scale, UserCheck, Shield } from 'lucide-react';

const TermsOfService = () => {
  const lastUpdated = 'January 1, 2024';

  const sections = [
    {
      title: 'Acceptance of Terms',
      icon: UserCheck,
      content: 'By accessing and using Accio\'s services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.'
    },
    {
      title: 'Use License',
      icon: Scale,
      content: 'Permission is granted to temporarily access and use Accio for personal or commercial purposes. This is the grant of a license, not a transfer of title, and under this license you may not: modify or copy the materials; use the materials for any commercial purpose or for any public display; attempt to reverse engineer any software contained on the website; remove any copyright or other proprietary notations from the materials.'
    },
    {
      title: 'User Accounts',
      icon: UserCheck,
      content: 'When you create an account with us, you must provide information that is accurate, complete, and current at all times. You are responsible for safeguarding the password and for maintaining the security of your account. You agree not to disclose your password to any third party and to take sole responsibility for any activities or actions under your account.'
    },
    {
      title: 'Acceptable Use',
      icon: Shield,
      content: 'You agree not to use the service to: upload, post, or transmit any content that is unlawful, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, or otherwise objectionable; impersonate any person or entity or falsely state or otherwise misrepresent yourself; upload, post, or transmit any unsolicited or unauthorized advertising, promotional materials, or spam; interfere with or disrupt the service or servers or networks connected to the service.'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Terms of Service - Legal Agreement | Accio</title>
        <meta name="description" content="Read Accio's Terms of Service. Understand your rights and responsibilities when using our knowledge management platform and services." />
      </Helmet>

      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-24 bg-gradient-to-br from-primary/5 to-blue-600/5">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-6">
                <FileText className="h-3 w-3 mr-1" />
                Terms of Service
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                Terms of Service
              </h1>
              <p className="text-xl text-muted-foreground mb-4 leading-relaxed">
                Please read these Terms of Service carefully before using our knowledge management platform.
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
              <h2 className="text-2xl font-bold mb-4">Agreement to Terms</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                These Terms of Service constitute a legally binding agreement made between you and Accio 
                ("Company," "we," "us," or "our"), concerning your access to and use of our website and services.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You agree that by accessing our services, you have read, understood, and agreed to be bound 
                by all of these Terms of Service. If you do not agree with all of these Terms of Service, 
                then you are expressly prohibited from using our services and you must discontinue use immediately.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Supplemental terms and conditions or documents that may be posted on our services from time to time 
                are hereby expressly incorporated herein by reference.
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
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{section.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Additional Detailed Sections */}
            <div className="mt-12 space-y-8">
              <Card className="p-8">
                <CardTitle className="text-xl mb-6">Content and Intellectual Property</CardTitle>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    <strong>Your Content:</strong> You retain ownership of any content you submit, upload, or display 
                    on or through our services. By submitting content, you grant us a worldwide, non-exclusive, 
                    royalty-free license to use, reproduce, and process your content solely for the purpose of 
                    providing our services.
                  </p>
                  <p>
                    <strong>Our Content:</strong> Our services and their original content, features, and functionality 
                    are and will remain the exclusive property of Accio and its licensors. The services are protected 
                    by copyright, trademark, and other intellectual property laws.
                  </p>
                  <p>
                    <strong>Third-Party Content:</strong> Our services may contain links to third-party websites or 
                    services that are not owned or controlled by Accio. We have no control over and assume no 
                    responsibility for the content, privacy policies, or practices of any third-party websites or services.
                  </p>
                </div>
              </Card>

              <Card className="p-8">
                <CardTitle className="text-xl mb-6">Payment and Billing</CardTitle>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    <strong>Subscription Fees:</strong> Some features of our services require payment of fees. 
                    You agree to pay all applicable fees as described on our website at the time of purchase.
                  </p>
                  <p>
                    <strong>Billing:</strong> Subscription fees are billed in advance on a monthly or annual basis 
                    and are non-refundable except as required by law or as specifically permitted in our refund policy.
                  </p>
                  <p>
                    <strong>Price Changes:</strong> We reserve the right to change our fees at any time. 
                    Any fee changes will be communicated to you with at least 30 days notice.
                  </p>
                </div>
              </Card>

              <Card className="p-8">
                <CardTitle className="text-xl mb-6">Privacy and Data Protection</CardTitle>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect 
                    your information when you use our services. By using our services, you agree to the collection 
                    and use of information in accordance with our Privacy Policy.
                  </p>
                  <p>
                    We implement appropriate security measures to protect your personal information against 
                    unauthorized access, alteration, disclosure, or destruction.
                  </p>
                </div>
              </Card>

              <Card className="p-8">
                <CardTitle className="text-xl mb-6">Limitation of Liability</CardTitle>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    In no event shall Accio, nor its directors, employees, partners, agents, suppliers, or affiliates, 
                    be liable for any indirect, incidental, special, consequential, or punitive damages, including 
                    without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting 
                    from your use of our services.
                  </p>
                  <p>
                    Our total liability to you for any damages shall not exceed the amount you paid us in the 
                    twelve (12) months immediately preceding the event giving rise to the liability.
                  </p>
                </div>
              </Card>

              <Card className="p-8">
                <CardTitle className="text-xl mb-6">Termination</CardTitle>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    We may terminate or suspend your account and bar access to our services immediately, without 
                    prior notice or liability, under our sole discretion, for any reason whatsoever including, 
                    without limitation, a breach of these Terms.
                  </p>
                  <p>
                    If you wish to terminate your account, you may simply discontinue using our services and 
                    cancel your subscription through your account settings.
                  </p>
                  <p>
                    Upon termination, your right to use our services will cease immediately, but provisions that 
                    by their nature should survive termination will survive.
                  </p>
                </div>
              </Card>

              <Card className="p-8">
                <CardTitle className="text-xl mb-6">Governing Law</CardTitle>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    These Terms shall be interpreted and governed by the laws of the State of California, United States, 
                    without regard to conflict of law provisions.
                  </p>
                  <p>
                    Any disputes arising from these Terms will be resolved through binding arbitration in accordance 
                    with the rules of the American Arbitration Association, conducted in San Francisco, California.
                  </p>
                </div>
              </Card>

              <Card className="p-8">
                <CardTitle className="text-xl mb-6">Changes to Terms</CardTitle>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    We reserve the right, at our sole discretion, to modify or replace these Terms at any time. 
                    If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect.
                  </p>
                  <p>
                    What constitutes a material change will be determined at our sole discretion. By continuing to 
                    access or use our services after any revisions become effective, you agree to be bound by the revised terms.
                  </p>
                </div>
              </Card>

              <Card className="p-8 bg-primary/5 border-primary/20">
                <CardTitle className="text-xl mb-6">Contact Information</CardTitle>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                <div className="space-y-2 text-muted-foreground">
                  <p>Email: legal@accio.app</p>
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

export default TermsOfService;
