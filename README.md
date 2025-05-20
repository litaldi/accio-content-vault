
# Accio - Smart Content Organizer

Accio is a modern web application designed to help users save, organize, and retrieve online content using AI-powered organization.

![Accio](https://lovable.dev/opengraph-image-p98pqg.png)

## 🌟 Features

- **Content Saving**: Easily save articles, web pages, and other online content with a single click
- **AI-Powered Organization**: Automatically tag and categorize content using semantic analysis
- **Smart Search**: Find your saved content quickly with powerful search capabilities including semantic search
- **Collections**: Organize saved content into custom collections for better management
- **Responsive Design**: Access your content from any device with a fully responsive interface
- **Dark Mode**: Toggle between light and dark themes for comfortable reading in any environment
- **Accessibility**: WCAG 2.1 AA compliant with full keyboard navigation and screen reader support
- **Internationalization**: Support for multiple languages and RTL layouts
- **Security**: Input sanitization, CSRF protection, and secure authentication flows

## 📋 Requirements

- Node.js (v16 or higher)
- npm or yarn

## 🚀 Quick Start

### Local Development

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd accio
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
accio/
├── public/            # Static files
├── src/               # Source code
│   ├── components/    # Reusable UI components
│   │   ├── ui/        # Core UI components based on shadcn/ui
│   │   └── ...        # Feature-specific components
│   ├── contexts/      # React contexts for state management
│   ├── hooks/         # Custom React hooks
│   ├── lib/           # Utility libraries
│   ├── pages/         # Page components
│   ├── services/      # API services
│   └── types/         # TypeScript type definitions
├── tests/             # Test files
└── ...
```

## 🔧 Technologies

- **Framework**: React with TypeScript
- **Build Tool**: Vite
- **UI Components**: shadcn/ui (built on Radix UI)
- **Styling**: Tailwind CSS
- **State Management**: React Context API with React Query
- **Routing**: React Router
- **Icons**: Lucide React
- **Internationalization**: i18next
- **Testing**: Jest with Testing Library

## 🔐 Environment Variables

For local development and production, the following environment variables are needed:

```
VITE_SUPABASE_URL=<your-supabase-url>
VITE_SUPABASE_ANON_KEY=<your-supabase-anon-key>
```

## 📱 Features

### Authentication

The application offers user registration and login functionality:

1. Create an account with email/password
2. Log in to access personalized features
3. Reset password if forgotten

### Content Management

#### Saving Content

1. Enter a URL to save content from the web
2. Upload PDFs or images directly
3. Review auto-generated tags and summary
4. Add custom tags and notes

#### Search & Organization

- Full-text search across all saved content
- Semantic search for concept-based queries
- Filter by tags, date, and content type
- Create collections to group related content

### Settings & Preferences

- Toggle between light and dark themes
- Change language settings
- Customize accessibility options
- Manage account details

## 👨‍💻 Development

### Code Style

This project follows established React and TypeScript best practices:

- Functional components with hooks
- Strong typing with TypeScript
- Clean, modular code structure
- Component-driven design

### Adding New Features

Follow these steps when adding new features:

1. Create modular components in the appropriate directory
2. Use TypeScript for type safety
3. Style with Tailwind CSS following design patterns
4. Add tests for new functionality
5. Update documentation as needed

### Testing

Run the test suite with:

```bash
npm run test
# or
yarn test
```

## 🚢 Deployment

### Build for Production

```bash
npm run build
# or
yarn build
```

The output will be in the `dist` directory, ready for deployment.

## 🤝 Contributing

Contributions are welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Lovable](https://lovable.dev)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
