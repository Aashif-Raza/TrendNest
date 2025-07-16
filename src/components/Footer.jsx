import React, { useState } from "react";
import { motion } from "framer-motion";
import Icon from "./Icon";
import { useToast } from "../hooks/useToast";
import { BRAND_NAME, BRAND_TAGLINE } from "../constants/brands";
import { SHOP_LINKS, SUPPORT_LINKS, COMPANY_LINKS } from "../constants/footerNavigation";
import { SOCIAL_LINKS } from "../constants/footerSocials";
import { PAYMENT_METHODS, SECURITY_BADGES } from "../constants/footerPayments";
import { LEGAL_LINKS } from "../constants/footerLegal";
import { CONTACT_INFO } from "../constants/footerContact";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const { showToast } = useToast();

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      showToast("Please enter your email address", "error");
      return;
    }

    setIsSubscribing(true);
    
    // Simulate API call
    setTimeout(() => {
      showToast("Thanks for subscribing! We'll keep you updated.", "success");
      setEmail("");
      setIsSubscribing(false);
    }, 1000);
  };

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSocialClick = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const currentYear = new Date().getFullYear();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <footer className="bg-white border-t border-[#D2B48C]">
      {/* Newsletter Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-[#5B3A29] to-[#8B4513] text-white py-12"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-2xl font-display font-bold mb-2"
            >
              Stay Updated
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-white/80 mb-6"
            >
              Get the latest updates on new products, exclusive offers, and fashion trends.
            </motion.p>
            
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              onSubmit={handleNewsletterSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-lg border-2 border-white/20 bg-white/10 text-white placeholder-white/60 focus:outline-none focus:border-white/40 transition-colors duration-200"
                required
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubscribing}
                className="btn-accent whitespace-nowrap"
              >
                {isSubscribing ? "Subscribing..." : "Subscribe"}
              </motion.button>
            </motion.form>
          </div>
        </div>
      </motion.div>

      {/* Main Footer Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <h3 className="footer-heading">{BRAND_NAME}</h3>
            <p className="text-[#5B3A29]/70 mb-4">{BRAND_TAGLINE}</p>
            
            {/* Contact Info */}
            <div className="space-y-2 text-sm text-[#5B3A29]/70">
              <div className="flex items-center gap-2">
                <Icon name="mail" size="small" className="text-[#5B3A29]" />
                <span>{CONTACT_INFO.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="phone" size="small" className="text-[#5B3A29]" />
                <span>{CONTACT_INFO.phone}</span>
              </div>
              <div className="flex items-start gap-2">
                <Icon name="mapPin" size="small" className="text-[#5B3A29] mt-0.5" />
                <div>
                  <div>{CONTACT_INFO.address.street}</div>
                  <div>{CONTACT_INFO.address.city}, {CONTACT_INFO.address.state} {CONTACT_INFO.address.zip}</div>
                  <div>{CONTACT_INFO.address.country}</div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="mt-6">
              <h4 className="font-semibold text-[#5B3A29] mb-3">Follow Us</h4>
              <div className="flex gap-2">
                {SOCIAL_LINKS.map((social) => (
                  <motion.button
                    key={social.platform}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSocialClick(social.url)}
                    className="footer-social-icon"
                    aria-label={social.ariaLabel}
                  >
                    <Icon name={social.icon} size="medium" className="text-[#5B3A29]" />
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Shop Links */}
          <motion.div variants={itemVariants}>
            <h4 className="footer-heading">Shop</h4>
            <div className="footer-section">
              {SHOP_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="footer-link block"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Support Links */}
          <motion.div variants={itemVariants}>
            <h4 className="footer-heading">Support</h4>
            <div className="footer-section">
              {SUPPORT_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="footer-link block"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Company Links */}
          <motion.div variants={itemVariants}>
            <h4 className="footer-heading">Company</h4>
            <div className="footer-section">
              {COMPANY_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="footer-link block"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="footer-bar"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <div className="text-sm text-[#5B3A29]/70">
              © {currentYear} {BRAND_NAME}. All rights reserved.
            </div>

            {/* Payment Methods */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#5B3A29]/50 mr-2">Payment Methods:</span>
                {PAYMENT_METHODS.map((method) => (
                  <Icon
                    key={method.name}
                    name={method.icon}
                    size="small"
                    className="footer-payment-icon"
                    title={method.name}
                  />
                ))}
              </div>
              
              {/* Security Badges */}
              <div className="flex items-center gap-2">
                {SECURITY_BADGES.map((badge) => (
                  <Icon
                    key={badge.name}
                    name={badge.icon}
                    size="small"
                    className="footer-payment-icon"
                    title={badge.name}
                  />
                ))}
              </div>
            </div>

            {/* Back to Top */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleBackToTop}
              className="btn-icon bg-[#5B3A29] text-white hover:bg-[#4A2F1F]"
              aria-label="Back to top"
            >
              <Icon name="chevronUp" size="medium" />
            </motion.button>
          </div>

          {/* Legal Links */}
          <div className="flex flex-wrap justify-center gap-4 mt-4 pt-4 border-t border-[#D2B48C]/30">
            {LEGAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs text-[#5B3A29]/60 hover:text-[#5B3A29] transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </footer>
  );
} 