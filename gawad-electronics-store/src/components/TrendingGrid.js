import React from 'react';
import { useRouter } from 'next/router';

const TrendingGrid = ({ products }) => {
  const router = useRouter();

  // Helper to filter trending products by category
  const getTrending = (category) =>
    products.filter(
      (p) => p.category === category
    ).slice(0, 3); // Show top 3 trending per category

  const handleCategoryClick = (category) => {
    router.push(`/shop?category=${encodeURIComponent(category)}`);
  };

  return (
    <section className="py-10 bg-gray-50">
      <h2 className="text-2xl font-bold text-center mb-8 text-blue-900 font-pixel">Trending Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Mobiles */}
        <div className="rounded-lg shadow-pixel bg-white p-6 flex flex-col items-center hover:shadow-lg transition cursor-pointer" onClick={() => handleCategoryClick('Mobiles')}>
          <h3 className="text-xl font-semibold mb-4 text-green-700 font-pixel">Trending Mobiles</h3>
          <div className="flex flex-col gap-4 w-full">
            {getTrending('Mobiles').map((product) => (
              <div key={product.id} className="flex items-center gap-4">
                <img src={product.image} alt={product.name} className="w-16 h-16 object-contain rounded border" />
                <div>
                  <div className="font-semibold text-blue-900">{product.name}</div>
                  <div className="text-green-700 font-bold">₹{product.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</div>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-6 px-4 py-2 bg-green-500 text-white rounded font-pixel hover:bg-green-600">See All Mobiles</button>
        </div>
        {/* Laptops */}
        <div className="rounded-lg shadow-pixel bg-white p-6 flex flex-col items-center hover:shadow-lg transition cursor-pointer" onClick={() => handleCategoryClick('Laptops')}>
          <h3 className="text-xl font-semibold mb-4 text-green-700 font-pixel">Trending Laptops</h3>
          <div className="flex flex-col gap-4 w-full">
            {getTrending('Laptops').map((product) => (
              <div key={product.id} className="flex items-center gap-4">
                <img src={product.image} alt={product.name} className="w-16 h-16 object-contain rounded border" />
                <div>
                  <div className="font-semibold text-blue-900">{product.name}</div>
                  <div className="text-green-700 font-bold">₹{product.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</div>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-6 px-4 py-2 bg-green-500 text-white rounded font-pixel hover:bg-green-600">See All Laptops</button>
        </div>
        {/* TVs */}
        <div className="rounded-lg shadow-pixel bg-white p-6 flex flex-col items-center hover:shadow-lg transition cursor-pointer" onClick={() => handleCategoryClick('TVs')}>
          <h3 className="text-xl font-semibold mb-4 text-green-700 font-pixel">Trending TVs</h3>
          <div className="flex flex-col gap-4 w-full">
            {getTrending('TVs').map((product) => (
              <div key={product.id} className="flex items-center gap-4">
                <img src={product.image} alt={product.name} className="w-16 h-16 object-contain rounded border" />
                <div>
                  <div className="font-semibold text-blue-900">{product.name}</div>
                  <div className="text-green-700 font-bold">₹{product.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</div>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-6 px-4 py-2 bg-green-500 text-white rounded font-pixel hover:bg-green-600">See All TVs</button>
        </div>
      </div>
    </section>
  );
};

export default TrendingGrid;
