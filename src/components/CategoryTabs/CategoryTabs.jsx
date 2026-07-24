import { useSearchParams } from "react-router-dom";
import useProductStore from "@/store/product/useProductStore";
import styles from "./CategoryTabs.module.css";
import { useTranslation } from "react-i18next";
import { ChinaFlag } from "@/components/icons/Flags/ChinaFlag";
import { useEffect, useState } from "react";
import { trackEvent } from "@/api/analytics/events";
import toast from "react-hot-toast";

const GENDER_TABS = [{ id: "female" }, { id: "all" }, { id: "male" }];

const CategoryTabs = () => {
  const { t } = useTranslation();

  const [searchParams, setSearchParams] = useSearchParams();

  const { filters, setFilters, activeCatalog, setActiveCatalog } =
    useProductStore();

  const activeTab =
    activeCatalog === "outfits" ? "outfits" : filters.region || "all";

  const activeGender = filters.gender || "";

  const [searchValue, setSearchValue] = useState(filters.search || "");

  useEffect(() => {
    setSearchValue(filters.search || "");
  }, [filters.search]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const value = searchValue.trim();

      const newSearchParams = new URLSearchParams(searchParams);

      if (value) {
        trackEvent("search", {
          search_query: value,
        });
        newSearchParams.set("search", value);
      } else {
        newSearchParams.delete("search");
      }

      setSearchParams(newSearchParams);
      setFilters({ search: value });
    }, 500);

    return () => clearTimeout(timer);
  }, [searchValue]);

  const handleTabClick = (tabId) => {
    if (tabId === "soon") {
      toast(t("disable_function_message"), {
        duration: 4000,
      });

      return;
    }

    const newSearchParams = new URLSearchParams(searchParams);

    if (tabId === "outfits") {
      newSearchParams.delete("region");
      newSearchParams.set("tab", "outfits");

      setSearchParams(newSearchParams);
      setActiveCatalog("outfits");
      setFilters({ region: "" });

      return;
    }

    const region = tabId === "all" ? "" : tabId;

    newSearchParams.delete("tab");

    if (region) {
      newSearchParams.set("region", region);
    } else {
      newSearchParams.delete("region");
    }

    setSearchParams(newSearchParams);
    setActiveCatalog("products");
    setFilters({ region });
  };

  const handleGenderClick = (genderId) => {
    const newSearchParams = new URLSearchParams(searchParams);

    newSearchParams.set("gender", genderId);

    setSearchParams(newSearchParams);
    setFilters({ gender: genderId });
  };

  return (
    <div className={styles.tabsContainer}>
      <div className={styles.tabsRow}>
        <div className={styles.tabsScroll}>
          <button
            type="button"
            className={`${styles.tab} ${
              activeTab === "all" ? styles.active : ""
            }`}
            onClick={() => handleTabClick("all")}
          >
            {t("all")}
          </button>

          <button
            type="button"
            className={`${styles.tab} ${
              activeTab === "china" ? styles.active : ""
            }`}
            onClick={() => handleTabClick("china")}
            aria-label={t("china")}
          >
            <ChinaFlag />
          </button>

          <button
            type="button"
            className={`${styles.tab} ${
              activeTab === "outfits" ? styles.active : ""
            }`}
            onClick={() => handleTabClick("outfits")}
          >
            {t("outfits")}
          </button>

          <button
            type="button"
            className={`${styles.tab} ${styles.soonTab}`}
            onClick={() => handleTabClick("soon")}
          >
            SOON...
          </button>
        </div>

        <div className={styles.genderTabs}>
          {GENDER_TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleGenderClick(tab.id)}
              className={`${styles.genderTab} ${
                activeGender === tab.id ? styles.genderActive : ""
              }`}
            >
              {t(`${tab.id}`)}
            </button>
          ))}
        </div>

        <div className={styles.searchBox}>
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder={t("search")}
            className={styles.searchInput}
          />

          {searchValue && (
            <button
              type="button"
              className={styles.clearButton}
              onClick={() => setSearchValue("")}
            >
              X
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryTabs;
