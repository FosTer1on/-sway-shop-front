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
import useProductStore from "@/store/product/useProductStore";
import { ProductSkeleton } from "@/components/Skeleton/ProductSkeleton";

export default function Product() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { product, fetchProductBySlug, isLoading } = useProductStore();

  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    fetchProductBySlug(slug);
  }, [slug]);

  const isAuth = !!localStorage.getItem("access_token");

  const handleAddToCart = () => {
    if (!isAuth) {
      navigate("/login", { state: { from: location.pathname } });
      return;
    }

    console.log("ADD TO CART", product);
  };

  const handleToggleFavorite = () => {
    if (!isAuth) {
      navigate("/login");
      return;
    }

    console.log("TOGGLE FAVORITE", product);
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
          <span>Back</span>
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

              {statusBadge && (
                <div className={`${styles.badge} ${styles.badgePopular}`}>
                  {statusBadge.icon}
                  <span>{statusBadge.label}</span>
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
                  isFavorite ? styles.active : ""
                }`}
                onClick={handleToggleFavorite}
                aria-label="Add to wishlist"
              >
                <HeartIcon className={styles.actionIcon} filled={isFavorite} />
              </button>

              <button className={styles.addToCartBtn} onClick={handleAddToCart}>
                Add to Cart
              </button>
            </div>

            {/* Store & Brand */}
            <div className={styles.storeInfo}>
              <p>
                <strong>Store:</strong> {product.store}
              </p>
              <p>
                <strong>Brand:</strong> {product.brand}
              </p>
            </div>

            {/* Sizes */}
            <div className={styles.sizeSelector}>
              <label className={styles.sizeLabel}>Select Size:</label>
              <div className={styles.sizeOptions}>
                {product.sizes.map(({ size, quantity }) => {
                  const available = quantity > 0;

                  return (
                    <button
                      key={size}
                      className={`${styles.sizeBtn} ${
                        selectedSize === size ? styles.selected : ""
                      } ${!available ? styles.disabled : ""}`}
                      onClick={() => available && setSelectedSize(size)}
                      disabled={!available}
                      aria-pressed={selectedSize === size}
                      aria-disabled={!available}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity */}
            <div className={styles.quantitySelector}>
              <label className={styles.quantityLabel}>Quantity:</label>
              <div className={styles.quantityControls}>
                <button
                  className={styles.quantityBtn}
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                >
                  −
                </button>

                <span className={styles.quantityValue}>{quantity}</span>

                <button
                  className={styles.quantityBtn}
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            {/* Description */}
            <div className={styles.descriptionSection}>
              <h2 className={styles.descriptionTitle}>Description</h2>
              <p className={styles.description}>{product.description}</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
