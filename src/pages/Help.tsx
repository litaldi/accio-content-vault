
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { HelpHeader } from '@/components/help/HelpHeader';
import { HelpSearch } from '@/components/help/HelpSearch';
import { HelpCategories } from '@/components/help/HelpCategories';
import { ContactSupport } from '@/components/help/ContactSupport';
import { ContactForm } from '@/components/help/ContactForm';
import { SupportHours } from '@/components/help/SupportHours';

const Help = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Help & Support - Accio</title>
        <meta name="description" content="Get help and support for Accio. Find tutorials, FAQs, and contact our support team." />
      </Helmet>

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <HelpHeader />
        <HelpSearch />
        <HelpCategories />
        <ContactSupport />
        <ContactForm />
        <SupportHours />
      </div>
    </div>
  );
};

export default Help;
