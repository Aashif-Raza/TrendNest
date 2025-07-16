import React from "react";

const categories = [
  
  {
    name: "Accessories",
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Bags",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Electronics",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Home & Decor",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Shoes",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Jewelry",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Clothing",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Sports & Outdoors",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80",
  },
];

export default function CategoryGrid({ onSelect, productCounts = {} }) {
  return (
    <div className="p-8 min-h-[100vh] md:p-12 bg-gradient-to-br from-[#fff] to-[#d1f1ec] min-h-[60vh] flex flex-col items-center "  style={{
      // backgroundImage: `url("src/assets/colorful-shopping-bags.jpg")`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
      }}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20 bg-black/30">
        <div className="absolute inset-0" style={{
          // backgroundImage: `url("src/assets/colorful-shopping-bags.jpg")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }} />
      </div>

  
      <div className="text-center mb-12">
        <h2 className="heading-2 text-[#5B3A29] text-3xl font-display font-extrabold mb-4 mt-16">
          Shop by Category
        </h2>
        <p className="text-lg text-[#5B3A29]/80 max-w-2xl mx-auto">
          Discover our curated collection across all categories
        </p>
      </div>
      
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 w-full xl:gap-5 mx-auto">
      
        {categories.map((category, index) => (
          <CategoryCard 
            key={category.name}
            {...category} 
            count={productCounts[category.name] || 0}
            onClick={() => onSelect(category.name)} 
            tall={index === 0}
          />
        ))}
      </div>
    </div>
    
  );
}

function CategoryCard({ name, count, image, onClick, tall }) {
  return (
    <button
      onClick={onClick}
      className={`group relative rounded-2xl overflow-hidden shadow-lg bg-white
        transition-all duration-200 ease-out will-change-transform
        hover:scale-[1.05] hover:shadow-2xl hover:z-10 focus:scale-[1.05]
        flex flex-col justify-end
        ${tall ? "min-h-[400px] h-full row-span-2" : "min-h-[200px]"}
        transform hover:rotate-1 mx-4
      `}
      style={{ 
        aspectRatio: tall ? "4/5" : "3/2",
        transform: 'translate3d(0,0,0)'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/30 group-hover:from-black/30 group-hover:to-black/40 transition-all duration-300 z-10"  />
      
      <img
        src={image}
        alt={name}
        className="absolute inset-0 w-full h-full object-cover transition-all duration-300 group-hover:scale-110 group-hover:brightness-90 group-focus:scale-110 group-focus:brightness-90 "
        style={{ 
          zIndex: 1,
          transform: 'translate3d(0,0,0)'
        }}
      />
      
      <div className="relative z-20 flex flex-col justify-end h-full p-6">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 drop-shadow-lg">
          {name}
        </h2>
        <span className="text-lg text-white/90 font-medium drop-shadow-md">
          {count} Products
        </span>
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 z-15" />
      
      <span className="absolute right-4 bottom-4 z-30 px-4 py-2 rounded-full bg-white/90 text-[#5B3A29] text-sm font-semibold shadow-lg opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
        Explore {name}
      </span>
      
      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#5B3A29]/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 z-5" />
    </button>
  );
}