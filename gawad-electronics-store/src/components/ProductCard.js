import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { addOrder } from '../data/orders';

const ProductCard = ({ id, name, image, price, description, onAddToCart, onBuyNow }) => {
  const [clicked, setClicked] = useState(false);
  const router = useRouter();
  const handleClick = () => {
    setClicked(true);
    onAddToCart && onAddToCart();
    setTimeout(() => setClicked(false), 400);
  };
  const handleBuyNow = () => {
    // Add order to localStorage and redirect to /orders
    addOrder({
      items: [{
        id,
        name,
        image: image || '',
        price,
        description,
        quantity: 1,
      }],
      date: new Date().toISOString(),
      status: 'Processing',
    });
    router.push('/orders');
  };
  return (
    <div className="bg-white border-4 border-sand-200 rounded-lg shadow-pixel flex flex-col items-center p-4 transition-transform duration-200 hover:scale-105 animate-fadein">
      <div className="product-image-container">
        <img src={image} alt={name} className="product-image" />
      </div>
      <h3 className="font-pixel text-lg text-blue-900 mb-1">{name}</h3>
      <p className="text-green-700 font-bold mb-2">₹{price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</p>
      <div className="flex w-full gap-2 mt-auto">
        <button
          className={`flex-1 bg-green-300 hover:bg-green-400 text-green-900 font-pixel px-4 py-2 rounded shadow-pixel border-2 border-green-500 transition-all duration-200 ${clicked ? 'animate-bounce' : ''}`}
          onClick={handleClick}
          aria-label={`Add ${name} to cart`}
        >
          Add to Cart
        </button>
        <button
          className="flex-1 bg-blue-100 hover:bg-blue-200 text-blue-900 font-pixel px-4 py-2 rounded shadow-pixel border-2 border-blue-200 transition-all duration-200"
          onClick={handleBuyNow}
          aria-label={`Buy ${name} now`}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductCard; 