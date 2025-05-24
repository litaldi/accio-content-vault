
/**
 * Centralized copy and microcopy for consistent messaging
 */

export const copy = {
  // Navigation
  nav: {
    home: 'Home',
    dashboard: 'Dashboard',
    saveContent: 'Save Content',
    settings: 'Settings',
    analytics: 'Analytics',
    features: 'Features',
    pricing: 'Pricing',
    about: 'About',
    contact: 'Contact',
    faq: 'FAQ',
    blog: 'Blog'
  },

  // Buttons - consistent with proper punctuation
  buttons: {
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    tryAgain: 'Try Again',
    getStarted: 'Get Started',
    learnMore: 'Learn More',
    signUp: 'Sign Up',
    signIn: 'Sign In',
    signOut: 'Sign Out',
    createAccount: 'Create My Free Account',
    scheduleDemo: 'Schedule a Demo',
    chatSupport: 'Chat with Support',
    tryFree: 'Try It Free',
    startFreeTrial: 'Start Free Trial',
    contactSales: 'Contact Sales'
  },

  // Error messages - user-friendly and actionable
  errors: {
    general: 'Something went wrong. Please try again.',
    network: 'Unable to connect. Please check your internet connection.',
    validation: 'Please check the information you entered.',
    unauthorized: 'You need to be signed in to access this feature.',
    forbidden: 'You don\'t have permission to perform this action.',
    notFound: 'The content you\'re looking for doesn\'t exist.',
    fileSize: 'File is too large. Please choose a file under 10MB.',
    fileType: 'This file type isn\'t supported. Please choose a PDF or image file.',
    urlInvalid: 'Please enter a valid web address (URL).',
    urlUnsafe: 'This URL cannot be processed for security reasons.'
  },

  // Success messages - encouraging and clear
  success: {
    contentSaved: 'Content saved successfully!',
    settingsUpdated: 'Your settings have been updated.',
    accountCreated: 'Welcome to Accio! Your account has been created.',
    signedIn: 'Welcome back!',
    signedOut: 'You\'ve been signed out successfully.'
  },

  // Loading states - informative and reassuring
  loading: {
    saving: 'Saving your content...',
    processing: 'Processing URL...',
    analyzing: 'AI is analyzing your content...',
    uploading: 'Uploading file...',
    searching: 'Searching your library...',
    loading: 'Loading...'
  },

  // Form labels and help text
  forms: {
    url: {
      label: 'Website URL',
      placeholder: 'https://example.com/article',
      help: 'Enter the full web address of the page you want to save.'
    },
    file: {
      label: 'Choose File',
      help: 'Upload a PDF document or image (max 10MB).',
      dragDrop: 'Drag and drop a file here, or click to browse.'
    },
    search: {
      placeholder: 'Search your saved content...',
      help: 'Try searching by title, tags, or content keywords.'
    },
    email: {
      label: 'Email Address',
      placeholder: 'your@email.com'
    },
    password: {
      label: 'Password',
      placeholder: 'Enter your password'
    }
  },

  // Common phrases and labels
  common: {
    or: 'or',
    and: 'and',
    required: 'required',
    optional: 'optional',
    free: 'Free',
    popular: 'Most Popular',
    recommended: 'Recommended',
    comingSoon: 'Coming Soon',
    beta: 'Beta'
  },

  // Accessibility announcements
  a11y: {
    loading: 'Content is loading, please wait.',
    error: 'An error has occurred.',
    success: 'Action completed successfully.',
    newContent: 'New content has been added.',
    navigationMenu: 'Main navigation menu',
    skipToContent: 'Skip to main content',
    closeDialog: 'Close dialog',
    openMenu: 'Open menu',
    closeMenu: 'Close menu'
  }
};
