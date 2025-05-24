
import React from 'react';
import { render } from '@/__tests__/utils/test-utils';
import { axe } from '@/__tests__/utils/a11y-test';
import { SummaryButton } from '@/components/summaries/SummaryButton';
import { VoiceSearchButton } from '@/components/VoiceSearch/VoiceSearchButton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

describe('Component Accessibility', () => {
  it('SummaryButton should have no accessibility violations', async () => {
    const { container } = render(
      <SummaryButton 
        contentId="test-content" 
        contentText="Test content for accessibility"
      />
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('VoiceSearchButton should have no accessibility violations', async () => {
    const mockOnTranscript = jest.fn();
    const { container } = render(
      <VoiceSearchButton onTranscript={mockOnTranscript} />
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('Button component should have no accessibility violations', async () => {
    const { container } = render(
      <Button>Accessible Button</Button>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('Input component should have no accessibility violations', async () => {
    const { container } = render(
      <div>
        <label htmlFor="test-input">Test Input</label>
        <Input id="test-input" placeholder="Test input" />
      </div>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('Button with different variants should be accessible', async () => {
    const variants = ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'] as const;
    
    for (const variant of variants) {
      const { container } = render(
        <Button variant={variant}>Button {variant}</Button>
      );
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    }
  });

  it('disabled elements should be accessible', async () => {
    const { container } = render(
      <div>
        <Button disabled>Disabled Button</Button>
        <Input disabled placeholder="Disabled input" />
      </div>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
