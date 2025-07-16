import React from "react";
import Icon from "./Icon";

export default function CartModal({
  open,
  cart,
  onClose,
  onRemove,
  onCheckout,
}) {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  if (!open) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
        <button
          className="absolute top-4 right-5 btn-icon text-[#5B3A29]"
          onClick={onClose}
        >
          <Icon name="close" size="large" />
        </button>
        <h2 className="text-xl font-bold mb-4">Your Cart</h2>
        {cart.length === 0 ? (
          <div className="text-gray-400">Your cart is empty.</div>
        ) : (
          <>
            <div className="divide-y">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center py-3"
                >
                  <div>
                    <div className="font-semibold">{item.name}</div>
                    <div className="text-xs text-gray-400">
                      ${item.price.toFixed(2)} x {item.qty}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold">
                      ${(item.price * item.qty).toFixed(2)}
                    </span>
                    <button
                      className="ml-2 btn-icon text-red-500 hover:text-red-700"
                      onClick={() => onRemove(item.id)}
                      title="Remove"
                    >
                      <Icon name="trash" size="medium" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center mt-6">
              <span className="font-bold text-lg">Total:</span>
              <span className="font-bold text-lg text-blue-700">
                ${total.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-end mt-6">
              <button
                className="btn-glass-cart"
                onClick={onCheckout}
              >
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}