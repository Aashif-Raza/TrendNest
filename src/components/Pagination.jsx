import React from "react";

export default function Pagination({ totalPages, currentPage, setCurrentPage }) {
  if (totalPages <= 1) return null;

  const goTo = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // Show up to 5 page numbers
  let pages = [];
  let start = Math.max(1, currentPage - 2);
  let end = Math.min(totalPages, start + 4);
  if (end - start < 4) start = Math.max(1, end - 4);
  for (let i = start; i <= end; i++) pages.push(i);

  return (
    <div className="flex justify-center items-center gap-2 my-8">
      <button
        className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        onClick={() => goTo(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>
      {pages.map((n) => (
        <button
          key={n}
          className={`px-3 py-1 rounded transition ${
            n === currentPage
              ? "bg-blue-600 text-white font-bold"
              : "bg-gray-100 hover:bg-blue-100"
          }`}
          onClick={() => goTo(n)}
        >
          {n}
        </button>
      ))}
      <button
        className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        onClick={() => goTo(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
}