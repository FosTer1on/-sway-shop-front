import { useEffect, useState } from "react";
import { CloseIcon } from "@components/icons";
import styles from "./CartItem.module.css";
import { useTranslation } from "react-i18next";

export const CartItem = ({
  id,
  name,
  images,
  item_price,
  item_discount_price,
  total_price,
  is_discount,
  size,
  quantity,
  onIncrease,
  onDecrease,
  onRemove,
  onClick,
}) => {
  const { t } = useTranslation();

  return (
    <div className={styles.item}>
      <div
        className={styles.imageContainer}
        onClick={onClick}
        style={{ cursor: "pointer" }}
      >
        <img src={images[0]?.image_url} alt={name} className={styles.image} />
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <div onClick={onClick}>
            <h3 className={styles.title}>{name}</h3>
            <p className={styles.size}>
              {t("size")} {size}
            </p>
          </div>

          <button onClick={onRemove} className={styles.removeButton}>
            ×
          </button>
        </div>
      </div>

      {/* ✅ footer вынесли сюда */}
      <div className={styles.footer}>
        <div className={styles.priceInfo}>
          <p className={styles.priceLabel}>{t("price_per_item")}</p>
          <p>
            {is_discount ? (
              <>
                <span className={styles.old_price}>{item_price}</span>
                <span className={styles.discount_price}>
                  {item_discount_price}
                </span>
              </>
            ) : (
              <span>{item_price}</span>
            )}
          </p>
        </div>

        <div className={styles.quantityControl}>
          <button
            onClick={onDecrease}
            disabled={quantity <= 1}
            className={styles.quantityButton}
          >
            −
          </button>
          <span className={styles.quantity}>{quantity}</span>
          <button onClick={onIncrease} className={styles.quantityButton}>
            +
          </button>
        </div>

        <div className={styles.lineTotal}>
          <p className={styles.lineTotalLabel}>{t("item_sum")}</p>
          <p>{total_price}</p>
        </div>
      </div>
    </div>
  );
};
