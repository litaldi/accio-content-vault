
# Accio - AI Knowledge Engine

A modern, accessible web application for intelligent knowledge management powered by AI.

## 🚀 Features

- **AI-Powered Organization**: Automatically categorize and tag your saved content
- **Semantic Search**: Find information using natural language queries
- **Responsive Design**: Works seamlessly across desktop, tablet, and mobile devices
- **Full Accessibility**: WCAG 2.1 AA compliant with comprehensive keyboard navigation
- **Dark/Light Mode**: Complete theme support with system preference detection
- **Modern UI**: Built with Tailwind CSS and shadcn/ui components

## 🏗️ Architecture

### Navigation System

The application features a completely rebuilt navigation system with:

- **MainNavigation Component**: Clean, semantic navigation with full accessibility
- **Responsive Design**: Horizontal navigation on desktop, hamburger menu on mobile
- **Authentication Aware**: Dynamic menu items based on user login status
- **Keyboard Navigation**: Full support for Tab, Enter, Esc, and arrow keys
- **Screen Reader Support**: Proper ARIA labels and semantic HTML structure

### Menu Structure

**Main Navigation Items:**
- Home (/)
- Dashboard (/dashboard) - authenticated users only
- Save Content (/save) - authenticated users only
- Collections (/collections) - authenticated users only
- Analytics (/analytics) - authenticated users only
- Help (/help)

**Account Items:**
- Profile (/profile) - authenticated users only
- Settings (/settings) - authenticated users only
- Sign In (/login) - guest users only
- Sign Out - authenticated users only

**Call-to-Action:**
- Start Now (primary CTA for registration)
- Try Demo (secondary CTA for product demo)

### Accessibility Features

- **Skip Links**: Quick navigation to main content areas
- **ARIA Labels**: Comprehensive labeling for screen readers
- **Focus Management**: Proper focus indicators and keyboard navigation
- **Color Contrast**: WCAG AA compliant color combinations
- **Semantic HTML**: Proper use of nav, main, section, and other semantic elements
- **Screen Reader Announcements**: Dynamic content updates announced to assistive technology

### Component Structure

```
src/
├── components/
│   ├── navigation/
│   │   ├── MainNavigation.tsx       # Main navigation component
│   │   └── index.ts                 # Exports
│   ├── accessibility/
│   │   ├── SkipToContent.tsx        # Skip navigation links
│   │   ├── AccessibilityButton.tsx  # Accessibility controls
│   │   └── EnhancedAccessibility.tsx # Main accessibility features
│   ├── marketing/
│   │   ├── ValueProposition.tsx     # Hero section content
│   │   ├── SocialProof.tsx          # Testimonials and stats
│   │   └── FeaturesShowcase.tsx     # Feature highlights
│   └── ui/                          # shadcn/ui components
├── contexts/
│   ├── AuthContext.tsx              # Authentication state management
│   └── AccessibilityContext.tsx     # Accessibility preferences
├── pages/
│   ├── Index.tsx                    # Homepage
│   ├── About.tsx                    # About page
│   ├── Features.tsx                 # Features page
│   ├── Pricing.tsx                  # Pricing page
│   ├── Help.tsx                     # Help center
│   └── FAQ.tsx                      # FAQ page
└── hooks/
    ├── use-mobile.ts                # Mobile detection
    └── use-responsive-design.ts     # Responsive utilities
```

## 🎨 Design System

### Typography
- **Primary Font**: Inter (optimized for web)
- **Font Weights**: 300, 400, 500, 600, 700, 800, 900
- **Responsive Text**: Scalable typography with proper line heights

### Colors
- **Primary**: Blue-based gradient system
- **Secondary**: Neutral grays with proper contrast
- **Accent**: Green for success, red for errors, yellow for warnings
- **Dark Mode**: Complete dark theme support

### Components
- **Buttons**: Multiple variants with hover states and accessibility features
- **Cards**: Consistent spacing and elevation
- **Forms**: Accessible form controls with validation
- **Navigation**: Clean, modern navigation patterns

## 🔧 Development

### Technologies Used
- **React 18**: Latest React with TypeScript
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: High-quality React components
- **React Router**: Client-side routing
- **Lucide React**: Icon library

### Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

### Code Quality
- **TypeScript**: Full type safety
- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting
- **Modular Architecture**: Clean separation of concerns

## ♿ Accessibility

This application is built with accessibility as a core requirement:

- **WCAG 2.1 AA Compliance**: Meets international accessibility standards
- **Keyboard Navigation**: Full keyboard support for all interactive elements
- **Screen Reader Support**: Proper semantic markup and ARIA labels
- **Focus Management**: Clear focus indicators and logical tab order
- **Color Contrast**: Exceeds minimum contrast requirements
- **Responsive Text**: Text scales properly for users with visual impairments
- **Alternative Text**: All images include descriptive alt text
- **Form Labels**: All form inputs properly labeled and associated

### Accessibility Testing
- Test with keyboard-only navigation
- Verify with screen readers (NVDA, JAWS, VoiceOver)
- Check color contrast ratios
- Validate HTML semantics
- Test with users who have disabilities

## 🌐 Internationalization

The application is prepared for internationalization:
- **Semantic HTML**: Language attributes properly set
- **RTL Support**: Right-to-left text direction support
- **Unicode**: Full Unicode character support
- **Locale-Aware**: Date, time, and number formatting

## 📱 Responsive Design

Mobile-first approach with breakpoints:
- **Mobile**: 0-640px
- **Tablet**: 641-1024px
- **Desktop**: 1025px+
- **Large Desktop**: 1440px+

## 🚀 Performance

- **Code Splitting**: Dynamic imports for optimal loading
- **Image Optimization**: Responsive images with proper loading
- **CSS Optimization**: Purged unused styles
- **Bundle Analysis**: Optimized bundle sizes
- **Lazy Loading**: Components loaded on demand

## 🔒 Security

- **Content Security Policy**: Implemented CSP headers
- **HTTPS Only**: All communications encrypted
- **Input Validation**: Client and server-side validation
- **XSS Protection**: Cross-site scripting prevention

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Ensure accessibility compliance
5. Test thoroughly
6. Submit a pull request

## 📞 Support

For questions or support, please visit our Help Center or contact our support team.

---

Built with ❤️ and a commitment to accessibility and inclusive design.
