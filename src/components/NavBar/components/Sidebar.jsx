import { Link, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import {
  HomeIcon,
  ProfileIcon,
  HeartIcon,
  CartIcon,
  LanguageIcon,
} from "@components/icons";
import styles from "./Sidebar.module.css";
import { useTranslation } from "react-i18next";

export default function Sidebar() {
  const location = useLocation();

  const { i18n, t } = useTranslation();

  const currentLanguage = i18n.language;

  const toggleLanguage = () => {
    const newLang = currentLanguage === "ru" ? "uz" : "ru";
    i18n.changeLanguage(newLang);
    localStorage.setItem("lang", newLang);
    toast.success(t("lang_change"));
  };

  const isActive = (path) => location.pathname === path;

  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav}>
        <Link
          to="/"
          className={`${styles.navItem} ${isActive("/") ? styles.active : ""}`}
          title="Home"
        >
          <HomeIcon className={styles.icon} />
        </Link>

        <Link
          to="/profile"
          className={`${styles.navItem} ${
            isActive("/profile") ? styles.active : ""
          }`}
          title="Profile"
        >
          <ProfileIcon className={styles.icon} />
        </Link>

        <Link
          to="/wishlist"
          className={`${styles.navItem} ${
            isActive("/wishlist") ? styles.active : ""
          }`}
          title="Wishlist"
        >
          <HeartIcon className={styles.icon} />

          <span className={styles.badge}>2</span>

          {/* {wishlistCount > 0 && (
            <span className={styles.badge}>{wishlistCount}</span>
          )} */}
        </Link>

        <Link
          to="/cart"
          className={`${styles.navItem} ${
            isActive("/cart") ? styles.active : ""
          }`}
          title="Cart"
        >
          <CartIcon className={styles.icon} />
          <span className={styles.badge}>1</span>
          {/* {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>} */}
        </Link>

        <button
          className={styles.navItem}
          onClick={toggleLanguage}
          title="Language"
          aria-label="Toggle language"
        >
          {currentLanguage === "ru" ? (
            <>
              <LanguageIcon className={styles.icon} />
              <span className={styles.langLabel}>
                RU
              </span>
            </>
          ) : (
            <>
              <LanguageIcon className={styles.icon} />
              <span className={styles.langLabel}>
                UZ
              </span>
            </>
          )}
        </button>
      </nav>
    </aside>
  );
}
