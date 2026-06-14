import { useSearchParams } from "react-router-dom";
import useProductStore from "@/store/product/useProductStore";
import styles from "./CategoryTabs.module.css";
import { useTranslation } from "react-i18next";
import { ChinaFlag } from "@/components/icons/Flags/ChinaFlag";
import { EuropeFlag } from "@/components/icons/Flags/EuropeFlag";
import { RussiaFlag } from "@/components/icons/Flags/Russia";
import { UzbekistanFlag } from "@/components/icons/Flags/Uzbekistan";
import { UsaFlag } from "@/components/icons/Flags/UsaFlag";
import { useEffect, useState } from "react";
import { trackEvent } from "@/api/analytics/events";

const CATEGORY_TABS = [
  { id: "usa", label: <UsaFlag /> },
  { id: "china", label: <ChinaFlag /> },
  { id: "europe", label: <EuropeFlag /> },
  { id: "russia", label: <RussiaFlag /> },
  { id: "uzbekistan", label: <UzbekistanFlag /> },
];

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
    const newSearchParams = new URLSearchParams(searchParams);

    if (tabId === "outfits") {
      newSearchParams.set("tab", "outfits");
      newSearchParams.delete("region");

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
            className={`${styles.tab} ${
              activeTab === "all" ? styles.active : ""
            }`}
            onClick={() => handleTabClick("all")}
          >
            {t("all")}
          </button>
          {CATEGORY_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`${styles.tab} ${
                activeTab === tab.id ? styles.active : ""
              }`}
            >
              {tab.label}
            </button>
          ))}
          <button
            className={`${styles.tab} ${
              activeTab === "outfits" ? styles.active : ""
            }`}
            onClick={() => handleTabClick("outfits")}
          >
            {t("outfits")}
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
