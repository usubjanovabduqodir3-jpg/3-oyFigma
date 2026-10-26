import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './About.css';
import {
  RiStore2Line,
  RiMoneyDollarCircleLine,
  RiShoppingBagLine,
  RiMoneyDollarBoxLine,
  RiTwitterLine,
  RiInstagramLine,
  RiLinkedinLine,
  RiTruckLine,
  RiCustomerService2Line,
  RiShieldCheckLine,
} from 'react-icons/ri';
import aboutStory from '../assets/about-story.png'
import team1 from '../assets/team-1.png'
import team2 from '../assets/team-2.png'
import team3 from '../assets/team-3.png'

const About = () => {
  const { t } = useTranslation();

  return (
    <div className="about-page">
      <div className="about-breadcrumb">
        <Link to="/">{t('nav.home')}</Link>
        <span>/</span>
        <span className="current">{t('nav.about')}</span>
      </div>
      <section className="about-story-section">
        <div className="story-content">
          <h1>{t('about.storyTitle')}</h1>
          <p>{t('about.storyP1')}</p>
          <p>{t('about.storyP2')}</p>
        </div>

        <div className="story-image">
          <img src={aboutStory} alt={t('about.storyImgAlt')} />
        </div>
      </section>

      <section className="about-stats-section">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon-wrap">
              <div className="stat-icon">
                <RiStore2Line />
              </div>
            </div>
            <h2>10.5k</h2>
            <p>{t('about.statSellers')}</p>
          </div>

          <div className="stat-card stat-active">
            <div className="stat-icon-wrap">
              <div className="stat-icon">
                <RiMoneyDollarCircleLine />
              </div>
            </div>
            <h2>33k</h2>
            <p>{t('about.statSales')}</p>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrap">
              <div className="stat-icon">
                <RiShoppingBagLine />
              </div>
            </div>
            <h2>45.5k</h2>
            <p>{t('about.statCustomers')}</p>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrap">
              <div className="stat-icon">
                <RiMoneyDollarBoxLine />
              </div>
            </div>
            <h2>25k</h2>
            <p>{t('about.statGross')}</p>
          </div>
        </div>
      </section>

      <section className="about-team-section">
        <div className="team-grid">
          <div className="team-card">
            <div className="team-img-box">
              <img src={team1} alt="Tom Cruise" />
            </div>
            <div className="team-info">
              <h3>Tom Cruise</h3>
              <p>{t('about.roleFounder')}</p>
              <div className="team-socials">
                <a href="#twitter"><RiTwitterLine /></a>
                <a href="#instagram"><RiInstagramLine /></a>
                <a href="#linkedin"><RiLinkedinLine /></a>
              </div>
            </div>
          </div>

          <div className="team-card">
            <div className="team-img-box">
              <img src={team2} alt="Emma Watson" />
            </div>
            <div className="team-info">
              <h3>Emma Watson</h3>
              <p>{t('about.roleDirector')}</p>
              <div className="team-socials">
                <a href="#twitter"><RiTwitterLine /></a>
                <a href="#instagram"><RiInstagramLine /></a>
                <a href="#linkedin"><RiLinkedinLine /></a>
              </div>
            </div>
          </div>

          <div className="team-card">
            <div className="team-img-box">
              <img src={team3} alt="Will Smith" />
            </div>
            <div className="team-info">
              <h3>Will Smith</h3>
              <p>{t('about.roleDesigner')}</p>
              <div className="team-socials">
                <a href="#twitter"><RiTwitterLine /></a>
                <a href="#instagram"><RiInstagramLine /></a>
                <a href="#linkedin"><RiLinkedinLine /></a>
              </div>
            </div>
          </div>
        </div>

        <div className="team-dots">
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot active-dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
      </section>

      <section className="about-services-section">
        <div className="services-grid">
          <div className="service-card">
            <div className="service-icon-wrap">
              <div className="service-icon">
                <RiTruckLine />
              </div>
            </div>
            <h3>{t('services.delivery.title')}</h3>
            <p>{t('services.delivery.desc')}</p>
          </div>

          <div className="service-card">
            <div className="service-icon-wrap">
              <div className="service-icon">
                <RiCustomerService2Line />
              </div>
            </div>
            <h3>{t('services.support.title')}</h3>
            <p>{t('services.support.desc')}</p>
          </div>

          <div className="service-card">
            <div className="service-icon-wrap">
              <div className="service-icon">
                <RiShieldCheckLine />
              </div>
            </div>
            <h3>{t('services.guarantee.title')}</h3>
            <p>{t('services.guarantee.desc')}</p>
          </div>
        </div>
      </section>
   
    </div>
  );
};

export default About;