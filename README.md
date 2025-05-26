
# Accio - Digital Content Management

![Accio Logo](public/favicon.ico)

## Overview

Accio is a powerful web application that helps users organize, tag, and search through their digital content collection. It serves as your personal digital librarian, making it easy to save, categorize, and rediscover valuable online resources.

## Key Features

- **Save Online Content**: Easily save articles, webpages, and files with a single click
- **AI-Powered Tagging**: Automatic categorization of your content for easy organization
- **Smart Search**: Find your content with keywords or natural language questions
- **Upload Files**: Add PDFs and images directly to your collection
- **Collections**: Organize saved content into custom collections
- **Analytics**: Track your reading habits and content consumption
- **Dark/Light Mode**: Seamless theme switching with consistent design across all components
- **Accessibility First**: WCAG 2.1 AA compliant with comprehensive keyboard navigation and screen reader support
- **Responsive Design**: Works seamlessly across desktop, tablet, and mobile devices

## Recent Updates

### Language Support
- **English Only**: Simplified to support English only for better performance and maintainability
- **Removed Multilingual**: Cleaned up translation files and i18n logic to focus on core functionality

### Theme System
- **Synchronized Themes**: Light and Dark modes now have consistent design and functionality
- **Smooth Transitions**: Enhanced theme switching with proper color inheritance
- **System Theme Support**: Automatic detection of user's preferred color scheme

### Code Quality Improvements
- **Accessibility Enhanced**: Full WCAG 2.1 AA compliance with improved ARIA attributes
- **Security Hardened**: Input sanitization, secure routing, and OWASP compliance
- **Test Coverage**: Added unit tests for navigation and accessibility utilities
- **Code Cleanup**: Removed duplicate code and unused components

## Tech Stack

### Frontend
- React 18 with TypeScript
- Tailwind CSS for styling
- Shadcn UI component library
- React Router for navigation
- TanStack Query for data fetching
- React Hook Form for form management

### Tools & Libraries
- Vite for fast development and optimized builds
- Lucide React for icons
- React Helmet for SEO management
- Recharts for analytics visualizations
- Date-fns for date manipulation
- Zod for schema validation
- Jest for testing
- Jest-axe for accessibility testing

## Installation

### Prerequisites

- Node.js 16+ and npm/yarn/bun
- Git

### Setup Instructions

1. Clone the repository
```bash
git clone https://github.com/yourusername/accio.git
cd accio
```

2. Install dependencies
```bash
npm install
# or
yarn install
# or
bun install
```

3. Create a `.env` file based on `.env.example`
```bash
cp .env.example .env
```

4. Start the development server
```bash
npm run dev
# or
yarn dev
# or
bun dev
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser

## Testing

Run the test suite:

```bash
npm run test
# or
yarn test
# or
bun test
```

### Test Types

- **Unit Tests**: Component and utility function testing
- **Accessibility Tests**: Automated a11y testing with jest-axe
- **Integration Tests**: End-to-end user flow testing

Run specific test types:

```bash
# Run accessibility tests only
npm run test:a11y

# Run unit tests only
npm run test:unit

# Run with coverage
npm run test:coverage

# Watch mode for development
npm run test:watch
```

## Deployment

### Building for Production

```bash
npm run build
# or
yarn build
# or
bun build
```

### Deploying to Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project directory
3. Follow the prompts to deploy

### Deploying to Netlify

1. Create a `netlify.toml` file in the root directory:
```toml
[build]
  publish = "dist"
  command = "npm run build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```
2. Connect your GitHub repo to Netlify
3. Configure build settings as above

## Project Structure

```
accio/
├── public/              # Static files
├── src/                 # Source code
│   ├── components/      # UI components
│   │   ├── navigation/  # Navigation components
│   │   ├── layout/      # Layout components
│   │   ├── ui/          # Shadcn UI components
│   │   └── ...
│   ├── contexts/        # React context providers
│   ├── hooks/           # Custom React hooks
│   ├── pages/           # Page components
│   ├── services/        # API services
│   ├── types/           # TypeScript types
│   ├── utils/           # Helper functions
│   ├── __tests__/       # Test files
│   ├── App.tsx          # Main app component
│   └── main.tsx         # Entry point
├── .env.example         # Environment variables example
├── jest.config.ts       # Jest configuration
├── jest.setup.ts        # Jest setup file
├── index.html           # HTML entry point
└── package.json         # Dependencies and scripts
```

## Accessibility & Security

### Accessibility Features
Accio is built with accessibility as a priority and follows:

- **WCAG 2.1 AA standards** for accessibility compliance
- **Semantic HTML** for improved screen reader experience
- **Keyboard navigation** support throughout the app
- **ARIA attributes** for better assistive technology support
- **Color contrast** compliance for readability
- **Focus management** for better keyboard and screen reader use
- **Skip links** for easy navigation
- **Screen reader announcements** for important actions

### Security Features
The application implements comprehensive security measures:

- **Input Sanitization**: All user inputs are properly sanitized and validated
- **Secure Routing**: Protected routes and proper authentication checks
- **OWASP Compliance**: Following OWASP Top 10 security guidelines
- **Content Security Policy**: Implemented CSP headers for XSS protection
- **Environment Variables**: Sensitive configuration stored securely

## Development Best Practices

The codebase adheres to modern web development best practices:

- **Component-based Architecture**: Modular and reusable components
- **TypeScript**: Full type safety throughout the application
- **Proper State Management**: Efficient state handling with React Context
- **Performance Optimization**: Code splitting and lazy loading
- **Comprehensive Testing**: Unit, integration, and accessibility tests
- **Clean Code**: Well-documented and maintainable codebase

## Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Testing
npm run test         # Run all tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage
npm run test:a11y    # Run accessibility tests
npm run test:unit    # Run unit tests only

# Linting and Formatting
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## Support

If you encounter any issues or have questions, please file an issue on the GitHub repository or contact the team at support@accioapp.com.
