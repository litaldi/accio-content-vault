
# Accio - AI-Powered Knowledge Management Platform

A modern, dark-mode-only knowledge management platform that helps professionals organize and access information through advanced AI capabilities.

## 🌟 Features

### Core Functionality
- **AI-Powered Organization**: Automatic content categorization and tagging
- **Semantic Search**: Find content by describing what you remember
- **Universal Capture**: Save content from anywhere with browser extensions and mobile apps
- **Smart Collections**: Dynamic content organization that adapts to your needs

### Advanced Capabilities
- **Knowledge Analytics**: Insights into learning patterns and information consumption
- **Team Collaboration**: Share collections and collaborate on knowledge bases
- **Offline Access**: Access important content without internet connection
- **Enterprise Security**: Bank-level encryption and compliance standards
- **API Integration**: Connect with favorite tools and automate workflows
- **Cross-Platform Sync**: Seamless synchronization across all devices

## 🎨 Design System

### Dark Mode Only
- Fully optimized for dark mode with professional color scheme
- Consistent visual hierarchy and typography throughout
- Accessible contrast ratios meeting WCAG 2.1 AA standards

### Responsive Design
- Mobile-first approach with optimized layouts for all devices
- Touch-friendly interface with proper target sizes
- Smooth animations and transitions

### Accessibility
- Full keyboard navigation support
- ARIA attributes and semantic HTML structure
- Screen reader compatibility
- Focus indicators and skip links
- High contrast support

## 🚀 Technology Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + Custom Design System
- **UI Components**: Shadcn/ui
- **State Management**: React Query (TanStack Query)
- **Authentication**: Supabase Auth
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Meta Tags**: React Helmet Async

## 📁 Project Structure

```
src/
├── components/
│   ├── navigation/          # Professional navigation system
│   ├── layout/             # Layout components
│   ├── ui/                 # Reusable UI components
│   ├── accessibility/      # Accessibility features
│   └── theme/              # Dark mode theme provider
├── pages/                  # Route components
├── contexts/               # React contexts (Auth, Accessibility)
├── hooks/                  # Custom React hooks
├── styles/                 # Global styles and utilities
└── utils/                  # Utility functions
```

## 🔧 Key Improvements Made

### 1. User Experience (UX)
- ✅ Simplified user flows across all pages
- ✅ Intuitive navigation with clear visual hierarchy
- ✅ Onboarding cues and helpful tooltips
- ✅ Professional loading states and feedback

### 2. User Interface (UI)
- ✅ Unified design system with consistent spacing and typography
- ✅ Dark-mode-only color scheme with elegant deep backgrounds
- ✅ Improved visual hierarchy and content grouping
- ✅ Professional card designs and interactive elements

### 3. Navigation System
- ✅ Completely rebuilt navigation from scratch
- ✅ Responsive design with mobile-friendly hamburger menu
- ✅ Context-aware navigation (different for authenticated users)
- ✅ Proper ARIA attributes and keyboard navigation

### 4. Accessibility (WCAG 2.1 AA)
- ✅ Semantic HTML structure throughout
- ✅ Full keyboard navigation support
- ✅ Proper focus indicators and skip links
- ✅ Screen reader compatibility
- ✅ High contrast support for dark mode

### 5. Responsiveness
- ✅ Mobile-first responsive design
- ✅ Optimized for desktop, tablet, and mobile
- ✅ Touch-friendly interactive elements
- ✅ Proper spacing and layout on all breakpoints

### 6. Performance & Code Quality
- ✅ Removed RTL support to reduce complexity
- ✅ Optimized bundle size with lazy loading
- ✅ Clean, modular component architecture
- ✅ Professional loading states and error handling

### 7. Marketing & Engagement
- ✅ Compelling homepage with clear value proposition
- ✅ Professional testimonials and trust indicators
- ✅ Clear call-to-action buttons throughout
- ✅ Optimized metadata for SEO and social sharing

### 8. Dark Mode Consistency
- ✅ All components styled for dark mode only
- ✅ Removed light mode code and unused styles
- ✅ Consistent theming across all pages and states
- ✅ Professional dark color palette

## 🛠️ Development

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 🚀 Deployment

The application is optimized for deployment on modern hosting platforms like:
- Vercel
- Netlify
- AWS Amplify
- Cloudflare Pages

## 📝 Environment Variables

No environment variables are required for the frontend. All configuration is handled through the Supabase integration if authentication is needed.

## 🎯 Performance Optimizations

- Lazy loading of route components
- Optimized image loading
- Efficient CSS-in-JS with Tailwind
- Minimal JavaScript bundle size
- Professional caching strategies

## 🔒 Security

- CSP headers ready for production
- XSS protection through React's built-in sanitization
- Secure authentication through Supabase
- No sensitive data in client-side code

## 📱 Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

---

Built with ❤️ for professional knowledge management
