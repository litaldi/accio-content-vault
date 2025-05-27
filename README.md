
# Accio - AI-Powered Knowledge Engine

A modern, responsive web application built with React, TypeScript, and Tailwind CSS that helps users capture, organize, and discover knowledge with the power of AI.

## ✨ Features

- **🔐 Authentication System**: Secure login/logout with Supabase integration
- **📱 Responsive Design**: Mobile-first approach with clean, modern UI
- **🌙 Dark/Light Mode**: System-aware theme switching
- **🧠 AI-Powered Organization**: Smart content categorization and tagging
- **🔍 Smart Search**: Natural language search capabilities
- **📚 Collections Management**: Organize content into custom collections
- **📊 Analytics Dashboard**: Track usage and insights
- **♿ Accessibility**: WCAG 2.1 AA compliant with keyboard navigation
- **🔒 Security**: Input validation, error boundaries, and secure auth flows

## 🚀 Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Shadcn/UI components
- **Backend**: Supabase (Authentication, Database, Real-time)
- **State Management**: React Context, TanStack Query
- **Routing**: React Router v6
- **Testing**: Jest, React Testing Library
- **Build Tool**: Vite
- **Package Manager**: npm

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── auth/           # Authentication components
│   ├── navigation/     # Navigation components
│   ├── ui/             # Base UI components (shadcn/ui)
│   └── ...
├── contexts/           # React contexts (Auth, Theme)
├── hooks/              # Custom React hooks
├── pages/              # Page components
├── lib/                # Utility functions
├── integrations/       # External service integrations
└── __tests__/          # Test files
```

## 🛠️ Development

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account (for backend features)

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd accio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests
- `npm run lint` - Lint code
- `npm run type-check` - Check TypeScript types

## 🎨 Design System

The app uses a consistent design system with:

- **Typography**: Responsive text scales with semantic sizing
- **Colors**: Primary/secondary color scheme with dark mode support
- **Spacing**: Consistent spacing scale using Tailwind CSS
- **Components**: Reusable components built on shadcn/ui
- **Icons**: Lucide React icon library
- **Animations**: Smooth transitions and micro-interactions

## 🔐 Authentication

The app includes a complete authentication system:

- **Email/Password signup and login**
- **Secure session management**
- **Protected routes**
- **User profile management**
- **Password reset functionality**

## 📱 Responsive Design

- **Mobile-first approach**
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Touch-friendly interface**
- **Optimized for all screen sizes**

## ♿ Accessibility

- **WCAG 2.1 AA compliance**
- **Keyboard navigation support**
- **Screen reader compatibility**
- **High contrast support**
- **Focus management**
- **Semantic HTML structure**

## 🚀 Deployment

The app is optimized for deployment on:

- **Vercel** (recommended)
- **Netlify**
- **Static hosting services**

Build the app with `npm run build` and deploy the `dist` folder.

## 🧪 Testing

- **Unit tests**: Jest + React Testing Library
- **Component tests**: Testing user interactions
- **Accessibility tests**: Automated a11y testing
- **E2E tests**: Critical user flows

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if needed
5. Submit a pull request

## 📞 Support

For support or questions:
- Check the Help section in the app
- Contact support through the app
- Review documentation

---

Built with ❤️ using modern web technologies.
