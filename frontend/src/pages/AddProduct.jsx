import React, { useState } from 'react';
import './AddProduct.css';

function AddProduct() {
  const [form, setForm] = useState({
    name: '', description: '', price: '', category: ''
  });
  const [imageFile, setImageFile] = useState(null);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = e => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    for (let key in form) formData.append(key, form[key]);
    if (imageFile) formData.append('image', imageFile);

    try {
      const res = await fetch('http://localhost:5000/api/admin/products', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      alert(data.name ? '✅ Product added successfully!' : '❌ Error adding product.');
    } catch (err) {
      console.error(err);
      alert('❌ Upload failed');
    }
  };

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <h2>Add New Product</h2>
      <div className="form-group">
        <label>Name</label>
        <input name="name" value={form.name} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Description</label>
        <textarea name="description" value={form.description} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Price (₹)</label>
        <input name="price" type="number" value={form.price} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Category</label>
        <input name="category" value={form.category} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Product Image</label>
        <input type="file" accept="image/*" onChange={handleImageChange} required />
      </div>
      <button type="submit" className="submit-btn">Add Product</button>
    </form>
  );
}

export default AddProduct;