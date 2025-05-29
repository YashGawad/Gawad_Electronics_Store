import React, { useEffect, useState } from 'react';
import { addOrder } from '../data/orders';

function getCart() {
  if (typeof window === 'undefined') return [];
  try {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  } catch {
    return [];
  }
}

function setCart(cart) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('cart', JSON.stringify(cart));
}

const Cart = () => {
  const [cart, setCartState] = useState(getCart());
  const [message, setMessage] = useState('');

  useEffect(() => {
    setCartState(getCart());
  }, []);

  const handleRemove = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCartState(newCart);
    setCart(newCart);
  };

  const handlePlaceOrder = () => {
    if (cart.length === 0) return;
    // Ensure each item has name, price, image, and quantity
    const normalizedItems = cart.map(item => ({
      name: item.name,
      price: item.price,
      image: item.image || '',
      quantity: item.quantity || 1,
    }));
    addOrder({
      items: normalizedItems,
      date: new Date().toISOString(),
      status: 'Processing',
    });
    setCart([]);
    setCartState([]);
    setMessage('Order placed successfully!');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Shopping Cart</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        {cart.length === 0 ? (
          <>
            <p className="text-gray-600">Your cart is currently empty.</p>
            <p className="mt-4">Continue shopping to add items to your cart.</p>
          </>
        ) : (
          <>
            <ul className="mb-4">
              {cart.map((item, idx) => (
                <li key={idx} className="flex justify-between items-center border-b py-2">
                  <span>{item.name} - ${item.price}</span>
                  <button
                    className="text-red-500 hover:underline"
                    onClick={() => handleRemove(idx)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <button
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow"
              onClick={handlePlaceOrder}
            >
              Place Order
            </button>
            {message && <p className="mt-4 text-green-600 font-semibold">{message}</p>}
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;