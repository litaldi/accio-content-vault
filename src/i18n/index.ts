
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './locales/en';
import arTranslation from './locales/ar';
import heTranslation from './locales/he';

// Safe localStorage accessor
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
    }
  });

export default i18n;
