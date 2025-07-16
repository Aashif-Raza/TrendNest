import React from "react";

// Toast Hook for easy usage
export function useToast() {
  const [toasts, setToasts] = React.useState([]);

  const addToast = (message, type = "info", duration = 5000) => {
    const id = Date.now();
    const newToast = { id, message, type, duration };
    setToasts(prev => [...prev, newToast]);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const showSuccess = (message, duration) => addToast(message, "success", duration);
  const showError = (message, duration) => addToast(message, "error", duration);
  const showWarning = (message, duration) => addToast(message, "warning", duration);
  const showInfo = (message, duration) => addToast(message, "info", duration);

  return {
    toasts,
    addToast,
    removeToast,
    showSuccess,
    showError,
    showWarning,
    showInfo
  };
} 