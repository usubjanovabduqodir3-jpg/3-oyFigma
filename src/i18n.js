import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import uz from './locales/uz.json'
import ru from './locales/ru.json'
import en from './locales/en.json'

export const LANGUAGES = [
  { code: 'uz', label: "O'zbek" },
  { code: 'ru', label: 'Русский' },
  { code: 'en', label: 'English' },
]

const DEFAULT_LANG = 'uz'
const STORAGE_KEY = 'lang'

const getSavedLang = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return LANGUAGES.some((l) => l.code === saved) ? saved : DEFAULT_LANG
  } catch {
    return DEFAULT_LANG
  }
}

i18n.on('languageChanged', (lng) => {
  document.documentElement.lang = lng
  try {
    localStorage.setItem(STORAGE_KEY, lng)
  } catch {
  }
})

i18n.use(initReactI18next).init({
  resources: {
    uz: { translation: uz },
    ru: { translation: ru },
    en: { translation: en },
  },
  lng: getSavedLang(),
  fallbackLng: DEFAULT_LANG,
  supportedLngs: LANGUAGES.map((l) => l.code),
  interpolation: { escapeValue: false },
})

export default i18n
