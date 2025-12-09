import { Link } from "react-router-dom";
// ^ COMPONENTS
import { HeartIcon, FireIcon, PercentIcon, BestIcon } from "@components/icons";
// ? CSS
import styles from "./ProductCard.module.css";

export const ProductCard = () => (
  <Link to={''} className={styles.card}>
  {/* <Link to={`/product/${id}`} className={styles.card}> */}
    <div className={styles.imageContainer}>
      <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlp-Ltk9qnyjnLsGhF5p4Tx5n8T83yCg9Zfg&s' alt={'ff'} className={styles.image} loading="lazy" />
      {/* <img src={image} alt={title} className={styles.image} loading="lazy" /> */}

      {/* Badges - Top Left */}
      {/* <div className={styles.badgesContainer}>
        {isPopular && (
          <div className={`${styles.badge} ${styles.badgePopular}`}>
            <FireIcon className={styles.badgeIcon} />
          </div>
        )}
        {isDiscount && discount > 0 && (
          <div className={`${styles.badge} ${styles.badgeDiscount}`}>
            <PercentIcon className={styles.badgeIcon} />
            <span>{discount}%</span>
          </div>
        )}
        {isBest && (
          <div className={`${styles.badge} ${styles.badgeBest}`}>
            <BestIcon className={styles.badgeIcon} />
          </div>
        )}
      </div> */}

      {/* Action Icons - Top Right */}
      <div className={styles.actions}>
        <button
          className={styles.actionBtn}
          // className={`${styles.actionBtn} ${isFavorite ? styles.active : ""}`}
          // onClick={(e) => {
          //   e.preventDefault();
          //   onToggleFavorite?.(id);
          // }}
          aria-label="Add to wishlist"
        >
          <HeartIcon className={styles.actionIcon} />
        </button>
        <button
          className={styles.actionBtn}
          // onClick={(e) => {
          //   e.preventDefault();
          //   onAddToCart?.(id);
          // }}
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

    <div className={styles.content}>
      <h3 className={styles.title}>Title</h3>
      {/* <h3 className={styles.title}>{title}</h3> */}

      <div className={styles.priceContainer}>
        {/* {originalPrice ? (
          <>
            <span className={styles.originalPrice}>
              {formatPrice(originalPrice)}
            </span>
            <span className={styles.price}>{formatPrice(price)}</span>
          </>
        ) : (
          <span className={styles.price}>{formatPrice(price)}</span>
        )} */}
        <span className={styles.price}>1 000 000</span>
      </div>
    </div>
  </Link>
);
