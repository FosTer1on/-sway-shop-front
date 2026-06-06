import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import useProductStore from "@/store/product/useProductStore";
import styles from "./CategoryTabs.module.css";

const CATEGORY_TABS = [
  { id: "all", label: "All" },
  { id: "usa", label: "US" },
  { id: "china", label: "CN" },
  { id: "europe", label: "EU" },
  { id: "russia", label: "RU" },
  { id: "uzbekistan", label: "UZ" },
  { id: "outfits", label: "Outfits" },
];

const GENDER_TABS = [
  { id: "female", label: "Женское" },
  { id: "all", label: "Все" },
  { id: "male", label: "Мужское" },
];

const CategoryTabs = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { filters, setFilters, activeCatalog, setActiveCatalog } =
    useProductStore();

  const activeTab =
    activeCatalog === "outfits" ? "outfits" : filters.region || "all";

  const activeGender = filters.gender || "";

  useEffect(() => {
    const tabFromUrl = searchParams.get("tab");
    const regionFromUrl = searchParams.get("region") || "";
    const genderFromUrl = searchParams.get("gender") || "";

    if (tabFromUrl === "outfits") {
      setActiveCatalog("outfits");
      setFilters({
        region: "",
        gender: genderFromUrl,
      });
    } else {
      setActiveCatalog("products");
      setFilters({
        region: regionFromUrl,
        gender: genderFromUrl,
      });
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
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryTabs;