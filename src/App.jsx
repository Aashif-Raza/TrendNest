import React, { useRef, useState, useMemo } from "react";
import Navbar from "./components/Navbar";
import HomeSection from "./pages/Home";
import CategoryGrid from "./components/CategoryGrid";
import ProductGrid from "./components/ProductGrid";
import Filters from "./components/Filters";
import AuthModal from "./components/AuthModal";
import CartModal from "./components/CartModal";
import WishlistModal from "./components/WishlistModal";
import ProductDetailsModal from "./components/ProductDetailsModal";
import CheckoutModal from "./components/CheckoutModal";
import AboutModal from "./components/AboutModal";
import Footer from "./components/Footer";
import { ToastContainer } from "./components/Toast";
import productsData from "./data/products";
import { useAuth } from "./hooks/useAuth";
import { motion } from "framer-motion";
import { TRUSTED_BRANDS } from "./constants/brands";

function scrollToSection(ref) {
  if (ref && ref.current) {
    ref.current.scrollIntoView({ behavior: "smooth" });
  }
}

export default function App() {
  // Auth and modals
  const { user, logout } = useAuth();
  const [showAuth, setShowAuth] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [detailsProduct, setDetailsProduct] = useState(null);

  // Product/category/shop state
  const [products] = useState(productsData);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  // New filtering state
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [toasts, setToasts] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  
  // Advanced filtering state
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [freeShipping, setFreeShipping] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);

  // New: Compose appliedFilters object for Filters
  const appliedFilters = {
    searchKeyword,
    selectedPriceRange,
    sortBy,
    inStockOnly,
    selectedRating,
    featuredOnly,
    freeShipping,
    selectedCategories
  };

  // New: Handler to apply all filters at once
  const handleApplyFilters = (filters) => {
    setSearchKeyword(filters.searchKeyword || "");
    setSelectedPriceRange(filters.selectedPriceRange || "");
    setSortBy(filters.sortBy || "");
    setInStockOnly(filters.inStockOnly || false);
    setSelectedRating(filters.selectedRating || 0);
    setFeaturedOnly(filters.featuredOnly || false);
    setFreeShipping(filters.freeShipping || false);
    setSelectedCategories(filters.selectedCategories || []);
  };

  // Section refs for scrolling
  const homeRef = useRef();
  const categoryRef = useRef();
  const shopRef = useRef();

  // Calculate category counts
  const categoryCounts = useMemo(() => {
    const counts = {};
    products.forEach(product => {
      counts[product.category] = (counts[product.category] || 0) + 1;
    });
    return counts;
  }, [products]);

  // Get unique categories
  const categories = useMemo(() => {
    return [...new Set(products.map(product => product.category))];
  }, [products]);

  // Enhanced filtering logic with brand support
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Category filter (supports multiple categories)
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product => selectedCategories.includes(product.category));
    } else if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Search keyword filter (includes brand filtering)
    if (searchKeyword) {
      const keyword = searchKeyword.toLowerCase();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(keyword) ||
        product.desc.toLowerCase().includes(keyword) ||
        product.tags.some(tag => tag.toLowerCase().includes(keyword))
      );
    }

    // Price range filter
    if (selectedPriceRange) {
      const [min, max] = selectedPriceRange.split('-').map(Number);
      filtered = filtered.filter(product => {
        if (max) {
          return product.price >= min && product.price <= max;
        }
        return product.price >= min;
      });
    }

    // In stock filter
    if (inStockOnly) {
      filtered = filtered.filter(product => product.inStock);
    }

    // Rating filter
    if (selectedRating > 0) {
      filtered = filtered.filter(product => product.rating >= selectedRating);
    }

    // Featured products filter
    if (featuredOnly) {
      filtered = filtered.filter(product => product.featured === true);
    }

    // Free shipping filter
    if (freeShipping) {
      filtered = filtered.filter(product => product.tags.includes('free shipping'));
    }

    // Sorting
    if (sortBy) {
      filtered = [...filtered].sort((a, b) => {
        switch (sortBy) {
          case 'price-low':
            return a.price - b.price;
          case 'price-high':
            return b.price - a.price;
          case 'rating':
            return b.rating - a.rating;
          case 'reviews':
            return b.reviews - a.reviews;
          case 'newest':
            return b.id - a.id;
          default:
            return 0;
        }
      });
    }

    return filtered;
  }, [products, selectedCategory, selectedCategories, searchKeyword, selectedPriceRange, inStockOnly, selectedRating, featuredOnly, freeShipping, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  // Reset pagination when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedCategories, searchKeyword, selectedPriceRange, inStockOnly, selectedRating, featuredOnly, freeShipping, sortBy]);

  // Handlers
  const handleAddToCart = (product) => {
    if (!user) {
      setShowAuth(true);
      return;
    }
    setCart((prev) => {
      const idx = prev.findIndex((item) => item.id === product.id);
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx].qty += 1;
        return updated;
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const handleRemoveFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleToggleWishlist = (product) => {
    if (!user) {
      setShowAuth(true);
      return;
    }
    setWishlist((prev) => {
      const idx = prev.findIndex((item) => item.id === product.id);
      if (idx >= 0) {
        return prev.filter((item) => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const handleRemoveFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  const handleViewDetails = (product) => {
    setDetailsProduct(product);
    setShowDetails(true);
  };

  const handleCheckout = () => {
    if (!user) {
      setShowAuth(true);
      return;
    }
    setShowCart(false);
    setShowCheckout(true);
  };

  const handlePlaceOrder = () => {
    setCart([]);
    setShowCheckout(false);
    alert("Order placed successfully!");
  };

  // Update handleClearFilters to clear all filters via handleApplyFilters
  const handleClearFilters = () => {
    handleApplyFilters({});
  };

  // Update handleClearFilter to clear individual filters via handleApplyFilters
  const handleClearFilter = (filterType, value) => {
    const newFilters = { ...appliedFilters };
    switch (filterType) {
      case 'search':
        newFilters.searchKeyword = "";
        break;
      case 'price':
        newFilters.selectedPriceRange = "";
        break;
      case 'sort':
        newFilters.sortBy = "";
        break;
      case 'stock':
        newFilters.inStockOnly = false;
        break;
      case 'rating':
        newFilters.selectedRating = 0;
        break;
      case 'featured':
        newFilters.featuredOnly = false;
        break;
      case 'shipping':
        newFilters.freeShipping = false;
        break;
      case 'categories':
        newFilters.selectedCategories = (newFilters.selectedCategories || []).filter(cat => cat !== value);
        break;
      default:
        break;
    }
    handleApplyFilters(newFilters);
  };

  const handleSearch = (keyword) => {
    setIsSearching(true);
    setSearchKeyword(keyword);
    
    // Auto-scroll to shop section after search
    setTimeout(() => scrollToSection(shopRef), 200);
    
    // Show search toast if keyword is provided
    if (keyword.trim()) {
      const toastId = Date.now();
      setToasts(prev => [...prev, {
        id: toastId,
        type: "search",
        duration: 4000,
        showSearchResults: true,
        searchTerm: keyword,
        resultsCount: filteredProducts.length,
        onClearSearch: () => {
          setSearchKeyword("");
          setToasts(prev => prev.filter(t => t.id !== toastId));
        }
      }]);
    }
    
    // Stop searching indicator after a short delay
    setTimeout(() => setIsSearching(false), 1000);
  };

  const handleMobileSearch = (keyword) => {
    setIsSearching(true);
    setSearchKeyword(keyword);
    // Delayed scroll to account for mobile menu closing animation
    setTimeout(() => scrollToSection(shopRef), 500);
    
    // Show search toast if keyword is provided
    if (keyword.trim()) {
      const toastId = Date.now();
      setToasts(prev => [...prev, {
        id: toastId,
        type: "search",
        duration: 4000,
        showSearchResults: true,
        searchTerm: keyword,
        resultsCount: filteredProducts.length,
        onClearSearch: () => {
          setSearchKeyword("");
          setToasts(prev => prev.filter(t => t.id !== toastId));
        }
      }]);
    }
    
    // Stop searching indicator after a short delay
    setTimeout(() => setIsSearching(false), 1000);
  };

  const handleBrandSelect = (brandName) => {
    // Clear all existing filters
    setSelectedCategory("");
    setSelectedPriceRange("");
    setSortBy("");
    setInStockOnly(false);
    setSelectedRating(0);
    
    // Set the brand as search keyword
    setSearchKeyword(brandName);
    setSelectedBrand(brandName);
    
    // Show toast notification
    const toastId = Date.now();
    setToasts(prev => [...prev, {
      id: toastId,
      message: `Showing products from ${brandName}`,
      type: "info",
      duration: 4000,
      showClearFilter: true,
      onClearFilter: () => {
        handleClearFilters();
        setToasts(prev => prev.filter(t => t.id !== toastId));
      }
    }]);
    
    // Scroll to shop section after a short delay
    setTimeout(() => scrollToSection(shopRef), 200);
  };

  const handleShopNow = () => {
    scrollToSection(shopRef);
  };

  const handleLearnMore = () => {
    setShowAbout(true);
  };

  return (
    <div className="bg-[#f8ecd5] min-h-screen font-sans overflow-x-hidden">
      {/* Navbar with scroll links */}
      <Navbar
        cartCount={cart.reduce((sum, item) => sum + item.qty, 0)}
        wishlistCount={wishlist.length}
        onCart={() => setShowCart(true)}
        onWishlist={() => setShowWishlist(true)}
        onShowAuth={() => setShowAuth(true)}
        onHome={() => scrollToSection(homeRef)}
        onCategories={() => scrollToSection(categoryRef)}
        onShop={() => scrollToSection(shopRef)}
        onSearch={handleSearch}
        onMobileSearch={handleMobileSearch}
        searchKeyword={searchKeyword}
        isSearching={isSearching}
        user={user}
        onLogout={logout}
      />

      {/* Sections */}
      <section ref={homeRef} id="home" className="snap-start min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="will-change-transform"
        >
          <HomeSection 
            onBrandSelect={handleBrandSelect}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            onViewDetails={handleViewDetails}
            onShopNow={handleShopNow}
            onLearnMore={handleLearnMore}
            cart={cart}
            wishlist={wishlist}
          />
        </motion.div>
      </section>

      <section ref={categoryRef} id="categories" className="snap-start min-h-[70vh]">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="will-change-transform"
        >
          <CategoryGrid
            onSelect={(cat) => {
              setSelectedCategory(cat);
              setTimeout(() => scrollToSection(shopRef), 200);
            }}
            productCounts={categoryCounts}
          />
        </motion.div>
      </section>

      <section ref={shopRef} id="shop" className="snap-start min-h-screen bg-gradient-to-br from-[#f4f1e8] to-[#d1f1ec]">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="will-change-transform"
        >
          <div className="max-w-7xl mx-auto px-4 py-12">
            {/* Shop Header */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
              <div className="flex items-center gap-4 mb-4 md:mb-0">
                {(selectedCategory || selectedBrand) && (
                  <button
                    className="btn-primary"
                    onClick={() => {
                      setSelectedCategory("");
                      setSelectedBrand("");
                      setSearchKeyword("");
                    }}
                  >
                    &larr; All Products
                  </button>
                )}
                <h2 className="text-3xl font-bold text-[#5B3A29]">
                  {selectedBrand 
                    ? `${selectedBrand} Products` 
                    : selectedCategory 
                      ? `${selectedCategory} Products` 
                      : "All Products"}
                </h2>
              </div>
              
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="btn-secondary"
                >
                  {showFilters ? 'Hide' : 'Show'} Filters
                </button>
                
                {(searchKeyword || selectedCategory || selectedCategories.length > 0 || selectedPriceRange || sortBy || inStockOnly || selectedRating > 0 || featuredOnly || freeShipping) && (
                  <button
                    onClick={handleClearFilters}
                    className="btn-danger"
                  >
                    Clear All
                  </button>
                )}
              </div>
            </div>

            {/* Filters Section */}
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-8 bg-white rounded-lg p-6 shadow-lg"
              >
                <Filters
                  categories={categories}
                  appliedFilters={appliedFilters}
                  onApply={handleApplyFilters}
                  onClearFilter={handleClearFilter}
                />
              </motion.div>
            )}

            {/* Results Summary */}
            <div className="mb-6 text-center">
              <p className="text-[#5B3A29]/70">
                Showing {filteredProducts.length} of {products.length} products
                {selectedCategory && ` in ${selectedCategory}`}
                {selectedBrand && ` from ${selectedBrand}`}
              </p>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <>
                <ProductGrid
                  products={paginatedProducts}
                  wishlist={wishlist}
                  onAddToCart={handleAddToCart}
                  onToggleWishlist={handleToggleWishlist}
                  onViewDetails={handleViewDetails}
                />
                
                {/* Enhanced Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-8">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    
                    {Array.from({ length: totalPages }, (_, idx) => (
                      <button
                        key={idx}
                        className={`px-3 py-2 rounded-lg transition-colors duration-200 ${
                          currentPage === idx + 1
                            ? "btn-primary"
                            : "btn-secondary"
                        }`}
                        onClick={() => setCurrentPage(idx + 1)}
                      >
                        {idx + 1}
                      </button>
                    ))}
                    
                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-[#5B3A29] mb-2">No products found</h3>
                <p className="text-[#5B3A29]/70 mb-6">
                  Try adjusting your search criteria or filters
                </p>
                <button
                  onClick={handleClearFilters}
                  className="btn-primary"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <AuthModal open={showAuth} onClose={() => setShowAuth(false)} />
      <CartModal
        open={showCart}
        cart={cart}
        onClose={() => setShowCart(false)}
        onRemove={handleRemoveFromCart}
        onCheckout={handleCheckout}
      />
      <WishlistModal
        open={showWishlist}
        wishlist={wishlist}
        onClose={() => setShowWishlist(false)}
        onRemove={handleRemoveFromWishlist}
      />
      <ProductDetailsModal
        open={showDetails}
        product={detailsProduct}
        onClose={() => setShowDetails(false)}
        onAddToCart={handleAddToCart}
        inWishlist={
          detailsProduct &&
          wishlist.some((item) => item.id === detailsProduct.id)
        }
        onToggleWishlist={handleToggleWishlist}
      />
      <CheckoutModal
        open={showCheckout}
        cart={cart}
        onClose={() => setShowCheckout(false)}
        onPlaceOrder={handlePlaceOrder}
      />
      <AboutModal
        isOpen={showAbout}
        onClose={() => setShowAbout(false)}
      />

      {/* Toast Container */}
      <ToastContainer 
        toasts={toasts} 
        onRemoveToast={(id) => setToasts(prev => prev.filter(t => t.id !== id))} 
      />

      {/* Optimized Scroll snapping */}
      <style>{`
        html, body, #root {
          height: 100%;
        }
        body {
          scroll-behavior: smooth;
        }
        .snap-start {
          scroll-snap-align: start;
        }
        @media (min-width: 768px) {
          body {
            scroll-snap-type: y proximity;
          }
        }
      `}</style>
    </div>
  );
}