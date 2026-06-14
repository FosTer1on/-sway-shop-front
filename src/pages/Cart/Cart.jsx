import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { CartItem } from "@/components/Cart/CartItem/CartItem";
import { CartSummary } from "@/components/Cart/CartSummary/CartSummary";
import Layout from "@/components/NavBar/Layout";

import { useCartStore } from "@/store/cart/useCartStore";
import styles from "./Cart.module.css";
import { useTranslation } from "react-i18next";
import { ProductCardSkeleton } from "@/components/Skeleton/ProductCardSkeleton";

export default function Cart() {
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();

  const { items, summary, fetchCart, updateItemQuantity, removeItem, loading } =
    useCartStore();

  useEffect(() => {
    const loadCart = async () => {
      await fetchCart();
    };

    loadCart();
  }, [i18n.language]);

  if (loading) {
    return (
      <Layout>
        <div className={styles.container}>
          <h1>{t("cart")}</h1>

          <div className={styles.skeletonList}>
            {Array.from({ length: 3 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  if (items.length === 0) {
    return (
      <Layout>
        <div className={styles.container}>
          <div className={styles.emptyState}>
            <p className={styles.emptyIcon}>🛒</p>
            <h2 className={styles.emptyStateMessage}>{t("cart_empty")}</h2>
            <p className={styles.emptyStateSubtext}>
              Добавьте товары в корзину, чтобы оформить заказ.
            </p>
            <Link to="/" className={styles.continueShopping}>
              {t("continue")}
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className={styles.container}>
        <h1>{t("cart")}</h1>

        <div className={styles.content}>
          <div className={styles.itemsList}>
            {items.map((item) => (
              <CartItem
                key={item.id}
                id={item.id}
                name={item.product.name}
                images={item.product.images}
                item_price={item.product.price}
                item_discount_price={item.product.final_price}
                total_price={item.total_price}
                size={item.size}
                quantity={item.quantity}
                is_discount={item.discount > 0}
                onIncrease={() =>
                  updateItemQuantity(item.id, item.quantity + 1)
                }
                onDecrease={() =>
                  updateItemQuantity(item.id, item.quantity - 1)
                }
                onRemove={() => removeItem(item.id)}
                onClick={() => navigate(`/product/${item.product.slug}`)}
              />
            ))}
          </div>

          <CartSummary summary={summary} />
        </div>
      </div>
    </Layout>
  );
}
