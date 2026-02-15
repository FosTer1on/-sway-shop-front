import { useState, useEffect } from "react";
import { CloseIcon, MenuIcon } from "../icons";
import {
  getStores,
  getBrands,
  getCategories,
  getSizesByCategory,
} from "@/api/filter/filterApi";

import styles from "./FilterBar.module.css";
import useProductStore from "@/store/product/useProductStore";

export const FilterBar = ({ isOpen, onToggle }) => {
  const { filters, setFilters } = useProductStore();

  const [categories, setCategories] = useState([]);
  const [stores, setStores] = useState([]);
  const [brands, setBrands] = useState([]);
  const [availableSizes, setAvailableSizes] = useState([]);

  // 🔹 при выборе категории меняем размеры
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const [catRes, storeRes, brandRes] = await Promise.all([
          getCategories(),
          getStores(),
          getBrands(),
        ]);

        setCategories(catRes.data);
        setStores(storeRes.data);
        setBrands(brandRes.data);
      } catch (error) {
        console.log("Filter load error:", error);
      }
    };

    fetchFilters();
  }, []);

  useEffect(() => {
    if (!filters.category) {
      setAvailableSizes([]);
      return;
    }

    const fetchSizes = async () => {
      try {
        const response = await getSizesByCategory(filters.category);
        setAvailableSizes(response.data);

        // очищаем старые размеры
        setFilters({
          ...filters,
          sizes: [],
        });
      } catch (error) {
        console.log("Size load error:", error);
      }
    };

    fetchSizes();
  }, [filters.category]);

  // 🔹 универсальный toggle для multi-select
  const toggleArrayValue = (key, value) => {
    const exists = filters[key].includes(value);

    const updated = exists
      ? filters[key].filter((v) => v !== value)
      : [...filters[key], value];

    setFilters({
      ...filters,
      [key]: updated,
    });
  };

  const handleReset = () => {
    setFilters({
      category: "",
      stores: [],
      brands: [],
      sizes: [],
      sort: "",
      discountOnly: false,
      minPrice: "",
      maxPrice: "",
    });
    setAvailableSizes([]);
  };

  return (
    <>
      {/* Mobile Toggle */}
      <button
        className={styles.mobileToggle}
        onClick={onToggle}
        aria-label="Toggle filters"
      >
        <MenuIcon className={styles.toggleIcon} />
        <span>Filters</span>
      </button>

      <div className={`${styles.filterBar} ${isOpen ? styles.open : ""}`}>
        <div className={styles.header}>
          <h3>Filters</h3>
          <button
            className={styles.closeBtn}
            onClick={onToggle}
            aria-label="Close filters"
          >
            <CloseIcon className={styles.closeIcon} />
          </button>
        </div>

        <div className={styles.content}>
          {/* Category */}
          <div className={styles.filterGroup}>
            <label className={styles.groupTitle}>Category</label>
            <select
              className={styles.select}
              value={filters.category}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  category: e.target.value,
                })
              }
            >
              <option value="">Выберите категорию</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.slug}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Stores - MULTI BUTTONS */}
          <div className={styles.filterGroup}>
            <label className={styles.groupTitle}>Stores</label>
            <div className={styles.options}>
              {stores.map((store) => (
                <button
                  key={store.id}
                  type="button"
                  className={`${styles.multiBtn} ${
                    filters.stores.includes(store.slug) ? styles.activeBtn : ""
                  }`}
                  onClick={() => toggleArrayValue("stores", store.slug)}
                >
                  {store.name}
                </button>
              ))}
            </div>
          </div>

          {/* Brands - MULTI BUTTONS */}
          <div className={styles.filterGroup}>
            <label className={styles.groupTitle}>Brands</label>
            <div className={styles.options}>
              {brands.map((brand) => (
                <button
                  key={brand.id}
                  type="button"
                  className={`${styles.multiBtn} ${
                    filters.brands.includes(brand.slug) ? styles.activeBtn : ""
                  }`}
                  onClick={() => toggleArrayValue("brands", brand.slug)}
                >
                  {brand.name}
                </button>
              ))}
            </div>
          </div>

          {/* Sizes - зависят от категории */}
          {availableSizes.length > 0 && (
            <div className={styles.filterGroup}>
              <label className={styles.groupTitle}>Sizes</label>{" "}
              <div className={styles.options}>
                {availableSizes.map((size) => (
                  <button
                    key={size.id}
                    type="button"
                    className={`${styles.multiBtn} ${
                      filters.sizes.includes(size.id) ? styles.activeBtn : ""
                    }`}
                    onClick={() => toggleArrayValue("sizes", size.id)}
                  >
                    {size.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Sort */}
          <div className={styles.filterGroup}>
            <label className={styles.groupTitle}>Sort</label>
            <select
              className={styles.select}
              value={filters.sort}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  sort: e.target.value,
                })
              }
            >
              <option value="">Выберите сортировку</option>
              <option value="price_desc">От дорогих к дешевым</option>
              <option value="price_asc">От дешевых к дорогим</option>
            </select>
          </div>

          {/* Discount */}
          <div className={styles.filterGroup}>
            <label className={styles.checkbox}>
              <input
                type="checkbox"
                checked={filters.discountOnly}
                onChange={() =>
                  setFilters({
                    ...filters,
                    discountOnly: !filters.discountOnly,
                  })
                }
              />
              <span>Только со скидкой</span>
            </label>
          </div>

          {/* Price Range */}
          <div className={styles.filterGroup}>
            <label className={styles.groupTitle}>Price Range</label>
            <div className={styles.priceInputs}>
              <input
                type="number"
                placeholder="Min"
                className={styles.input}
                value={filters.minPrice}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    minPrice: e.target.value,
                  })
                }
              />
              <span className={styles.separator}>—</span>
              <input
                type="number"
                placeholder="Max"
                className={styles.input}
                value={filters.maxPrice}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    maxPrice: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <button className={styles.resetBtn} onClick={handleReset}>
            Reset Filters
          </button>
        </div>
      </div>

      {isOpen && <div className={styles.overlay} onClick={onToggle}></div>}
    </>
  );
};
