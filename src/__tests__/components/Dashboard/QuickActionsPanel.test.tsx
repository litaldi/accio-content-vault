import React from 'react';
import { render, screen, fireEvent } from '@/__tests__/utils/test-utils';
import { axe } from 'jest-axe';
import QuickActionsPanel from '@/components/Dashboard/QuickActionsPanel';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('QuickActionsPanel', () => {
  const mockOnQuickAction = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all quick action buttons', () => {
    render(<QuickActionsPanel onQuickAction={mockOnQuickAction} />);
    
    expect(screen.getByText('Save Content')).toBeInTheDocument();
    expect(screen.getByText('Bulk Import')).toBeInTheDocument();
    expect(screen.getByText('Share Collection')).toBeInTheDocument();
    expect(screen.getByText('Export Data')).toBeInTheDocument();
  });

  it('navigates to save page when Save Content is clicked', () => {
    render(<QuickActionsPanel onQuickAction={mockOnQuickAction} />);
    
    fireEvent.click(screen.getByText('Save Content'));
    expect(mockNavigate).toHaveBeenCalledWith('/save');
  });

  it('calls onQuickAction for non-navigation actions', () => {
    render(<QuickActionsPanel onQuickAction={mockOnQuickAction} />);
    
    fireEvent.click(screen.getByText('Bulk Import'));
    expect(mockOnQuickAction).toHaveBeenCalledWith('bulk-import');
    
    fireEvent.click(screen.getByText('Share Collection'));
    expect(mockOnQuickAction).toHaveBeenCalledWith('share-collection');
    
    fireEvent.click(screen.getByText('Export Data'));
    expect(mockOnQuickAction).toHaveBeenCalledWith('export-data');
  });

  it('has proper keyboard navigation', () => {
    render(<QuickActionsPanel onQuickAction={mockOnQuickAction} />);
    
    const buttons = screen.getAllByRole('button');
    buttons.forEach(button => {
      expect(button).toHaveAttribute('tabindex', '0');
    });
  });

  it('shows correct badge count', () => {
    render(<QuickActionsPanel onQuickAction={mockOnQuickAction} />);
    
    expect(screen.getByText('4 shortcuts')).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<QuickActionsPanel onQuickAction={mockOnQuickAction} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('applies hover effects correctly', () => {
    render(<QuickActionsPanel onQuickAction={mockOnQuickAction} />);
    
    const saveButton = screen.getByText('Save Content').closest('button');
    expect(saveButton).toHaveClass('hover:scale-105');
  });

  it('distinguishes primary action visually', () => {
    render(<QuickActionsPanel onQuickAction={mockOnQuickAction} />);
    
    const saveButton = screen.getByText('Save Content').closest('button');
    const bulkImportButton = screen.getByText('Bulk Import').closest('button');
    
    // Save Content should be primary (default variant)
    expect(saveButton).not.toHaveClass('border');
    // Other actions should be outline
    expect(bulkImportButton).toHaveClass('border');
  });
});
