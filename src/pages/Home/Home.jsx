import { useState } from "react";

import Layout from "@components/NavBar/Layout";
import { CatalogOfProducts } from "@components/Product/CatalogOfProducts";
import { FilterBar } from "@/components/FilterBar/FilterBar";

import styles from "./Home.module.css";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();

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
          <h1 className={styles.title}>Sway Shop</h1>
          <p className={styles.subtitle}>{t("explore")}</p>
        </div>

        {/* Filter Bar */}
        <FilterBar isOpen={isFilterOpen} onToggle={toggleFilter} />

        {/* Product Grid */}
        <CatalogOfProducts />
      </div>
    </Layout>
  );
}
