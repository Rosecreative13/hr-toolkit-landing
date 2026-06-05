import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import ro from './locales/ro/translation.json'
import ru from './locales/ru/translation.json'
import en from './locales/en/translation.json'

const supportedLanguages = ['ro', 'ru', 'en'] as const
type SupportedLanguage = (typeof supportedLanguages)[number]

function normalizeLanguage(language?: string): SupportedLanguage {
  const code = language?.slice(0, 2).toLowerCase()
  return code === 'ro' || code === 'ru' || code === 'en' ? code : 'ro'
}

function applyDocumentLanguage(language?: string) {
  if (typeof document === 'undefined') return
  document.documentElement.lang = normalizeLanguage(language ?? i18n.resolvedLanguage ?? i18n.language)
}

const initPromise = i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      ro: { translation: ro },
      ru: { translation: ru },
      en: { translation: en },
    },
    // 'ro' is the default. Only explicit ?lang=xx can override it.
    lng: undefined,
    fallbackLng: 'ro',
    supportedLngs: supportedLanguages,
    nonExplicitSupportedLngs: true,
    defaultNS: 'translation',
    detection: {
      order: ['querystring'],
      lookupQuerystring: 'lang',
      caches: [],
    },
    interpolation: { escapeValue: false },
  })

void initPromise.then(() => applyDocumentLanguage())
i18n.on('languageChanged', applyDocumentLanguage)

export default i18n
