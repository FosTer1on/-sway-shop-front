import { useEffect } from "react";
import { ProductCard } from "./components/ProductCard";
import useProductStore from "@/store/product/useProductStore";
import styles from "./CatalogOfProducts.module.css";
import { useTranslation } from "react-i18next";
import { OutfitCard } from "./components/OutfitCard";

export const CatalogOfProducts = () => {
  const { i18n, t } = useTranslation();

  const {
    products,
    outfits,
    activeCatalog,
    fetchProducts,
    fetchOutfits,
    loading,
    hasMore,
    error,
    filters,
  } = useProductStore();

  useEffect(() => {
    if (activeCatalog === "outfits") {
      fetchOutfits({ reset: true });
    } else {
      fetchProducts({ reset: true });
    }
  }, [filters, activeCatalog, i18n.language]);

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {activeCatalog === "outfits"
          ? outfits.map((outfit) => <OutfitCard key={outfit.id} {...outfit} />)
          : products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}

        {loading && products.length === 0 && (
          <p className={styles.loading}>{t("loading_products")}</p>
        )}

        {!loading && products.length === 0 && !error && (
          <p className={styles.empty}>{t("no_products")}</p>
        )}

        {error && <p className={styles.error}>{error}</p>}
      </div>

      {hasMore && (
        <div className={styles.loadMoreContainer}>
          <button
            className={styles.loadMoreBtn}
            onClick={() =>
              activeCatalog === "outfits" ? fetchOutfits() : fetchProducts()
            }
            disabled={loading}
          >
            {loading ? `${t("loading")}` : `${t("load_more_products")}`}
          </button>
        </div>
      )}
    </div>
  );
};
