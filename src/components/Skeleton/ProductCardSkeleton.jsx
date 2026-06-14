import styles from "./ProductCardSkeleton.module.css";

export const ProductCardSkeleton = () => {
  return (
    <div className={`${styles.card} ${styles.skeletonCard}`}>
      <div className={`${styles.imageContainer} ${styles.skeletonImage}`} />

      <div className={styles.content}>
        <div className={`${styles.skeletonLine} ${styles.skeletonTitle}`} />
        <div className={`${styles.skeletonLine} ${styles.skeletonPrice}`} />
        <div className={`${styles.skeletonButton}`} />
      </div>
    </div>
  );
};