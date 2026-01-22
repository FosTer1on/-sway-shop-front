import styles from "./CartSummary.module.css";

export const CartSummary = ({ summary }) => {
  return (
    <div className={styles.summary}>
      <h2 className={styles.title}>Order Summary</h2>

      <div className={styles.rows}>
        <div className={styles.row}>
          <span>Items</span>
          <span>{summary.items_total_quantity}</span>
        </div>

        <div className={styles.row}>
          <span>Subtotal</span>
          <span>{summary.items_total_price}</span>
        </div>

        <div className={styles.divider} />

        <div className={`${styles.row} ${styles.total}`}>
          <span>Total</span>
          <span>{summary.total_with_service}</span>
        </div>
      </div>

      <button className={styles.checkoutButton}>
        Proceed to Checkout
      </button>
    </div>
  );
};