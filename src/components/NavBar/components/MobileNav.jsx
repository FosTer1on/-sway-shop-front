import { Link, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
// ^ COMPONENTS
import {
  HomeIcon,
  ProfileIcon,
  HeartIcon,
  CartIcon,
  LanguageIcon,
} from "@components/icons";
// ? CSS
import styles from "./MobileNav.module.css";
import { useTranslation } from "react-i18next";
import { useFavoritesStore } from "@/store/favorites/useFavoritesStore";
import { useCartStore } from "@/store/cart/useCartStore";

const MobileNav = () => {
  const location = useLocation();

  const favoritesCount = useFavoritesStore((state) => state.favorites.length);
  const cartCount = useCartStore((state) => state.items.length);

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
    <nav className={styles.bottomNav}>
      <Link
        to="/"
        className={`${styles.navItem} ${isActive("/") ? styles.active : ""}`}
        title="Home"
      >
        <HomeIcon className={styles.icon} />
      </Link>

      <button
        className={styles.navItem}
        onClick={toggleLanguage}
        title="Language"
        aria-label="Toggle language"
      >
        <span className={styles.lang}>{currentLanguage.toUpperCase()}</span>
      </button>

      <Link
        to="/wishlist"
        className={`${styles.navItem} ${
          isActive("/wishlist") ? styles.active : ""
        }`}
        title="Wishlist"
      >
        <HeartIcon className={styles.icon} />
        {favoritesCount > 0 ? (
          <span className={styles.badge}>{favoritesCount}</span>
        ) : (
          ""
        )}
      </Link>

      <Link
        to="/cart"
        className={`${styles.navItem} ${
          isActive("/cart") ? styles.active : ""
        }`}
        title="Cart"
      >
        <CartIcon className={styles.icon} />
        {cartCount > 0 ? <span className={styles.badge}>{cartCount}</span> : ""}
      </Link>
    </nav>
  );
};

export default MobileNav;
