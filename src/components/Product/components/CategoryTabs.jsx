import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import useProductStore from "@/store/product/useProductStore";
import styles from "./CategoryTabs.module.css";
import { useTranslation } from "react-i18next";
import { ChinaFlag } from "@/components/icons/Flags/ChinaFlag";
import { EuropeFlag } from "@/components/icons/Flags/EuropeFlag";
import { RussiaFlag } from "@/components/icons/Flags/Russia";
import { UzbekistanFlag } from "@/components/icons/Flags/Uzbekistan";
import { UsaFlag } from "@/components/icons/Flags/UsaFlag";

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
      </div>
    </div>
  );
};

export default CategoryTabs;
