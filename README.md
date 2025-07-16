# TrendNest

Premium Fashion & Lifestyle Store

TrendNest is a modern, full-featured e-commerce web application offering a curated collection of high-quality fashion, electronics, home decor, and lifestyle products. Built with React, Vite, Tailwind CSS, and Firebase authentication, TrendNest delivers a seamless shopping experience with advanced filtering, authentication, cart, wishlist, and more.

---

## Features

- 🛍️ **Curated Product Catalog**: 500+ premium products from 50+ trusted brands
- 🔍 **Advanced Filtering**: Search, filter by category, price, rating, stock, featured, and more
- 🛒 **Shopping Cart & Wishlist**: Add, remove, and manage your favorite products
- 💳 **Checkout Flow**: Simulated checkout with coupon support and easy returns
- 🔐 **Authentication**: Email/password, Google, and Facebook login via Firebase
- 🚚 **Free Shipping**: On all orders over $50
- ⭐ **Customer Reviews**: Ratings and testimonials
- 📱 **Responsive Design**: Mobile-first, beautiful UI with Tailwind CSS
- 🌙 **Modern UI/UX**: Animations, modals, and glassmorphism effects
- 📦 **Demo Data**: Easily extensible product and brand data

---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/) or [yarn]

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/trendnest.git
   cd trendnest
   ```
2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```
3. **Start the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
4. **Open in your browser:**
   Visit [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal)

---

## Firebase Authentication

This project uses Firebase for authentication (email/password, Google, Facebook). The Firebase config is included in `src/firebase.js` for demo purposes. For production, use environment variables and secure your keys.

---

## Project Structure

- `src/` — Main source code
  - `components/` — UI components (Navbar, Filters, Modals, etc.)
  - `pages/` — Main pages (Home, Shop)
  - `data/` — Demo product data
  - `constants/` — Brand, footer, and other constants
  - `context/` — Auth context
  - `hooks/` — Custom React hooks
  - `assets/` — Images and logos

---

## Credits

- Built with [React](https://react.dev/), [Vite](https://vitejs.dev/), [Tailwind CSS](https://tailwindcss.com/), [Framer Motion](https://www.framer.com/motion/), [Firebase](https://firebase.google.com/)
- Icons by [react-icons](https://react-icons.github.io/react-icons/)
- Demo images from [Unsplash](https://unsplash.com/)

---

## License

This project is for educational/demo purposes. For commercial use, please replace demo data and assets.
