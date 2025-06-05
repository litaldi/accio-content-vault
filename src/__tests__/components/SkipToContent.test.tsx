
import React from 'react';
import { render, screen, fireEvent } from '../utils/test-utils';
import { axe } from 'jest-axe';
import SkipToContent from '@/components/accessibility/SkipToContent';
import { useToast } from '@/hooks/use-toast';

// Mock the useToast hook
jest.mock('@/hooks/use-toast', () => ({
  useToast: jest.fn(),
}));

describe('SkipToContent', () => {
  // Mock scrollIntoView since it's not implemented in JSDOM
  window.HTMLElement.prototype.scrollIntoView = jest.fn();
  
  // Mock toast
  const mockToast = jest.fn();
  
  beforeEach(() => {
    (useToast as jest.Mock).mockReturnValue({
      toast: mockToast,
    });
    jest.clearAllMocks();
  });

  it('should render the skip link', () => {
    render(<SkipToContent />);
    expect(screen.getByRole('button', { name: /skip to content/i })).toBeInTheDocument();
  });

  it('should focus on main content when activated', () => {
    // Create a main content element to focus on
    const mainContent = document.createElement('div');
    mainContent.id = 'main-content';
    document.body.appendChild(mainContent);
    
    // Focus spy
    const focusSpy = jest.spyOn(mainContent, 'focus');
    const setAttributeSpy = jest.spyOn(mainContent, 'setAttribute');

    render(<SkipToContent />);
    
    const skipLink = screen.getByRole('button', { name: /skip to content/i });
    fireEvent.click(skipLink);
    
    expect(focusSpy).toHaveBeenCalled();
    expect(setAttributeSpy).toHaveBeenCalledWith('tabindex', '-1');
    expect(mainContent.scrollIntoView).toHaveBeenCalled();
    expect(mockToast).toHaveBeenCalled();
    
    // Cleanup
    document.body.removeChild(mainContent);
    focusSpy.mockRestore();
    setAttributeSpy.mockRestore();
  });

  it('should fall back to main element when no element with id is found', () => {
    // Create a main element
    const mainElement = document.createElement('main');
    document.body.appendChild(mainElement);
    
    // Focus spy
    const focusSpy = jest.spyOn(mainElement, 'focus');
    const setAttributeSpy = jest.spyOn(mainElement, 'setAttribute');
    
    render(<SkipToContent />);
    
    const skipLink = screen.getByRole('button', { name: /skip to content/i });
    fireEvent.click(skipLink);
    
    expect(focusSpy).toHaveBeenCalled();
    expect(setAttributeSpy).toHaveBeenCalledWith('tabindex', '-1');
    expect(mainElement.scrollIntoView).toHaveBeenCalled();
    expect(mockToast).toHaveBeenCalled();
    
    // Cleanup
    document.body.removeChild(mainElement);
    focusSpy.mockRestore();
    setAttributeSpy.mockRestore();
  });

  it('should show error toast when no main content is found', () => {
    render(<SkipToContent />);
    
    const skipLink = screen.getByRole('button', { name: /skip to content/i });
    fireEvent.click(skipLink);
    
    expect(mockToast).toHaveBeenCalledWith({
      title: "Error",
      description: "Could not find main content to skip to",
      variant: "destructive",
      duration: 3000,
    });
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<SkipToContent />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
