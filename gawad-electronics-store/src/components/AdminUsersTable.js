import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import Toast from './Toast';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const AdminUsersTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [toast, setToast] = useState({ message: '', type: 'success' });

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError('');
      const { data, error } = await supabase.from('profiles').select('*').order('created_at', { ascending: false });
      if (error) setError('Failed to fetch users.');
      else setUsers(data);
      setLoading(false);
    };
    fetchUsers();
  }, []);

  const handleRoleChange = async (user, role) => {
    const { error } = await supabase.from('profiles').update({ role }).eq('id', user.id);
    if (error) setToast({ message: 'Failed to update role', type: 'error' });
    else setToast({ message: 'User role updated', type: 'success' });
  };
  const handleStatusChange = async (user, active) => {
    const { error } = await supabase.from('profiles').update({ active }).eq('id', user.id);
    if (error) setToast({ message: 'Failed to update status', type: 'error' });
    else setToast({ message: 'User status updated', type: 'success' });
  };
  const handleCloseToast = () => setToast({ message: '', type: 'success' });

  return (
    <div>
      <div className="overflow-x-auto">
        <h2 className="text-xl font-bold mb-4">Users</h2>
        {loading ? (
          <div className="text-center py-8">Loading users...</div>
        ) : error ? (
          <div className="text-center text-red-600 py-8">{error}</div>
        ) : users.length === 0 ? (
          <div className="text-center py-8 text-gray-500">No users found.</div>
        ) : (
          <table className="min-w-full bg-white border border-gray-200 mb-4">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Role</th>
                <th className="py-2 px-4 border-b">Status</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="py-2 px-4 border-b">{user.id}</td>
                  <td className="py-2 px-4 border-b">{user.name}</td>
                  <td className="py-2 px-4 border-b">{user.email}</td>
                  <td className="py-2 px-4 border-b">{user.role}</td>
                  <td className="py-2 px-4 border-b">
                    {user.active ? <span className="text-green-600 font-semibold">Active</span> : <span className="text-red-600 font-semibold">Inactive</span>}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded mr-2" onClick={() => handleRoleChange(user, 'admin')}>Change Role</button>
                    <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded" onClick={() => handleStatusChange(user, !user.active)}>{user.active ? 'Deactivate' : 'Activate'}</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <Toast message={toast.message} type={toast.type} onClose={handleCloseToast} />
    </div>
  );
};

export default AdminUsersTable;
