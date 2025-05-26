
# Accio - AI Knowledge Engine

Transform scattered information into organized intelligence. Accio is an AI-powered knowledge management platform that helps you save, organize, and rediscover everything that matters.

## 🌟 Features

### Core Functionality
- **One-Click Save**: Save anything from any website with browser extension or mobile app
- **AI Organization**: Automatic categorization and tagging of content
- **Intelligent Search**: Semantic search that understands context and meaning
- **Knowledge Analytics**: Track learning patterns and discover insights
- **Smart Collections**: Dynamic collections that auto-organize related content

### Accessibility (WCAG 2.1 AA Compliant)
- **Skip Navigation**: Quick access links for keyboard users
- **Screen Reader Support**: Full compatibility with assistive technologies
- **High Contrast Mode**: Enhanced visibility for users with visual impairments
- **Keyboard Navigation**: Complete keyboard accessibility
- **Responsive Design**: Works on all devices and screen sizes
- **Theme Support**: Light, dark, and system theme preferences
- **Font Size Controls**: Adjustable text size for better readability
- **Reduced Motion**: Respects user preferences for animation

### Technical Features
- **Responsive Design**: Mobile-first approach with breakpoint-specific layouts
- **Progressive Web App**: Installable with offline capabilities
- **Performance Optimized**: Fast loading with optimized assets
- **SEO Optimized**: Comprehensive meta tags and structured data
- **Dark/Light Theme**: System-aware theme switching
- **Secure**: Privacy-first approach with data encryption

## 🏗️ Architecture

### Tech Stack
- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui components
- **Icons**: Lucide React
- **Routing**: React Router
- **State Management**: React Context API
- **Accessibility**: Custom accessibility context and components
- **SEO**: React Helmet Async

### Project Structure
```
src/
├── components/
│   ├── accessibility/          # Accessibility-specific components
│   ├── layout/                # Layout components (footer, etc.)
│   ├── marketing/             # Marketing page components
│   ├── navigation/            # Navigation components
│   ├── theme/                 # Theme provider and components
│   └── ui/                    # Reusable UI components
├── contexts/                  # React contexts
├── hooks/                     # Custom React hooks
├── pages/                     # Page components
├── lib/                       # Utility functions
└── styles/                    # Global styles
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
4. Open http://localhost:5173

### Environment Setup
Create a `.env.local` file with:
```
VITE_APP_NAME=Accio
VITE_APP_URL=https://accio.app
```

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: 1024px - 1440px
- **Large**: 1440px+

### Mobile-First Approach
- Touch-friendly interface elements
- Optimized navigation for small screens
- Responsive typography and spacing
- Mobile-specific gestures and interactions

## ♿ Accessibility Features

### WCAG 2.1 AA Compliance
- **Color Contrast**: All text meets minimum contrast ratios
- **Keyboard Navigation**: Full site accessibility via keyboard
- **Screen Readers**: Semantic HTML and ARIA labels
- **Focus Management**: Clear focus indicators and logical tab order
- **Alternative Text**: Descriptive alt text for all images
- **Headings**: Proper heading hierarchy (h1-h6)

### Accessibility Toolbar
- Font size adjustment (small, medium, large)
- Line spacing controls (normal, relaxed, loose)
- High contrast mode toggle
- Grayscale mode for focus enhancement
- Reduced motion preferences
- Screen reader optimization

### Skip Links
- Skip to main content
- Skip to navigation
- Skip to footer
- Skip to search

## 🎨 Design System

### Color Palette
- **Primary**: Blue gradient (#3B82F6 to variants)
- **Secondary**: Muted grays and accent colors
- **Success**: Green (#10B981)
- **Warning**: Yellow (#F59E0B)
- **Error**: Red (#EF4444)

### Typography
- **Headings**: Bold, clear hierarchy
- **Body Text**: Readable, appropriate line height
- **UI Text**: Consistent sizing and spacing

### Components
- Built with shadcn/ui component library
- Consistent styling and behavior
- Accessible by default
- Theme-aware (light/dark mode)

## 🔍 SEO Optimization

### Meta Tags
- Comprehensive title and description tags
- Open Graph tags for social sharing
- Twitter Card meta tags
- Canonical URLs
- Language and region targeting

### Structured Data
- Organization schema markup
- WebApplication schema
- Breadcrumb navigation
- Article markup for blog posts

### Performance
- Optimized images and assets
- Lazy loading implementation
- Minimized bundle sizes
- Fast loading times

## 🌐 Browser Support

### Modern Browsers
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Mobile Browsers
- iOS Safari 14+
- Chrome Mobile 90+
- Samsung Internet 14+

## 📊 Performance Metrics

### Core Web Vitals
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

### Lighthouse Scores
- **Performance**: 90+
- **Accessibility**: 100
- **Best Practices**: 90+
- **SEO**: 100

## 🧪 Testing

### Accessibility Testing
- Automated testing with axe-core
- Manual keyboard navigation testing
- Screen reader testing (NVDA, JAWS, VoiceOver)
- Color contrast validation

### Cross-Browser Testing
- BrowserStack integration
- Mobile device testing
- Responsive design validation

## 🚀 Deployment

### Build Process
1. Run `npm run build`
2. Static files generated in `dist/`
3. Deploy to CDN or static hosting

### Recommended Platforms
- **Vercel**: Automatic deployments with GitHub integration
- **Netlify**: Static site hosting with form handling
- **CloudFlare Pages**: Global CDN with edge computing

## 📈 Analytics & Monitoring

### Performance Monitoring
- Core Web Vitals tracking
- Real user monitoring (RUM)
- Error tracking and reporting

### Accessibility Monitoring
- Automated accessibility testing in CI/CD
- Regular accessibility audits
- User feedback collection

## 🤝 Contributing

### Code Standards
- TypeScript for type safety
- ESLint and Prettier for code formatting
- Conventional commits for version control
- Component-driven development

### Accessibility Guidelines
- Test with keyboard navigation
- Verify screen reader compatibility
- Check color contrast ratios
- Validate semantic HTML structure

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- shadcn/ui for the component library
- Lucide for the icon system
- Tailwind CSS for the utility-first CSS framework
- React team for the amazing framework

---

## Recent Updates (Latest Improvements)

### Navigation & UX Improvements
- ✅ Rebuilt main navigation with improved accessibility
- ✅ Added comprehensive skip links for keyboard users
- ✅ Implemented responsive navigation with mobile-first design
- ✅ Enhanced user menu with proper ARIA attributes
- ✅ Added theme switcher with system preference detection

### Accessibility Enhancements
- ✅ WCAG 2.1 AA compliance across all components
- ✅ Enhanced accessibility toolbar with font/spacing controls
- ✅ Improved keyboard navigation and focus management
- ✅ Screen reader optimizations and announcements
- ✅ High contrast and reduced motion support

### New Pages & Features
- ✅ Created comprehensive Features page
- ✅ Added detailed Pricing page with FAQ section
- ✅ Improved footer with organized link structure
- ✅ Enhanced homepage with better user flows

### Performance & Code Quality
- ✅ Optimized component structure and modularity
- ✅ Improved loading performance and bundle size
- ✅ Enhanced SEO with structured data and meta tags
- ✅ Clean code architecture with proper TypeScript types

### Design System
- ✅ Consistent color palette and typography
- ✅ Responsive design patterns across all breakpoints
- ✅ Smooth animations with reduced motion support
- ✅ Professional visual hierarchy and spacing

For the most up-to-date information and detailed documentation, visit our [website](https://accio.app) or check the latest commit messages.
