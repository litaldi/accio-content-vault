
# Accio - Smart Content Organizer

Accio is a modern web application designed to help users save, organize, and retrieve online content using AI-powered organization.

![Accio](https://lovable.dev/opengraph-image-p98pqg.png)

## Features

- **Content Saving**: Easily save articles, web pages, and other online content with a single click
- **AI-Powered Organization**: Automatically tag and categorize content using semantic analysis
- **Smart Search**: Find your saved content quickly with powerful search capabilities including semantic search
- **Collections**: Organize saved content into custom collections for better management
- **Responsive Design**: Access your content from any device with a fully responsive interface
- **Dark Mode**: Toggle between light and dark themes for comfortable reading in any environment

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Local Development Setup

1. Clone the repository:
   ```bash
   git clone <your-repository-url>
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

4. Open your browser and navigate to `http://localhost:8080`

## Project Structure

```
accio/
├── public/            # Static files
├── src/               # Source code
│   ├── components/    # Reusable UI components
│   ├── contexts/      # React contexts for state management
│   ├── hooks/         # Custom React hooks
│   ├── integrations/  # Third-party integrations
│   ├── lib/           # Utility libraries
│   ├── pages/         # Page components
│   ├── services/      # API services
│   └── types/         # TypeScript type definitions
├── supabase/          # Supabase configuration
└── ...
```

## Technologies Used

- **Framework**: React with TypeScript
- **Build Tool**: Vite
- **UI Components**: shadcn/ui (built on Radix UI)
- **Styling**: Tailwind CSS
- **Backend**: Supabase (authentication, database, storage)
- **State Management**: React Context API, React Query
- **Routing**: React Router
- **Icons**: Lucide React

## Usage

### Authentication

The application offers user registration and login functionality. To use personalized features, users need to create an account and log in.

### Saving Content

1. Navigate to the "Save" page
2. Enter a URL to save
3. Review the auto-generated tags and summary
4. Add your own tags if needed
5. Save the content to your library

### Searching and Organizing

- Use the search bar to find saved content
- Enable semantic search for concept-based searching
- Organize content into collections
- View analytics about your saved content

## Development

### Adding New Features

Follow these guidelines when adding new features:

1. Create modular components in the `components` directory
2. Use TypeScript for type safety
3. Style with Tailwind CSS
4. Add new pages in the `pages` directory
5. Update routes in `App.tsx`

### Environment Variables

The application uses the following environment variables:

- `VITE_SUPABASE_URL`: Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Supabase anonymous key

## Deployment

The application can be deployed using the Lovable platform:

1. Navigate to your project in Lovable
2. Click on Share -> Publish
3. Follow the deployment instructions

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with [Lovable](https://lovable.dev)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
