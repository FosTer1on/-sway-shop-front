import { useState, useMemo } from "react";
// ^ COMPONENTS
import Layout from "@components/NavBar/Layout";
import { CatalogOfProducts } from "@components/Product/CatalogOfProducts";
// import { FilterBar } from "../../components/FilterBar";
// import { ProductGrid } from "../../components/ProductCard";
// ? CSS
import styles from "./Home.module.css";

export default function Home() {
  return (
    <Layout>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.title}>Catalog</h1>
          <p className={styles.subtitle}>
            Explore our collection of quality clothing items
          </p>
        </div>

        {/* Filter Bar */}
        {/* <FilterBar
          onFilterChange={handleFilterChange}
          isOpen={filterOpen}
          onToggle={() => setFilterOpen(!filterOpen)}
        /> */}

        {/* Results Info */}
        <div className={styles.resultsInfo}>
          <p>
            Showing 1 of 1{" "}
            products
          </p>
          {/* <p>
            Showing {displayedProducts.length} of {filteredProducts.length}{" "}
            products
          </p> */}
        </div>

        {/* Product Grid */}
        <CatalogOfProducts />
        {/* {displayedProducts.length > 0 ? (
          <ProductGrid
            products={displayedProducts.map((p) => ({
              ...p,
              isFavorite: favorites.has(p.id),
            }))}
            isLoading={isLoadingMore}
            onAddToCart={handleAddToCart}
            onToggleFavorite={handleToggleFavorite}
            onLoadMore={handleLoadMore}
            hasMore={displayCount < filteredProducts.length}
          />
        ) : (
          <div className={styles.noResults}>
            <p>No products found matching your filters.</p>
            <button
              className={styles.resetBtn}
              onClick={() =>
                handleFilterChange({
                  status: [],
                  sort: "",
                  category: [],
                  brand: [],
                  minPrice: 0,
                  maxPrice: 5000000,
                })
              }
            >
              Reset Filters
            </button>
          </div>
        )} */}
      </div>
    </Layout>
  );
}
