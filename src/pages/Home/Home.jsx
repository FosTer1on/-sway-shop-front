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
  SupportIcon,
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
                href="https://t.me/SwayShopAdmin"
                className={styles.socialButton}
                aria-label="Phone"
              >
                <SupportIcon className={styles.socialIcon} />
              </a>

              <a
                href="https://t.me/swayshopuz"
                target="_blank"
                rel="noreferrer"
                className={styles.socialButton}
                aria-label="Telegram"
              >
                <TelegramIcon className={styles.socialIcon} />
              </a>

              <a
                href="https://www.instagram.com/swayshopuz?igsh=MTBlcXdma3F6NW0wdQ=="
                target="_blank"
                rel="noreferrer"
                className={styles.socialButton}
                aria-label="Instagram"
              >
                <InstagramIcon className={styles.socialIcon} />
              </a>

              {/* <a
                href="https://www.tiktok.com/@swayshopuz?_r=1&_t=ZS-97QaYnTfbpy"
                target="_blank"
                rel="noreferrer"
                className={styles.socialButton}
                aria-label="TikTok"
              >
                <TikTokIcon className={styles.socialIcon} />
              </a> */}
            </div>
          </div>

          <p className={styles.subtitle}>
            {t("desc1")}
            <br />
            <br />
            {t("desc2")}
            <br />
            <br />
            {t("desc3")}
            <br />
            <br />
            {t("desc4")}
            <br />
            <br />
            {t("desc5")}
          </p>
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
