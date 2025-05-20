
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './locales/en';
import arTranslation from './locales/ar';
import heTranslation from './locales/he';

// Initialize i18next
i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      ar: { translation: arTranslation },
      he: { translation: heTranslation }
    },
    lng: typeof localStorage !== 'undefined' ? (localStorage.getItem('appLanguage') || 'en') : 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // React already safes from XSS
    },
    react: {
      useSuspense: false // This prevents issues with SSR
    }
  });

export default i18n;
