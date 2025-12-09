import { Link, useLocation } from "react-router-dom";
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

const MobileNav = () => {
  const location = useLocation();

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

      <Link
        to="/wishlist"
        className={`${styles.navItem} ${
          isActive("/wishlist") ? styles.active : ""
        }`}
        title="Wishlist"
      >
        <HeartIcon className={styles.icon} />
        <span className={styles.badge}>3</span>
        {/* {wishlistCount > 0 && (
          <span className={styles.badge}>{wishlistCount}</span>
        )} */}
      </Link>

      <button
        className={styles.navItem}
        // onClick={() =>
        //   onLanguageChange?.(currentLanguage === "ru" ? "uz" : "ru")
        // }
        title="Language"
        aria-label="Toggle language"
      >
        <LanguageIcon className={styles.icon} />
      </button>

      <Link
        to="/cart"
        className={`${styles.navItem} ${
          isActive("/cart") ? styles.active : ""
        }`}
        title="Cart"
      >
        <CartIcon className={styles.icon} />
        <span className={styles.badge}>2</span>
        {/* {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>} */}
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
    </nav>
  );
};

export default MobileNav;
