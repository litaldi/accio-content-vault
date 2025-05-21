
import React from 'react';
import { render, screen, fireEvent } from '../utils/test-utils';
import { axe } from 'jest-axe';
import Index from '@/pages/Index';

// Mock the useNavigate hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

// Mock Footer component
jest.mock('@/components/Footer', () => {
  return function MockFooter() {
    return <footer data-testid="mock-footer">Footer</footer>;
  };
});

describe('Index Page', () => {
  it('should render the landing page with correct headings', () => {
    render(<Index />);
    expect(screen.getByText('Remember everything you discover online')).toBeInTheDocument();
    expect(screen.getByText('How Accio Works')).toBeInTheDocument();
    expect(screen.getByText('Powerful Features')).toBeInTheDocument();
    expect(screen.getByText('About Accio')).toBeInTheDocument();
  });

  it('should display onboarding steps with navigation', () => {
    render(<Index />);
    
    // Check the first step is visible
    expect(screen.getByText('Save Content')).toBeInTheDocument();
    
    // Click next button
    fireEvent.click(screen.getByRole('button', { name: /next/i }));
    
    // Check if second step appears
    expect(screen.getByText('AI Tagging')).toBeInTheDocument();
  });

  it('should have working call-to-action buttons', () => {
    const navigate = jest.fn();
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(navigate);
    
    render(<Index />);
    
    // Click the sign-up button
    fireEvent.click(screen.getByRole('button', { name: /get started - free/i }));
    expect(navigate).toHaveBeenCalledWith('/register');
    
    // Click the login button
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    expect(navigate).toHaveBeenCalledWith('/login');
  });

  it('should have keypress interaction in onboarding steps', () => {
    render(<Index />);
    
    // Find all step buttons
    const stepButtons = screen.getAllByRole('button', { name: /view .* details/i });
    expect(stepButtons.length).toBe(4);
    
    // Test keyboard navigation
    fireEvent.keyDown(stepButtons[2], { key: 'Enter' });
    expect(screen.getByText('Upload Files')).toBeInTheDocument();
  });

  it('should have proper document title and metadata', () => {
    render(<Index />);
    expect(document.title).toBe('Accio - Remember Everything You Discover Online');
  });

  it('should have navigation links to main sections', () => {
    render(<Index />);
    
    // Check for links to main pages
    expect(screen.getByText('About Accio')).toBeInTheDocument();
    expect(screen.getByText('Questions? Get in Touch')).toBeInTheDocument();
    expect(screen.getByText('Frequently Asked Questions')).toBeInTheDocument();
    
    // Check for buttons linking to pages
    expect(screen.getByRole('button', { name: /contact us/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /view all faqs/i })).toBeInTheDocument();
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<Index />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
