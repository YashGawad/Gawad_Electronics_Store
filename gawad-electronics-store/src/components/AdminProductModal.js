import React, { useState, useEffect } from 'react';

const emptyProduct = {
  name: '',
  category: '',
  price: '',
  image: '',
  description: '',
};

const AdminProductModal = ({ open, onClose, onSave, product }) => {
  const [form, setForm] = useState(emptyProduct);

  useEffect(() => {
    if (product) setForm(product);
    else setForm(emptyProduct);
  }, [product, open]);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">{product ? 'Edit Product' : 'Add Product'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="w-full border p-2 rounded" required />
          <input name="category" value={form.category} onChange={handleChange} placeholder="Category" className="w-full border p-2 rounded" required />
          <input name="price" value={form.price} onChange={handleChange} placeholder="Price" className="w-full border p-2 rounded" required type="number" min="0" step="any" />
          <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL or path" className="w-full border p-2 rounded" />
          <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full border p-2 rounded" />
          <div className="flex gap-2 justify-end">
            <button type="button" className="bg-gray-300 px-4 py-2 rounded" onClick={onClose}>Cancel</button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminProductModal;
