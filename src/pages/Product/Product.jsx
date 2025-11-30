import React from 'react';
import './Product.css';
import { formatPrice } from '../../utils/formatPrice';

/*
Props: product {name, images, price, discountPercent, store, brand, description, sizes: [{name, available}] }
onBack() - callback to go back
onToggleWishlist, onAddToCart
*/

export default function Product({ product, onBack, onToggleWishlist, onAddToCart }) {
  const finalPrice = product.discountPercent ? Math.round(product.price * (1 - product.discountPercent/100)) : product.price;
  return (
    <main className="page-product">
      <button className="back-btn" onClick={onBack}>← Назад</button>
      <div className="product-layout">
        <div className="gallery">
          {product.images && product.images.length ? (
            product.images.map((src, i) => <img key={i} src={src} alt={product.name} className="gallery-img" />)
          ) : (
            <div className="gallery-placeholder">No images</div>
          )}
        </div>
        <div className="product-meta">
          <h1>{product.name}</h1>
          <div className="price-row">
            {product.discountPercent ? (<span className="price-old">{formatPrice(product.price)}</span>) : null}
            <span className="price-current">{formatPrice(finalPrice)}</span>
            <div className="meta-actions">
              <button onClick={onToggleWishlist} className="icon-btn">♡</button>
              <button onClick={onAddToCart} className="icon-btn">🛒</button>
            </div>
          </div>

          <div className="sizes">
            {product.sizes && product.sizes.map((s) => (
              <button key={s.name} disabled={!s.available} className={"size-btn " + (s.available ? '':'disabled')}>{s.name}</button>
            ))}
          </div>

          <div className="vendor-line">{product.store} • {product.brand}</div>
          <div className="description">{product.description}</div>
        </div>
      </div>
    </main>
  );
}
