import styles from "./FilterBarSkeleton.module.css";

export const FilterBarSkeleton = () => {
  return (
    <>
      {[1, 2, 3].map((item) => (
        <div key={item} className={styles.group}>
          <div className={styles.title}></div>

          <div className={styles.options}>
            {[1, 2, 3, 4].map((btn) => (
              <div
                key={btn}
                className={styles.button}
              ></div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};