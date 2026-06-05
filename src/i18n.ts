import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import ro from './locales/ro/translation.json'
import ru from './locales/ru/translation.json'
import en from './locales/en/translation.json'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      ro: { translation: ro },
      ru: { translation: ru },
      en: { translation: en },
    },
    // 'ro' is the default — do NOT use navigator (picks up browser language)
    lng: undefined,
    fallbackLng: 'ro',
    defaultNS: 'translation',
    detection: {
      order: ['querystring', 'localStorage'],
      lookupQuerystring: 'lang',
      caches: ['localStorage'],
    },
    interpolation: { escapeValue: false },
  })

export default i18n
