// & React
import { Link, useNavigate } from "react-router-dom";
// ^ Components
import {
  HeartIcon,
  FireIcon,
  PercentIcon,
  BestIcon,
  TelegramIcon,
} from "@components/icons";
// ~ Stores
import { useFavoritesStore } from "@/store/favorites/useFavoritesStore";
import { useAuth } from "@/hooks/useAuth";
// ? Style
import styles from "./ProductCard.module.css";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { buildMediaUrl } from "@/utils/media";
import { buildTelegramOrderUrl } from "@/utils/telegram";
import { trackEvent } from "@/api/analytics/events";

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
  onRemoveFromWishlist,
}) => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const telegramOrderUrl = buildTelegramOrderUrl(slug);

  const is_discount = 1 ? discount > 0 : 0;

  const { isFavorite, addFavorite, removeFavorite, isLoaded, favorites } =
    useFavoritesStore();

  const { isAuth } = useAuth();

  const is_favorite = isLoaded && slug ? isFavorite(slug) : false;

  const handleToggleFavorite = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuth) {
      navigate("/register");
      return;
    }

    if (is_favorite) {
      removeFavorite(slug);

      if (onRemoveFromWishlist) {
        onRemoveFromWishlist();
      }
      toast.success(t("delete_favorite"));
    } else {
      addFavorite(slug);
      toast.success(t("add_to_favorite"));
    }
  };

  return (
    <div
      className={styles.card}
      onClick={() =>
        navigate(`/product/${slug}`, {
          state: { fromScroll: window.scrollY },
        })
      }
    >
      <div className={styles.imageContainer}>
        <img
          src={buildMediaUrl(images[0].image_url)}
          alt={name}
          className={styles.image}
          loading="lazy"
          decoding="async"
          onError={(e) => {
            const img = e.currentTarget;
            if (!img.dataset.retried) {
              img.dataset.retried = "true";
              setTimeout(() => {
                img.src = `${buildMediaUrl(
                  images[0]?.image_url
                )}?retry=${Date.now()}`;
              }, 300);
            }
          }}
        />

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
            onClick={handleToggleFavorite}
            aria-label="Add to wishlist"
          >
            <HeartIcon className={styles.actionIcon} filled={is_favorite} />
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
              <span className={styles.price}>
                {final_price} {t("sum")}
              </span>
            </>
          ) : (
            <span className={styles.price}>
              {price} {t("sum")}
            </span>
          )}
        </div>
        <a
          href={telegramOrderUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.telegramOrderBtn}
          onClick={(e) => {
            e.stopPropagation();

            trackEvent("telegram_order_click", {
              product_slug: slug,
            });
          }}
        >
          <TelegramIcon className={styles.tg_icon} />
          <span> {t("one_click")}</span>
        </a>
      </div>
    </div>
  );
};
