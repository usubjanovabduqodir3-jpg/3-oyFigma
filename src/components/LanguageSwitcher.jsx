import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { RiArrowDownSLine, RiCheckLine } from 'react-icons/ri'
import { LANGUAGES } from '../i18n'
import './LanguageSwitcher.css'

const LanguageSwitcher = () => {
  const { t, i18n } = useTranslation()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return

    const onClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }

    document.addEventListener('mousedown', onClickOutside)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onClickOutside)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  const current =
    LANGUAGES.find((l) => l.code === i18n.resolvedLanguage) ?? LANGUAGES[0]

  const choose = (code) => {
    i18n.changeLanguage(code)
    setOpen(false)
  }

  return (
    <div className="lang" ref={ref}>
      <button
        type="button"
        className="lang-btn"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={t('language.label')}
      >
        <span>{current.label}</span>
        <RiArrowDownSLine />
      </button>

      {open && (
        <ul className="lang-menu" role="menu">
          {LANGUAGES.map((lang) => {
            const active = lang.code === current.code
            return (
              <li key={lang.code} role="none">
                <button
                  type="button"
                  role="menuitemradio"
                  aria-checked={active}
                  className={`lang-item ${active ? 'active' : ''}`}
                  onClick={() => choose(lang.code)}
                >
                  <span>{lang.label}</span>
                  {active && <RiCheckLine />}
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default LanguageSwitcher
