import { Link } from "react-router-dom";
import styles from "./ProductCard.module.css";
import { useTranslation } from "react-i18next";
import { buildMediaUrl } from "@/utils/media";
import { PercentIcon } from "@/components/icons";

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

  const isDiscount = discount > 0;

  return (
    <Link to={`/outfit/${slug}`} className={styles.card}>
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
      </div>
    </Link>
  );
};
