import { useEffect } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import Layout from "@/components/NavBar/Layout";
import { BackArrowIcon, PercentIcon, TelegramIcon } from "@/components/icons";
import { ProductGallery } from "@/components/Product/components/ProductGallery";
import { ProductSkeleton } from "@/components/Skeleton/ProductSkeleton";
import useProductStore from "@/store/product/useProductStore";
import { useTranslation } from "react-i18next";
import { buildTelegramOrderUrl } from "@/utils/telegram";
import { buildMediaUrl } from "@/utils/media";
import styles from "./Outfit.module.css";

export default function Outfit() {
  const { t, i18n } = useTranslation();
  const { slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { outfit, fetchOutfitBySlug, loading } = useProductStore();

  useEffect(() => {
    fetchOutfitBySlug(slug);
  }, [slug, i18n.language]);

  if (loading || !outfit) {
    return (
      <Layout>
        <ProductSkeleton />
      </Layout>
    );
  }

  const isDiscount = outfit.discount > 0;

  const outfitImages = [
    {
      image_url: outfit.image,
    },
  ];

  const telegramOrderUrl = buildTelegramOrderUrl(outfit.slug);

  return (
    <Layout>
      <div className={styles.container}>
        <button className={styles.backBtn} onClick={() => navigate(-1)}>
          <BackArrowIcon className={styles.backIcon} />
          <span>{t("back")}</span>
        </button>

        <div className={styles.content}>
          <div className={styles.gallerySection}>
            <ProductGallery images={outfitImages} title={outfit.title} />
          </div>

          <div className={styles.infoSection}>
            <div className={styles.badgesContainer}>
              {isDiscount && (
                <div className={`${styles.badge} ${styles.badgeDiscount}`}>
                  <span>{outfit.discount}</span>
                  <PercentIcon className={styles.badgeIcon} />
                </div>
              )}
            </div>

            <h1 className={styles.title}>{outfit.title}</h1>

            <div className={styles.priceSection}>
              <div className={styles.priceContainer}>
                {isDiscount && (
                  <span className={styles.originalPrice}>
                    {outfit.price} {t("sum")}
                  </span>
                )}

                <span className={styles.price}>
                  {isDiscount ? outfit.final_price : outfit.price} {t("sum")}
                </span>
              </div>
            </div>

            <a
              href={telegramOrderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.telegramOrderBtn}
            >
              <TelegramIcon className={styles.tg_icon} />
              <span> {t("one_click")}</span>
            </a>

            <div className={styles.descriptionSection}>
              <h2 className={styles.descriptionTitle}>{t("description")}</h2>
              <p className={styles.description}>{outfit.description}</p>
            </div>
          </div>
        </div>

        <div className={styles.outfitProductsSection}>
          <h2 className={styles.outfitProductsTitle}>Товары в луке</h2>

          <div className={styles.outfitProductsList}>
            {outfit.items.map((item) => {
              const product = item.product;
              const image = product.images?.[0]?.image_url;

              return (
                <Link
                  key={item.id}
                  to={`/product/${product.slug}`}
                  className={styles.outfitProductItem}
                >
                  <img
                    src={buildMediaUrl(image)}
                    alt={product.name}
                    className={styles.outfitProductImage}
                    loading="lazy"
                    decoding="async"
                  />

                  <div className={styles.outfitProductInfo}>
                    <h3>{product.name}</h3>
                    <p>
                      {product.final_price || product.price} {t("sum")}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}
