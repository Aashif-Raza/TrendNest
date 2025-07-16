import React from "react";
import { motion } from "framer-motion";

export default function LoadingSpinner({ 
  size = "medium", 
  color = "primary", 
  type = "spinner",
  className = "" 
}) {
  const sizeClasses = {
    small: "w-4 h-4",
    medium: "w-8 h-8",
    large: "w-12 h-12"
  };

  const colorClasses = {
    primary: "border-[#5B3A29]/20 border-t-[#5B3A29]",
    accent: "border-yellow-400/20 border-t-yellow-400",
    white: "border-white/20 border-t-white"
  };

  const renderSpinner = () => (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className={`${sizeClasses[size]} ${colorClasses[color]} border-2 rounded-full ${className}`}
    />
  );

  const renderDots = () => (
    <div className="flex space-x-1">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ 
            duration: 1.4,
            repeat: Infinity,
            delay: i * 0.2
          }}
          className={`${sizeClasses[size].split(' ')[0]} ${sizeClasses[size].split(' ')[1]} bg-[#5B3A29] rounded-full`}
        />
      ))}
    </div>
  );

  const renderPulse = () => (
    <motion.div
      animate={{ 
        scale: [1, 1.1, 1],
        opacity: [0.7, 1, 0.7]
      }}
      transition={{ 
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className={`${sizeClasses[size]} bg-[#5B3A29] rounded-full ${className}`}
    />
  );

  const renderSkeleton = () => (
    <div className="space-y-3">
      <div className="skeleton h-4 w-3/4"></div>
      <div className="skeleton h-4 w-1/2"></div>
      <div className="skeleton h-4 w-5/6"></div>
    </div>
  );

  const renderCardSkeleton = () => (
    <div className="bg-white rounded-xl shadow-lg p-4 space-y-4">
      <div className="skeleton h-48 w-full rounded-lg"></div>
      <div className="space-y-2">
        <div className="skeleton h-4 w-3/4"></div>
        <div className="skeleton h-4 w-1/2"></div>
        <div className="skeleton h-6 w-1/3"></div>
      </div>
    </div>
  );

  switch (type) {
    case "dots":
      return renderDots();
    case "pulse":
      return renderPulse();
    case "skeleton":
      return renderSkeleton();
    case "card-skeleton":
      return renderCardSkeleton();
    default:
      return renderSpinner();
  }
}

// Search Loading Indicator Component
export function SearchLoadingIndicator({ 
  isSearching = false, 
  className = "" 
}) {
  if (!isSearching) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className={`inline-flex items-center gap-2 text-[#5B3A29]/70 text-sm ${className}`}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-3 h-3 border border-[#5B3A29]/30 border-t-[#5B3A29] rounded-full"
      />
      <span>Searching...</span>
    </motion.div>
  );
}

// Loading Overlay Component
export function LoadingOverlay({ 
  isLoading, 
  children, 
  message = "Loading...",
  spinnerSize = "large",
  className = "" 
}) {
  if (!isLoading) return children;

  return (
    <div className={`relative ${className}`}>
      {children}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50"
      >
        <div className="text-center space-y-4">
          <LoadingSpinner size={spinnerSize} />
          <p className="text-[#5B3A29] font-medium">{message}</p>
        </div>
      </motion.div>
    </div>
  );
}

// Loading Button Component
export function LoadingButton({ 
  isLoading, 
  children, 
  disabled = false,
  className = "",
  ...props 
}) {
  return (
    <button
      disabled={disabled || isLoading}
      className={`relative ${className}`}
      {...props}
    >
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <LoadingSpinner size="small" color="white" />
        </motion.div>
      )}
      <span className={isLoading ? "opacity-0" : ""}>
        {children}
      </span>
    </button>
  );
} 