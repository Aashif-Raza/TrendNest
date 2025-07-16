import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "./Icon";

export default function ProductDetailsModal({
  open,
  product,
  onClose,
  onAddToCart,
  inWishlist,
  onToggleWishlist,
}) {
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Icon
        key={i}
        name="star"
        size="medium"
        className={`${
          i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  const handleAddToCart = () => {
    onAddToCart({ ...product, qty: quantity });
    setQuantity(1);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="heading-3 text-[#5B3A29]">Product Details</h2>
              <button
                onClick={onClose}
                className="btn-icon text-gray-400 hover:text-gray-600"
              >
                <Icon name="close" size="large" />
              </button>
            </div>

            <div className="flex flex-col lg:flex-row">
              {/* Image Section */}
              <div className="lg:w-1/2 p-6">
                <div className="relative group">
                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-full h-80 lg:h-96 object-cover rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Featured Badge */}
                  {product.featured && (
                    <div className="absolute top-4 left-4">
                      <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                        Featured
                      </span>
                    </div>
                  )}

                  {/* Stock Status */}
                  {!product.inStock && (
                    <div className="absolute top-4 right-4">
                      <span className="bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                        Out of Stock
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Details Section */}
              <div className="lg:w-1/2 p-6 space-y-6">
                {/* Category */}
                <div className="text-sm text-[#5B3A29]/60 font-medium">
                  {product.category}
                </div>

                {/* Product Name */}
                <h1 className="heading-2 text-[#5B3A29]">
                  {product.name}
                </h1>

                {/* Rating and Reviews */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center">
                    {renderStars(product.rating)}
                  </div>
                  <span className="text-lg text-[#5B3A29]/70">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="text-3xl font-bold text-[#5B3A29]">
                  ${product.price.toFixed(2)}
                </div>

                {/* Stock Status */}
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className={`font-medium ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>

                {/* Description */}
                <div className="text-[#5B3A29]/80 leading-relaxed">
                  {product.desc}
                </div>

                {/* Tags */}
                {product.tags && product.tags.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-[#5B3A29] mb-2">Tags:</h4>
                    <div className="flex flex-wrap gap-2">
                      {product.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-[#5B3A29]/10 text-[#5B3A29] px-3 py-1 rounded-full text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity Selector */}
                {product.inStock && (
                  <div className="flex items-center gap-4">
                    <label className="font-semibold text-[#5B3A29]">Quantity:</label>
                    <div className="flex items-center border border-[#5B3A29]/20 rounded-lg">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="btn-icon"
                      >
                        <Icon name="minus" size="small" />
                      </button>
                      <span className="px-4 py-2 border-x border-[#5B3A29]/20">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="btn-icon"
                      >
                        <Icon name="plus" size="small" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex-1 font-semibold ${
                      product.inStock
                        ? "btn-glass-cart"
                        : "btn-secondary opacity-50 cursor-not-allowed"
                    }`}
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                  >
                    <Icon name="cart" size="medium" className="inline mr-2 text-gray-700" />
                    Add to Cart
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-secondary flex-1 font-semibold"
                    onClick={() => onToggleWishlist(product)}
                  >
                    <Icon 
                      name="heart" 
                      size="medium" 
                      className={`inline mr-2 ${inWishlist ? 'fill-current' : ''}`} 
                    />
                    {inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  </motion.button>
                </div>

                {/* Additional Info */}
                <div className="pt-4 border-t border-gray-200">
                  <div className="grid grid-cols-2 gap-4 text-sm text-[#5B3A29]/70">
                    <div>
                      <span className="font-semibold">Product ID:</span> #{product.id}
                    </div>
                    <div>
                      <span className="font-semibold">Category:</span> {product.category}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}