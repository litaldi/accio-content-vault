
# 🚀 Accio - AI-Powered Knowledge Management Platform

A comprehensive, secure, and accessible knowledge management platform built with React, TypeScript, and modern web technologies. Ready for production deployment! ✨

## 📋 Table of Contents

- [Quick Start](#-quick-start)
- [Features](#-features)
- [Architecture](#-architecture)
- [Security](#-security)
- [Accessibility](#-accessibility)
- [Development](#-development)
- [Deployment](#-deployment)
- [Testing](#-testing)
- [Contributing](#-contributing)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Modern web browser

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd accio

# Install dependencies
npm install

# Start development server
npm run dev

# Open browser to http://localhost:5173
```

### Environment Setup
Create a `.env` file in the root directory:

```env
# Supabase Configuration (if using backend)
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## ✨ Features

### 🎯 Core Functionality
- **AI-Powered Search** - Semantic search with natural language processing
- **Smart Organization** - Automatic content categorization and tagging
- **User Authentication** - Secure login with multiple providers
- **Content Management** - Save, organize, and retrieve web content
- **Real-time Sync** - Live data synchronization across devices

### 🔒 Security Features
- **Input Validation & Sanitization** - XSS and injection protection
- **CSRF Protection** - Token-based request validation
- **Rate Limiting** - API abuse prevention
- **Secure Headers** - Content Security Policy implementation
- **Authentication Guards** - Protected routes and session management

### ♿ Accessibility (WCAG 2.1 AA Compliant)
- **Screen Reader Support** - Full ARIA implementation
- **Keyboard Navigation** - Complete keyboard accessibility
- **High Contrast Mode** - Visual accessibility options
- **Reduced Motion** - Respects user motion preferences
- **Font Size Control** - Adjustable text sizing
- **Focus Management** - Proper focus indicators and flow

### 📱 User Experience
- **Responsive Design** - Mobile-first approach
- **Dark/Light Mode** - Theme switching with system preference
- **Progressive Web App** - Offline support and app-like experience
- **Loading States** - Smooth transitions and feedback
- **Error Handling** - Graceful error recovery

## 🏗️ Architecture

### Technology Stack
```
Frontend:
├── React 18          # UI framework with concurrent features
├── TypeScript        # Type-safe development
├── Vite             # Lightning-fast build tool
├── Tailwind CSS     # Utility-first styling
├── Shadcn/UI        # High-quality component library
├── React Router     # Client-side routing
├── React Query      # Data fetching and state management
└── React Hook Form  # Form handling and validation

Development:
├── Vitest           # Unit testing framework
├── Testing Library  # Component testing utilities
├── ESLint           # Code linting
├── Prettier         # Code formatting
└── Husky            # Git hooks
```

### Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── auth/           # Authentication components
│   ├── accessibility/  # Accessibility components
│   ├── navigation/     # Navigation components
│   ├── ui/             # Base UI components (Shadcn)
│   └── ...
├── contexts/           # React contexts (Auth, Accessibility)
├── hooks/              # Custom React hooks
├── pages/              # Page components
├── utils/              # Utility functions
├── styles/             # Global styles and accessibility CSS
└── types/              # TypeScript type definitions
```

## 🔒 Security

### Security Measures Implemented

#### Input Protection
```typescript
import { validateEmail, sanitizeInput } from '@/utils/security';

// Email validation with sanitization
const emailResult = validateEmail(userInput);
if (emailResult.isValid) {
  const cleanEmail = emailResult.sanitizedValue;
}

// HTML sanitization
const cleanContent = sanitizeInput(userContent, {
  maxLength: 1000,
  allowHtml: false
});
```

#### CSRF Protection
```typescript
import { CSRFManager } from '@/utils/security';

// Generate CSRF token
const token = CSRFManager.generate();

// Validate CSRF token
const isValid = CSRFManager.validate(token);
```

#### Rate Limiting
```typescript
import { authRateLimiter } from '@/utils/security';

// Check rate limit before auth attempt
const canAttempt = authRateLimiter.canAttempt(userEmail);
if (canAttempt.allowed) {
  // Proceed with authentication
  authRateLimiter.recordAttempt(userEmail);
}
```

### Security Headers (Production)
```
Content-Security-Policy: default-src 'self'
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
```

## ♿ Accessibility

### Accessibility Features

#### Screen Reader Support
```typescript
import { useAccessibility } from '@/contexts/AccessibilityContext';

const { announceToScreenReader } = useAccessibility();

// Announce dynamic content changes
announceToScreenReader('Content updated successfully');
```

#### Keyboard Navigation
- Full keyboard accessibility for all interactive elements
- Visible focus indicators with high contrast
- Logical tab order throughout the application
- Skip links for main content areas

#### Visual Accessibility
```typescript
// High contrast mode toggle
const { toggleHighContrast, isHighContrast } = useAccessibility();

// Font size adjustment
const { setFontSize, fontSize } = useAccessibility();
setFontSize('large'); // 'small' | 'medium' | 'large'

// Reduced motion preference
const { toggleReducedMotion, isReducedMotion } = useAccessibility();
```

#### ARIA Implementation
- Semantic HTML structure with proper landmarks
- ARIA labels and descriptions for complex components
- Live regions for dynamic content updates
- Proper heading hierarchy (h1-h6)

### Accessibility Testing
```bash
# Run accessibility tests
npm run test:a11y

# Check WCAG compliance
npm run test:wcag
```

## 🛠️ Development

### Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build            # Build for production
npm run preview          # Preview production build

# Testing
npm run test             # Run unit tests
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Generate coverage report
npm run test:a11y        # Run accessibility tests

# Code Quality
npm run lint             # Lint codebase
npm run lint:fix         # Fix linting issues
npm run format           # Format code with Prettier
npm run type-check       # TypeScript type checking
```

### Development Guidelines

#### Component Creation
```typescript
// Create small, focused components (< 100 lines)
interface ComponentProps {
  // Define clear prop interfaces
}

export const Component: React.FC<ComponentProps> = ({ ...props }) => {
  // Use hooks appropriately
  // Implement proper error handling
  // Ensure accessibility
  return (
    <div aria-label="Component description">
      {/* Semantic HTML */}
    </div>
  );
};
```

#### Hook Usage
```typescript
// Custom hooks for reusable logic
export const useCustomHook = () => {
  const [state, setState] = useState(initialValue);
  
  // Cleanup effects
  useEffect(() => {
    return () => {
      // Cleanup function
    };
  }, []);
  
  return { state, setState };
};
```

#### Error Handling
```typescript
// Use error boundaries for component errors
import { ErrorBoundary } from '@/components/ErrorBoundary';

// Wrap components that might throw
<ErrorBoundary>
  <Component />
</ErrorBoundary>
```

### Code Quality Standards
- **TypeScript**: Full type safety with strict mode
- **ESLint**: Enforce coding standards and best practices
- **Prettier**: Consistent code formatting
- **Husky**: Pre-commit hooks for quality assurance

## 🚀 Deployment

### Production Build
```bash
# Create optimized production build
npm run build

# Test production build locally
npm run preview
```

### Hosting Platforms

#### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to Vercel
vercel --prod
```

#### Netlify
```bash
# Build command
npm run build

# Publish directory
dist
```

#### Traditional Hosting
```bash
# Build the application
npm run build

# Upload the 'dist' folder to your hosting provider
```

### Environment Variables (Production)
```env
# Production environment variables
VITE_API_URL=https://your-api-domain.com
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-production-anon-key
```

### Security Configuration (Production)

#### Nginx Configuration
```nginx
# Security headers
add_header X-Frame-Options "DENY" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;

# Content Security Policy
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';" always;

# HTTPS redirect
if ($scheme != "https") {
    return 301 https://$host$request_uri;
}
```

## 🧪 Testing

### Test Coverage
- **Unit Tests**: Component and utility function testing
- **Integration Tests**: End-to-end user flow testing
- **Accessibility Tests**: WCAG compliance validation
- **Security Tests**: Input validation and XSS prevention

### Running Tests
```bash
# Run all tests
npm run test

# Run with coverage report
npm run test:coverage

# Run accessibility tests
npm run test:a11y

# Run specific test file
npm run test -- ComponentName.test.tsx
```

### Test Examples

#### Component Testing
```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { Component } from './Component';

describe('Component', () => {
  it('should render correctly', () => {
    render(<Component />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should handle user interaction', async () => {
    render(<Component />);
    fireEvent.click(screen.getByRole('button'));
    expect(await screen.findByText('Updated')).toBeInTheDocument();
  });
});
```

#### Accessibility Testing
```typescript
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

it('should have no accessibility violations', async () => {
  const { container } = render(<Component />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

## 🤝 Contributing

### Getting Started
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Pull Request Guidelines
- **Security First**: All changes must pass security review
- **Accessibility**: Ensure WCAG 2.1 AA compliance
- **Testing**: Maintain test coverage above 80%
- **Performance**: Monitor and optimize for performance
- **Documentation**: Update docs for all changes

### Code Review Checklist
- [ ] Security vulnerabilities addressed
- [ ] Accessibility requirements met
- [ ] Tests written and passing
- [ ] Performance impact assessed
- [ ] Documentation updated
- [ ] Code follows style guidelines

## 📊 Performance

### Performance Optimizations
- **Code Splitting**: Lazy loading of routes and components
- **Image Optimization**: Responsive images with proper sizing
- **Bundle Analysis**: Regular bundle size monitoring
- **Caching**: Proper cache headers and service worker
- **Tree Shaking**: Unused code elimination

### Performance Monitoring
```bash
# Analyze bundle size
npm run build:analyze

# Lighthouse audit
npm run audit

# Performance testing
npm run test:performance
```

## 📖 Browser Support

### Supported Browsers
- **Chrome**: Latest 2 versions
- **Firefox**: Latest 2 versions
- **Safari**: Latest 2 versions
- **Edge**: Latest 2 versions

### Progressive Enhancement
- Core functionality works without JavaScript
- Enhanced features with JavaScript enabled
- Graceful degradation for older browsers

## 🆘 Troubleshooting

### Common Issues

#### Build Errors
```bash
# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
rm -rf node_modules/.vite
npm run dev
```

#### TypeScript Errors
```bash
# Check TypeScript configuration
npm run type-check

# Generate types
npm run generate:types
```

#### Accessibility Issues
```bash
# Run accessibility audit
npm run test:a11y

# Check with screen reader
# Use NVDA (Windows) or VoiceOver (Mac)
```

### Getting Help
- Check the [Issues](../../issues) page
- Review the [Discussions](../../discussions) section
- Contact support at support@accio.com

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - UI framework
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Shadcn/UI](https://ui.shadcn.com/) - Component library
- [Vite](https://vitejs.dev/) - Build tool
- [Supabase](https://supabase.com/) - Backend services

---

**Built with ❤️ for accessibility, security, and performance.**

For questions or support, please open an issue or contact our team.

🚀 **Ready for production deployment!** ✨
