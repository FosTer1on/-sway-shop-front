// & REACT
import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
// ^ COMPONENTS
import Layout from "@/components/NavBar/Layout";
import {
  BackArrowIcon,
  HeartIcon,
  FireIcon,
  PercentIcon,
  BestIcon,
} from "@components/icons";
import { ProductGallery } from "@/components/Product/components/ProductGallery";
// ~ STYLES
import styles from "./Product.module.css";
// ? STORE
import { useFavoritesStore } from "@/store/favorites/useFavoritesStore";
import useProductStore from "@/store/product/useProductStore";
import { ProductSkeleton } from "@/components/Skeleton/ProductSkeleton";
import { useAuth } from "@/hooks/useAuth";
import { useCartStore } from "@/store/cart/useCartStore";
import { useTranslation } from "react-i18next";

export default function Product() {
  const { t, i18n } = useTranslation();

  const { slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { isAuth } = useAuth();

  const { product, fetchProductBySlug, isLoading } = useProductStore();

  const [selectedSize, setSelectedSize] = useState(null);

  const { addToCart, isInCart, fetchCart } = useCartStore();

  useEffect(() => {
    fetchProductBySlug(slug);
  }, [slug, i18n.language]);

  useEffect(() => {
    if (isAuth) {
      fetchCart();
    }
  }, [isAuth]);

  const { isLoaded, isFavorite, addFavorite, removeFavorite } =
    useFavoritesStore();

  const favorite = product && isLoaded ? isFavorite(product.slug) : false;

  const inCart =
    product && selectedSize ? isInCart(product.slug, selectedSize.id) : false;

  const handleAddToCart = async () => {
    if (!isAuth) {
      navigate("/login", { state: { from: location.pathname } });
      return;
    }

    if (!selectedSize) {
      alert(t("choose_size"));
      return;
    }

    if (inCart) {
      navigate("/cart");
      return;
    }

    await addToCart({
      product: product.slug,
      size: selectedSize.id,
    });
  };

  const handleToggleFavorite = () => {
    if (!isAuth) {
      navigate("/login");
      return;
    }

    if (!product) return;

    if (favorite) {
      removeFavorite(product.slug);
    } else {
      addFavorite(product.slug);
    }
  };

  const statusConfig = {
    popular: {
      icon: <FireIcon className={styles.badgeIcon} />,
      label: "Popular",
    },
    best_seller: {
      icon: <BestIcon className={styles.badgeIcon} />,
      label: "Best Seller",
    },
  };

  if (isLoading || !product) {
    return (
      <Layout>
        <ProductSkeleton />
      </Layout>
    );
  }

  const statusBadge = statusConfig[product.status];
  const isDiscount = product.discount > 0;

  return (
    <Layout>
      <div className={styles.container}>
        {/* Back Button */}
        <button
          className={styles.backBtn}
          onClick={() => {
            navigate(-1);
            setTimeout(() => {
              if (location.state?.fromScroll !== undefined) {
                window.scrollTo({
                  top: location.state.fromScroll,
                  behavior: "auto",
                });
              }
            }, 0);
          }}
        >
          <BackArrowIcon className={styles.backIcon} />
          <span>{t("back")}</span>
        </button>

        <div className={styles.content}>
          {/* Gallery */}
          <div className={styles.gallerySection}>
            <ProductGallery images={product.images} title={product.name} />
          </div>

          {/* Info */}
          <div className={styles.infoSection}>
            {/* Badges */}
            <div className={styles.badgesContainer}>
              {isDiscount && (
                <div className={`${styles.badge} ${styles.badgeDiscount}`}>
                  <span>{product.discount}</span>
                  <PercentIcon className={styles.badgeIcon} />
                </div>
              )}
            </div>

            {/* Title */}
            <h1 className={styles.title}>{product.name}</h1>

            {/* Price */}
            <div className={styles.priceSection}>
              <div className={styles.priceContainer}>
                {isDiscount && (
                  <span className={styles.originalPrice}>{product.price}</span>
                )}
                <span className={styles.price}>
                  {isDiscount ? product.final_price : product.price}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className={styles.actionButtons}>
              <button
                className={`${styles.wishlistBtn} ${
                  favorite ? styles.active : ""
                }`}
                onClick={handleToggleFavorite}
                aria-label="Add to wishlist"
              >
                <HeartIcon className={styles.actionIcon} filled={favorite} />
              </button>

              <button
                className={styles.addToCartBtn}
                onClick={handleAddToCart}
                disabled={!selectedSize}
              >
                {inCart ? `${t("almost_in_cart")}` : `${t("add_to_cart")}`}
              </button>
            </div>

            {/* Store & Brand */}
            <div className={styles.storeInfo}>
              <p>
                <strong>{t("store")}</strong> {product.store.name}
              </p>
              <p>
                <strong>{t("brand")}</strong> {product.brand.name}
              </p>
            </div>

            {/* Sizes */}
            <div className={styles.sizeSelector}>
              <label className={styles.sizeLabel}>{t("select_size")}</label>
              <div className={styles.sizeOptions}>
                {product.sizes.map(({ size_id, size, quantity }) => {
                  return (
                    <button
                      key={size_id}
                      className={`${styles.sizeBtn} ${
                        selectedSize?.id === size_id ? styles.selected : ""
                      } ${quantity === 0 ? styles.disabled : ""}`}
                      onClick={() =>
                        quantity > 0 && setSelectedSize({ id: size_id, label: size })
                      }
                      disabled={quantity === 0}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Description */}
            <div className={styles.descriptionSection}>
              <h2 className={styles.descriptionTitle}>{t("description")}</h2>
              <p className={styles.description}>{product.description}</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
