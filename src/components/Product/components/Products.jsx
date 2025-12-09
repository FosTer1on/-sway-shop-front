import { ProductCard } from "./ProductCard";
import styles from "./ProductGrid.module.css";


export const ProductGrid = () => {
  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        <ProductCard
            key={product.id}
            {...product}
            onAddToCart={onAddToCart}
            onToggleFavorite={onToggleFavorite}
          />
          <ProductCard
            key={product.id}
            {...product}
            onAddToCart={onAddToCart}
            onToggleFavorite={onToggleFavorite}
          />
        {/* {products.map((product) => (
          <ProductCard
            key={product.id}
            {...product}
            onAddToCart={onAddToCart}
            onToggleFavorite={onToggleFavorite}
          />
        ))} */}
      </div>

      {hasMore && (
        <div className={styles.loadMoreContainer}>
          <button
            className={styles.loadMoreBtn}
            // onClick={onLoadMore}
            // disabled={isLoading}
            // aria-busy={isLoading}
          >
            Load More Products
            {/* {isLoading ? (
              <>
                <span className={styles.spinner}></span>
                Loading...
              </>
            ) : (
              "Load More Products"
            )} */}
          </button>
        </div>
      )}
    </div>
  );
};
