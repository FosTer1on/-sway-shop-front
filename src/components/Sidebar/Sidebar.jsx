import React from 'react';
import './Sidebar.css';

/*
Props: active ('home'|'wishlist'|'lang'|'cart'|'profile'), counts: {wishlist, cart}, onNavigate, isMobile
*/
export default function Sidebar({ active='home', counts={}, onNavigate }) {
  const items = [
    {key:'home', label:'Home', icon:'🏠'},
    {key:'wishlist', label:'Wishlist', icon:'♡'},
    {key:'lang', label:'Lang', icon:'🌐'},
    {key:'cart', label:'Cart', icon:'🛒'},
    {key:'profile', label:'Profile', icon:'👤'},
  ];

  return (
    // <nav className="app-sidebar">
    //   {items.map(it => (
    //     <button key={it.key} className={`sb-item ${active===it.key ? 'active':''}`} onClick={()=>onNavigate && onNavigate(it.key)} aria-label={it.label}>
    //       <span className="icon">{it.icon}</span>
    //       { (it.key === 'wishlist' || it.key === 'cart') && counts[it.key] ? <span className="count">{counts[it.key]}</span> : null }
    //     </button>
    //   ))}
    // </nav>

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
          {wishlistCount > 0 && (
            <span className={styles.badge}>{wishlistCount}</span>
          )}
        </Link>

        <Link
          to="/cart"
          className={`${styles.navItem} ${isActive("/cart") ? styles.active : ""}`}
          title="Cart"
        >
          <CartIcon className={styles.icon} />
          {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
        </Link>

        <button
          className={styles.navItem}
          onClick={() => onLanguageChange?.(currentLanguage === "ru" ? "uz" : "ru")}
          title="Language"
          aria-label="Toggle language"
        >
          <LanguageIcon className={styles.icon} />
          <span className={styles.langLabel}>
            {currentLanguage.toUpperCase()}
          </span>
        </button>
      </nav>
    </aside>
  );
}
