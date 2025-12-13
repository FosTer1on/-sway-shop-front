import { useEffect } from "react";

// COMPONENTS
import { ProductCard } from "./components/ProductCard";

// STORE
import useProductStore from "@/store/product/useProductStore";

// CSS
import styles from "./CatalogOfProducts.module.css";

export const CatalogOfProducts = () => {
  const {
    products,
    fetchProducts,
    loading,
    hasMore,
    error,
    resetProducts,
  } = useProductStore();

  // первая загрузка
  useEffect(() => {
    resetProducts();
    fetchProducts({ reset: true });
  }, []);

  return (
    <div className={styles.container}>
      {/* GRID */}
      <div className={styles.grid}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            {...product}
          />
        ))}

        {/* skeleton / loader */}
        {loading && products.length === 0 && (
          <p className={styles.loading}>Loading products...</p>
        )}

        {error && (
          <p className={styles.error}>{error}</p>
        )}
      </div>

      {/* LOAD MORE */}
      {hasMore && (
        <div className={styles.loadMoreContainer}>
          <button
            className={styles.loadMoreBtn}
            onClick={() => fetchProducts()}
            disabled={loading}
            aria-busy={loading}
          >
            {loading ? "Loading..." : "Load More Products"}
          </button>
        </div>
      )}
    </div>
  );
};
