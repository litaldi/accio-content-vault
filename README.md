
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
- **Responsive Design**: Works seamlessly across desktop, tablet, and mobile devices

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
│   │   ├── home/        # Homepage-specific components
│   │   ├── ui/          # Shadcn UI components
│   │   └── ...
│   ├── contexts/        # React context providers
│   ├── hooks/           # Custom React hooks
│   ├── pages/           # Page components
│   ├── services/        # API services
│   ├── types/           # TypeScript types
│   ├── utils/           # Helper functions
│   ├── App.tsx          # Main app component
│   └── main.tsx         # Entry point
├── .env.example         # Environment variables example
├── index.html           # HTML entry point
└── package.json         # Dependencies and scripts
```

## Accessibility & Best Practices

Accio is built with accessibility as a priority. The application follows:

- **WCAG 2.1 AA standards** for accessibility
- **Responsive design** principles for all screen sizes
- **Semantic HTML** for improved screen reader experience
- **Keyboard navigation** support throughout the app
- **Color contrast** compliance for readability
- **Focus management** for better keyboard and screen reader use

The codebase also adheres to modern web development best practices:

- Component-based architecture
- Proper state management
- Performance optimization
- Comprehensive error handling
- Security best practices

## Testing

Run the test suite:

```bash
npm run test
# or
yarn test
# or
bun test
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## Support

If you encounter any issues or have questions, please file an issue on the GitHub repository or contact the team at support@accioapp.com.
