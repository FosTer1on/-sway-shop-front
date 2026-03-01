// & React
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// ^ Components
import { CartItem } from "@/components/Cart/CartItem/CartItem";
import { CartSummary } from "@/components/Cart/CartSummary/CartSummary";
import Layout from "@/components/NavBar/Layout";

// ? Store
import { useCartStore } from "@/store/cart/useCartStore";

// ? Style
import styles from "./Cart.module.css";
import { useTranslation } from "react-i18next";

export default function Cart() {
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();

  const {
    items,
    summary,
    fetchCart,
    updateItemQuantity,
    removeItem,
  } = useCartStore();

  useEffect(() => {
    fetchCart();
  }, [i18n.language]);

  return (
    <Layout>
      <div className={styles.container}>
        <h1>{t("cart")}</h1>

        {items.length > 0 ? (
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
                  onIncrease={() =>
                    updateItemQuantity(item.id, item.quantity + 1)
                  }
                  onDecrease={() =>
                    updateItemQuantity(item.id, item.quantity - 1)
                  }
                  onRemove={() => removeItem(item.id)}
                  onClick={() =>
                    navigate(`/product/${item.product.slug}`)
                  }
                />
              ))}
            </div>

            <CartSummary summary={summary} />
          </div>
        ) : (
          <p>{t("cart_empty")}</p>
        )}
      </div>
    </Layout>
  );
}
