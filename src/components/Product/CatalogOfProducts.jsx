import React from "react";
// ^ COMPONENTS
import { ProductCard } from "./components/ProductCard";

// ? CSS
import styles from "./CatalogOfProducts.module.css";

export const CatalogOfProducts = () => {
  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        <ProductCard
            // key={product.id}
            
          />
          <ProductCard
            // key={product.id}
            
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

      {/* {hasMore && ( */}
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
      {/* // )} */}
    </div>
  );
};
