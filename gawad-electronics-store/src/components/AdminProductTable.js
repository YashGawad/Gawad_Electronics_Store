import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import AdminProductModal from './AdminProductModal';
import Toast from './Toast';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);


const AdminProductTable = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [toast, setToast] = useState({ message: '', type: 'success' });
  const [saving, setSaving] = useState(false);

  // Fetch products from Supabase
  const fetchProducts = async () => {
    setLoading(true);
    setError('');
    const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
    if (error) setError('Failed to fetch products.');
    else setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line
  }, []);

  // Add/Edit/Delete handlers
  const handleAdd = () => {
    setEditProduct(null);
    setModalOpen(true);
  };
  const handleEdit = (product) => {
    setEditProduct(product);
    setModalOpen(true);
  };
  const handleDelete = async (product) => {
    if (!window.confirm(`Are you sure you want to delete '${product.name}'?`)) return;
    setSaving(true);
    const { error } = await supabase.from('products').delete().eq('id', product.id);
    if (error) setToast({ message: 'Delete failed!', type: 'error' });
    else {
      setToast({ message: 'Product deleted!', type: 'success' });
      fetchProducts();
    }
    setSaving(false);
  };
  const handleSave = async (form) => {
    setSaving(true);
    if (editProduct) {
      // Edit
      const { error } = await supabase.from('products').update({
        name: form.name,
        category: form.category,
        price: form.price,
        image: form.image,
        description: form.description,
      }).eq('id', editProduct.id);
      if (error) setToast({ message: 'Update failed!', type: 'error' });
      else setToast({ message: 'Product updated!', type: 'success' });
    } else {
      // Add
      const { error } = await supabase.from('products').insert([
        {
          name: form.name,
          category: form.category,
          price: form.price,
          image: form.image,
          description: form.description,
        },
      ]);
      if (error) setToast({ message: 'Add failed!', type: 'error' });
      else setToast({ message: 'Product added!', type: 'success' });
    }
    setModalOpen(false);
    fetchProducts();
    setSaving(false);
  };
  const handleCloseToast = () => setToast({ message: '', type: 'success' });

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-between mb-4">
        <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded" onClick={handleAdd} disabled={saving}>+ Add Product</button>
      </div>
      {loading ? (
        <div className="text-center py-8">Loading products...</div>
      ) : error ? (
        <div className="text-center text-red-600 py-8">{error}</div>
      ) : (
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Image</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Category</th>
              <th className="py-2 px-4 border-b">Price</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td className="py-2 px-4 border-b text-xs">{product.id}</td>
                <td className="py-2 px-4 border-b">
                  {product.image ? <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded border" /> : <span className="text-gray-400">No Image</span>}
                </td>
                <td className="py-2 px-4 border-b">{product.name}</td>
                <td className="py-2 px-4 border-b">{product.category}</td>
                <td className="py-2 px-4 border-b">₹{typeof product.price === 'number' ? product.price.toLocaleString('en-IN', { minimumFractionDigits: 2 }) : product.price}</td>
                <td className="py-2 px-4 border-b">
                  <button className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded mr-2" onClick={() => handleEdit(product)} disabled={saving}>Edit</button>
                  <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded" onClick={() => handleDelete(product)} disabled={saving}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <AdminProductModal open={modalOpen} onClose={() => setModalOpen(false)} onSave={handleSave} product={editProduct} saving={saving} />
      <Toast message={toast.message} type={toast.type} onClose={handleCloseToast} />
    </div>
  );
};

export default AdminProductTable;
