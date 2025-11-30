import React from 'react';
import './ProductCard.css';
import { formatPrice } from '../../utils/formatPrice';

/*
props:
product: {
  id, name, images: [], price, discountPercent, isPopular, isBestSeller, isOnSale, store, brand, slug
}
onNavigate(slug)
onToggleWishlist(productId)
onAddToCart(productId)
wishlistCount (optional)
cartCount (optional)
*/

export default function ProductCard({ product, onNavigate, onToggleWishlist, onAddToCart }) {
  const price = product.price;
  const finalPrice = product.discountPercent ? Math.round(price * (1 - product.discountPercent/100)) : price;

  return (
    <article className="product-card" onClick={() => onNavigate && onNavigate(product.slug)} role="button" tabIndex={0}>
      <div className="product-image-wrap">
        <img src={product.images && product.images[0] ? product.images[0] : '/assets/placeholder.png'} alt={product.name} className="product-image" />
        <div className="product-badges">
          {product.isPopular && <span className="badge badge-fire">🔥</span>}
          {product.isOnSale && <span className="badge badge-percent">-{product.discountPercent}%</span>}
          {product.isBestSeller && <span className="badge badge-best">Best</span>}
        </div>
        <div className="product-actions">
          <button className="icon-btn wishlist" onClick={(e)=>{ e.stopPropagation(); onToggleWishlist && onToggleWishlist(product.id); }} aria-label="Wishlist">♡</button>
          <button className="icon-btn add-cart" onClick={(e)=>{ e.stopPropagation(); onAddToCart && onAddToCart(product.id); }} aria-label="Add to cart">🛒</button>
        </div>
      </div>
      <div className="product-info">
        <h3 className="product-title">{product.name}</h3>
        <div className="price-row">
          {product.discountPercent ? (<span className="price-old">{formatPrice(price)}</span>) : null}
          <span className="price-current">{formatPrice(finalPrice)}</span>
        </div>
      </div>
    </article>
  );
}
