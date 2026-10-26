import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { RiAddLine, RiCloseLine, RiSubtractLine } from 'react-icons/ri'
import './Cart.css'
import {
  selectCartItems,
  selectCartSubtotal,
  removeFromCart,
  changeQty,
  clearCart,
} from '../store/cartSlice'

const COUPONS = { EXCLUSIVE10: 10 }

const money = (n) =>
  '$' + n.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 })

const Cart = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const cart = useSelector(selectCartItems)
  const cartSubtotal = useSelector(selectCartSubtotal)

  const [code, setCode] = useState('')
  const [coupon, setCoupon] = useState(null)
  const [message, setMessage] = useState(null)

  const discount = coupon ? (cartSubtotal * coupon.percent) / 100 : 0
  const total = cartSubtotal - discount

  const applyCoupon = () => {
    const entered = code.trim().toUpperCase()
    if (!entered) {
      setMessage({ key: 'cart.enterCoupon' })
      return
    }
    if (COUPONS[entered]) {
      setCoupon({ code: entered, percent: COUPONS[entered] })
      setMessage({ key: 'cart.couponApplied', percent: COUPONS[entered] })
    } else {
      setCoupon(null)
      setMessage({ key: 'cart.couponInvalid' })
    }
  }

  return (
    <div className="ct-page">
      <div className="ct-breadcrumb">
        <Link to="/">{t('nav.home')}</Link>
        <span>/</span>
        <span className="ct-current">{t('cart.title')}</span>
      </div>

      {cart.length === 0 ? (
        <div className="ct-empty">
          <p>{t('cart.emptyTitle')}</p>
          <span>{t('cart.emptyText')}</span>
          <Link to="/" className="ct-outline-btn">{t('common.backToShop')}</Link>
        </div>
      ) : (
        <>
          <div className="ct-table">
            <div className="ct-row ct-row-head">
              <span>{t('cart.product')}</span>
              <span>{t('cart.price')}</span>
              <span>{t('cart.quantity')}</span>
              <span>{t('cart.subtotal')}</span>
            </div>

            {cart.map((item) => (
              <div className="ct-row" key={item.id}>
                <div className="ct-product">
                  <div className="ct-thumb">
                    <button
                      className="ct-remove"
                      onClick={() => dispatch(removeFromCart(item.id))}
                      aria-label={t('cart.remove')}
                    >
                      <RiCloseLine />
                    </button>
                    <img src={item.img} alt={item.title} />
                  </div>
                  <span className="ct-title">{item.title}</span>
                </div>

                <span className="ct-cell" data-label={t('cart.price')}>{money(item.price)}</span>

                <div className="ct-cell" data-label={t('cart.quantity')}>
                  <div className="ct-qty">
                    <button
                      onClick={() => dispatch(changeQty({ id: item.id, qty: item.qty - 1 }))}
                      disabled={item.qty <= 1}
                      aria-label={t('cart.decrease')}
                    >
                      <RiSubtractLine />
                    </button>
                    <span>{item.qty}</span>
                    <button
                      onClick={() => dispatch(changeQty({ id: item.id, qty: item.qty + 1 }))}
                      aria-label={t('cart.increase')}
                    >
                      <RiAddLine />
                    </button>
                  </div>
                </div>

                <span className="ct-cell" data-label={t('cart.subtotal')}>{money(item.price * item.qty)}</span>
              </div>
            ))}
          </div>

          <div className="ct-actions">
            <Link to="/" className="ct-outline-btn">{t('common.backToShop')}</Link>
            <button className="ct-outline-btn" onClick={() => dispatch(clearCart())}>{t('cart.clear')}</button>
          </div>

          <div className="ct-bottom">
            <div className="ct-coupon">
              <div className="ct-coupon-row">
                <input
                  type="text"
                  placeholder={t('cart.couponPlaceholder')}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && applyCoupon()}
                />
                <button className="ct-red-btn" onClick={applyCoupon}>{t('cart.applyCoupon')}</button>
              </div>
              {message && (
                <p className={`ct-coupon-msg ${coupon ? 'ok' : 'err'}`}>
                  {t(message.key, { percent: message.percent })}
                </p>
              )}
            </div>

            <div className="ct-total">
              <h3>{t('cart.totalTitle')}</h3>
              <div className="ct-total-line">
                <span>{t('cart.totalSubtotal')}</span>
                <span>{money(cartSubtotal)}</span>
              </div>
              {coupon && (
                <div className="ct-total-line">
                  <span>{t('cart.totalDiscount', { code: coupon.code })}</span>
                  <span>-{money(discount)}</span>
                </div>
              )}
              <div className="ct-total-line">
                <span>{t('cart.totalShipping')}</span>
                <span>{t('cart.free')}</span>
              </div>
              <div className="ct-total-line ct-total-sum">
                <span>{t('cart.totalSum')}</span>
                <span>{money(total)}</span>
              </div>
              <button className="ct-red-btn ct-checkout">{t('cart.checkout')}</button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Cart
