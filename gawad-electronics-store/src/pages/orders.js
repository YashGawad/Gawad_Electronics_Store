import React, { useEffect, useState } from 'react';
import { getOrders, clearOrders } from '../data/orders';

// Add setCart utility for reorder
function setCart(cart) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('cart', JSON.stringify(cart));
}

const Orders = () => {
    const [orders, setOrders] = useState(null); // null means not loaded yet
    const [message, setMessage] = useState('');

    useEffect(() => {
        setOrders(getOrders());
    }, []);

    const handleClearOrders = () => {
        clearOrders();
        setOrders([]);
        setMessage('All orders cleared!');
    };

    const handleReorder = (items) => {
        setCart(items);
        setMessage('Items added to cart!');
    };

    const handleCancelOrder = (orderIdx) => {
        const updatedOrders = [...orders];
        if (updatedOrders[orderIdx]) {
            updatedOrders[orderIdx] = {
                ...updatedOrders[orderIdx],
                status: 'Cancelled',
            };
            localStorage.setItem('orders', JSON.stringify(updatedOrders));
            setOrders(updatedOrders);
            setMessage('Order cancelled!');
        }
    };

    if (orders === null) {
        // While loading, show nothing or a spinner
        return <div className="container mx-auto p-4">Loading...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Your Orders</h1>
            <div className="flex justify-between items-center mb-4">
                <button
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow"
                    onClick={handleClearOrders}
                >
                    Clear Orders
                </button>
                {message && <span className="text-green-600 font-semibold ml-4">{message}</span>}
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
                {orders.length === 0 ? (
                    <p className="text-gray-600">You have not placed any orders yet.</p>
                ) : (
                    <ul className="space-y-8">
                        {orders.map((order, idx) => {
                            // Calculate total price
                            const total = (order.items || []).reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
                            return (
                                <li key={idx} className="border-b pb-6">
                                    <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
                                        <div className="text-sm text-gray-500">Order #{idx + 1} &nbsp;|&nbsp; Date: {new Date(order.date).toLocaleString()}</div>
                                        <div className="text-sm font-semibold text-blue-700">Status: {order.status || 'Processing'}</div>
                                    </div>
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full text-left text-sm">
                                            <thead>
                                                <tr className="border-b">
                                                    <th className="py-2 pr-4">Product</th>
                                                    <th className="py-2 pr-4">Name</th>
                                                    <th className="py-2 pr-4">Price</th>
                                                    <th className="py-2 pr-4">Qty</th>
                                                    <th className="py-2 pr-4">Subtotal</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {(order.items || []).map((item, i) => (
                                                    <tr key={i} className="border-b last:border-b-0">
                                                        <td className="py-2 pr-4">
                                                            {item.image ? (
                                                                <img src={item.image} alt={item.name || 'Product'} className="w-12 h-12 object-contain rounded" />
                                                            ) : (
                                                                <div className="w-12 h-12 bg-gray-200 flex items-center justify-center rounded text-gray-400">N/A</div>
                                                            )}
                                                        </td>
                                                        <td className="py-2 pr-4">{item.name || 'N/A'}</td>
                                                        <td className="py-2 pr-4">{typeof item.price === 'number' ? `₹${item.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}` : 'N/A'}</td>
                                                        <td className="py-2 pr-4">{item.quantity || 1}</td>
                                                        <td className="py-2 pr-4">{typeof item.price === 'number' ? `₹${(item.price * (item.quantity || 1)).toLocaleString('en-IN', { minimumFractionDigits: 2 })}` : 'N/A'}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="flex justify-between items-center mt-4 gap-2 flex-wrap">
                                        <div className="font-bold text-lg text-green-700">Total: ₹{total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</div>
                                        <div className="flex gap-2">
                                            <button
                                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow"
                                                onClick={() => handleReorder(order.items)}
                                            >
                                                Reorder
                                            </button>
                                            {order.status !== 'Cancelled' && (
                                                <button
                                                    className="bg-red-400 hover:bg-red-600 text-white px-4 py-2 rounded shadow"
                                                    onClick={() => handleCancelOrder(idx)}
                                                >
                                                    Cancel Order
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Orders;