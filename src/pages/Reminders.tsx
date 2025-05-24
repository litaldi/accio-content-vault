
import React from 'react';
import { Helmet } from 'react-helmet-async';
import MainMenu from '@/components/navigation/MainMenu';
import ImprovedFooter from '@/components/Footer/ImprovedFooter';
import { ResponsiveLayout } from '@/components/ui/responsive-layout';
import { ReminderManager } from '@/components/reminders/ReminderManager';

const Reminders = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Reminders - Accio</title>
        <meta name="description" content="Manage your tag-based reminders and notifications" />
      </Helmet>
      
      <MainMenu />
      
      <main className="flex-grow">
        <ResponsiveLayout maxWidth="4xl" padding="lg" verticalSpacing="lg">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Tag Reminders
            </h1>
            <p className="text-lg text-muted-foreground">
              Set up automated reminders to review content with specific tags
            </p>
          </div>
          
          <ReminderManager />
        </ResponsiveLayout>
      </main>
      
      <ImprovedFooter />
    </div>
  );
};

export default Reminders;
