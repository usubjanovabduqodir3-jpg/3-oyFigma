import { useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import './Header.css'
import { RiSearchLine, RiHeartLine, RiShoppingCartLine } from 'react-icons/ri'
import LanguageSwitcher from './LanguageSwitcher'
import UserMenu from './UserMenu'
import { selectWishlistCount } from '../store/wishlistSlice'
import { selectCartCount } from '../store/cartSlice'
import { selectUser, selectAuthLoading } from '../store/authSlice'

const Header = () => {
  const { t } = useTranslation()
  const wishlistCount = useSelector(selectWishlistCount)
  const cartCount = useSelector(selectCartCount)
  const user = useSelector(selectUser)
  const authLoading = useSelector(selectAuthLoading)

  return (
    <header className="header">
      <div className="hdr-top">
        <div className="hdr-top-content">
          <p>
            {t('header.promo')}{' '}
            <Link to="/">{t('common.shopNow')}</Link>
          </p>
          <LanguageSwitcher />
        </div>
      </div>

      <div className="hdr-main">
        <div className="hdr-wrap">
          <Link to="/" className="hdr-logo">Exclusive</Link>

          <nav className="hdr-nav">
            <NavLink to="/" end>{t('nav.home')}</NavLink>
            <NavLink to="/contact">{t('nav.contact')}</NavLink>
            <NavLink to="/about">{t('nav.about')}</NavLink>
            {!authLoading && !user && <NavLink to="/signup">{t('nav.signUp')}</NavLink>}
          </nav>

          <div className="hdr-right">
            <div className="hdr-search">
              <input type="text" placeholder={t('header.searchPlaceholder')} />
              <button type="button" aria-label={t('header.searchPlaceholder')}>
                <RiSearchLine />
              </button>
            </div>
            <div className="hdr-icons">
              <Link to="/wishlist" aria-label={t('header.wishlist')}>
                <RiHeartLine />
                {wishlistCount > 0 && <span className="hdr-badge">{wishlistCount}</span>}
              </Link>
              <Link to="/cart" aria-label={t('header.cart')}>
                <RiShoppingCartLine />
                {cartCount > 0 && <span className="hdr-badge">{cartCount}</span>}
              </Link>
              <UserMenu />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
