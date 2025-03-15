import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  CreditCard, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Receipt, 
  ShoppingBag,
  Calendar,
  DollarSign,
  User,
  FileText,
  Download,
  AlertCircle
} from 'lucide-react';

const PaymentDetails = () => {
  const { paymentId } = useParams();
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        const response = await fetch(`https://api.example.com/payments/${paymentId}`);
        const data = await response.json();
        setPayment(data);
      } catch (error) {
        console.error('Error fetching payment details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentDetails();
  }, [paymentId]);

  // Helper function to get status styling
  const getStatusStyle = (status) => {
    switch (status) {
      case 'Paid':
        return {
          bg: 'bg-green-100',
          text: 'text-green-700',
          icon: <CheckCircle size={16} />
        };
      case 'Pending':
        return {
          bg: 'bg-yellow-100',
          text: 'text-yellow-700',
          icon: <Clock size={16} />
        };
      case 'Failed':
        return {
          bg: 'bg-red-100',
          text: 'text-red-700',
          icon: <XCircle size={16} />
        };
      default:
        return {
          bg: 'bg-gray-100',
          text: 'text-gray-700',
          icon: <AlertCircle size={16} />
        };
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600">Loading payment details...</p>
        </div>
      </div>
    );
  }

  if (!payment) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <XCircle className="w-16 h-16 text-red-500 mb-4" />
        <h3 className="text-xl font-semibold mb-2">Payment Not Found</h3>
        <p className="text-gray-600 mb-4">We couldn't find the payment information you're looking for.</p>
        <Link to="/dashboard/payments" className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
          Return to Payments
        </Link>
      </div>
    );
  }

  const statusStyle = getStatusStyle(payment.status);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="p-4 md:p-6 max-w-6xl mx-auto"
    >
      <Link 
        to="/dashboard/payments" 
        className="inline-flex items-center text-gray-600 hover:text-primary transition-colors mb-6"
      >
        <ArrowLeft className="mr-2" size={18} />
        <span>Back to Payments</span>
      </Link>

      {/* Payment Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-primary/10 mr-4">
              <Receipt className="text-primary" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Payment #{payment.id}</h1>
              <p className="text-gray-500 mt-1">Processed on {payment.date}</p>
            </div>
          </div>
          <div className={`${statusStyle.bg} ${statusStyle.text} px-4 py-2 rounded-full font-medium mt-4 md:mt-0 inline-flex items-center self-start md:self-auto`}>
            {statusStyle.icon}
            <span className="ml-1">{payment.status}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Payment Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Payment Details Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-5 border-b border-gray-100 flex items-center">
              <DollarSign className="mr-3 text-primary" size={20} />
              <h2 className="text-lg font-semibold text-gray-900">Payment Details</h2>
            </div>
            <div className="p-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Amount</p>
                  <p className="text-xl font-semibold text-gray-900">${payment.amount.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Payment Date</p>
                  <p className="font-medium text-gray-900">{payment.date}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Transaction ID</p>
                  <p className="font-medium text-gray-900 break-all">{payment.transactionId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Payment Method</p>
                  <div className="flex items-center">
                    <CreditCard className="text-gray-400 mr-2" size={16} />
                    <p className="font-medium text-gray-900">{payment.method}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Details Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-5 border-b border-gray-100 flex items-center">
              <ShoppingBag className="mr-3 text-primary" size={20} />
              <h2 className="text-lg font-semibold text-gray-900">Order Information</h2>
            </div>
            <div className="p-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 mb-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Order ID</p>
                  <Link to={`/dashboard/orders/${payment.orderId}`} className="font-medium text-primary hover:underline">
                    #{payment.orderId}
                  </Link>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Order Date</p>
                  <p className="font-medium text-gray-900">{payment.orderDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Total Items</p>
                  <p className="font-medium text-gray-900">{payment.items ? payment.items.length : 0}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Total Amount</p>
                  <p className="font-medium text-gray-900">${payment.amount.toFixed(2)}</p>
                </div>
              </div>
              
              {payment.items && payment.items.length > 0 && (
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Items in this order</h3>
                  <div className="bg-gray-50 rounded-lg p-4 max-h-64 overflow-y-auto">
                    <ul className="divide-y divide-gray-200">
                      {payment.items.map((item, index) => (
                        <li key={index} className="py-3 flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded bg-gray-200 flex items-center justify-center mr-3">
                              {item.image ? (
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded" />
                              ) : (
                                <ShoppingBag size={16} className="text-gray-400" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{item.name}</p>
                              <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                            </div>
                          </div>
                          <p className="font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Payment Timeline */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-5 border-b border-gray-100 flex items-center">
              <Calendar className="mr-3 text-primary" size={20} />
              <h2 className="text-lg font-semibold text-gray-900">Payment Timeline</h2>
            </div>
            <div className="p-5">
              {payment.timeline ? (
                <div className="space-y-4">
                  {payment.timeline.map((event, index) => (
                    <div key={index} className="flex">
                      <div className="mr-3 relative">
                        <div className={`w-4 h-4 rounded-full ${index === 0 ? 'bg-primary' : 'bg-gray-200'}`}></div>
                        {index !== payment.timeline.length - 1 && (
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
                </div>
              ) : (
                <div className="flex items-center justify-center py-6 text-gray-500">
                  <p>No timeline information available</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Customer Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-5 border-b border-gray-100 flex items-center">
              <User className="mr-3 text-primary" size={20} />
              <h2 className="text-lg font-semibold text-gray-900">Customer</h2>
            </div>
            <div className="p-5">
              <p className="font-medium text-gray-900 mb-1">{payment.customer}</p>
              <p className="text-gray-700">{payment.email}</p>
              
              {payment.phone && (
                <p className="text-gray-700 mt-2">
                  <span className="font-medium">Phone:</span> {payment.phone}
                </p>
              )}
              
              {payment.customerId && (
                <Link 
                  to={`/dashboard/customers/${payment.customerId}`}
                  className="mt-4 inline-flex items-center text-primary hover:underline text-sm font-medium"
                >
                  View customer profile
                  <ArrowLeft className="ml-1 rotate-180" size={14} />
                </Link>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-5 border-b border-gray-100 flex items-center">
              <FileText className="mr-3 text-primary" size={20} />
              <h2 className="text-lg font-semibold text-gray-900">Actions</h2>
            </div>
            <div className="p-5">
              <div className="space-y-3">
                <button className="w-full flex items-center justify-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors">
                  <Download className="mr-2" size={16} />
                  Download Receipt
                </button>
                
                <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
                  <AlertCircle className="mr-2" size={16} />
                  Report Issue
                </button>
                
                {payment.status === 'Pending' && (
                  <button className="w-full flex items-center justify-center px-4 py-2 border border-primary text-primary rounded-md hover:bg-primary/5 transition-colors">
                    <CreditCard className="mr-2" size={16} />
                    Complete Payment
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Payment Notes */}
          {payment.notes && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-5 border-b border-gray-100 flex items-center">
                <FileText className="mr-3 text-primary" size={20} />
                <h2 className="text-lg font-semibold text-gray-900">Notes</h2>
              </div>
              <div className="p-5">
                <p className="text-gray-700">{payment.notes}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default PaymentDetails;