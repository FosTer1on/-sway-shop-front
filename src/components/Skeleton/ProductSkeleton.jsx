import styles from "./ProductSkeleton.module.css";

export const ProductSkeleton = () => {
  return (
    <div className={styles.container}>
      <div className={styles.gallery}></div>
      <div className={styles.info}>
        <div className={styles.line}></div>
        <div className={styles.lineShort}></div>
        <div className={styles.line}></div>
        <div className={styles.buttons}></div>
      </div>
    </div>
  );
};
