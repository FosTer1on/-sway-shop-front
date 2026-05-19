import styles from "./CategoryTabs.module.css";

const CATEGORY_TABS = [
  {
    id: "all",
    label: "All",
  },
  {
    id: "usa",
    label: "🇺🇸",
  },
  {
    id: "china",
    label: "🇨🇳",
  },
  {
    id: "europe",
    label: "🇪🇺",
  },
  {
    id: "russia",
    label: "🇷🇺",
  },
  {
    id: "uzbekistan",
    label: "🇺🇿",
  },
  {
    id: "outfits",
    label: "Outfits",
  },
];

const CategoryTabs = () => {
  return (
    <div className={styles.tabsContainer}>
      <div className={styles.tabsScroll}>
        {CATEGORY_TABS.map((tab) => (
          <button
            key={tab.id}
            className={styles.tab}
          >
            <span className={styles.tabLabel}>
              {tab.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryTabs;