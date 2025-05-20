
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import enTranslation from './locales/en';
import arTranslation from './locales/ar';
import heTranslation from './locales/he';

// Safe localStorage accessor with direction detection
const getInitialLanguage = (): string => {
  try {
    // Check if localStorage is available
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('appLanguage') || 'en';
    }
    return 'en';
  } catch (error) {
    console.warn('Unable to access localStorage for language preference', error);
    return 'en';
  }
};

// Initialize i18next
i18n
  // Load translations from server/static files
  .use(Backend)
  // Detect user language
  .use(LanguageDetector)
  // Pass the i18n instance to react-i18next
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      ar: { translation: arTranslation },
      he: { translation: heTranslation }
    },
    lng: getInitialLanguage(),
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // React already safes from XSS
    },
    react: {
      useSuspense: false // This prevents issues with SSR
    },
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'appLanguage',
      caches: ['localStorage']
    },
    // Added debug only for development
    debug: process.env.NODE_ENV === 'development',
  });

export default i18n;
