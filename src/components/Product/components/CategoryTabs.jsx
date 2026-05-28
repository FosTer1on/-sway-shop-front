import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import useProductStore from "@/store/product/useProductStore";
import styles from "./CategoryTabs.module.css";

const CATEGORY_TABS = [
  { id: "all", label: "All" },
  { id: "usa", label: "🇺🇸" },
  { id: "china", label: "🇨🇳" },
  { id: "europe", label: "🇪🇺" },
  { id: "russia", label: "🇷🇺" },
  { id: "uzbekistan", label: "🇺🇿" },
  { id: "outfits", label: "Outfits" },
];

const CategoryTabs = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { filters, setFilters } = useProductStore();

  const activeTab = filters.region || "all";

  useEffect(() => {
    const regionFromUrl = searchParams.get("region") || "";

    if (regionFromUrl !== filters.region) {
      setFilters({ region: regionFromUrl });
    }
  }, []);

  const handleTabClick = (tabId) => {
    const region = tabId === "all" ? "" : tabId;

    if (filters.region === region) return;

    const newSearchParams = new URLSearchParams(searchParams);

    if (region) {
      newSearchParams.set("region", region);
    } else {
      newSearchParams.delete("region");
    }

    setSearchParams(newSearchParams);
    setFilters({ region });
  };

  return (
    <div className={styles.tabsContainer}>
      <div className={styles.tabsScroll}>
        {CATEGORY_TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`${styles.tab} ${
              activeTab === tab.id ? styles.active : ""
            }`}
          >
            <span className={styles.tabLabel}>{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryTabs;