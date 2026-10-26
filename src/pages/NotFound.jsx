import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import './NotFound.css'

const NotFound = () => {
  const { t } = useTranslation()

  return (
    <div className="nf-page">
      <div className="nf-breadcrumb">
        <Link to="/">{t('nav.home')}</Link>
        <span>/</span>
        <span className="nf-current">{t('notFound.breadcrumb')}</span>
      </div>

      <div className="nf-body">
        <h1>{t('notFound.title')}</h1>
        <p>{t('notFound.text')}</p>
        <Link to="/" className="nf-btn">{t('notFound.back')}</Link>
      </div>
    </div>
  )
}

export default NotFound
