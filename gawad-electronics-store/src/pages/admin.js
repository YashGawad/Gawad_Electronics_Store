import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import AdminProductTable from '../components/AdminProductTable';
import AdminOrdersTable from '../components/AdminOrdersTable';
import AdminUsersTable from '../components/AdminUsersTable';
import AdminDashboard from '../components/AdminDashboard';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

console.log('DEBUG AdminDashboard:', AdminDashboard);
console.log('DEBUG AdminProductTable:', AdminProductTable);
console.log('DEBUG AdminOrdersTable:', AdminOrdersTable);
console.log('DEBUG AdminUsersTable:', AdminUsersTable);

export default function AdminPage() {
  const [user, setUser] = useState(null);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
      setLoading(false);
    };
    getUser();
  }, []);

  if (loading) return <div className="container mx-auto p-8">Loading...</div>;
  if (!user) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
        <p className="text-red-600">You must be logged in to access the admin panel.</p>
      </div>
    );
  }

  const sections = [
    { key: 'dashboard', label: 'Dashboard' },
    { key: 'products', label: 'Products' },
    { key: 'orders', label: 'Orders' },
    { key: 'users', label: 'Users' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Admin Panel</h1>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Navigation */}
          <nav className="md:w-1/4 mb-8 md:mb-0">
            <ul className="space-y-4">
              {sections.map(sec => (
                <li key={sec.key}>
                  <button
                    className={`w-full text-left px-4 py-2 rounded-lg font-semibold transition-colors duration-150 ${activeSection === sec.key ? 'bg-blue-500 text-white' : 'bg-white text-blue-900 hover:bg-blue-100'}`}
                    onClick={() => setActiveSection(sec.key)}
                  >
                    {sec.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          {/* Main Content */}
          <main className="flex-1 bg-white rounded-lg shadow-md p-6 min-h-[400px]">
            {activeSection === 'dashboard' && (
              <div>
                <AdminDashboard />
              </div>
            )}
            {activeSection === 'products' && (
              <div>
                <h2 className="text-xl font-bold mb-4">Product Management</h2>
                <AdminProductTable />
              </div>
            )}
            {activeSection === 'orders' && (
              <div>
                <h2 className="text-xl font-bold mb-4">Order Management</h2>
                <AdminOrdersTable />
              </div>
            )}
            {activeSection === 'users' && (
              <div>
                <h2 className="text-xl font-bold mb-4">User Management</h2>
                <AdminUsersTable />
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}