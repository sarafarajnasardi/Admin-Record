import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import EditProduct from "./edit_product";
import {
  ArrowLeft,
  Tag,
  Package,
  ShoppingCart,
  Edit,
  Trash2,
  Loader2,
  Star,
  Calendar,
  Share2,
} from "lucide-react";
import { toast } from "react-hot-toast";
import EditProduct from "./EditProduct";

const ProductDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [product, setProduct] = useState({});
  const prod = location.state?.product;

  useEffect(() => {
    if (prod) {
      setProduct(prod);
      setLoading(false);
    }
  }, [prod]);

  const handleProductUpdate = (updatedProduct) => {
    setProduct(updatedProduct);
    toast.success("Product updated successfully");
  };

  const handleDelete = async () => {
    if (!product?._id) return;

    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await axios.delete(
          `http://localhost:5000/api/admin/products/delete/${product._id}`
        );
        if (response.status === 200) {
          toast.success("Product deleted successfully");
          navigate("/admin/products"); // Navigate back to products list
        }
      } catch (err) {
        console.error("Failed to delete product:", err);
        toast.error("Failed to delete product");
      }
    }
  };

  const calculateDiscount = (price, salePrice) => {
    if (!price || !salePrice || Number(price) <= Number(salePrice)) return 0;
    return Math.round(
      ((Number(price) - Number(salePrice)) / Number(price)) * 100
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <Loader2 className="animate-spin w-8 h-8 text-indigo-600" />
        <span className="ml-2 text-indigo-600 text-lg">
          Loading product details...
        </span>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <p className="text-2xl text-gray-500 mb-4">Product not found</p>
        <button
          onClick={() => navigate("/admin/products")}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
        >
          Back to Products
        </button>
      </div>
    );
  }

  const discountPercentage = calculateDiscount(
    product.price,
    product.salePrice
  );

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Navigation and Actions */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => navigate("/admin/products")}
            className="flex items-center text-gray-600 hover:text-indigo-600 transition"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Products
          </button>

          <div className="flex space-x-2">
            <button
              onClick={() => setEditingProduct(true)}
              className="flex items-center px-4 py-2 border border-indigo-600 text-indigo-600 rounded-md hover:bg-indigo-50 transition"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Product
            </button>
            <button
              onClick={handleDelete}
              className="flex items-center px-4 py-2 border border-red-600 text-red-600 rounded-md hover:bg-red-50 transition"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </button>
          </div>
        </div>

        {/* Product Details */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="border rounded-lg overflow-hidden h-96">
                <img
                  src={
                    selectedImage ||
                    "https://via.placeholder.com/600x600.png?text=No+Image"
                  }
                  alt={product.title}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/600x600.png?text=No+Image";
                  }}
                />
              </div>

              {/* Additional images would go here if we had them */}
              <div className="flex space-x-2 overflow-x-auto py-2">
                {product.image && (
                  <div
                    className={`border rounded-md h-16 w-16 cursor-pointer ${
                      selectedImage === product.image ? "border-indigo-600" : ""
                    }`}
                    onClick={() => setSelectedImage(product.image)}
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/150x150.png?text=Error";
                      }}
                    />
                  </div>
                )}
                {/* If there were additional images, they would be listed here */}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  {product.title}
                </h1>
                <div className="flex items-center mt-2">
                  <Tag className="w-4 h-4 text-gray-500 mr-1" />
                  <span className="text-gray-500">
                    {product.category || "Uncategorized"}
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-5 h-5 ${
                        star <= (product.rating || 0)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-500">
                  ({product.reviewCount || 0} reviews)
                </span>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    {discountPercentage > 0 ? (
                      <div className="space-y-1">
                        <div className="flex items-center">
                          <span className="text-2xl font-bold text-gray-800">
                            ₹{product.salePrice}
                          </span>
                          <span className="ml-2 text-sm text-gray-500 line-through">
                            ₹{product.price}
                          </span>
                        </div>
                        <div className="text-green-600 text-sm font-medium">
                          You save: ₹
                          {(product.price - product.salePrice).toFixed(2)} (
                          {discountPercentage}%)
                        </div>
                      </div>
                    ) : (
                      <span className="text-2xl font-bold text-gray-800">
                        ₹{product.price}
                      </span>
                    )}
                  </div>

                  <div className="px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm">
                    {product.totalStock > 0 ? "In Stock" : "Out of Stock"}
                  </div>
                </div>
              </div>

              <div className="flex items-center text-sm text-gray-500">
                <Package className="w-4 h-4 mr-2" />
                {product.totalStock} items available
              </div>

              {product.description && (
                <div className="border-t pt-4">
                  <h2 className="text-lg font-semibold mb-2">Description</h2>
                  <p className="text-gray-600 whitespace-pre-line">
                    {product.description}
                  </p>
                </div>
              )}

              <div className="border-t pt-4 flex space-x-3">
                {product.createdAt && (
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-1" />
                    Added: {new Date(product.createdAt).toLocaleDateString()}
                  </div>
                )}
                <div className="flex items-center text-sm text-gray-500">
                  <Share2 className="w-4 h-4 mr-1" />
                  Share Product
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products would go here */}
      </div>

      {/* Edit Modal */}
      {editingProduct && (
        <EditProduct
          product={product}
          onClose={() => setEditingProduct(false)}
          onProductUpdated={handleProductUpdate}
        />
      )}
    </div>
  );
};

export default ProductDetails;
