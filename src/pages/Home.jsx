import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import "./Home.css";
import {
  selectFlashProducts,
  selectBestProducts,
  selectExploreProducts,
} from "../store/productsSlice";
import { selectWishlistItems, toggleWishlist } from "../store/wishlistSlice";
import { selectCartItems, addToCart } from "../store/cartSlice";
import heroBanner from "../assets/hero.png";
import musicBanner from "../assets/Frame 600.png";
import ps5 from "../assets/Frame 684.png";
import womenCollection from "../assets/Frame 685.png";
import speakers from "../assets/Frame 686.png";
import perfume from "../assets/Frame 687.png";
import {
  RiArrowRightSLine,
  RiArrowRightLine,
  RiHeartLine,
  RiHeartFill,
  RiEyeLine,
  RiStarFill,
  RiStarHalfFill,
  RiArrowLeftLine,
  RiSmartphoneLine,
  RiComputerLine,
  RiMacbookLine,
  RiCameraLine,
  RiHeadphoneLine,
  RiGamepadLine,
  RiTruckLine,
  RiCustomerService2Line,
  RiShieldCheckLine,
} from "react-icons/ri";

const Home = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const flashProducts = useSelector(selectFlashProducts);
  const bestSellingProducts = useSelector(selectBestProducts);
  const exploreProducts = useSelector(selectExploreProducts);
  const wishlist = useSelector(selectWishlistItems);
  const cart = useSelector(selectCartItems);

  // Categories massivi
  const categories = [
    { id: 1, name: t('home.categories.phones'), icon: <RiSmartphoneLine /> },
    { id: 2, name: t('home.categories.computers'), icon: <RiComputerLine /> },
    { id: 3, name: t('home.categories.smartwatch'), icon: <RiMacbookLine /> },
    { id: 4, name: t('home.categories.camera'), icon: <RiCameraLine />, active: true },
    { id: 5, name: t('home.categories.headphones'), icon: <RiHeadphoneLine /> },
    { id: 6, name: t('home.categories.gaming'), icon: <RiGamepadLine /> },
  ];

  const services = [
    {
      id: 1,
      icon: <RiTruckLine />,
      title: t('services.delivery.title'),
      desc: t('services.delivery.desc')
    },
    {
      id: 2,
      icon: <RiCustomerService2Line />,
      title: t('services.support.title'),
      desc: t('services.support.desc')
    },
    {
      id: 3,
      icon: <RiShieldCheckLine />,
      title: t('services.guarantee.title'),
      desc: t('services.guarantee.desc')
    }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-wrap">
          <div className="hero-sidebar">
            <ul>
              <li className="hero-dropdown">
                <a href="#women">
                  {t('home.sidebar.women')} <RiArrowRightSLine />
                </a>
              </li>
              <li className="hero-dropdown">
                <a href="#men">
                  {t('home.sidebar.men')} <RiArrowRightSLine />
                </a>
              </li>
              <li><a href="#electronics">{t('home.sidebar.electronics')}</a></li>
              <li><a href="#home">{t('home.sidebar.homeLifestyle')}</a></li>
              <li><a href="#medicine">{t('home.sidebar.medicine')}</a></li>
              <li><a href="#sports">{t('home.sidebar.sports')}</a></li>
              <li><a href="#baby">{t('home.sidebar.baby')}</a></li>
              <li><a href="#groceries">{t('home.sidebar.groceries')}</a></li>
              <li><a href="#health">{t('home.sidebar.health')}</a></li>
            </ul>
          </div>

          <div className="hero-slider">
            <Swiper
              modules={[Pagination, Autoplay]}
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              loop={true}
              className="mySwiper"
            >
              <SwiperSlide>
                <img
                  className="hero-img"
                  src={heroBanner}
                  alt={`${t('home.hero.series')} - ${t('home.hero.title')}`}
                />
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </section>

      {/* Flash Sales Section */}
      <section className="fs-section">
        <div className="fs-header">
          <div className="fs-title-box">
            <div className="fs-badge"></div>
            <span>{t('home.flash.tag')}</span>
          </div>
          
          <div className="fs-top-row">
            <h2>{t('home.flash.title')}</h2>
            <div className="fs-timer">
              <div className="fs-time-block">
                <span>{t('home.time.days')}</span>
                <h3>03</h3>
              </div>
              <span className="fs-colon">:</span>
              <div className="fs-time-block">
                <span>{t('home.time.hours')}</span>
                <h3>23</h3>
              </div>
              <span className="fs-colon">:</span>
              <div className="fs-time-block">
                <span>{t('home.time.minutes')}</span>
                <h3>19</h3>
              </div>
              <span className="fs-colon">:</span>
              <div className="fs-time-block">
                <span>{t('home.time.seconds')}</span>
                <h3>56</h3>
              </div>
            </div>

            <div className="fs-nav-btns">
              <button className="fs-prev"><RiArrowLeftLine /></button>
              <button className="fs-next"><RiArrowRightLine /></button>
            </div>
          </div>
        </div>

        <div className="fs-grid">
          {flashProducts.map((item) => {
            const isLiked = wishlist.some((w) => w.id === item.id);
            return (
              <div className="fs-card" key={item.id}>
                <div className="fs-img-box">
                  <span className="fs-discount">{item.discount}</span>
                  <div className="fs-actions">
                    <button onClick={() => dispatch(toggleWishlist(item))}
                      aria-label={isLiked ? t('common.removeFromWishlist') : t('common.addToWishlist')}>
                      {isLiked ? <RiHeartFill color="#db4444" /> : <RiHeartLine />}
                    </button>
                    <button aria-label={t('common.view')}><RiEyeLine /></button>
                  </div>
                  <img src={item.img} alt={item.title} />
                  <button className="fs-cart-btn" onClick={() => dispatch(addToCart(item))}>
                    {cart.some((c) => c.id === item.id) ? `${t('common.inCart')} ✓` : t('common.addToCart')}
                  </button>
                </div>
                <div className="fs-info">
                  <h3>{item.title}</h3>
                  <div className="fs-prices">
                    <span className="fs-current">${item.price}</span>
                    <span className="fs-old">${item.oldPrice}</span>
                  </div>
                  <div className="fs-rating">
                    <div className="fs-stars">
                      <RiStarFill /><RiStarFill /><RiStarFill /><RiStarFill /><RiStarHalfFill />
                    </div>
                    <span>({item.reviews})</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="fs-btn-wrap">
          <button className="fs-all-btn">{t('common.viewAllProducts')}</button>
        </div>
      </section>

      {/* Categories Section */}
      <section className="cat-section">
        <div className="fs-title-box">
          <div className="fs-badge"></div>
          <span>{t('home.categories.tag')}</span>
        </div>

        <div className="fs-top-row">
          <h2>{t('home.categories.title')}</h2>
          <div className="fs-nav-btns">
            <button className="fs-prev"><RiArrowLeftLine /></button>
            <button className="fs-next"><RiArrowRightLine /></button>
          </div>
        </div>

        <div className="cat-grid">
          {categories.map((cat) => (
            <div key={cat.id} className={`cat-card ${cat.active ? "cat-active" : ""}`}>
              <div className="cat-icon">{cat.icon}</div>
              <span>{cat.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Best Selling Section */}
      <section className="best-section">
        <div className="fs-title-box">
          <div className="fs-badge"></div>
          <span>{t('home.best.tag')}</span>
        </div>

        <div className="fs-top-row">
          <h2>{t('home.best.title')}</h2>
          <button className="fs-all-btn">{t('common.viewAll')}</button>
        </div>

        <div className="fs-grid">
          {bestSellingProducts.map((item) => {
            const isLiked = wishlist.some((w) => w.id === item.id);
            return (
              <div className="fs-card" key={item.id}>
                <div className="fs-img-box">
                  <div className="fs-actions">
                    <button onClick={() => dispatch(toggleWishlist(item))}
                      aria-label={isLiked ? t('common.removeFromWishlist') : t('common.addToWishlist')}>
                      {isLiked ? <RiHeartFill color="#db4444" /> : <RiHeartLine />}
                    </button>
                    <button aria-label={t('common.view')}><RiEyeLine /></button>
                  </div>
                  <img src={item.img} alt={item.title} />
                  <button className="fs-cart-btn" onClick={() => dispatch(addToCart(item))}>
                    {cart.some((c) => c.id === item.id) ? `${t('common.inCart')} ✓` : t('common.addToCart')}
                  </button>
                </div>
                <div className="fs-info">
                  <h3>{item.title}</h3>
                  <div className="fs-prices">
                    <span className="fs-current">${item.price}</span>
                    {item.oldPrice && <span className="fs-old">${item.oldPrice}</span>}
                  </div>
                  <div className="fs-rating">
                    <div className="fs-stars">
                      <RiStarFill /><RiStarFill /><RiStarFill /><RiStarFill /><RiStarFill />
                    </div>
                    <span>({item.reviews})</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="music-banner-section">
        <div className="music-banner-container">
          <img src={musicBanner} alt={t('home.music.title')} />
        </div>
      </section>

      <section className="explore-section">
        <div className="fs-title-box">
          <div className="fs-badge"></div>
          <span>{t('home.explore.tag')}</span>
        </div>

        <div className="fs-top-row">
          <h2>{t('home.explore.title')}</h2>
          <div className="fs-nav-btns">
            <button className="fs-prev"><RiArrowLeftLine /></button>
            <button className="fs-next"><RiArrowRightLine /></button>
          </div>
        </div>

        <div className="explore-grid">
          {exploreProducts.map((item) => {
            const isLiked = wishlist.some((w) => w.id === item.id);
            return (
              <div className="fs-card" key={item.id}>
                <div className="fs-img-box">
                  {item.isNew && <span className="fs-badge-new">{t('common.new')}</span>}
                  <div className="fs-actions">
                    <button onClick={() => dispatch(toggleWishlist(item))}
                      aria-label={isLiked ? t('common.removeFromWishlist') : t('common.addToWishlist')}>
                      {isLiked ? <RiHeartFill color="#db4444" /> : <RiHeartLine />}
                    </button>
                    <button aria-label={t('common.view')}><RiEyeLine /></button>
                  </div>
                  <img src={item.img} alt={item.title} />
                  <button className="fs-cart-btn" onClick={() => dispatch(addToCart(item))}>
                    {cart.some((c) => c.id === item.id) ? `${t('common.inCart')} ✓` : t('common.addToCart')}
                  </button>
                </div>
                <div className="fs-info">
                  <h3>{item.title}</h3>
                  <div className="fs-prices">
                    <span className="fs-current">${item.price}</span>
                  </div>
                  <div className="fs-rating">
                    <div className="fs-stars">
                      <RiStarFill /><RiStarFill /><RiStarFill /><RiStarFill /><RiStarHalfFill />
                    </div>
                    <span>({item.reviews})</span>
                  </div>
                  {item.colors && (
                    <div className="color-options">
                      {item.colors.map((c, idx) => (
                        <span key={idx} className="color-dot" style={{ backgroundColor: c }}></span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="fs-btn-wrap">
          <button className="fs-all-btn">{t('common.viewAllProducts')}</button>
        </div>
      </section>

      <section className="featured-section">
        <div className="fs-title-box">
          <div className="fs-badge"></div>
          <span>{t('home.featured.tag')}</span>
        </div>

        <div className="fs-top-row">
          <h2>{t('home.featured.title')}</h2>
        </div>

        <div className="featured-grid">
          <a href="#shop" className="feat-card feat-large">
            <img src={ps5} alt={t('home.featured.ps5Title')} />
          </a>

          <div className="feat-right">
            <a href="#shop" className="feat-card feat-wide">
              <img src={womenCollection} alt={t('home.featured.womenTitle')} />
            </a>

            <div className="feat-bottom">
              <a href="#shop" className="feat-card feat-small">
                <img src={speakers} alt={t('home.featured.speakersTitle')} />
              </a>
              <a href="#shop" className="feat-card feat-small">
                <img src={perfume} alt={t('home.featured.perfumeTitle')} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="services-section">
        <div className="services-grid">
          {services.map((item) => (
            <div className="service-card" key={item.id}>
              <div className="service-icon-wrap">
                <div className="service-icon">{item.icon}</div>
              </div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;