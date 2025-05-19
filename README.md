
# Accio - Smart Content Organizer

![Accio Logo](https://lovable.dev/opengraph-image-p98pqg.png)

Accio is an intelligent web application that helps users organize and retrieve their online content with AI-powered tagging and semantic search capabilities. Save articles, PDFs, images, and more in one centralized library, then find exactly what you need when you need it.

## 🔗 Live Demo

[View Live Demo](https://accio.lovable.app) *(Replace with your actual deployment URL)*

## ✨ Features

- **Natural Language Search** - Find content by asking questions in plain English
- **AI-Powered Tagging** - Automatic categorization of content with relevant tags
- **Multiple Content Types** - Save links, upload PDFs, or add images
- **One-Click Saving** - Easily save content from anywhere
- **Semantic Search** - Find content based on meaning, not just keywords
- **Collections** - Organize content into custom collections
- **Analytics Dashboard** - Track your content consumption patterns
- **Responsive Design** - Optimized for all devices from mobile to desktop
- **Free & Pro Tiers** - Flexible options to meet different needs

## 🚀 Installation

### Prerequisites

- Node.js (v16.x or later)
- npm or yarn

### Setup Instructions

```bash
# Clone the repository
git clone https://github.com/your-username/accio.git
cd accio

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at `http://localhost:8080`

## 📁 Folder Structure

```
src/
├── components/        # Reusable UI components
│   ├── home/          # Homepage-specific components
│   ├── navigation/    # Navigation components
│   ├── ui/            # Shadcn UI components
│   └── ...
├── contexts/          # React Context providers
├── hooks/             # Custom React hooks
├── lib/               # Utility libraries and functions
├── pages/             # Page components
├── security/          # Security configurations
├── services/          # API service layers
├── types/             # TypeScript type definitions
└── utils/             # Helper functions
```

## 🛠️ Tech Stack

- **Framework**: React with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI
- **Routing**: React Router DOM
- **Backend/Auth**: Supabase
- **Data Fetching**: TanStack Query (React Query)
- **Charts**: Recharts
- **Icons**: Lucide React
- **Form Handling**: React Hook Form with Zod
- **Testing**: Jest with React Testing Library

## ♿ Accessibility & Security

- WCAG 2.1 compliant components with proper ARIA attributes
- Comprehensive keyboard navigation support
- Color contrast compliance
- Content Security Policy implementation
- Input sanitization and validation
- Strict transport security headers
- Protection against XSS attacks
- Regular security audits

## 🔐 Environment Variables

Create a `.env` file in the root directory with the following variables:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 📜 Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview the production build
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Generate test coverage report
- `npm run test:ci` - Run tests in CI environment

## 🧪 Testing

This project uses Jest and React Testing Library for unit and component testing. Test files are located in the `src/__tests__` directory.

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate test coverage report
npm run test:coverage
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

See our [Contributing Guidelines](CONTRIBUTING.md) for more details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgements

- [Shadcn UI](https://ui.shadcn.com/) for the excellent component library
- [Lucide Icons](https://lucide.dev/) for the beautiful icon set
- [TanStack Query](https://tanstack.com/query) for data fetching utilities
- [Tailwind CSS](https://tailwindcss.com/) for styling framework
- [Supabase](https://supabase.io/) for backend services
- [Lovable](https://lovable.dev/) for development platform

---

Made with ❤️ by Your Team Name
