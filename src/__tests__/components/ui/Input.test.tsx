
import { render, screen } from '../../utils/test-utils';
import { axe } from 'jest-axe';
import { Input } from '@/components/ui/input';

describe('Input', () => {
  it('should render correctly', () => {
    render(<Input aria-label="Test input" />);
    expect(screen.getByLabelText('Test input')).toBeInTheDocument();
  });

  it('should apply error styles when aria-invalid is true', () => {
    render(<Input aria-invalid="true" aria-label="Invalid input" />);
    const input = screen.getByLabelText('Invalid input');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input.className).toContain('border-destructive');
  });

  it('should forward ref correctly', () => {
    const inputRef = { current: null };
    render(<Input ref={inputRef as any} aria-label="Ref test" />);
    expect(inputRef.current).not.toBeNull();
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(
      <div>
        <label htmlFor="test-input">Test Label</label>
        <Input id="test-input" />
      </div>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
