import { useState, useEffect } from "react";
import { CloseIcon, MenuIcon } from "../icons";
import {
  // getStores,
  getBrands,
  getCategories,
  getSizesByCategory,
} from "@/api/filter/filterApi";

import styles from "./FilterBar.module.css";
import useProductStore from "@/store/product/useProductStore";
import { useTranslation } from "react-i18next";
import { buildMediaUrl } from "@/utils/media";
import { useSearchParams } from "react-router-dom";
import { FilterBarSkeleton } from "../Skeleton/FilterBarSkeleton";

export const FilterBar = ({ isOpen, onToggle }) => {
  const { t, i18n } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  const { filters, setFilters } = useProductStore();

  const [filtersLoading, setFiltersLoading] = useState(true);
  const [sizesLoading, setSizesLoading] = useState(false);

  const [categories, setCategories] = useState([]);
  // const [stores, setStores] = useState([]);
  const [brands, setBrands] = useState([]);
  const [availableSizes, setAvailableSizes] = useState([]);

  const [priceInputs, setPriceInputs] = useState({
    minPrice: filters.minPrice,
    maxPrice: filters.maxPrice,
  });

  // Вспомогательная функция для фильтрации чтобы менять URL страницы
  const updateFilters = (newFilters) => {
    const updatedFilters = {
      ...filters,
      ...newFilters,
    };

    const params = new URLSearchParams(searchParams);

    const setParam = (key, value) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    };

    const setArrayParam = (key, values) => {
      params.delete(key);

      if (values.length) {
        values.forEach((value) => params.append(key, value));
      }
    };

    setParam("category", updatedFilters.category);
    setParam("region", updatedFilters.region);
    setParam("sort", updatedFilters.sort);
    setParam("min_price", updatedFilters.minPrice);
    setParam("max_price", updatedFilters.maxPrice);

    if (updatedFilters.discountOnly) {
      params.set("discount", "true");
    } else {
      params.delete("discount");
    }

    // setArrayParam("store", updatedFilters.stores);
    setArrayParam("brand", updatedFilters.brands);
    setArrayParam("size", updatedFilters.sizes);

    setSearchParams(params);
    setFilters(updatedFilters);
  };

  // 🔹 при выборе категории меняем размеры
  useEffect(() => {
    const fetchFilters = async () => {
      setFiltersLoading(true);

      try {
        const [catRes, brandRes] = await Promise.all([
          getCategories(),
          // getStores(),  нужно добавить storRes в const
          getBrands(),
        ]);

        setCategories(catRes.data);
        // setStores(storeRes.data);
        setBrands(brandRes.data);
      } catch (error) {
        console.log("Filter load error:", error);
      } finally {
        setFiltersLoading(false);
      }
    };

    fetchFilters();
  }, [i18n.language]);

  useEffect(() => {
    if (!filters.category) {
      setAvailableSizes([]);
      return;
    }

    const fetchSizes = async () => {
      setSizesLoading(true);
      try {
        const response = await getSizesByCategory(filters.category);
        setAvailableSizes(response.data);
      } catch (error) {
        console.log("Size load error:", error);
      } finally {
        setSizesLoading(false);
      }
    };

    fetchSizes();
  }, [filters.category]);

  useEffect(() => {
    setPriceInputs({
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
    });
  }, [filters.minPrice, filters.maxPrice]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (
        priceInputs.minPrice !== filters.minPrice ||
        priceInputs.maxPrice !== filters.maxPrice
      ) {
        updateFilters({
          minPrice: priceInputs.minPrice,
          maxPrice: priceInputs.maxPrice,
        });
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [priceInputs.minPrice, priceInputs.maxPrice]);

  // 🔹 универсальный toggle для multi-select
  const toggleArrayValue = (key, value) => {
    const exists = filters[key].includes(value);

    const updated = exists
      ? filters[key].filter((v) => v !== value)
      : [...filters[key], value];

    updateFilters({
      [key]: updated,
    });
  };

  const handleReset = () => {
    updateFilters({
      category: "",
      // stores: [],
      brands: [],
      sizes: [],
      sort: "",
      discountOnly: false,
      minPrice: "",
      maxPrice: "",
    });

    setPriceInputs({
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
        <span>{t("filters")}</span>
      </button>

      <div className={`${styles.filterBar} ${isOpen ? styles.open : ""}`}>
        <div className={styles.header}>
          <h3>{t("filters")}</h3>
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
            <label className={styles.groupTitle}>{t("category")}</label>
            {filtersLoading ? (
              <FilterBarSkeleton type="select" />
            ) : (
              <select
                className={styles.select}
                value={filters.category}
                onChange={(e) =>
                  updateFilters({
                    category: e.target.value,
                    sizes: [],
                  })
                }
              >
                <option value="">{t("choose_category")}</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.slug}>
                    {cat.name}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Stores - MULTI BUTTONS */}
          {/* <div className={styles.filterGroup}>
            <label className={styles.groupTitle}>{t("stores")}</label>
            {filtersLoading ? (
              <FilterBarSkeleton type="select" />
            ) : (
              <div className={styles.options}>
                {stores.map((store) => (
                  <button
                    key={store.id}
                    type="button"
                    className={`${styles.multiBtn} ${
                      filters.stores.includes(store.slug)
                        ? styles.activeBtn
                        : ""
                    }`}
                    onClick={() => toggleArrayValue("stores", store.slug)}
                  >
                    {store.name}
                  </button>
                ))}
              </div>
            )}
          </div> */}

          {/* Brands - MULTI BUTTONS */}
          <div className={styles.filterGroup}>
            <label className={styles.groupTitle}>{t("brands")}</label>
            {filtersLoading ? (
              <FilterBarSkeleton type="select" />
            ) : (
              <div className={styles.options}>
                {brands.map((brand) => (
                  <button
                    key={brand.id}
                    type="button"
                    className={`${styles.multiBtn} ${
                      filters.brands.includes(brand.slug)
                        ? styles.activeBtn
                        : ""
                    }`}
                    onClick={() => toggleArrayValue("brands", brand.slug)}
                  >
                    <img
                      src={buildMediaUrl(brand.icon_url)}
                      className={styles.brand_icon}
                      loading="lazy"
                      alt="Brand icon"
                      decoding="async"
                      onError={(e) => {
                        const img = e.currentTarget;
                        if (!img.dataset.retried) {
                          img.dataset.retried = "true";
                          setTimeout(() => {
                            img.src = `${buildMediaUrl(
                              images[0]?.image_url
                            )}?retry=${Date.now()}`;
                          }, 300);
                        }
                      }}
                    />
                    {/* {brand.name} */}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Sizes - зависят от категории */}
          {availableSizes.length > 0 && (
            <div className={styles.filterGroup}>
              <label className={styles.groupTitle}>{t("sizes")}</label>{" "}
              <div className={styles.options}>
                {sizesLoading ? (
                  <FilterBarSkeleton type="buttons" count={4} />
                ) : (
                  availableSizes.map((size) => (
                    <button
                      key={size.id}
                      type="button"
                      className={`${styles.multiBtn} ${
                        filters.sizes.includes(String(size.id))
                          ? styles.activeBtn
                          : ""
                      }`}
                      onClick={() => toggleArrayValue("sizes", String(size.id))}
                    >
                      {size.name}
                    </button>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Sort */}
          <div className={styles.filterGroup}>
            <label className={styles.groupTitle}>{t("sort")}</label>
            <select
              className={styles.select}
              value={filters.sort}
              onChange={(e) =>
                updateFilters({
                  sort: e.target.value,
                })
              }
            >
              <option value="">{t("choose_sort")}</option>
              <option value="price_desc">{t("desc")}</option>
              <option value="price_asc">{t("asc")}</option>
            </select>
          </div>

          {/* Discount */}
          <div className={styles.filterGroup}>
            <label className={styles.checkbox}>
              <input
                type="checkbox"
                checked={filters.discountOnly}
                onChange={() =>
                  updateFilters({
                    discountOnly: !filters.discountOnly,
                  })
                }
              />
              <span>{t("sale_only")}</span>
            </label>
          </div>

          {/* Price Range */}
          <div className={styles.filterGroup}>
            <label className={styles.groupTitle}>{t("price_range")}</label>
            <div className={styles.priceInputs}>
              <input
                type="number"
                placeholder={t("min")}
                className={styles.input}
                value={priceInputs.minPrice}
                onChange={(e) =>
                  setPriceInputs((prev) => ({
                    ...prev,
                    minPrice: e.target.value,
                  }))
                }
              />
              <span className={styles.separator}>—</span>
              <input
                type="number"
                placeholder={t("max")}
                className={styles.input}
                value={priceInputs.maxPrice}
                onChange={(e) =>
                  setPriceInputs((prev) => ({
                    ...prev,
                    maxPrice: e.target.value,
                  }))
                }
              />
            </div>
          </div>

          <button className={styles.resetBtn} onClick={handleReset}>
            {t("reset_filters")}
          </button>
        </div>
      </div>

      {isOpen && <div className={styles.overlay} onClick={onToggle}></div>}
    </>
  );
};
