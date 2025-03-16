import React, { useState, useContext } from 'react';
import { AdminContext } from '../../../../utils/admin_context';
import axios from 'axios';
import { Save, X, Upload, Plus } from 'lucide-react';

const AddProduct = () => {
  const { admin } = useContext(AdminContext);

  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    salePrice: '',
    totalStock: '',
    averageReview: '',
  });

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [categories] = useState([
    'Jewelry', 'Pottery', 'Textiles', 'Woodwork', 'Painting'
  ]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleImageUpload = async () => {
    if (!file) throw new Error('No image selected');
    const formData = new FormData();
    formData.append('image', file);
    const res = await axios.post('http://localhost:5000/api/admin/products/upload-image', formData);
    if (res.data.success) {
      return res.data.result.secure_url;
    }
    throw new Error('Image upload failed');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError('');

    try {
      const imageUrl = await handleImageUpload();
    console.log(admin._id);
      const productData = {
        ...form,
        price: parseFloat(form.price),
        salePrice: parseFloat(form.salePrice),
        totalStock: parseInt(form.totalStock),
        averageReview: parseFloat(form.averageReview),
        image: imageUrl,
        adminId: admin.id,
      };

      const res = await axios.post('http://localhost:5000/api/admin/products/add', productData);
      if (res.status === 201) {
        setSuccess(true);
        setForm({
          title: '',
          description: '',
          category: '',
          price: '',
          salePrice: '',
          totalStock: '',
          averageReview: '',
        });
        setFile(null);
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong.');
    }
    setLoading(false);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold">Add New Product</h2>
        <span className="text-sm text-gray-500">Admin: {admin.userName}</span>
      </div>

      {success && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md flex items-center">
          <Save size={18} className="mr-2" />
          Product added successfully!
        </div>
      )}

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md flex items-center">
          <X size={18} className="mr-2" />
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-2">
            <label className="block mb-1 text-sm font-medium text-gray-700">Title</label>
            <input type="text" name="title" value={form.title} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded-md" />
          </div>

          <div className="col-span-2">
            <label className="block mb-1 text-sm font-medium text-gray-700">Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows="3" required className="w-full p-2 border border-gray-300 rounded-md" />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Price</label>
            <input type="number" name="price" value={form.price} onChange={handleChange} step="0.01" required className="w-full p-2 border border-gray-300 rounded-md" />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Sale Price</label>
            <input type="number" name="salePrice" value={form.salePrice} onChange={handleChange} step="0.01" required className="w-full p-2 border border-gray-300 rounded-md" />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Category</label>
            <select name="category" value={form.category} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded-md">
              <option value="">Select a category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Total Stock</label>
            <input type="number" name="totalStock" value={form.totalStock} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded-md" />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Average Review</label>
            <input type="number" name="averageReview" value={form.averageReview} onChange={handleChange} step="0.1" max="5" min="0" required className="w-full p-2 border border-gray-300 rounded-md" />
          </div>

          <div className="col-span-2">
            <label className="block mb-1 text-sm font-medium text-gray-700">Upload Image</label>
            <label className="flex items-center cursor-pointer text-indigo-600 border border-gray-300 p-2 rounded-md hover:bg-gray-50">
              <Upload size={18} className="mr-2" />
              Select Image
              <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
            </label>
            {file && <p className="mt-2 text-sm text-gray-700">{file.name}</p>}
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button type="submit" disabled={loading} className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4z" />
                </svg>
                Uploading...
              </>
            ) : (
              <>
                <Plus size={18} className="mr-2" />
                Add Product
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
