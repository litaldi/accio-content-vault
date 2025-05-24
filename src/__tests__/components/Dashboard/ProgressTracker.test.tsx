
import React from 'react';
import { render, screen, fireEvent } from '@/__tests__/utils/test-utils';
import { axe } from 'jest-axe';
import ProgressTracker from '@/components/Dashboard/ProgressTracker';

describe('ProgressTracker', () => {
  const mockOnStepClick = jest.fn();
  
  const mockSteps = [
    { id: '1', title: 'Setup Profile', completed: true },
    { id: '2', title: 'Add Content', completed: true },
    { id: '3', title: 'Invite Team', completed: false, optional: true },
    { id: '4', title: 'Configure Settings', completed: false },
  ];

  const defaultProps = {
    title: 'Getting Started',
    description: 'Complete these steps to get the most out of your account',
    steps: mockSteps,
    onStepClick: mockOnStepClick,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders title and description', () => {
    render(<ProgressTracker {...defaultProps} />);
    
    expect(screen.getByText('Getting Started')).toBeInTheDocument();
    expect(screen.getByText('Complete these steps to get the most out of your account')).toBeInTheDocument();
  });

  it('displays correct progress percentage', () => {
    render(<ProgressTracker {...defaultProps} />);
    
    // 2 out of 4 steps completed = 50%
    expect(screen.getByText('50%')).toBeInTheDocument();
    expect(screen.getByText('2/4')).toBeInTheDocument();
  });

  it('shows completion celebration when all steps are done', () => {
    const completedSteps = mockSteps.map(step => ({ ...step, completed: true }));
    
    render(<ProgressTracker {...defaultProps} steps={completedSteps} />);
    
    expect(screen.getByText('All steps completed! Great job! 🎉')).toBeInTheDocument();
  });

  it('handles step clicks correctly', () => {
    render(<ProgressTracker {...defaultProps} />);
    
    fireEvent.click(screen.getByText('Setup Profile'));
    expect(mockOnStepClick).toHaveBeenCalledWith('1');
  });

  it('marks optional steps appropriately', () => {
    render(<ProgressTracker {...defaultProps} />);
    
    expect(screen.getByText('Optional')).toBeInTheDocument();
  });

  it('shows correct visual indicators for completion status', () => {
    render(<ProgressTracker {...defaultProps} />);
    
    const setupProfileStep = screen.getByText('Setup Profile').closest('div');
    const inviteTeamStep = screen.getByText('Invite Team').closest('div');
    
    // Completed steps should have different styling
    expect(setupProfileStep?.querySelector('[data-testid="check-circle"]')).toBeTruthy();
    expect(inviteTeamStep?.querySelector('[data-testid="circle"]')).toBeTruthy();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<ProgressTracker {...defaultProps} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('provides proper ARIA labels for progress', () => {
    render(<ProgressTracker {...defaultProps} />);
    
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuenow', '50');
    expect(progressBar).toHaveAttribute('aria-valuemin', '0');
    expect(progressBar).toHaveAttribute('aria-valuemax', '100');
  });
});
