import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, XCircle, Package, Calendar, User, CreditCard, ShoppingBag } from 'lucide-react';

const OrderDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(`https://api.example.com/orders/${orderId}`);
        const data = await response.json();
        setOrder(data);
      } catch (error) {
        console.error('Error fetching order details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <XCircle className="w-16 h-16 text-red-500 mb-4" />
        <h3 className="text-xl font-semibold mb-2">Order Not Found</h3>
        <p className="text-gray-600 mb-4">We couldn't find the order you're looking for.</p>
        <Link to="/dashboard/orders" className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
          Return to Orders
        </Link>
      </div>
    );
  }

  // Helper function to get status styling
  const getStatusStyle = (status) => {
    switch (status) {
      case 'Delivered':
        return {
          bg: 'bg-green-100',
          text: 'text-green-700',
          icon: <CheckCircle className="inline mr-1" size={16} />
        };
      case 'Processing':
        return {
          bg: 'bg-blue-100',
          text: 'text-blue-700',
          icon: <Package className="inline mr-1" size={16} />
        };
      case 'Pending':
        return {
          bg: 'bg-yellow-100',
          text: 'text-yellow-700',
          icon: <Clock className="inline mr-1" size={16} />
        };
      default:
        return {
          bg: 'bg-red-100',
          text: 'text-red-700',
          icon: <XCircle className="inline mr-1" size={16} />
        };
    }
  };

  const statusStyle = getStatusStyle(order.status);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="p-4 md:p-6 max-w-6xl mx-auto"
    >
      <Link 
        to="/dashboard/orders" 
        className="inline-flex items-center text-gray-600 hover:text-primary transition-colors mb-6"
      >
        <ArrowLeft className="mr-2" size={18} />
        <span>Back to Orders</span>
      </Link>

      {/* Order Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Order #{order.id}</h1>
          <p className="text-gray-500 mt-1">Placed on {order.date}</p>
        </div>
        <div className={`${statusStyle.bg} ${statusStyle.text} px-4 py-2 rounded-full font-medium mt-4 md:mt-0 inline-flex items-center`}>
          {statusStyle.icon}
          {order.status}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Order Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Items */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-5 border-b border-gray-100 flex items-center">
              <ShoppingBag className="mr-3 text-primary" size={20} />
              <h2 className="text-lg font-semibold text-gray-900">Order Items</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Product</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Quantity</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Price</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {order.items.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded bg-gray-100 flex items-center justify-center mr-3">
                            {item.image ? (
                              <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded" />
                            ) : (
                              <Package size={16} className="text-gray-400" />
                            )}
                          </div>
                          <span className="font-medium text-gray-900">{item.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-700">{item.quantity}</td>
                      <td className="py-4 px-4 text-gray-700">${item.price.toFixed(2)}</td>
                      <td className="py-4 px-4 font-medium text-gray-900">${(item.quantity * item.price).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-gray-50">
                  <tr>
                    <td colSpan="3" className="py-4 px-4 text-right font-semibold text-gray-900">Total</td>
                    <td className="py-4 px-4 font-bold text-primary">${order.total.toFixed(2)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Payment Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-5 border-b border-gray-100 flex items-center">
              <CreditCard className="mr-3 text-primary" size={20} />
              <h2 className="text-lg font-semibold text-gray-900">Payment Information</h2>
            </div>
            <div className="p-5">
              <div className="flex flex-col md:flex-row justify-between">
                <div className="mb-4 md:mb-0">
                  <p className="text-sm text-gray-500 mb-1">Payment Method</p>
                  <p className="text-gray-900 font-medium">{order.payment.method}</p>
                </div>
                <div className="mb-4 md:mb-0">
                  <p className="text-sm text-gray-500 mb-1">Transaction ID</p>
                  <p className="text-gray-900 font-medium">{order.payment.transactionId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Status</p>
                  <p className="text-gray-900 font-medium">
                    {order.payment.status === 'Paid' ? (
                      <span className="inline-flex items-center px-2 py-1 rounded-full bg-green-100 text-green-700 text-sm">
                        <CheckCircle className="mr-1" size={14} />
                        Paid
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-1 rounded-full bg-red-100 text-red-700 text-sm">
                        <XCircle className="mr-1" size={14} />
                        Pending
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Customer and Shipping Sidebar */}
        <div className="space-y-6">
          {/* Customer Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-5 border-b border-gray-100 flex items-center">
              <User className="mr-3 text-primary" size={20} />
              <h2 className="text-lg font-semibold text-gray-900">Customer</h2>
            </div>
            <div className="p-5">
              <p className="font-medium text-gray-900 mb-1">{order.customer}</p>
              <p className="text-gray-700 mb-4">{order.email}</p>
              
              {order.phone && (
                <p className="text-gray-700">
                  <span className="font-medium">Phone:</span> {order.phone}
                </p>
              )}
            </div>
          </div>

          {/* Shipping Information */}
          {order.shipping && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-5 border-b border-gray-100 flex items-center">
                <Package className="mr-3 text-primary" size={20} />
                <h2 className="text-lg font-semibold text-gray-900">Shipping</h2>
              </div>
              <div className="p-5">
                <p className="font-medium text-gray-900 mb-3">Delivery Address</p>
                <address className="text-gray-700 not-italic mb-4">
                  {order.shipping.address.street}<br />
                  {order.shipping.address.city}, {order.shipping.address.state} {order.shipping.address.zip}<br />
                  {order.shipping.address.country}
                </address>
                
                {order.shipping.method && (
                  <div className="mb-3">
                    <p className="text-sm text-gray-500 mb-1">Shipping Method</p>
                    <p className="text-gray-900">{order.shipping.method}</p>
                  </div>
                )}
                
                {order.shipping.trackingNumber && (
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Tracking Number</p>
                    <a href="#" className="text-primary hover:underline font-medium">
                      {order.shipping.trackingNumber}
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Order Timeline */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-5 border-b border-gray-100 flex items-center">
              <Calendar className="mr-3 text-primary" size={20} />
              <h2 className="text-lg font-semibold text-gray-900">Order Timeline</h2>
            </div>
            <div className="p-5">
              <div className="space-y-4">
                {order.timeline && order.timeline.map((event, index) => (
                  <div key={index} className="flex">
                    <div className="mr-3 relative">
                      <div className={`w-4 h-4 rounded-full ${index === 0 ? 'bg-primary' : 'bg-gray-200'}`}></div>
                      {index !== order.timeline.length - 1 && (
                        <div className="absolute top-4 bottom-0 left-2 w-0.5 -ml-px bg-gray-200"></div>
                      )}
                    </div>
                    <div className="pb-4">
                      <p className="text-sm font-medium text-gray-900">{event.status}</p>
                      <p className="text-xs text-gray-500">{event.date} {event.time}</p>
                      {event.note && <p className="text-sm text-gray-700 mt-1">{event.note}</p>}
                    </div>
                  </div>
                ))}
                {!order.timeline && (
                  <div className="text-gray-500 text-sm">No timeline information available.</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-8 flex flex-wrap gap-4 justify-end">
        <button className="px-5 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors">
          Print Invoice
        </button>
        <button className="px-5 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors">
          Contact Support
        </button>
      </div>
    </motion.div>
  );
};

export default OrderDetails;