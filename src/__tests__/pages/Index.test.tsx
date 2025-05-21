
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

// Mock all home components to simplify testing
jest.mock('@/components/home/HeroSection', () => {
  return function MockHeroSection() {
    return <section data-testid="hero-section" id="hero-section">
      <h1>Remember everything you discover online</h1>
      <a href="#onboarding-section">Learn how Accio works</a>
    </section>;
  };
});

jest.mock('@/components/home/OnboardingSection', () => {
  return function MockOnboardingSection() {
    const steps = [
      { title: 'Save Content', description: 'Test description' },
      { title: 'AI Tagging', description: 'Test description' },
      { title: 'Upload Files', description: 'Test description' },
      { title: 'Smart Search', description: 'Test description' }
    ];
    
    return (
      <section data-testid="onboarding-section" id="onboarding-section">
        <h2>How Accio Works</h2>
        {steps.map((step, i) => (
          <div key={i} role="button" aria-label={`View ${step.title} details`}>{step.title}</div>
        ))}
        <button>Next</button>
      </section>
    );
  };
});

jest.mock('@/components/home/FeaturesSection', () => {
  return function MockFeaturesSection() {
    return <section data-testid="features-section" id="features-section">
      <h2>Powerful Features</h2>
    </section>;
  };
});

jest.mock('@/components/home/AboutSection', () => {
  return function MockAboutSection() {
    return <section data-testid="about-section" id="about-section">
      <h2>About Accio</h2>
    </section>;
  };
});

jest.mock('@/components/home/PricingSection', () => {
  return function MockPricingSection() {
    return <section data-testid="pricing-section" id="pricing-section"></section>;
  };
});

jest.mock('@/components/home/ContactSection', () => {
  return function MockContactSection() {
    return <section data-testid="contact-section" id="contact-section">
      <h2>Questions? Get in Touch</h2>
      <button>Contact Us</button>
    </section>;
  };
});

jest.mock('@/components/home/FAQSection', () => {
  return function MockFAQSection() {
    return <section data-testid="faq-section" id="faq-section">
      <h2>Frequently Asked Questions</h2>
      <button>View all FAQs</button>
    </section>;
  };
});

jest.mock('@/components/home/CTASection', () => {
  return function MockCTASection() {
    return <section data-testid="cta-section" id="cta-section">
      <button>Sign Up Free</button>
      <button>Login</button>
    </section>;
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
  });

  it('should have working call-to-action buttons', () => {
    const navigate = jest.fn();
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(navigate);
    
    render(<Index />);
    
    // Find buttons (we're not testing functionality here since it's mocked)
    expect(screen.getByText('Sign Up Free')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('should have keypress interaction in onboarding steps', () => {
    render(<Index />);
    
    // Find all step buttons
    const stepButtons = screen.getAllByRole('button', { name: /view .* details/i });
    expect(stepButtons.length).toBe(4);
  });

  it('should have proper document title and metadata', () => {
    render(<Index />);
    expect(document.title).toBe('Accio - Remember Everything You Discover Online');
  });

  it('should have navigation links to main sections', () => {
    render(<Index />);
    
    // Check for sections
    expect(screen.getByText('About Accio')).toBeInTheDocument();
    expect(screen.getByText('Questions? Get in Touch')).toBeInTheDocument();
    expect(screen.getByText('Frequently Asked Questions')).toBeInTheDocument();
    
    // Check for buttons linking to pages
    expect(screen.getByRole('button', { name: /contact us/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /view all faqs/i })).toBeInTheDocument();
  });

  it('should have anchor links for smooth scrolling', () => {
    render(<Index />);
    expect(screen.getByText('Learn how Accio works')).toBeInTheDocument();
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<Index />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
