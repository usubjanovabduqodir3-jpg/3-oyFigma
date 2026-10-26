import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaPaperPlane,
  FaGooglePlay,
  FaApple
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import "./Footer.css";
import { selectUser } from "../store/authSlice";

function Footer() {
  const { t } = useTranslation();
  const user = useSelector(selectUser);

  return (
    <footer className="ft">
      <div className="ft-main">
        <div className="ft-col ft-sub">
          <h3>Exclusive</h3>
          <h4>{t("footer.subscribe")}</h4>
          <p>{t("footer.subscribeText")}</p>

          <form className="ft-form" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder={t("footer.emailPlaceholder")}
              aria-label={t("footer.emailPlaceholder")}
              required
            />
            <button type="submit" aria-label={t("footer.subscribe")}>
              <FaPaperPlane />
            </button>
          </form>
        </div>

        <div className="ft-col">
          <h4>{t("footer.support")}</h4>
          <p>111 Bijoy Sarani, Dhaka, DH 1515, Bangladesh.</p>
          <a href="mailto:exclusive@gmail.com">exclusive@gmail.com</a>
          <a href="tel:+8801588889999">+88015-88888-9999</a>
        </div>

        <div className="ft-col">
          <h4>{t("footer.account")}</h4>
          <Link to="/about">{t("footer.myAccount")}</Link>
          {!user && <Link to="/signup">{t("footer.loginSignUp")}</Link>}
          <Link to="/cart">{t("footer.cart")}</Link>
          <Link to="/wishlist">{t("footer.wishlist")}</Link>
          <Link to="/">{t("footer.shop")}</Link>
        </div>

        <div className="ft-col">
          <h4>{t("footer.quickLinks")}</h4>
          <a href="/privacy">{t("footer.privacy")}</a>
          <a href="/terms">{t("footer.terms")}</a>
          <a href="/faq">{t("footer.faq")}</a>
          <Link to="/contact">{t("footer.contact")}</Link>
        </div>

        <div className="ft-col ft-app">
          <h4>{t("footer.downloadApp")}</h4>
          <small>{t("footer.newUsersOffer")}</small>

          <div className="ft-download">
            <div className="ft-qr">
             
            </div>

            <div className="ft-stores">
              <a href="#" className="ft-store">
                <FaGooglePlay />
                <span>
                  <small>{t("footer.getItOn")}</small>
                  Google Play
                </span>
              </a>

              <a href="#" className="ft-store">
                <FaApple />
                <span>
                  <small>{t("footer.downloadOn")}</small>
                  App Store
                </span>
              </a>
            </div>
          </div>

          <div className="ft-social">
            <a href="#" aria-label="Facebook"><FaFacebookF /></a>
            <a href="#" aria-label="Twitter"><FaTwitter /></a>
            <a href="#" aria-label="Instagram"><FaInstagram /></a>
            <a href="#" aria-label="LinkedIn"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>

      <div className="ft-bottom">
        <p>{t("footer.copyright", { year: new Date().getFullYear() })}</p>
      </div>
    </footer>
  );
}

export default Footer;
