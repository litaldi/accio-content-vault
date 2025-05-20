
# Contributing to Accio

First of all, thank you for considering contributing to Accio! This document provides guidelines and instructions for contributing to the project.

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct. Please be respectful and considerate of other contributors.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone <your-fork-url>`
3. Install dependencies: `npm install` or `yarn install`
4. Create a new branch for your feature: `git checkout -b feature/your-feature-name`

## Development Environment

- Run the development server: `npm run dev` or `yarn dev`
- Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
accio/
├── public/            # Static files
├── src/               # Source code
│   ├── components/    # Reusable UI components
│   │   ├── ui/        # Core UI components
│   ├── contexts/      # React contexts for state management
│   ├── hooks/         # Custom React hooks
│   ├── lib/           # Utility libraries
│   ├── pages/         # Page components
│   ├── services/      # API services
│   └── types/         # TypeScript type definitions
├── tests/             # Test files
└── ...
```

## Coding Standards

### General Guidelines

- Follow the existing code style and naming conventions
- Keep files focused on a single responsibility
- Write meaningful comments for complex logic
- Use TypeScript types for all components and functions

### Component Structure

- Use functional components with React hooks
- Keep components small and focused
- Extract reusable parts into separate components
- Use `data-testid` attributes for components that should be tested

### TypeScript

- Create interfaces or types for component props
- Use proper type annotations for functions and variables
- Avoid using `any` type unless absolutely necessary
- Place shared types in the `types` directory

### CSS/Styling

- Use Tailwind CSS for styling components
- Follow the project's color scheme and design system
- Use responsive design principles for all components

## Testing

- Write unit tests for components and utilities
- Place test files in the `tests` directory
- Run tests with `npm run test` or `yarn test`

## Pull Request Process

1. Update your fork with the latest changes from the main repository
2. Ensure your code follows the project's coding standards
3. Update documentation if necessary
4. Test your changes locally
5. Submit a pull request with a clear description of your changes

## Accessibility Standards

- Follow WCAG 2.1 AA guidelines
- Use semantic HTML elements
- Add proper ARIA attributes where necessary
- Ensure keyboard navigation works for all interactive elements
- Test with screen readers if possible

## Security Best Practices

- Sanitize all user inputs to prevent XSS attacks
- Use CSRF tokens for forms
- Don't expose sensitive information in client-side code
- Follow secure authentication practices

## Performance Considerations

- Optimize image sizes and use modern formats
- Implement lazy loading for off-screen components
- Keep bundle size minimal by avoiding unnecessary dependencies
- Use memoization for expensive calculations

Thank you for contributing to Accio!
