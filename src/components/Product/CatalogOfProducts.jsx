import { useEffect } from "react";
import { ProductCard } from "./components/ProductCard";
import useProductStore from "@/store/product/useProductStore";
import styles from "./CatalogOfProducts.module.css";
import { useTranslation } from "react-i18next";

export const CatalogOfProducts = () => {
  const { i18n, t } = useTranslation();

  const {
    products,
    fetchProducts,
    loading,
    hasMore,
    error,
    resetProducts,
    filters, // 🔥 добавляем
  } = useProductStore();

  // 🔥 ВОТ ЭТО ГЛАВНОЕ
  useEffect(() => {
    resetProducts();
    fetchProducts({ reset: true });
  }, [filters, i18n.language]);

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}

        {loading && products.length === 0 && (
          <p className={styles.loading}>{t("loading_products")}</p>
        )}

        {error && <p className={styles.error}>{error}</p>}
      </div>

      {hasMore && (
        <div className={styles.loadMoreContainer}>
          <button
            className={styles.loadMoreBtn}
            onClick={() => fetchProducts()}
            disabled={loading}
          >
            {loading ? `${t("loading")}` : `${t("load_more_products")}`}
          </button>
        </div>
      )}
    </div>
  );
};
