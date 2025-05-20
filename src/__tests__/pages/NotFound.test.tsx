
import { render, screen } from '../utils/test-utils';
import { axe } from 'jest-axe';
import NotFound from '@/pages/NotFound';

// Mock the useNavigate hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
  useLocation: () => ({ pathname: '/nonexistent' }),
}));

describe('NotFound', () => {
  it('should render 404 page with appropriate headings', () => {
    render(<NotFound />);
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Page Not Found')).toBeInTheDocument();
  });

  it('should have navigation options', () => {
    render(<NotFound />);
    expect(screen.getByRole('button', { name: /go back/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /return home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /sitemap/i })).toBeInTheDocument();
  });

  it('should have proper document title', () => {
    render(<NotFound />);
    // We can't directly test Helmet's effect on document.title in Jest,
    // but we can check if the Helmet component renders with the right title
    expect(document.title).toBe('Page Not Found | ReadSmart');
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<NotFound />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
