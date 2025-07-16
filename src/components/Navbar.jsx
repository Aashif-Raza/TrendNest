import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "./Icon";
import { SearchLoadingIndicator } from "./LoadingSpinner";
import { BRAND_NAME } from "../constants/brands";

export default function Navbar({
  cartCount,
  wishlistCount,
  onCart,
  onWishlist,
  onShowAuth,
  onHome,
  onCategories,
  onShop,
  onSearch,
  onMobileSearch,
  searchKeyword,
  isSearching = false,
  user,
  onLogout,
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [searchValue, setSearchValue] = useState(searchKeyword || "");

  // State synchronization - keep search input in sync with external changes
  useEffect(() => {
    setSearchValue(searchKeyword || "");
  }, [searchKeyword]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isUserDropdownOpen && !event.target.closest('.user-dropdown')) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isUserDropdownOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchValue);
  };

  const handleMobileSearch = (e) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    // Small delay to allow menu closing animation
    setTimeout(() => {
      onMobileSearch(searchValue);
    }, 300);
  };

  const handleSearchChange = (value) => {
    setSearchValue(value);
    onSearch(value);
  };

  return (
    <nav className="fixed w-full z-30 bg-blue-500/20 backdrop-blur-xl shadow-2xl border-b border-blue-400/30 py-4 px-4 md:px-8" style={{
      background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(37, 99, 235, 0.15) 50%, rgba(29, 78, 216, 0.1) 100%)',
      boxShadow: '0 8px 32px 0 rgba(59, 130, 246, 0.3)'
    }}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Logo and Navigation */}
        <div className="flex items-center gap-8">
          <button 
            onClick={onHome} 
            className="text-2xl font-display font-extrabold text-white hover:text-blue-200 transition-colors duration-200 drop-shadow-lg"
          >
            {BRAND_NAME}
          </button>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8">
            <button 
              onClick={onCategories} 
              className="text-lg font-medium text-white hover:text-blue-200 transition-colors duration-200 drop-shadow-md"
            >
              Categories
            </button>
            <button 
              onClick={onShop} 
              className="text-lg font-medium text-white hover:text-blue-200 transition-colors duration-200 drop-shadow-md"
            >
              Shop
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="hidden md:block flex-1 max-w-md mx-8">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchValue}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full px-4 py-2 pl-10 pr-12 border border-blue-400/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300/50 focus:border-blue-300 bg-blue-500/20 backdrop-blur-sm text-white placeholder-white/80 transition-all duration-200"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-white/80 hover:text-blue-200 transition-colors duration-200"
              aria-label="Search"
            >
              <Icon name="search" size="large" />
            </button>
            {isSearching && (
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <SearchLoadingIndicator isSearching={isSearching} />
              </div>
            )}
          </form>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4 md:space-x-6">
          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <motion.button 
              className="relative btn-icon" 
              onClick={onWishlist}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon name="heart" size="large" className="text-white" />
              {wishlistCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                >
                  {wishlistCount}
                </motion.span>
              )}
            </motion.button>

            <motion.button 
              className="relative btn-icon" 
              onClick={onCart}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon name="cart" size="large" className="text-white" />
              {cartCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-blue-400 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                >
                  {cartCount}
                </motion.span>
              )}
            </motion.button>

            {user ? (
              <div className="relative user-dropdown">
                <motion.button
                  className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white hover:bg-white/30 transition-all duration-200"
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-white">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-sm font-medium">{user.name}</span>
                  <Icon name="chevronDown" size="small" className="text-white" />
                </motion.button>

                <AnimatePresence>
                  {isUserDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 top-full mt-2 w-48 bg-white/95 backdrop-blur-xl border border-white/30 rounded-lg shadow-2xl z-50"
                    >
                      <div className="py-2">
                        <div className="px-4 py-2 border-b border-white/20">
                          <div className="text-sm font-semibold text-[#5B3A29]">{user.name}</div>
                          <div className="text-xs text-[#5B3A29]/60">{user.email}</div>
                        </div>
                        <button
                          onClick={() => {
                            onLogout();
                            setIsUserDropdownOpen(false);
                          }}
                          className="w-full px-4 py-2 text-left text-sm text-[#5B3A29] hover:bg-white/50 transition-colors duration-200 flex items-center gap-2"
                        >
                          <Icon name="logout" size="small" className="text-[#5B3A29]" />
                          Logout
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <motion.button
                className="btn-primary"
                onClick={onShowAuth}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Login
              </motion.button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden btn-icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Icon name="menu" size="large" className="text-white" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-blue-500/20 backdrop-blur-xl border-t border-blue-400/30"
          >
            <div className="px-4 py-6 space-y-4">
              {/* Mobile Search */}
              <form onSubmit={handleMobileSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchValue}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="w-full px-4 py-3 pl-10 pr-12 border border-blue-400/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300/50 focus:border-blue-300 bg-blue-500/20 backdrop-blur-sm text-white placeholder-white/80 transition-all duration-200"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-white/80 hover:text-blue-200 transition-colors duration-200"
                  aria-label="Search"
                >
                  <Icon name="search" size="medium" />
                </button>
                {isSearching && (
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <SearchLoadingIndicator isSearching={isSearching} />
                  </div>
                )}
              </form>

              {/* Mobile Navigation */}
              <div className="space-y-2">
                <button 
                  onClick={() => { onCategories(); setIsMobileMenuOpen(false); }} 
                  className="w-full text-left py-2 px-4 text-white hover:bg-blue-400/20 rounded-lg transition-colors duration-200"
                >
                  Categories
                </button>
                <button 
                  onClick={() => { onShop(); setIsMobileMenuOpen(false); }} 
                  className="w-full text-left py-2 px-4 text-white hover:bg-blue-400/20 rounded-lg transition-colors duration-200"
                >
                  Shop
                </button>
              </div>

              {/* Mobile Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-blue-400/30">
                <div className="flex items-center space-x-4">
                  <button 
                    className="relative btn-icon" 
                    onClick={() => { onWishlist(); setIsMobileMenuOpen(false); }}
                  >
                    <Icon name="heart" size="large" className="text-white" />
                    {wishlistCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                        {wishlistCount}
                      </span>
                    )}
                  </button>

                  <button 
                    className="relative btn-icon" 
                    onClick={() => { onCart(); setIsMobileMenuOpen(false); }}
                  >
                    <Icon name="cart" size="large" className="text-white" />
                    {cartCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-blue-400 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                        {cartCount}
                      </span>
                    )}
                  </button>
                </div>

                {user ? (
                  <div className="flex flex-col gap-2">
                    <div className="px-4 py-2 border-b border-blue-400/30">
                      <div className="text-sm font-semibold text-white">{user.name}</div>
                      <div className="text-xs text-white/60">{user.email}</div>
                    </div>
                    <button
                      onClick={() => {
                        onLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full text-left py-2 px-4 text-white hover:bg-blue-400/20 rounded-lg transition-colors duration-200 flex items-center gap-2"
                    >
                      <Icon name="logout" size="small" className="text-white" />
                      Logout
                    </button>
                  </div>
                ) : (
                  <button
                    className="btn-primary"
                    onClick={() => { onShowAuth(); setIsMobileMenuOpen(false); }}
                  >
                    Login
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}