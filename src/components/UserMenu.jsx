import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { signOut } from 'firebase/auth'
import {
  RiUserLine,
  RiShoppingBagLine,
  RiCloseCircleLine,
  RiStarLine,
  RiLogoutBoxRLine,
} from 'react-icons/ri'
import { auth } from '../firebase'
import { selectUser } from '../store/authSlice'
import './UserMenu.css'

const UserMenu = () => {
  const { t } = useTranslation()
  const user = useSelector(selectUser)
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

  if (!user) return null

  const name = user.displayName || user.email || ''
  const initial = name.trim().charAt(0).toUpperCase()

  const handleLogout = async () => {
    setOpen(false)
    try {
      await signOut(auth)
    } catch (err) {
      console.error('Chiqishda xatolik:', err)
    }
  }

  const items = [
    { key: 'manageAccount', icon: <RiUserLine /> },
    { key: 'myOrder', icon: <RiShoppingBagLine /> },
    { key: 'myCancellations', icon: <RiCloseCircleLine /> },
    { key: 'myReviews', icon: <RiStarLine /> },
  ]

  return (
    <div className="um" ref={ref}>
      <button
        type="button"
        className="um-btn"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={t('header.userMenu')}
        title={name}
      >
        <span>{initial}</span>
        {user.photoURL && (
          <img
            src={user.photoURL}
            alt=""
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />
        )}
      </button>

      {open && (
        <div className="um-menu" role="menu">
          {items.map((item) => (
            <button key={item.key} type="button" role="menuitem" className="um-item">
              {item.icon}
              <span>{t(`header.menu.${item.key}`)}</span>
            </button>
          ))}
          <button type="button" role="menuitem" className="um-item" onClick={handleLogout}>
            <RiLogoutBoxRLine />
            <span>{t('header.logout')}</span>
          </button>
        </div>
      )}
    </div>
  )
}

export default UserMenu
