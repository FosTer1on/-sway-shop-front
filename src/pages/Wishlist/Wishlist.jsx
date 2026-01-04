// & React
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// COMPONENTS
import Layout from "@/components/NavBar/Layout";
import { ProductCard } from "@/components/Product/components/ProductCard";

// API
import { getFavorites } from "@/api/favorites/favorites";

// AUTH
import { useAuth } from "@/hooks/useAuth";

// STORE
import { useFavoritesStore } from "@/store/favorites/useFavoritesStore";

// STYLE
import styles from "./Wishlist.module.css";

export default function Wishlist() {
  const { isAuth } = useAuth();
  const { removeFavorite } = useFavoritesStore();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ===== LOAD FAVORITES ===== */
  useEffect(() => {
    if (!isAuth) {
      setItems([]);
      setLoading(false);
      return;
    }

    const loadFavorites = async () => {
      try {
        const res = await getFavorites();

        // API -> [{ id, product }]
        const products = res.data.map((item) => item.product);

        setItems(products);
      } catch (err) {
        console.error("WISHLIST LOAD ERROR:", err);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();
  }, [isAuth]);


  const handleRemove = async (slug) => {
    await removeFavorite(slug);
  
    setItems((prev) =>
      prev.filter((product) => product.slug !== slug)
    );
  };
  

  /* ===== EMPTY STATE ===== */
  if (!loading && items.length === 0) {
    return (
      <Layout>
        <div className={styles.container}>
          <div className={styles.emptyState}>
            <p className={styles.emptyIcon}>♡</p>
            <h2 className={styles.emptyTitle}>Your wishlist is empty</h2>
            <p className={styles.emptySubtext}>
              Start adding items to save them for later
            </p>
            <Link to="/" className={styles.continueButton}>
              Continue Shopping
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>My Wishlist</h1>
          <p className={styles.subtitle}>
            {items.length} {items.length === 1 ? "item" : "items"}
          </p>
        </div>

        <div className={styles.grid}>
          {items.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
              onRemoveFromWishlist={() => handleRemove(product.slug)}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}
