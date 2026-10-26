import { useTranslation } from 'react-i18next'

const Contact = () => {
  const { t } = useTranslation()

  return (
    <div>{t('nav.contact')}</div>
  )
}

export default Contact
