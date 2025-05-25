
/**
 * Centralized copy and microcopy for consistent messaging
 * Tone: Friendly, clear, action-oriented, and supportive
 */

export const copy = {
  // Navigation - Clear and familiar
  nav: {
    home: 'Home',
    dashboard: 'Dashboard',
    saveContent: 'Save Content',
    library: 'My Library',
    settings: 'Settings',
    features: 'Features',
    pricing: 'Pricing',
    about: 'About',
    contact: 'Contact',
    help: 'Help',
    blog: 'Blog'
  },

  // Buttons - Action-oriented and consistent
  buttons: {
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    tryAgain: 'Try Again',
    getStarted: 'Get Started',
    learnMore: 'Learn More',
    signUp: 'Sign Up',
    logIn: 'Log In',
    signOut: 'Sign Out',
    createAccount: 'Create Account',
    scheduleDemo: 'Schedule Demo',
    startFreeTrial: 'Start Free Trial',
    upgrade: 'Upgrade',
    contactSupport: 'Contact Support',
    viewDemo: 'View Demo',
    exploreFeatures: 'Explore Features',
    continue: 'Continue',
    back: 'Back',
    next: 'Next',
    finish: 'Finish',
    close: 'Close',
    done: 'Done',
    apply: 'Apply Changes',
    reset: 'Reset'
  },

  // Headlines - Value-focused and user-centric
  headlines: {
    hero: 'Never Lose Your Best Ideas Again',
    subhero: 'Transform scattered bookmarks and notes into an AI-powered knowledge library that helps you think better.',
    features: 'Everything You Need to Organize Your Knowledge',
    pricing: 'Choose the Plan That Fits Your Needs',
    about: 'We\'re Building the Future of Knowledge Management',
    dashboard: 'Welcome Back! Here\'s What\'s New',
    library: 'Your Knowledge Library',
    settings: 'Customize Your Experience'
  },

  // Value propositions - Benefit-focused
  benefits: {
    saveAnything: 'Save any content with one click',
    aiOrganization: 'AI organizes everything automatically',
    findFast: 'Find anything in seconds with smart search',
    crossDevice: 'Access your library on any device',
    timeBack: 'Save hours of searching every week',
    neverLose: 'Never lose important information again',
    smartTags: 'Get perfect tags without the work',
    instantSync: 'Everything syncs instantly across devices'
  },

  // Error messages - Helpful and solution-focused
  errors: {
    general: 'Something went wrong. Please try again, or contact support if this keeps happening.',
    network: 'Looks like you\'re offline. Please check your connection and try again.',
    validation: 'Please check the information you entered and try again.',
    unauthorized: 'Please sign in to continue.',
    forbidden: 'You don\'t have permission to do that.',
    notFound: 'We couldn\'t find what you\'re looking for.',
    fileSize: 'That file is too large. Please choose one under 10MB.',
    fileType: 'We can\'t process that file type. Please try a PDF, image, or text file.',
    urlInvalid: 'That doesn\'t look like a valid web address. Please check and try again.',
    urlUnsafe: 'We can\'t access that URL for security reasons.',
    emailInvalid: 'Please enter a valid email address.',
    passwordWeak: 'Your password needs at least 8 characters, including a number and special character.',
    required: 'This field is required.',
    tooShort: 'This needs to be longer.',
    tooLong: 'This is too long. Please keep it under {max} characters.',
    emailExists: 'An account with this email already exists. Try signing in instead.'
  },

  // Success messages - Encouraging and next-step focused
  success: {
    contentSaved: 'Content saved! It\'s now in your library.',
    settingsUpdated: 'Your preferences have been saved.',
    accountCreated: 'Welcome to Accio! Let\'s get you started.',
    signedIn: 'Welcome back!',
    signedOut: 'You\'ve been signed out successfully.',
    emailSent: 'Check your email for next steps.',
    passwordChanged: 'Your password has been updated.',
    profileUpdated: 'Your profile changes have been saved.',
    uploadComplete: 'Your file has been uploaded and processed.',
    deleted: 'Item deleted successfully.',
    copied: 'Copied to clipboard!'
  },

  // Loading states - Informative and reassuring
  loading: {
    saving: 'Saving your content...',
    processing: 'Processing your request...',
    analyzing: 'Our AI is analyzing your content...',
    uploading: 'Uploading your file...',
    searching: 'Searching your library...',
    loading: 'Loading...',
    signin: 'Signing you in...',
    creating: 'Creating your account...',
    deleting: 'Deleting...',
    updating: 'Updating...'
  },

  // Form labels and help text - Clear and helpful
  forms: {
    url: {
      label: 'Website URL',
      placeholder: 'https://example.com/article',
      help: 'Paste the full web address of the content you want to save.'
    },
    file: {
      label: 'Upload File',
      help: 'Upload a PDF, image, or document (max 10MB).',
      dragDrop: 'Drag your file here, or click to browse.',
      dropActive: 'Drop your file here'
    },
    search: {
      placeholder: 'Search your library...',
      help: 'Try searching by title, topic, or any keyword you remember.',
      noResults: 'No results found. Try different keywords or browse by category.'
    },
    email: {
      label: 'Email Address',
      placeholder: 'your@email.com',
      help: 'We\'ll use this to sign you in and send important updates.'
    },
    password: {
      label: 'Password',
      placeholder: 'Create a secure password',
      help: 'At least 8 characters with a mix of letters, numbers, and symbols.',
      confirmLabel: 'Confirm Password',
      confirmPlaceholder: 'Enter your password again'
    },
    name: {
      label: 'Full Name',
      placeholder: 'Enter your name',
      help: 'This is how we\'ll address you in the app.'
    },
    phone: {
      label: 'Phone Number',
      placeholder: '+1 (555) 123-4567',
      help: 'We\'ll send you a verification code.'
    }
  },

  // Empty states - Encouraging and actionable
  emptyStates: {
    library: {
      title: 'Your Library is Ready!',
      description: 'Start building your knowledge collection by saving your first piece of content.',
      action: 'Save Your First Item'
    },
    search: {
      title: 'No Results Found',
      description: 'Try adjusting your search terms or browse your collections.',
      action: 'Clear Search'
    },
    dashboard: {
      title: 'Welcome to Accio!',
      description: 'Your dashboard will come alive as you start saving and organizing content.',
      action: 'Take a Quick Tour'
    },
    recent: {
      title: 'Nothing Here Yet',
      description: 'Your recently saved items will appear here.',
      action: 'Save Something'
    }
  },

  // Onboarding - Welcoming and clear about value
  onboarding: {
    welcome: {
      title: 'Welcome to Accio!',
      description: 'Let\'s get you set up to start building your knowledge library.',
      subtitle: 'Your personal knowledge assistant'
    },
    step1: {
      title: 'Save Any Content',
      description: 'Articles, videos, PDFs, and more—save anything with one click.',
      tip: 'Install our browser extension for the fastest saving experience.'
    },
    step2: {
      title: 'AI Does the Organizing',
      description: 'Our AI automatically tags and categorizes everything you save.',
      tip: 'No more time spent organizing—just save and find.'
    },
    step3: {
      title: 'Find Everything Instantly',
      description: 'Search naturally, like asking a question. Our AI understands what you\'re looking for.',
      tip: 'Try searching for concepts, not just keywords.'
    },
    step4: {
      title: 'You\'re All Set!',
      description: 'Start saving content and watch your knowledge library grow.',
      tip: 'Your first save is just a click away.'
    }
  },

  // Accessibility - Clear and supportive
  accessibility: {
    fontSizeLabel: 'Text Size',
    fontSizeHelp: 'Make text larger for easier reading.',
    contrastLabel: 'High Contrast',
    contrastHelp: 'Increase contrast for better visibility.',
    motionLabel: 'Reduce Motion',
    motionHelp: 'Minimize animations and transitions.',
    screenReaderLabel: 'Screen Reader Mode',
    screenReaderHelp: 'Optimize the interface for screen readers.',
    keyboardLabel: 'Keyboard Navigation',
    keyboardHelp: 'Navigate using only your keyboard.',
    focusLabel: 'Focus Indicators',
    focusHelp: 'Show clear focus outlines on interactive elements.'
  },

  // Tooltips and help text - Concise and helpful
  tooltips: {
    save: 'Save this content to your library',
    delete: 'Remove this item permanently',
    edit: 'Make changes to this item',
    share: 'Share this with others',
    bookmark: 'Add to your favorites',
    tag: 'Add tags to organize this content',
    search: 'Search your entire library',
    filter: 'Filter results by type or date',
    sort: 'Change how items are ordered',
    view: 'Switch between list and grid view',
    settings: 'Customize your experience',
    help: 'Get help and support',
    profile: 'Manage your account',
    notifications: 'View your notifications',
    theme: 'Switch between light and dark mode'
  },

  // Social proof and trust indicators
  social: {
    userCount: '50,000+',
    rating: '4.9/5 stars',
    reviews: '5,000+ reviews',
    companies: 'Trusted by teams at Google, Microsoft, and 1,000+ other companies'
  },

  // Trust indicators
  trust: {
    security: 'Bank-level security',
    privacy: 'Your data stays private',
    uptime: '99.9% uptime',
    support: '24/7 support when you need it',
    noCard: 'No credit card required',
    freeTrial: '14 days free, then cancel anytime'
  },

  // Common phrases
  common: {
    or: 'or',
    and: 'and',
    required: 'required',
    optional: 'optional',
    free: 'Free',
    popular: 'Most Popular',
    recommended: 'Recommended',
    comingSoon: 'Coming Soon',
    beta: 'Beta',
    new: 'New',
    updated: 'Updated',
    featured: 'Featured'
  },

  // Accessibility announcements
  a11y: {
    loading: 'Content is loading, please wait.',
    error: 'An error occurred. Please try again.',
    success: 'Action completed successfully.',
    newContent: 'New content has been added to the page.',
    navigationMenu: 'Main navigation menu',
    skipToContent: 'Skip to main content',
    closeDialog: 'Close dialog',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    pageLoaded: 'Page has finished loading.',
    formError: 'There are errors in the form. Please review and try again.',
    saved: 'Your changes have been saved.',
    deleted: 'Item has been deleted.'
  }
};
