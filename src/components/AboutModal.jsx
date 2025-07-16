import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "./Icon";
import { BRAND_NAME, BRAND_DESCRIPTION } from "../constants/brands";
import { BRAND_QUOTES } from "../constants/quotes";

export default function AboutModal({ isOpen, onClose }) {
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  React.useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 glass-modal"
          onClick={handleBackdropClick}
          role="dialog"
          aria-modal="true"
          aria-labelledby="about-modal-title"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-surface rounded-2xl shadow-2xl"
            role="document"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-white/20 bg-gradient-to-r from-[#5B3A29]/90 to-[#3a2518]/90 backdrop-blur-sm rounded-t-2xl">
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                id="about-modal-title"
                className="text-2xl font-bold text-white flex items-center gap-3"
              >
                <span className="text-yellow-400">About</span>
                <span className="normal-case">Trend</span>
                <span className="text-yellow-400 normal-case">Nest</span>
              </motion.h2>
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 text-white/70 hover:text-white transition-colors duration-200 rounded-full hover:bg-white/10"
                aria-label="Close modal"
              >
                <Icon name="close" size="medium" />
              </motion.button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-8">
              {/* Hero Quote */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-center"
              >
                <blockquote className="text-xl italic text-white/90 leading-relaxed">
                  "{BRAND_QUOTES[0]}"
                </blockquote>
              </motion.div>

              {/* Company Story */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-4"
              >
                <h3 className="text-xl font-semibold text-yellow-400 mb-3">Our Story</h3>
                <div className="glass-surface p-6 rounded-xl">
                  <p className="text-white/90 leading-relaxed mb-4">
                    Founded with a passion for premium fashion and lifestyle, TrendNest has been at the forefront 
                    of curating exceptional products that blend style, quality, and innovation. Our journey began 
                    with a simple vision: to create a shopping experience that transcends the ordinary.
                  </p>
                  <p className="text-white/90 leading-relaxed">
                    Today, we're proud to serve over 10,000 happy customers with our carefully selected collection 
                    of 500+ premium products from 50+ trusted brands. Our commitment to excellence drives everything we do.
                  </p>
                </div>
              </motion.section>

              {/* Core Values */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="space-y-4"
              >
                <h3 className="text-xl font-semibold text-yellow-400 mb-3">Our Values</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    {
                      icon: "star",
                      title: "Quality First",
                      description: "Every product is carefully selected to meet our high standards of quality and craftsmanship."
                    },
                    {
                      icon: "heart",
                      title: "Customer Focus",
                      description: "Your satisfaction is our priority. We're here to provide exceptional service 24/7."
                    },
                    {
                      icon: "shield",
                      title: "Trust & Transparency",
                      description: "We believe in honest relationships with our customers and partners."
                    }
                  ].map((value, index) => (
                    <motion.div
                      key={value.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      className="glass-surface p-4 rounded-xl text-center"
                    >
                      <div className="flex justify-center mb-3">
                        <div className="p-3 bg-yellow-400/20 rounded-full">
                          <Icon name={value.icon} size="medium" className="text-yellow-400" />
                        </div>
                      </div>
                      <h4 className="font-semibold text-white mb-2">{value.title}</h4>
                      <p className="text-white/80 text-sm leading-relaxed">{value.description}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.section>

              {/* Services */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="space-y-4"
              >
                <h3 className="text-xl font-semibold text-yellow-400 mb-3">What We Offer</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      icon: "truck",
                      title: "Free Shipping",
                      description: "Free shipping on all orders over $50"
                    },
                    {
                      icon: "clock",
                      title: "24/7 Support",
                      description: "Round-the-clock customer service"
                    },
                    {
                      icon: "shield-check",
                      title: "Quality Guarantee",
                      description: "30-day money-back guarantee"
                    },
                    {
                      icon: "refresh",
                      title: "Easy Returns",
                      description: "Hassle-free return process"
                    }
                  ].map((service, index) => (
                    <motion.div
                      key={service.title}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.9 + index * 0.1 }}
                      className="glass-surface p-4 rounded-xl flex items-center gap-4"
                    >
                      <div className="p-2 bg-blue-500/20 rounded-lg">
                        <Icon name={service.icon} size="medium" className="text-blue-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-1">{service.title}</h4>
                        <p className="text-white/80 text-sm">{service.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.section>

              {/* Team */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
                className="space-y-4"
              >
                <h3 className="text-xl font-semibold text-yellow-400 mb-3">Meet Our Team</h3>
                <div className="glass-surface p-6 rounded-xl">
                  <p className="text-white/90 leading-relaxed mb-4">
                    Our dedicated team of fashion enthusiasts and customer service experts work tirelessly 
                    to ensure you have the best shopping experience possible. From our product curators 
                    to our support specialists, every member of the TrendNest family is committed to 
                    bringing you the finest selection of premium products.
                  </p>
                  <div className="flex items-center justify-center gap-4 mt-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mb-2">
                        <Icon name="users" size="medium" className="text-white" />
                      </div>
                      <p className="text-white/80 text-sm">Expert Team</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center mb-2">
                        <Icon name="award" size="medium" className="text-white" />
                      </div>
                      <p className="text-white/80 text-sm">Award Winning</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-teal-400 rounded-full flex items-center justify-center mb-2">
                        <Icon name="globe" size="medium" className="text-white" />
                      </div>
                      <p className="text-white/80 text-sm">Global Reach</p>
                    </div>
                  </div>
                </div>
              </motion.section>

              {/* Contact */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
                className="space-y-4"
              >
                <h3 className="text-xl font-semibold text-yellow-400 mb-3">Get In Touch</h3>
                <div className="glass-surface p-6 rounded-xl">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-white mb-3">Contact Information</h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <Icon name="mail" size="small" className="text-yellow-400" />
                          <span className="text-white/90">support@trendnest.com</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Icon name="phone" size="small" className="text-yellow-400" />
                          <span className="text-white/90">+1 (555) 123-4567</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Icon name="map-pin" size="small" className="text-yellow-400" />
                          <span className="text-white/90">123 Fashion Ave, Style City</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-3">Business Hours</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-white/90">Monday - Friday</span>
                          <span className="text-white/90">9:00 AM - 8:00 PM</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/90">Saturday</span>
                          <span className="text-white/90">10:00 AM - 6:00 PM</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/90">Sunday</span>
                          <span className="text-white/90">12:00 PM - 5:00 PM</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.section>

              {/* Footer Quote */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="text-center pt-4"
              >
                <blockquote className="text-lg italic text-white/80 leading-relaxed">
                  "{BRAND_QUOTES[1] || "Style is a way to say who you are without having to speak."}"
                </blockquote>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 