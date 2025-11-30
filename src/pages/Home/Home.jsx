import React from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import "./Home.css";

/*
Home page visual example.
Props expected: products (array), onNavigate, onToggleWishlist, onAddToCart
*/

export default function Home({
  products = [],
  onNavigate,
  onToggleWishlist,
  onAddToCart,
}) {
  return (
    <main className="page-home">
      <section className="hero">
        <div className="hero-inner">
          <h1>Каталог</h1>
          <p>Соберите свой стиль — минималистичный тёмный дизайн.</p>
        </div>
      </section>

      <section className="filters">
        <div className="filter-row">
          <div className="filter-item">Status (multi)</div>
          <div className="filter-item">Sort</div>
          <div className="filter-item">Category</div>
          <div className="filter-item">Brand / Store</div>
          <div className="filter-item price-range">Price from — to</div>
        </div>
      </section>

      <section className="products-grid">
        {products.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            onNavigate={onNavigate}
            onToggleWishlist={onToggleWishlist}
            onAddToCart={onAddToCart}
          />
        ))}
      </section>

      <div style={{ textAlign: "center", margin: "24px 0" }}>
        <button className="load-more">Загрузить ещё</button>
      </div>
    </main>
  );
}
