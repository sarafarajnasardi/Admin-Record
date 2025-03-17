import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { ImageOff, Loader2, Edit, Trash2, Tag, Package, Search, RefreshCw } from 'lucide-react';
import { AdminContext } from '../../../../utils/admin_context';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import EditProduct from './edit_product';
import StockBadge from './stockbadge';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('title');
  const [sortOrder, setSortOrder] = useState('asc');
  const { admin } = useContext(AdminContext);
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`http://localhost:5000/api/admin/products/get`, {
        params: {
          adminId: admin?.id,
        },
      });
      setProducts(res.data.data || []);
    } catch (err) {
      console.error('Failed to fetch products:', err);
      setError('Failed to load products. Please try again.');
      toast.error('Failed to load products. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (admin?.id) {
      fetchProducts();
    }
  }, [admin?.id]);

  const deleteProduct = async (id) => {
    if (!id) return;
    
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const response = await axios.delete(`http://localhost:5000/api/admin/products/delete/${id}`);
        if (response.status === 200) {
          setProducts(products.filter(product => product._id !== id));
          toast.success('Product deleted successfully');
        }
      } catch (err) {
        console.error('Failed to delete product:', err);
        toast.error('Failed to delete product. Please try again.');
      }
    }
  };

  const handleProductUpdate = (updatedProduct) => {
    setProducts(products.map(product => 
      product._id === updatedProduct._id ? updatedProduct : product
    ));
  };

  const categories = [...new Set(products.map(product => product.category).filter(Boolean))];

  const filteredProducts = products
    .filter(product => 
      (product.title?.toLowerCase() || '').includes(searchTerm.toLowerCase()) &&
      (selectedCategory === '' || product.category === selectedCategory)
    )
    .sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'title') {
        comparison = (a.title || '').localeCompare(b.title || '');
      } else if (sortBy === 'price') {
        comparison = (a.price || 0) - (b.price || 0);
      } else if (sortBy === 'stock') {
        comparison = (a.totalStock || 0) - (b.totalStock || 0);
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const calculateDiscount = (price, salePrice) => {
    if (!price || !salePrice || Number(price) <= Number(salePrice)) return 0;
    return Math.round(((Number(price) - Number(salePrice)) / Number(price)) * 100);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Your Products</h2>
          <button
            onClick={fetchProducts}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [field, order] = e.target.value.split('-');
                  setSortBy(field);
                  setSortOrder(order);
                }}
                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="title-asc">Name (A-Z)</option>
                <option value="title-desc">Name (Z-A)</option>
                <option value="price-asc">Price (Low to High)</option>
                <option value="price-desc">Price (High to Low)</option>
                <option value="stock-asc">Stock (Low to High)</option>
                <option value="stock-desc">Stock (High to Low)</option>
              </select>
            </div>
          </div>
        </div>

        {error && <div className="text-red-500 text-center">{error}</div>}

        {loading ? (
          <div className="flex justify-center items-center h-64 bg-white rounded-lg shadow-md">
            <Loader2 className="animate-spin w-8 h-8 text-indigo-600" />
            <span className="ml-2 text-indigo-600 text-lg">Loading products...</span>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center bg-white rounded-lg shadow-md p-10">
            <ImageOff className="mx-auto mb-4 w-16 h-16 text-gray-400" />
            <p className="text-xl text-gray-500">No products found</p>
            <p className="text-gray-400 mt-2">Try changing your search or filter criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => {
              const discountPercentage = calculateDiscount(product.price, product.salePrice);
              
              return (
                <div
                  key={product._id}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 overflow-hidden"
                >
                  <div className="relative">
                    <img
                      src={product.image || 'https://via.placeholder.com/400x300.png?text=No+Image'}
                      alt={product.title}
                      className="w-full h-56 object-cover"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400x300.png?text=No+Image';
                      }}
                    />
                    {discountPercentage > 0 && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md font-semibold">
                        {discountPercentage}% OFF
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-gray-800 truncate">{product.title}</h3>
                      <div className="flex space-x-1">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingProduct(product);
                          }}
                          className="p-1 text-gray-500 hover:text-indigo-600 transition"
                          aria-label="Edit product"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteProduct(product._id);
                          }} 
                          className="p-1 text-gray-500 hover:text-red-600 transition"
                          aria-label="Delete product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex items-center mb-3">
                      <Tag className="w-4 h-4 text-gray-500 mr-1" />
                      <span className="text-sm text-gray-500">{product.category || 'Uncategorized'}</span>
                    </div>
                    
                    <div className="flex justify-between items-center mb-3">
                      <div>
                        {product.salePrice && Number(product.salePrice) < Number(product.price) ? (
                          <div className="flex items-center">
                            <span className="text-lg font-bold text-gray-800">₹{product.salePrice}</span>
                            <span className="ml-2 text-sm text-gray-500 line-through">₹{product.price}</span>
                          </div>
                        ) : (
                          <span className="text-lg font-bold text-gray-800">₹{product.price || 0}</span>
                        )}
                      </div>
                      <StockBadge stock={product.totalStock || 0} />
                    </div>
                    
                    <div className="flex items-center text-gray-600 text-sm">
                      <Package className="w-4 h-4 mr-1" />
                      <span>{product.totalStock || 0} in stock</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-6 text-center text-gray-500">
          Showing {filteredProducts.length} of {products.length} products
        </div>
      </div>
      {editingProduct && (
        <EditProduct 
          product={editingProduct} 
          onClose={() => setEditingProduct(null)} 
          onProductUpdated={handleProductUpdate}
        />
      )}
    </div>
  );
};

export default ProductList;