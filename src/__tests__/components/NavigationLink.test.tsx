
import React from 'react';
import { render, screen } from '../utils/test-utils';
import { axe } from 'jest-axe';
import NavigationLink from '@/components/common/NavigationLink';

describe('NavigationLink', () => {
  // Mock useLocation
  const mockUseLocation = jest.fn();
  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useLocation: () => mockUseLocation(),
  }));

  beforeEach(() => {
    mockUseLocation.mockImplementation(() => ({ pathname: '/test' }));
  });

  it('renders correctly with default props', () => {
    render(<NavigationLink to="/test">Test Link</NavigationLink>);
    const link = screen.getByRole('link', { name: /test link/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/test');
  });

  it('applies active class when path matches exactly', () => {
    mockUseLocation.mockImplementation(() => ({ pathname: '/exact' }));
    render(
      <NavigationLink to="/exact" exact={true} className="test-class" activeClassName="active-test">
        Exact Link
      </NavigationLink>
    );
    const link = screen.getByRole('link', { name: /exact link/i });
    expect(link).toHaveClass('active-test');
    expect(link).toHaveAttribute('aria-current', 'page');
  });

  it('applies active class when path starts with link path', () => {
    mockUseLocation.mockImplementation(() => ({ pathname: '/parent/child' }));
    render(
      <NavigationLink to="/parent" exact={false} activeClassName="active-test">
        Parent Link
      </NavigationLink>
    );
    const link = screen.getByRole('link', { name: /parent link/i });
    expect(link).toHaveClass('active-test');
  });

  it('does not apply active class when exact is true and paths dont match exactly', () => {
    mockUseLocation.mockImplementation(() => ({ pathname: '/parent/child' }));
    render(
      <NavigationLink to="/parent" exact={true} activeClassName="active-test">
        Parent Link
      </NavigationLink>
    );
    const link = screen.getByRole('link', { name: /parent link/i });
    expect(link).not.toHaveClass('active-test');
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(
      <NavigationLink to="/test" onClick={handleClick}>
        Click Me
      </NavigationLink>
    );
    const link = screen.getByRole('link', { name: /click me/i });
    link.click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<NavigationLink to="/test">Accessible Link</NavigationLink>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
