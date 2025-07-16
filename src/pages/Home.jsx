import React from "react";
import { motion } from "framer-motion";
import productsData from "../data/products";
import ProductCard from "../components/ProductCard";
import { BRAND_NAME, TRUSTED_BRANDS } from "../constants/brands";
import { HERO_QUOTES, BRAND_QUOTES } from "../constants/quotes";
import Icon from "../components/Icon";
import { LOGO_URL } from "../constants/brands";


export default function Home({ onBrandSelect, onAddToCart, onToggleWishlist, onViewDetails, onShopNow, onLearnMore, cart, wishlist }) {
  // Get featured products
  const featuredProducts = productsData.filter(product => product.featured).slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="flex flex-col md:flex-row min-h-[100vh] relative overflow-hidden"
        style={{
          background: "linear-gradient(to right, #5B3A29 50%, transparent 50%)",
        }}
      >
        {/* Blurred Image Background (right side, less blur) */}
        <div
          className="absolute inset-0 md:left-1/2 md:w-1/2 h-full z-0"
          style={{
            backgroundImage: `url('/product-img/hero-banner.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(0.7px) brightness(0.90)",
            opacity: 0.97,
            transition: "opacity 0.5s",
          }}
        />

        {/* Brown Overlay (left side) */}
        <div className="absolute inset-0 md:right-1/2 bg-[#5B3A29] z-10" />

        {/* Content (z-20 to be above overlays) */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col justify-center md:w-1/2 p-8 md:p-12 relative z-20 will-change-transform"
        >
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="uppercase text-center  font-semibold font-serif text-white/90 text-4xl mb-6 mt-24 tracking-widest"
          >
            Welcome to <span className="normal-case ">Trend</span><span className="text-yellow-400 normal-case">Nest</span>
            
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className="heading-1 text-white mb-4 leading-tight text-3xl text-center mt-4 font-mono"
          >
            <span>Premium Fashion</span>&nbsp;
            <span className="text-yellow-400">&amp; Lifestyle</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
            className="text-white/80 text-lg md:text-xl mb-8 leading-relaxed text-center italic font-mono"
          >
            {HERO_QUOTES[0]}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="flex justify-center mb-6"
          >
            <motion.div
              whileHover={{ 
                scale: 1.1, 
                rotate: 5,
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
              className="relative group"
            >
              {/* Glowing background effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              
              {/* Main logo container */}
              <div className="relative bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-full p-4 shadow-2xl mt-10">
                <img 
                  src="/images/Trend-Nest.png" 
                  alt="TrendNest Logo" 
                  className="w-28 h-28 md:w-40 md:h-40 object-contain rounded-full transition-all duration-300 group-hover:brightness-110"
                />
              </div>
              
              {/* Floating particles effect */}
              <motion.div
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
                className="absolute inset-0 rounded-full border border-yellow-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />
              
              <motion.div
                animate={{ 
                  rotate: -360,
                  scale: [1, 0.9, 1]
                }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
                className="absolute inset-2 rounded-full border border-orange-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              />
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10"
          >
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onShopNow}
              className="px-8 py-4 text-lg font-semibold text-white bg-blue-500/20 backdrop-blur-sm border-2 border-blue-400/40 rounded-lg hover:bg-blue-500/30 hover:border-blue-300/60 transition-all duration-300 shadow-lg hover:shadow-xl"
              style={{
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(37, 99, 235, 0.15) 100%)',
                boxShadow: '0 4px 16px 0 rgba(59, 130, 246, 0.2)'
              }}
            >
              Shop Now
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onLearnMore}
              className="px-8 py-4 text-lg font-semibold text-white bg-transparent border-2 border-white/40 rounded-lg hover:bg-white/10 hover:border-white/60 transition-all duration-300 shadow-lg hover:shadow-xl backdrop-blur-sm"
              style={{
                boxShadow: '0 4px 16px 0 rgba(255, 255, 255, 0.1)'
              }}
            >
              Learn More
            </motion.button>
          </motion.div>
        </motion.div>
      </section>

      {/* Featured Products Section */}
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row min-h-[100vh] bg-gradient-to-br from-[#fff] to-[#d1f1ec] relative overflow-hidden" style={{
            // backgroundImage: `url("/images/second-bg.jpg")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20 bg-black/30">
          <div className="absolute inset-0" style={{
            // backgroundColor: `url("/images/second-bg.jpg")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }} />
        </div>
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="text-center mb-12 will-change-transform"
          >
            <h2 className="heading-2 text-[#5B3A29] text-3xl font-display font-extrabold mb-4 mt-16">
              Featured Products
            </h2>
            <p className="text-lg text-[#5B3A29]/70 max-w-2xl mx-auto">
              Discover our handpicked selection of premium products that our customers love
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: index * 0.03, ease: "easeOut" }}
                className="will-change-transform"
              >
                <ProductCard
                  product={product}
                  onAddToCart={onAddToCart}
                  onToggleWishlist={onToggleWishlist}
                  onViewDetails={onViewDetails}
                  inWishlist={wishlist.some(item => item.id === product.id)}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-[#5B3A29]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "10K+", label: "Happy Customers" },
              { number: "500+", label: "Products" },
              { number: "50+", label: "Brands" },
              { number: "24/7", label: "Support" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.3, delay: index * 0.05, ease: "easeOut" }}
                className="will-change-transform"
              >
                <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-white/80 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gradient-to-br from-[#fff] to-[#d1f1ec]">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="text-center mb-12 will-change-transform"
          >
            <h2 className="heading-2 text-[#5B3A29] text-2xl font-display font-bold mb-4">
              What Our Customers Say
            </h2>
            <p className="text-lg text-[#5B3A29]/70">
              Don't just take our word for it - hear from our satisfied customers
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                rating: 5,
                text: "Amazing quality products and fast shipping! I love my new leather bag.",
                avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
              },
              {
                name: "Michael Chen",
                rating: 5,
                text: "The customer service is exceptional and the products exceed expectations.",
                avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
              },
              {
                name: "Emily Rodriguez",
                rating: 5,
                text: "Found exactly what I was looking for. Highly recommend this store!",
                avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.3, delay: index * 0.1, ease: "easeOut" }}
                className="bg-[#f8ecd5] p-6 rounded-xl will-change-transform"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <div className="font-semibold text-[#5B3A29]">{testimonial.name}</div>
                    <div className="flex text-yellow-400">
                      {Array.from({ length: testimonial.rating }, (_, i) => (
                        <Icon key={i} name="star" size="small" className="fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-[#5B3A29]/80 italic">"{testimonial.text}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

     
      {/* Trusted Brands Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="text-center will-change-transform"
          >
            <h3 className="text-lg font-semibold text-[#5B3A29] mb-8">Trusted by Leading Brands</h3>
            <div className="flex justify-center items-center gap-8 md:gap-12 flex-wrap">
              {TRUSTED_BRANDS.map((brand, index) => (
                <motion.button
                  key={brand.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.3, delay: index * 0.05, ease: "easeOut" }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onBrandSelect && onBrandSelect(brand.name)}
                  className="flex flex-col items-center gap-2 cursor-pointer will-change-transform hover:shadow-lg transition-shadow duration-200 rounded-lg p-2"
                  title="Click to view products"
                >
                  <img 
                    src={brand.logo} 
                    alt={brand.name}
                    className="w-16 h-16 object-cover rounded-lg shadow-sm"
                  />
                  <span className="text-[#5B3A29]/60 font-bold text-sm hover:text-[#5B3A29] transition-colors duration-200">
                    {brand.name}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}