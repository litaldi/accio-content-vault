
# Accio - Digital Content Management

![Accio Logo](public/favicon.ico)

Accio is a powerful web application that helps users organize, tag, and search through their digital content collection.

## Features

- **Save Online Content**: Easily save articles, webpages, and files with a single click
- **AI-Powered Tagging**: Automatic categorization of your content for easy organization
- **Smart Search**: Find your content with keywords or natural language questions
- **Upload Files**: Add PDFs and images directly to your collection
- **Responsive Design**: Works seamlessly across desktop, tablet, and mobile devices

## Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn/bun
- A modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

1. Clone the repository
```
git clone https://github.com/yourusername/accio.git
cd accio
```

2. Install dependencies
```
npm install
# or
yarn install
# or
bun install
```

3. Create a `.env` file based on `.env.example`
```
cp .env.example .env
```

4. Start the development server
```
npm run dev
# or
yarn dev
# or
bun dev
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser

### Building for Production

```
npm run build
# or
yarn build
# or
bun build
```

## Testing

Run the test suite:

```
npm run test
# or
yarn test
# or
bun test
```

## Deployment

The application can be deployed to any static hosting service or containerized for cloud deployment.

## Tech Stack

- **React**: Frontend library for building user interfaces
- **TypeScript**: Static typing for more robust code
- **Tailwind CSS**: Utility-first CSS framework
- **Shadcn UI**: Component library with accessible UI elements
- **Vite**: Build tool and development server
- **React Router**: Client-side routing
- **TanStack Query**: Data fetching and state management
- **Supabase** (optional): Backend services including authentication and database

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
