import React from 'react';
import { 
  FiSearch, FiShoppingCart, FiHeart, FiEye, FiStar, FiX, FiMenu, FiUser,
  FiMail, FiLock, FiLogIn, FiUserPlus, FiFacebook, FiAlertCircle,
  FiTrash2, FiChevronDown, FiChevronUp, FiPlus, FiMinus, FiCheck,
  FiInfo, FiAlertTriangle, FiCheckCircle, FiPhone, FiMapPin, FiLogOut,
  FiTruck, FiClock, FiShield, FiRefreshCw, FiUsers, FiAward, FiGlobe
} from 'react-icons/fi';
import { 
  FaTwitter, FaInstagram, FaLinkedin, FaYoutube, FaPinterest 
} from 'react-icons/fa';
import { 
  SiVisa, SiMastercard, SiPaypal, SiApplepay, SiGooglepay, SiStripe 
} from 'react-icons/si';

const Icon = ({ name, size = 'medium', color, className = '', ...props }) => {
  const sizeMap = {
    small: 'w-4 h-4',
    medium: 'w-5 h-5',
    large: 'w-6 h-6'
  };

  const iconMap = {
    // Navigation & UI
    search: FiSearch,
    cart: FiShoppingCart,
    heart: FiHeart,
    eye: FiEye,
    star: FiStar,
    close: FiX,
    menu: FiMenu,
    user: FiUser,
    chevronDown: FiChevronDown,
    chevronUp: FiChevronUp,
    plus: FiPlus,
    minus: FiMinus,
    check: FiCheck,
    
    // Authentication
    mail: FiMail,
    lock: FiLock,
    login: FiLogIn,
    logout: FiLogOut,
    userPlus: FiUserPlus,
    facebook: FiFacebook,
    
    // Contact
    phone: FiPhone,
    mapPin: FiMapPin,
    
    // Social Media
    twitter: FaTwitter,
    instagram: FaInstagram,
    linkedin: FaLinkedin,
    youtube: FaYoutube,
    pinterest: FaPinterest,
    
    // Payment Methods
    visa: SiVisa,
    mastercard: SiMastercard,
    paypal: SiPaypal,
    applepay: SiApplepay,
    googlepay: SiGooglepay,
    stripe: SiStripe,
    amex: SiMastercard, // Using mastercard icon as placeholder for Amex
    
    // Security
    shield: FiShield,
    shieldCheck: FiCheckCircle,
    ssl: FiCheckCircle,
    
    // Status & Feedback
    info: FiInfo,
    warning: FiAlertTriangle,
    error: FiAlertCircle,
    success: FiCheckCircle,
    
    // Actions
    trash: FiTrash2,
    delete: FiTrash2,
    
    // Services & Features
    truck: FiTruck,
    clock: FiClock,
    refresh: FiRefreshCw,
    users: FiUsers,
    award: FiAward,
    globe: FiGlobe
  };

  const IconComponent = iconMap[name];
  
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in icon map`);
    return null;
  }

  return (
    <IconComponent 
      className={`${sizeMap[size]} ${className}`}
      style={{ color }}
      {...props}
    />
  );
};

export default Icon; 