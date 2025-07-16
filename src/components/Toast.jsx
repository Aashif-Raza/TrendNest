import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "./Icon";

export default function Toast({ 
  message, 
  type = "info", 
  duration = 5000, 
  onClose, 
  isVisible = false,
  showClearFilter = false,
  onClearFilter = null,
  showSearchResults = false,
  searchTerm = "",
  resultsCount = 0,
  onClearSearch = null
}) {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  const getToastStyles = () => {
    const baseStyles = "flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg max-w-sm";
    
    switch (type) {
      case "success":
        return `${baseStyles} bg-green-500 text-white`;
      case "error":
        return `${baseStyles} bg-red-500 text-white`;
      case "warning":
        return `${baseStyles} bg-yellow-500 text-white`;
      case "search":
        return `${baseStyles} bg-blue-600 text-white`;
      case "info":
      default:
        return `${baseStyles} bg-[#5B3A29] text-white`;
    }
  };

  const getIcon = () => {
    switch (type) {
      case "success":
        return <Icon name="success" size="medium" />;
      case "error":
        return <Icon name="error" size="medium" />;
      case "warning":
        return <Icon name="warning" size="medium" />;
      case "search":
        return <Icon name="search" size="medium" />;
      case "info":
      default:
        return <Icon name="info" size="medium" />;
    }
  };

  const renderSearchResults = () => {
    if (!showSearchResults) return null;
    
    return (
      <div className="flex-1">
        <span className="text-sm font-medium block">
          Found {resultsCount} result{resultsCount !== 1 ? 's' : ''} for "{searchTerm}"
        </span>
        {onClearSearch && (
          <button
            onClick={onClearSearch}
            className="text-xs underline hover:no-underline mt-1 transition-all duration-200"
          >
            Clear Search
          </button>
        )}
      </div>
    );
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 300, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 300, scale: 0.8 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed top-4 right-4 z-50"
        >
          <div className={getToastStyles()}>
            {getIcon()}
            {showSearchResults ? renderSearchResults() : (
              <div className="flex-1">
                <span className="text-sm font-medium block">{message}</span>
                {showClearFilter && onClearFilter && (
                  <button
                    onClick={onClearFilter}
                    className="text-xs underline hover:no-underline mt-1 transition-all duration-200"
                  >
                    Clear Filter
                  </button>
                )}
              </div>
            )}
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors duration-200"
            >
              <Icon name="close" size="small" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Toast Container Component
export function ToastContainer({ toasts, onRemoveToast }) {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 300, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 300, scale: 0.8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <Toast
              message={toast.message}
              type={toast.type}
              duration={toast.duration}
              onClose={() => onRemoveToast(toast.id)}
              isVisible={true}
              showClearFilter={toast.showClearFilter}
              onClearFilter={toast.onClearFilter}
              showSearchResults={toast.showSearchResults}
              searchTerm={toast.searchTerm}
              resultsCount={toast.resultsCount}
              onClearSearch={toast.onClearSearch}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

 