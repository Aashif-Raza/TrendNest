import React from "react";
import ProductCard from "./ProductCard";

export default function ProductGrid({
  products,
  wishlist,
  onAddToCart,
  onToggleWishlist,
  onViewDetails,
}) {
  if (!products.length)
    return (
      <div className="text-center text-gray-500 mt-10">No products found.</div>
    );
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
      {products.map((p) => (
        <ProductCard
          key={p.id}
          product={p}
          inWishlist={wishlist.some((w) => w.id === p.id)}
          onAddToCart={onAddToCart}
          onToggleWishlist={onToggleWishlist}
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  );
}