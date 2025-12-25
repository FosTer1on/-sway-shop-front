import { Link } from "react-router-dom";
import { HeartIcon, FireIcon, PercentIcon, BestIcon } from "@components/icons";
import styles from "./ProductCard.module.css";

const API_URL = "http://127.0.0.1:8000";

export const ProductCard = ({
  id,
  slug,
  name,
  images = [],
  price,
  final_price,
  discount,
  is_popular,
  is_best_seller,
  is_favorite,
  onAddToCart,
  onToggleFavorite,
}) => {
  const rawImage = images?.[0]?.image || images?.[0];
  const image = rawImage
    ? rawImage.startsWith("http")
      ? rawImage
      : `${API_URL}${rawImage}`
    : "";

  const is_discount = 1 ? discount > 0 : 0;

  return (
    <Link
      to={`/product/${slug}`}
      state={{ fromScroll: window.scrollY }}
      className={styles.card}
    >
      <div className={styles.imageContainer}>
        <img src={image} alt={name} className={styles.image} loading="lazy" />

        {/* ===== BADGES (TOP LEFT) ===== */}
        <div className={styles.badgesContainer}>
          {is_popular && (
            <div className={`${styles.badge} ${styles.badgePopular}`}>
              <FireIcon />
            </div>
          )}

          {is_discount && discount > 0 && (
            <div className={`${styles.badge} ${styles.badgeDiscount}`}>
              <PercentIcon className={styles.badgeIcon} />
              <span>{discount}</span>
            </div>
          )}

          {is_best_seller && (
            <div className={`${styles.badge} ${styles.badgeBest}`}>
              <BestIcon />
            </div>
          )}
        </div>

        {/* ===== ACTIONS (TOP RIGHT) ===== */}
        <div className={styles.actions}>
          <button
            className={`${styles.actionBtn} ${
              is_favorite ? styles.active : ""
            }`}
            onClick={(e) => {
              e.preventDefault();
              onToggleFavorite?.(id);
            }}
            aria-label="Add to wishlist"
          >
            <HeartIcon className={styles.actionIcon} />
          </button>

          <button
            className={styles.actionBtn}
            onClick={(e) => {
              e.preventDefault();
              onAddToCart?.(id);
            }}
            aria-label="Add to cart"
          >
            <svg
              className={styles.actionIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
          </button>
        </div>
      </div>

      {/* ===== CONTENT ===== */}
      <div className={styles.content}>
        <h3 className={styles.title}>{name}</h3>

        <div className={styles.priceContainer}>
          {is_discount ? (
            <>
              <span className={styles.originalPrice}>{price}</span>
              <span className={styles.price}>{final_price}</span>
            </>
          ) : (
            <span className={styles.price}>{price}</span>
          )}
        </div>
      </div>
    </Link>
  );
};
