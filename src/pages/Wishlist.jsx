import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  RiDeleteBinLine,
  RiEyeLine,
  RiHeartLine,
  RiHeartFill,
  RiShoppingCartLine,
  RiStarFill,
  RiStarHalfFill,
  RiStarLine,
} from 'react-icons/ri'
import './Wishlist.css'
import { selectRecommendedProducts } from '../store/productsSlice'
import {
  selectWishlistItems,
  toggleWishlist,
  removeFromWishlist,
} from '../store/wishlistSlice'
import { selectCartItems, addToCart } from '../store/cartSlice'
import { moveAllToCart } from '../store/actions'

const Stars = ({ rating }) => (
  <div className="wl-stars">
    {[1, 2, 3, 4, 5].map((n) => {
      if (rating >= n) return <RiStarFill key={n} />
      if (rating >= n - 0.5) return <RiStarHalfFill key={n} />
      return <RiStarLine key={n} />
    })}
  </div>
)

const getDiscount = (item) => {
  if (item.discount) return item.discount
  if (item.oldPrice) return `-${Math.round((1 - item.price / item.oldPrice) * 100)}%`
  return null
}

const Wishlist = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const wishlist = useSelector(selectWishlistItems)
  const cart = useSelector(selectCartItems)
  const recommended = useSelector(selectRecommendedProducts)
  const isInCart = (id) => cart.some((item) => item.id === id)
  const isInWishlist = (id) => wishlist.some((item) => item.id === id)

  const renderPrice = (item) => (
    <div className="wl-prices">
      <span className="wl-current">${item.price}</span>
      {item.oldPrice && <span className="wl-old">${item.oldPrice}</span>}
    </div>
  )

  const renderCartBtn = (item) => {
    const inCart = isInCart(item.id)
    return (
      <button
        className={`wl-cart-btn ${inCart ? 'in-cart' : ''}`}
        onClick={() => dispatch(addToCart(item))}
        disabled={inCart}
      >
        <RiShoppingCartLine />
        {inCart ? t('common.inCart') : t('common.addToCart')}
      </button>
    )
  }

  return (
    <div className="wl-page">
      <div className="wl-head">
        <h2>{t('wishlist.title', { n: wishlist.length })}</h2>
        <button
          className="wl-outline-btn"
          onClick={() => dispatch(moveAllToCart())}
          disabled={wishlist.length === 0}
        >
          {t('wishlist.moveAll')}
        </button>
      </div>

      {wishlist.length === 0 ? (
        <div className="wl-empty">
          <RiHeartLine />
          <p>{t('wishlist.emptyTitle')}</p>
          <span>{t('wishlist.emptyText')}</span>
          <Link to="/" className="wl-outline-btn">{t('common.backToShop')}</Link>
        </div>
      ) : (
        <div className="wl-grid">
          {wishlist.map((item) => {
            const discount = getDiscount(item)
            return (
              <div className="wl-card" key={item.id}>
                <div className="wl-img-box">
                  {discount && <span className="wl-discount">{discount}</span>}
                  <div className="wl-actions">
                    <button
                      onClick={() => dispatch(removeFromWishlist(item.id))}
                      aria-label={t('common.removeFromWishlist')}
                    >
                      <RiDeleteBinLine />
                    </button>
                  </div>
                  <img src={item.img} alt={item.title} />
                  {renderCartBtn(item)}
                </div>
                <div className="wl-info">
                  <h3>{item.title}</h3>
                  {renderPrice(item)}
                </div>
              </div>
            )
          })}
        </div>
      )}

      <div className="wl-head wl-head-rec">
        <div className="wl-title-box">
          <div className="wl-badge"></div>
          <h3>{t('wishlist.forYou')}</h3>
        </div>
        <Link to="/" className="wl-outline-btn">{t('wishlist.seeAll')}</Link>
      </div>

      <div className="wl-grid">
        {recommended.map((item) => {
          const discount = getDiscount(item)
          return (
            <div className="wl-card" key={item.id}>
              <div className="wl-img-box">
                {discount && <span className="wl-discount">{discount}</span>}
                {!discount && item.isNew && <span className="wl-new">{t('common.new')}</span>}
                <div className="wl-actions">
                  <button
                    onClick={() => dispatch(toggleWishlist(item))}
                    aria-label={t('common.addToWishlist')}
                  >
                    {isInWishlist(item.id) ? <RiHeartFill color="#db4444" /> : <RiHeartLine />}
                  </button>
                  <button aria-label={t('common.view')}><RiEyeLine /></button>
                </div>
                <img src={item.img} alt={item.title} />
                {renderCartBtn(item)}
              </div>
              <div className="wl-info">
                <h3>{item.title}</h3>
                {renderPrice(item)}
                <div className="wl-rating">
                  <Stars rating={item.rating} />
                  <span>({item.reviews})</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Wishlist
