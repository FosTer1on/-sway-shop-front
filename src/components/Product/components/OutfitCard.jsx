import { Link, useNavigate } from "react-router-dom";
import styles from "./ProductCard.module.css";
import { useTranslation } from "react-i18next";
import { buildMediaUrl } from "@/utils/media";
import { PercentIcon, TelegramIcon } from "@/components/icons";
import { buildTelegramOrderUrl } from "@/utils/telegram";
import { trackEvent } from "@/api/analytics/events";

export const OutfitCard = ({
  slug,
  title,
  image,
  price,
  final_price,
  discount,
  products_count,
}) => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const telegramOrderUrl = buildTelegramOrderUrl(slug);

  const isDiscount = discount > 0;

  return (
    <div className={styles.card} onClick={() => navigate(`/outfit/${slug}`)}>
      <div className={styles.imageContainer}>
        <img
          src={buildMediaUrl(image)}
          alt={title}
          className={styles.image}
          loading="lazy"
          decoding="async"
        />

        <div className={styles.badgesContainer}>
          {isDiscount && (
            <div className={`${styles.badge} ${styles.badgeDiscount}`}>
              <PercentIcon className={styles.badgeIcon} />
              <span>{discount}</span>
            </div>
          )}
        </div>
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>

        <div className={styles.priceContainer}>
          {isDiscount ? (
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
              metadata: {
                type: "outfit",
              },
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
