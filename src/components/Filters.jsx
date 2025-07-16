import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "./Icon";

export default function Filters({
  categories,
  appliedFilters = {},
  onApply,
  onClearFilter
}) {
  // Pending (local) state for all filters
  const [pendingSearchKeyword, setPendingSearchKeyword] = useState(appliedFilters.searchKeyword || "");
  const [pendingSelectedPriceRange, setPendingSelectedPriceRange] = useState(appliedFilters.selectedPriceRange || "");
  const [pendingSortBy, setPendingSortBy] = useState(appliedFilters.sortBy || "");
  const [pendingInStockOnly, setPendingInStockOnly] = useState(appliedFilters.inStockOnly || false);
  const [pendingSelectedRating, setPendingSelectedRating] = useState(appliedFilters.selectedRating || 0);
  const [pendingFeaturedOnly, setPendingFeaturedOnly] = useState(appliedFilters.featuredOnly || false);
  const [pendingFreeShipping, setPendingFreeShipping] = useState(appliedFilters.freeShipping || false);
  const [pendingSelectedCategories, setPendingSelectedCategories] = useState(appliedFilters.selectedCategories || []);

  // UI state
  const [isExpanded, setIsExpanded] = useState(false);
  const [collapsedSections, setCollapsedSections] = useState({
    categories: false,
    price: false,
    filters: false
  });

  // Sync pending state with appliedFilters when they change
  useEffect(() => {
    setPendingSearchKeyword(appliedFilters.searchKeyword || "");
    setPendingSelectedPriceRange(appliedFilters.selectedPriceRange || "");
    setPendingSortBy(appliedFilters.sortBy || "");
    setPendingInStockOnly(appliedFilters.inStockOnly || false);
    setPendingSelectedRating(appliedFilters.selectedRating || 0);
    setPendingFeaturedOnly(appliedFilters.featuredOnly || false);
    setPendingFreeShipping(appliedFilters.freeShipping || false);
    setPendingSelectedCategories(appliedFilters.selectedCategories || []);
  }, [JSON.stringify(appliedFilters)]);

  // Compare pending and applied state to determine if Apply should be enabled
  const hasPendingChanges =
    pendingSearchKeyword !== (appliedFilters.searchKeyword || "") ||
    pendingSelectedPriceRange !== (appliedFilters.selectedPriceRange || "") ||
    pendingSortBy !== (appliedFilters.sortBy || "") ||
    pendingInStockOnly !== (appliedFilters.inStockOnly || false) ||
    pendingSelectedRating !== (appliedFilters.selectedRating || 0) ||
    pendingFeaturedOnly !== (appliedFilters.featuredOnly || false) ||
    pendingFreeShipping !== (appliedFilters.freeShipping || false) ||
    JSON.stringify(pendingSelectedCategories) !== JSON.stringify(appliedFilters.selectedCategories || []);

  // Handler for Apply button
  const handleApply = () => {
    if (onApply) {
      onApply({
        searchKeyword: pendingSearchKeyword,
        selectedPriceRange: pendingSelectedPriceRange,
        sortBy: pendingSortBy,
        inStockOnly: pendingInStockOnly,
        selectedRating: pendingSelectedRating,
        featuredOnly: pendingFeaturedOnly,
        freeShipping: pendingFreeShipping,
        selectedCategories: pendingSelectedCategories
      });
    }
  };

  // Handler for Reset All
  const handleReset = () => {
    setPendingSearchKeyword("");
    setPendingSelectedPriceRange("");
    setPendingSortBy("");
    setPendingInStockOnly(false);
    setPendingSelectedRating(0);
    setPendingFeaturedOnly(false);
    setPendingFreeShipping(false);
    setPendingSelectedCategories([]);
    if (onApply) {
      onApply({});
    }
  };

  // Category toggle for pending state
  const handleCategoryToggle = (category) => {
    setPendingSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
  };

  // Price range logic for pending state
  const priceRanges = [
    { label: "All Prices", value: "" },
    { label: "Under $25", value: "0-25" },
    { label: "$25 - $50", value: "25-50" },
    { label: "$50 - $100", value: "50-100" },
    { label: "$100 - $200", value: "100-200" },
    { label: "Over $200", value: "200-999999" }
  ];

  const sortOptions = [
    { label: "Default", value: "" },
    { label: "Price: Low to High", value: "price-low" },
    { label: "Price: High to Low", value: "price-high" },
    { label: "Highest Rated", value: "rating" },
    { label: "Most Reviews", value: "reviews" },
    { label: "Newest First", value: "newest" }
  ];

  // Enhanced star rating for pending state
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <button
        key={i}
        onClick={() => setPendingSelectedRating(i + 1)}
        className={`transition-colors duration-200 ${
          i < rating ? "text-yellow-400" : "text-gray-300"
        } hover:text-yellow-400 `}
      >
        <Icon name="star" size="medium" className={i < rating ? "fill-current" : ""} />
      </button>
    ));
  };

  // Collapsible section logic
  const toggleSection = (section) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Active filters for display (pending state)
  const getActiveFilters = () => {
    const filters = [];
    if (pendingSearchKeyword) {
      filters.push({ type: 'search', label: `Search: "${pendingSearchKeyword}"`, value: pendingSearchKeyword });
    }
    if (pendingSelectedPriceRange) {
      const range = priceRanges.find(r => r.value === pendingSelectedPriceRange);
      filters.push({ type: 'price', label: `Price: ${range?.label}`, value: pendingSelectedPriceRange });
    }
    if (pendingSortBy) {
      const sort = sortOptions.find(s => s.value === pendingSortBy);
      filters.push({ type: 'sort', label: `Sort: ${sort?.label}`, value: pendingSortBy });
    }
    if (pendingInStockOnly) {
      filters.push({ type: 'stock', label: 'In Stock Only', value: true });
    }
    if (pendingSelectedRating > 0) {
      filters.push({ type: 'rating', label: `Rating: ${pendingSelectedRating}+ Stars`, value: pendingSelectedRating });
    }
    if (pendingFeaturedOnly) {
      filters.push({ type: 'featured', label: 'Featured Products', value: true });
    }
    if (pendingFreeShipping) {
      filters.push({ type: 'shipping', label: 'Free Shipping', value: true });
    }
    pendingSelectedCategories.forEach(category => {
      filters.push({ type: 'categories', label: `Category: ${category}`, value: category });
    });
    return filters;
  };
  const activeFilters = getActiveFilters();

  return (
    <div className="space-y-6 bg-gradient-to-br from-[#f8ecd5] via-[#f4e7d0] to-[#e7d6c1] rounded-2xl shadow-brand-lg p-4 md:p-8">
      {/* Enhanced Filter Header */}
      <div className="filter-header-enhanced">
        <Icon name="filter" size="large" />
        <span>Filters</span>
        {hasPendingChanges && (
          <span className="filter-pending-indicator">
            <Icon name="clock" size="small" /> Pending Changes
          </span>
        )}
      </div>

      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          className="debounced-input"
          placeholder="Search products, tags, or descriptions..."
          value={pendingSearchKeyword}
          onChange={(e) => setPendingSearchKeyword(e.target.value)}
        />
        <Icon 
          name="search" 
          size="medium" 
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#5B3A29]/50"
        />
      </div>

      {/* Mobile Expand/Collapse */}
      <div className="md:hidden">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="btn-primary w-full flex items-center justify-between"
        >
          <span>Advanced Filters</span>
          <Icon 
            name={isExpanded ? "chevronUp" : "chevronDown"} 
            size="medium" 
            className="transition-transform duration-200"
          />
        </button>
      </div>

      {/* Filter Options */}
      <motion.div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${
          isExpanded ? "block" : "hidden md:block"
        }`}
        initial={false}
        animate={{ opacity: isExpanded ? 1 : 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Categories Multi-Select */}
        <div className="filter-section-enhanced">
          <div 
            className="collapsible-header"
            onClick={() => toggleSection('categories')}
          >
            <h3 className="filter-label">Categories</h3>
            <Icon 
              name={collapsedSections.categories ? "chevronDown" : "chevronUp"} 
              size="small" 
              className="transition-transform duration-200"
            />
          </div>
          <AnimatePresence>
            {!collapsedSections.categories && (
              <motion.div
                className="collapsible-content"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="filter-checkbox-group">
                  {categories.map((category) => (
                    <div key={category} className="filter-checkbox-item">
                      <input
                        type="checkbox"
                        id={`category-${category}`}
                        checked={pendingSelectedCategories.includes(category)}
                        onChange={() => handleCategoryToggle(category)}
                        className="filter-toggle"
                      />
                      <label htmlFor={`category-${category}`} className="text-sm text-[#5B3A29]">
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Price Range */}
        <div className="filter-section-enhanced">
          <div 
            className="collapsible-header"
            onClick={() => toggleSection('price')}
          >
            <h3 className="filter-label">Price Range</h3>
            <Icon 
              name={collapsedSections.price ? "chevronDown" : "chevronUp"} 
              size="small" 
              className="transition-transform duration-200"
            />
          </div>
          <AnimatePresence>
            {!collapsedSections.price && (
              <motion.div
                className="collapsible-content"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="price-range-display">
                      {pendingSelectedPriceRange && priceRanges.find(r => r.value === pendingSelectedPriceRange)
                        ? priceRanges.find(r => r.value === pendingSelectedPriceRange).label
                        : "$0 - $500"}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {priceRanges.slice(1).map((range) => (
                      <button
                        key={range.value}
                        onClick={() => setPendingSelectedPriceRange(range.value)}
                        className={`px-3 py-1 text-xs rounded-full transition-all duration-200 ${
                          pendingSelectedPriceRange === range.value
                            ? "bg-[#5B3A29] text-white"
                            : "bg-gray-100 text-[#5B3A29] hover:bg-[#5B3A29]/10"
                        }`}
                      >
                        {range.label}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Sort Options */}
        <div className="filter-section-enhanced">
          <label className="filter-label">Sort By</label>
          <select
            className="w-full px-4 py-3 border border-[#5B3A29]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5B3A29]/50 focus:border-[#5B3A29] transition-all duration-200 bg-white"
            value={pendingSortBy}
            onChange={(e) => setPendingSortBy(e.target.value)}
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Rating Filter */}
        <div className="filter-section-enhanced">
          <label className="filter-label">Minimum Rating</label>
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              {renderStars(pendingSelectedRating)}
            </div>
            {pendingSelectedRating > 0 && (
              <button
                onClick={() => setPendingSelectedRating(0)}
                className="text-sm text-[#5B3A29]/70 hover:text-[#5B3A29] transition-colors duration-200"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </motion.div>

      {/* Additional Filters Row */}
      <motion.div
        className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${
          isExpanded ? "block" : "hidden md:block"
        }`}
        initial={false}
        animate={{ opacity: isExpanded ? 1 : 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* In Stock Only */}
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="inStockOnly"
            checked={pendingInStockOnly}
            onChange={(e) => setPendingInStockOnly(e.target.checked)}
            className="filter-toggle"
          />
          <label htmlFor="inStockOnly" className="text-sm font-semibold text-[#5B3A29]">
            In Stock Only
          </label>
        </div>

        {/* Featured Products */}
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="featuredOnly"
            checked={pendingFeaturedOnly}
            onChange={(e) => setPendingFeaturedOnly(e.target.checked)}
            className="filter-toggle"
          />
          <label htmlFor="featuredOnly" className="text-sm font-semibold text-[#5B3A29]">
            Featured Products
          </label>
        </div>

        {/* Free Shipping */}
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="freeShipping"
            checked={pendingFreeShipping}
            onChange={(e) => setPendingFreeShipping(e.target.checked)}
            className="filter-toggle"
          />
          <label htmlFor="freeShipping" className="text-sm font-semibold text-[#5B3A29]">
            Free Shipping
          </label>
        </div>
      </motion.div>

      {/* Active Filters Display */}
      {activeFilters.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#5B3A29]/10 rounded-lg p-4"
        >
          <h4 className="text-sm font-semibold text-[#5B3A29] mb-3">Active Filters:</h4>
          <div className="flex flex-wrap gap-2">
            {activeFilters.map((filter, index) => (
              <div
                key={index}
                className="filter-chip"
                onClick={() => onClearFilter && onClearFilter(filter.type, filter.value)}
              >
                <span>{filter.label}</span>
                <button className="filter-chip-close">
                  <Icon name="close" size="small" />
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Apply/Reset Section (Sticky Footer) */}
      <div className="filter-apply-section">
        <button
          className={`filter-apply-button filter-apply-animate ${!hasPendingChanges ? "filter-apply-button-disabled" : ""}`}
          onClick={handleApply}
          disabled={!hasPendingChanges}
        >
          <Icon name="check" size="medium" className="mr-2" />
          Apply Filters
        </button>
        <button
          className="btn-secondary filter-apply-animate"
          onClick={handleReset}
        >
          <Icon name="refresh" size="medium" className="mr-2" />
          Reset All
        </button>
      </div>

      {/* Mobile Filter Actions (for closing panel) */}
      <div className="mobile-filter-actions">
        <button
          onClick={handleReset}
          className="btn-secondary flex-1"
        >
          Reset All
        </button>
        <button
          onClick={() => {
            handleApply();
            setIsExpanded(false);
          }}
          className="btn-primary flex-1"
          disabled={!hasPendingChanges}
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
}