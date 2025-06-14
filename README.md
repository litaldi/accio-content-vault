
# Accio - AI-Powered Knowledge Engine

Transform scattered information into organized intelligence with Accio's AI-powered knowledge management platform. Save, organize, and rediscover everything that matters with intelligent automation and semantic search.

## 🌟 Features

### Core Knowledge Management
- **Smart Content Saving**: Save URLs, documents, and notes with automatic metadata extraction
- **AI-Powered Tagging**: Automatic content categorization and tag suggestions
- **Intelligent Organization**: AI learns your patterns and organizes content automatically

### AI-Enhanced Search & Discovery
- **Semantic Search**: Natural language queries that understand intent and context
- **Voice Search**: Hands-free content discovery with speech recognition
- **Smart Recommendations**: Personalized content suggestions based on your interests
- **Enhanced Filtering**: Time-based, content-type, and tag-based filtering

### Advanced AI Features
- **Auto-Generated Summaries**: AI creates concise summaries of your content
- **Content Analysis**: Deep insights into your knowledge patterns and gaps
- **Natural Language Processing**: Understands questions and provides relevant answers
- **Smart Suggestions**: Context-aware query completions and recommendations

### User Experience
- **Distraction-Free Reading**: Immersive reading mode with customizable settings
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark/Light Themes**: Adaptive theming with user preferences
- **Accessibility**: WCAG compliant with keyboard navigation and screen reader support

### Personalization & Analytics
- **Dashboard Customization**: Personalize your workspace and preferences
- **Reading Analytics**: Track reading time and content engagement
- **Achievement System**: Gamified experience with progress tracking
- **Usage Insights**: Understand your knowledge consumption patterns

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd accio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to see the application

### Environment Setup

For full functionality, you may need to configure:
- **Supabase**: Backend database and authentication
- **OpenAI API**: For AI-powered features and summaries
- **Voice Recognition**: Browser-based speech recognition (no setup required)

## 🏗️ Architecture

### Frontend Stack
- **React 18**: Modern React with hooks and concurrent features
- **TypeScript**: Type-safe development with excellent IDE support
- **Tailwind CSS**: Utility-first styling with custom design system
- **Shadcn/UI**: High-quality, accessible component library
- **Vite**: Fast development and optimized production builds

### AI & Intelligence
- **Natural Language Processing**: Query understanding and intent recognition
- **Semantic Search**: Content matching based on meaning, not just keywords
- **Machine Learning**: Pattern recognition for content categorization
- **Voice Recognition**: Browser Web Speech API integration

### State Management
- **React Context**: Authentication and global state management
- **Custom Hooks**: Reusable logic for search, content, and AI features
- **Local Storage**: User preferences and offline capability

### Performance & Quality
- **Code Splitting**: Optimized bundle loading
- **Error Boundaries**: Graceful error handling and recovery
- **Accessibility**: WCAG 2.1 AA compliance
- **Testing**: Comprehensive unit and integration tests

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── summaries/       # AI summary components
│   ├── search/          # Search and discovery features
│   ├── reading/         # Reading experience components
│   └── dashboard/       # Dashboard and personalization
├── services/            # Business logic and AI services
│   ├── aiTaggingService.ts
│   ├── summaryService.ts
│   ├── enhancedSearchService.ts
│   └── naturalLanguageService.ts
├── hooks/               # Custom React hooks
├── types/               # TypeScript type definitions
├── pages/               # Main application pages
└── utils/               # Utility functions and helpers
```

## 🔧 Key Services

### AI Services
- **AI Tagging Service**: Automatic content categorization
- **Summary Service**: Content summarization with confidence scoring
- **Enhanced Search Service**: Semantic search with NLP
- **Natural Language Service**: Query parsing and intent recognition

### Search & Discovery
- **Voice Search Service**: Speech recognition integration
- **Smart Recommendation Service**: Personalized content suggestions
- **Search Filters**: Advanced filtering and sorting capabilities

### User Experience
- **Content Save Service**: Streamlined content saving workflow
- **Dashboard Personalization**: Customizable user preferences
- **Error Boundary**: Graceful error handling

## 🎯 Usage Examples

### Smart Search Queries
```
"What did I save about AI this week?"
"Show me recent programming tutorials"
"Find articles about productivity"
"What learning resources do I have?"
```

### Voice Commands
- Click the microphone icon or use keyboard shortcut
- Speak naturally: "Find my notes about machine learning"
- Voice transcription converts speech to searchable text

### Content Organization
- Save any URL with automatic metadata extraction
- AI suggests relevant tags and categories
- Content is automatically organized by topic and date

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines for details on:
- Code style and standards
- Testing requirements
- Pull request process
- Issue reporting

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Lovable.dev**: For the incredible development platform that made this possible
- **Shadcn/UI**: For the beautiful and accessible component library
- **OpenAI**: For AI capabilities that power intelligent features
- **Supabase**: For backend infrastructure and real-time capabilities

## 📞 Support

Need help? 
- 📧 Contact support
- 📖 Check the documentation
- 💬 Join our community discussions
- 🐛 Report issues on GitHub

---

Built with ❤️ using Lovable.dev - Empowering creators to build the future of knowledge management.
