import React from "react";
import { motion } from "framer-motion";
import Icon from "./Icon";

export default function ProductCard({
  product,
  inWishlist,
  onAddToCart,
  onToggleWishlist,
  onViewDetails,
}) {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Icon
        key={i}
        name="star"
        size="small"
        className={`${
          i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };


                 
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden relative group will-change-transform"
      style={{ transform: 'translate3d(0,0,0)' }}
    >
      {/* Featured Badge */}
      {product.featured && (
        <div className="absolute top-3 left-3 z-10">
          <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            Featured
          </span>
        </div>
      )}

      {/* Out of Stock Overlay */}
      {!product.inStock && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
          <span className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold">
            Out of Stock
          </span>
        </div>
      )}

      {/* Product Image */}
      <div className="relative overflow-hidden">
        <img
          src={product.img}
          alt={product.name}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
          style={{ transform: 'translate3d(0,0,0)'}}
        />
        
        {/* Image Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      </div>

      {/* Action Buttons */}
      <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-x-2 group-hover:translate-x-0">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="btn-glass-cart"
          onClick={() => onAddToCart(product)}
          title="Add to Cart"
          disabled={!product.inStock}
        >
          <Icon name="cart" size="medium" className="text-gray-700" />
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="btn-icon bg-white/90 backdrop-blur-sm shadow-lg hover:bg-red-50"
          onClick={() => onToggleWishlist(product)}
          title={inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
        >
          <Icon 
            name="heart" 
            size="medium" 
            className={`${inWishlist ? 'text-red-500 fill-current' : 'text-gray-500'}`} 
          />
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="btn-icon bg-white/90 backdrop-blur-sm shadow-lg hover:bg-gray-50"
          onClick={() => onViewDetails(product)}
          title="Quick View"
        >
          <Icon name="eye" size="medium" className="text-gray-500" />
        </motion.button>
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Category */}
        <div className="text-xs text-[#5B3A29]/60 font-medium mb-1">
          {product.category}
        </div>

        {/* Product Name */}
        <h3 className="font-display font-semibold text-lg text-[#5B3A29] mb-2 line-clamp-2">
          {product.name}
        </h3>

        {/* Rating and Reviews */}
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center">
            {renderStars(product.rating)}
          </div>
          <span className="text-sm text-[#5B3A29]/70">
            ({product.reviews} reviews)
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-3">
          <div className="text-xl font-bold text-[#5B3A29]">
            ${product.price.toFixed(2)}
          </div>
          {!product.inStock && (
            <span className="text-sm text-red-500 font-medium">
              Out of Stock
            </span>
          )}
        </div>

        {/* Tags */}
        {product.tags && product.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {product.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="text-xs bg-[#5B3A29]/10 text-[#5B3A29] px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
            {product.tags.length > 3 && (
              <span className="text-xs text-[#5B3A29]/50">
                +{product.tags.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Quick Add Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full font-medium transition-colors duration-200 ${
            product.inStock
              ? "btn-glass-cart"
              : "btn-secondary opacity-50 cursor-not-allowed"
          }`}
          onClick={() => product.inStock && onAddToCart(product)}
          disabled={!product.inStock}
        >
          {product.inStock ? "Add to Cart" : "Out of Stock"}
        </motion.button>
      </div>

      {/* Hover Effect Border */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#5B3A29]/20 rounded-xl transition-colors duration-200 pointer-events-none" />
    </motion.div>
  );
}