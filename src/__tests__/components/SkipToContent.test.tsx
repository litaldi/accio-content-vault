
import { render, screen, fireEvent } from '../utils/test-utils';
import { axe } from 'jest-axe';
import SkipToContent from '@/components/SkipToContent';

describe('SkipToContent', () => {
  // Mock scrollIntoView since it's not implemented in JSDOM
  window.HTMLElement.prototype.scrollIntoView = jest.fn();

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

    render(<SkipToContent />);
    
    const skipLink = screen.getByRole('button', { name: /skip to content/i });
    fireEvent.click(skipLink);
    
    expect(focusSpy).toHaveBeenCalled();
    expect(mainContent.scrollIntoView).toHaveBeenCalled();
    
    // Cleanup
    document.body.removeChild(mainContent);
    focusSpy.mockRestore();
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<SkipToContent />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
