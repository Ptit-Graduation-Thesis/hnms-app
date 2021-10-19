import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'

import en from '@/assets/locales/en'
import vi from '@/assets/locales/vi'

const DEFAULT_LANG = 'en'

i18next.use(initReactI18next).init({
  interpolation: {
    // React already does escaping
    escapeValue: false,
  },
  lng: DEFAULT_LANG,
  fallbackLng: DEFAULT_LANG,
  // Using simple hardcoded resources for simple example
  resources: {
    en: {
      translation: en,
    },
    vi: {
      translation: vi,
    },
  },
})

export default i18next
