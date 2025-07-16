import React, { useState, useEffect } from "react";
import CategoryGrid from "../components/CategoryGrid";
import ProductGrid from "../components/ProductGrid";

export default function Shop({
  products,
  wishlist,
  onAddToCart,
  onToggleWishlist,
  onViewDetails,
}) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  // Filter products by selected category
  const filteredProducts = selectedCategory
    ? products.filter((p) => p.category === selectedCategory)
    : products;

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  return (
    <div>
      {!selectedCategory ? (
        <CategoryGrid onSelect={setSelectedCategory} />
      ) : (
        <>
          <button
            className="ml-8 mt-4 mb-4 px-4 py-2 bg-[#5B3A29] text-white rounded hover:bg-[#3a2518] transition"
            onClick={() => setSelectedCategory("")}
          >
            &larr; All Categories
          </button>
          <div className="px-8">
            <h2 className="text-2xl font-bold mb-4">
              {selectedCategory} Products
            </h2>
            <ProductGrid
              products={paginatedProducts}
              wishlist={wishlist}
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
              onViewDetails={onViewDetails}
            />
            {totalPages > 1 && (
              <div className="flex justify-center mt-6">
                {Array.from({ length: totalPages }, (_, idx) => (
                  <button
                    key={idx}
                    className={`mx-1 px-3 py-1 rounded ${
                      currentPage === idx + 1
                        ? "bg-[#5B3A29] text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    } transition`}
                    onClick={() => setCurrentPage(idx + 1)}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}