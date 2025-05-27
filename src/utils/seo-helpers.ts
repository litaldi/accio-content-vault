
/**
 * SEO and meta tag helpers
 */

export interface SEOData {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
}

export const getPageSEO = (page: string): SEOData => {
  const baseData: SEOData = {
    title: 'Accio - Your Personal Knowledge Sanctuary',
    description: 'Transform scattered information into organized intelligence with AI-powered knowledge management.',
    keywords: 'knowledge management, AI, content organization, search, productivity',
    canonical: `https://accio.app${page === 'home' ? '' : `/${page}`}`
  };

  const pageData: Record<string, Partial<SEOData>> = {
    home: {
      title: 'Accio - Transform Knowledge Into Wealth',
      description: 'Never lose brilliant ideas again. Build your knowledge empire with AI-powered content organization, intelligent search, and seamless capture tools.',
      keywords: 'knowledge management, AI, content organization, search, productivity, knowledge wealth'
    },
    features: {
      title: 'Features - AI-Powered Knowledge Management | Accio',
      description: 'Discover powerful features that transform how you capture, organize, and discover knowledge. AI tagging, semantic search, and intelligent insights.',
      keywords: 'AI features, knowledge management, semantic search, content organization, productivity tools'
    },
    pricing: {
      title: 'Pricing - Start Free Forever | Accio',
      description: 'Choose the perfect plan for your knowledge management needs. Free forever plan available with premium features for power users.',
      keywords: 'pricing, plans, knowledge management pricing, free plan, premium features'
    },
    dashboard: {
      title: 'Dashboard - Your Knowledge Hub | Accio',
      description: 'Manage your knowledge empire from one central dashboard. View insights, organize content, and discover connections.',
      keywords: 'dashboard, knowledge hub, content management, insights, analytics'
    },
    login: {
      title: 'Sign In - Access Your Knowledge Empire | Accio',
      description: 'Sign in to access your personal knowledge sanctuary and continue building your wealth of information.',
      keywords: 'login, sign in, access account, knowledge management login'
    },
    register: {
      title: 'Get Started Free - Build Your Knowledge Empire | Accio',
      description: 'Join thousands of professionals transforming scattered information into organized intelligence. Start your free account today.',
      keywords: 'register, sign up, get started, free account, knowledge management'
    }
  };

  return {
    ...baseData,
    ...pageData[page],
    ogTitle: pageData[page]?.title || baseData.title,
    ogDescription: pageData[page]?.description || baseData.description,
    twitterTitle: pageData[page]?.title || baseData.title,
    twitterDescription: pageData[page]?.description || baseData.description
  };
};

export const generateStructuredData = (type: 'WebSite' | 'Organization' | 'Product') => {
  const baseUrl = 'https://accio.app';
  
  const schemas = {
    WebSite: {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Accio',
      url: baseUrl,
      description: 'AI-powered knowledge management platform',
      potentialAction: {
        '@type': 'SearchAction',
        target: `${baseUrl}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string'
      }
    },
    Organization: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Accio',
      url: baseUrl,
      description: 'AI-powered knowledge management platform',
      logo: `${baseUrl}/logo.png`,
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'support@accio.app',
        contactType: 'customer support'
      }
    },
    Product: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Accio',
      applicationCategory: 'ProductivityApplication',
      description: 'AI-powered knowledge management platform that transforms scattered information into organized intelligence.',
      url: baseUrl,
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        description: 'Free forever plan available'
      }
    }
  };

  return schemas[type];
};
