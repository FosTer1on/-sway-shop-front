import { useState } from "react";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import useProductStore from "@/store/product/useProductStore";

import Layout from "@components/NavBar/Layout";
import { CatalogOfProducts } from "@components/Product/CatalogOfProducts";
import { FilterBar } from "@/components/FilterBar/FilterBar";

import styles from "./Home.module.css";
import { useTranslation } from "react-i18next";
import CategoryTabs from "@/components/CategoryTabs/CategoryTabs";
import {
  InstagramIcon,
  PhoneIcon,
  TelegramIcon,
  TikTokIcon,
} from "@/components/icons";

export default function Home() {
  const { t } = useTranslation();

  // 🔹 состояние открытия мобильного фильтра
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [searchParams] = useSearchParams();
  const initFiltersFromUrl = useProductStore(
    (state) => state.initFiltersFromUrl
  );

  useEffect(() => {
    initFiltersFromUrl(searchParams);
  }, []);

  const toggleFilter = () => {
    setIsFilterOpen((prev) => !prev);
  };

  return (
    <Layout>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerTop}>
            <h1 className={styles.title}>Sway Shop</h1>

            <div className={styles.socialLinks}>
              <a
                href="https://instagram.com/YOUR_INSTAGRAM"
                target="_blank"
                rel="noreferrer"
                className={styles.socialButton}
                aria-label="Instagram"
              >
                <TelegramIcon className={styles.socialIcon} />
              </a>

              <a
                href="https://instagram.com/YOUR_INSTAGRAM"
                target="_blank"
                rel="noreferrer"
                className={styles.socialButton}
                aria-label="Instagram"
              >
                <InstagramIcon className={styles.socialIcon} />
              </a>

              <a
                href="https://www.tiktok.com/@YOUR_TIKTOK"
                target="_blank"
                rel="noreferrer"
                className={styles.socialButton}
                aria-label="TikTok"
              >
                <TikTokIcon className={styles.socialIcon} />
              </a>

              <a
                href="tel:+998901234567"
                className={styles.socialButton}
                aria-label="Phone"
              >
                <PhoneIcon className={styles.socialIcon} />
              </a>
            </div>
          </div>

          <p className={styles.subtitle}>{t("explore")}</p>
        </div>

        {/* Filter Bar */}
        <FilterBar isOpen={isFilterOpen} onToggle={toggleFilter} />

        <CategoryTabs />

        {/* Product Grid */}
        <CatalogOfProducts />
      </div>
    </Layout>
  );
}
