import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import styles from "./CartSummary.module.css";

export const CartSummary = ({ summary }) => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className={styles.summary}>
      <h2 className={styles.title}>{t("order_summary")}</h2>

      <div className={styles.rows}>
        <div className={styles.row}>
          <span>{t("items")}</span>
          <span>{summary.items_total_quantity}</span>
        </div>

        <div className={styles.row}>
          <span>{t("subtotal")}</span>
          <span>{summary.items_total_price} {t("sum")}</span>
        </div>

        <div className={styles.divider} />

        <div className={`${styles.row} ${styles.total}`}>
          <span>{t("total")}</span>
          <span>{summary.total_with_service} {t("sum")}</span>
        </div>
      </div>

      <button
        className={styles.checkoutButton}
        onClick={handleCheckout}
      >
        {t("to_checkout")}
      </button>
    </div>
  );
};
