import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import Toast from './Toast';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const AdminOrdersTable = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [toast, setToast] = useState({ message: '', type: 'success' });

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError('');
      const { data, error } = await supabase
        .from('orders')
        .select('*, order_items(*, product_id, products(*))')
        .order('created_at', { ascending: false });
      if (error) setError('Failed to fetch orders.');
      else setOrders(data);
      setLoading(false);
    };
    fetchOrders();
  }, []);

  const handleStatusChange = async (order, status) => {
    const { error } = await supabase.from('orders').update({ status }).eq('id', order.id);
    if (error) setToast({ message: 'Failed to update status', type: 'error' });
    else setToast({ message: 'Order status updated', type: 'success' });
  };

  const handleView = (order) => setSelectedOrder(order);
  const handleCloseModal = () => setSelectedOrder(null);
  const handleCloseToast = () => setToast({ message: '', type: 'success' });

  if (loading) {
    return <div className="text-gray-600">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  if (!orders.length) {
    return <div className="text-gray-600">No orders found.</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 mb-4">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Order ID</th>
            <th className="py-2 px-4 border-b">Date</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Total</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, idx) => (
            <tr key={idx}>
              <td className="py-2 px-4 border-b">{idx + 1}</td>
              <td className="py-2 px-4 border-b">{order.date ? new Date(order.date).toLocaleString() : 'N/A'}</td>
              <td className="py-2 px-4 border-b">{order.status || 'Processing'}</td>
              <td className="py-2 px-4 border-b">₹{order.items ? order.items.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0).toLocaleString('en-IN', { minimumFractionDigits: 2 }) : '0.00'}</td>
              <td className="py-2 px-4 border-b">
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded mr-2" onClick={() => handleView(order)}>View</button>
                <button className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded mr-2" onClick={() => handleStatusChange(order, 'shipped')}>Change Status</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">Order Details</h2>
            <div className="mb-2">Order Date: {selectedOrder.date ? new Date(selectedOrder.date).toLocaleString() : 'N/A'}</div>
            <div className="mb-2">Status: {selectedOrder.status || 'Processing'}</div>
            <div className="mb-4">Items:</div>
            <ul className="mb-4">
              {selectedOrder.items && selectedOrder.items.map((item, i) => (
                <li key={i} className="mb-2 flex gap-2 items-center">
                  {item.image && <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded border" />}
                  <span>{item.name}</span> x{item.quantity || 1} — ₹{item.price}
                </li>
              ))}
            </ul>
            <div className="mb-4 font-bold">Total: ₹{selectedOrder.items ? selectedOrder.items.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0).toLocaleString('en-IN', { minimumFractionDigits: 2 }) : '0.00'}</div>
            <div className="flex justify-end gap-2">
              <button className="bg-gray-300 px-4 py-2 rounded" onClick={handleCloseModal}>Close</button>
            </div>
          </div>
        </div>
      )}
      <Toast message={toast.message} type={toast.type} onClose={handleCloseToast} />
    </div>
  );
};

export default AdminOrdersTable;
