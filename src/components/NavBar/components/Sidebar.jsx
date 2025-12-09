import { Link, useLocation } from "react-router-dom";
import {
  HomeIcon,
  ProfileIcon,
  HeartIcon,
  CartIcon,
  LanguageIcon,
} from "@components/icons";
import styles from "./Sidebar.module.css";


export default function Sidebar() {
  const location = useLocation();

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
          className={`${styles.navItem} ${isActive("/profile") ? styles.active : ""}`}
          title="Profile"
        >
          <ProfileIcon className={styles.icon} />
        </Link>

        <Link
          to="/wishlist"
          className={`${styles.navItem} ${isActive("/wishlist") ? styles.active : ""}`}
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
          className={`${styles.navItem} ${isActive("/cart") ? styles.active : ""}`}
          title="Cart"
        >
          <CartIcon className={styles.icon} />
          <span className={styles.badge}>1</span>
          {/* {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>} */}
        </Link>

        <button
          className={styles.navItem}
          // onClick={() => onLanguageChange?.(currentLanguage === "ru" ? "uz" : "ru")}
          title="Language"
          aria-label="Toggle language"
        >
          <LanguageIcon className={styles.icon} />
          <span className={styles.langLabel}>
            {/* {currentLanguage.toUpperCase()} */}RU
          </span>
        </button>
      </nav>
    </aside>
  );
}
