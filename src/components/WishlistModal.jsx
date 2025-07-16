import React from "react";
import Icon from "./Icon";

export default function WishlistModal({ open, wishlist, onClose, onRemove }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <button
          className="absolute top-4 right-5 btn-icon text-[#5B3A29]"
          onClick={onClose}
        >
          <Icon name="close" size="large" />
        </button>
        <h2 className="text-xl font-bold mb-4">Your Wishlist</h2>
        {wishlist.length === 0 ? (
          <div className="text-gray-400">Your wishlist is empty.</div>
        ) : (
          <div className="divide-y">
            {wishlist.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center py-3"
              >
                <div>
                  <div className="font-semibold">{item.name}</div>
                  <div className="text-xs text-gray-400">
                    ${item.price.toFixed(2)}
                  </div>
                </div>
                <button
                  className="btn-icon text-red-500 hover:text-red-700"
                  onClick={() => onRemove(item.id)}
                  title="Remove"
                >
                  <Icon name="trash" size="medium" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}