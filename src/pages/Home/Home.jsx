import { useState } from "react";

import Layout from "@components/NavBar/Layout";
import { CatalogOfProducts } from "@components/Product/CatalogOfProducts";
import { FilterBar } from "@/components/FilterBar/FilterBar";

import styles from "./Home.module.css";

export default function Home() {
  
  // 🔹 состояние открытия мобильного фильтра
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const toggleFilter = () => {
    setIsFilterOpen((prev) => !prev);
  };

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
        <FilterBar
          isOpen={isFilterOpen}
          onToggle={toggleFilter}
        />

        {/* Results Info */}
        <div className={styles.resultsInfo}>
          <p>Showing 1 of 1 products</p>
        </div>

        {/* Product Grid */}
        <CatalogOfProducts />
      </div>
    </Layout>
  );
}
