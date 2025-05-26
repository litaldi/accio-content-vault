
import React from 'react';
import { Typography, Spacing } from '@/components/ui/design-system';
import UnifiedPageLayout from '@/components/layout/UnifiedPageLayout';

const Reminders: React.FC = () => {
  return (
    <UnifiedPageLayout
      title="Reminders | Accio"
      description="Manage your knowledge reminders and notifications."
    >
      <Spacing.Section size="lg">
        <Spacing.Container>
          <Typography.H2 className="mb-8">Reminders</Typography.H2>
          <Typography.Body>
            Set up reminders to review your saved content and maintain your knowledge.
          </Typography.Body>
        </Spacing.Container>
      </Spacing.Section>
    </UnifiedPageLayout>
  );
};

export default Reminders;
