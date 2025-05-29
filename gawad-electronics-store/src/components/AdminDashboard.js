import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const AdminDashboard = () => {
  const [counts, setCounts] = useState({ products: 0, orders: 0, users: 0 });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboard = async () => {
      setLoading(true);
      setError('');
      // Fetch counts
      const [{ count: productsCount }, { count: ordersCount }, { count: usersCount }] = await Promise.all([
        supabase.from('products').select('*', { count: 'exact', head: true }),
        supabase.from('orders').select('*', { count: 'exact', head: true }),
        supabase.from('profiles').select('*', { count: 'exact', head: true })
      ]);
      // Fetch recent orders
      const { data: orders, error: ordersError } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);
      if (ordersError) setError('Failed to fetch recent orders.');
      setCounts({ products: productsCount || 0, orders: ordersCount || 0, users: usersCount || 0 });
      setRecentOrders(orders || []);
      setLoading(false);
    };
    fetchDashboard();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Admin Dashboard</h2>
      {loading ? (
        <div className="text-center py-8">Loading dashboard...</div>
      ) : error ? (
        <div className="text-center text-red-600 py-8">{error}</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-100 rounded-lg p-4 shadow">
              <div className="text-2xl font-bold text-blue-800">{counts.products}</div>
              <div className="text-blue-700">Products</div>
            </div>
            <div className="bg-green-100 rounded-lg p-4 shadow">
              <div className="text-2xl font-bold text-green-800">{counts.orders}</div>
              <div className="text-green-700">Orders</div>
            </div>
            <div className="bg-yellow-100 rounded-lg p-4 shadow">
              <div className="text-2xl font-bold text-yellow-800">{counts.users}</div>
              <div className="text-yellow-700">Users</div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-lg font-bold mb-2">Recent Orders</h3>
            {recentOrders.length === 0 ? (
              <div className="text-gray-500">No recent orders.</div>
            ) : (
              <table className="min-w-full bg-white border border-gray-200 mb-2">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">Order ID</th>
                    <th className="py-2 px-4 border-b">User</th>
                    <th className="py-2 px-4 border-b">Status</th>
                    <th className="py-2 px-4 border-b">Total</th>
                    <th className="py-2 px-4 border-b">Created</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map(order => (
                    <tr key={order.id}>
                      <td className="py-2 px-4 border-b text-xs">{order.id}</td>
                      <td className="py-2 px-4 border-b">{order.user_id}</td>
                      <td className="py-2 px-4 border-b">{order.status}</td>
                      <td className="py-2 px-4 border-b">₹{order.total?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                      <td className="py-2 px-4 border-b">{order.created_at && new Date(order.created_at).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}
    </div>
  );
};
export default AdminDashboard;
