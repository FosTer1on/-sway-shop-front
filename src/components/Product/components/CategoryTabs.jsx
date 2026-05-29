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
  const { filters, setFilters, activeCatalog, setActiveCatalog } =
    useProductStore();

  const activeTab =
    activeCatalog === "outfits" ? "outfits" : filters.region || "all";

  useEffect(() => {
    const tabFromUrl = searchParams.get("tab");
    const regionFromUrl = searchParams.get("region") || "";

    if (tabFromUrl === "outfits") {
      setActiveCatalog("outfits");
      setFilters({ region: "" });
    } else {
      setActiveCatalog("products");
      setFilters({ region: regionFromUrl });
    }
  }, []);

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
