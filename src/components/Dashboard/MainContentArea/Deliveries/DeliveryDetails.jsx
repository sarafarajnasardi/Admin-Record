import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Truck, 
  CheckCircle, 
  XCircle, 
  Clock, 
  MapPin, 
  Calendar, 
  Package, 
  DollarSign, 
  User, 
  Mail 
} from 'lucide-react';

const StatusBadge = ({ status }) => {
  const getStatusInfo = () => {
    switch(status) {
      case 'Delivered':
        return { 
          icon: <CheckCircle className="mr-1" size={16} />, 
          bgColor: 'bg-green-100', 
          textColor: 'text-green-700',
          borderColor: 'border-green-200'
        };
      case 'In Transit':
        return { 
          icon: <Truck className="mr-1" size={16} />, 
          bgColor: 'bg-blue-100', 
          textColor: 'text-blue-700',
          borderColor: 'border-blue-200'
        };
      case 'Processing':
        return { 
          icon: <Clock className="mr-1" size={16} />, 
          bgColor: 'bg-yellow-100', 
          textColor: 'text-yellow-700',
          borderColor: 'border-yellow-200'
        };
      default:
        return { 
          icon: <XCircle className="mr-1" size={16} />, 
          bgColor: 'bg-red-100', 
          textColor: 'text-red-700',
          borderColor: 'border-red-200'
        };
    }
  };

  const { icon, bgColor, textColor, borderColor } = getStatusInfo();

  return (
    <span className={`flex items-center ${textColor} ${bgColor} ${borderColor} border px-3 py-1 rounded-full text-sm font-medium`}>
      {icon}
      {status}
    </span>
  );
};

const DeliveryDetails = () => {
  const { deliveryId } = useParams();
  const [delivery, setDelivery] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simulate fetching delivery details from an API
  useEffect(() => {
    const fetchDeliveryDetails = async () => {
      try {
        // Replace with your API call
        const response = await fetch(`https://api.example.com/deliveries/${deliveryId}`);
        const data = await response.json();
        setDelivery(data);
      } catch (error) {
        console.error('Error fetching delivery details:', error);
      } finally {
        setLoading(false);
      }
    };

    // Simulate API call with timeout
    setTimeout(() => {
      setDelivery({
        id: "DEL-1234567",
        customer: "John Doe",
        email: "john.doe@example.com",
        date: "March 15, 2025",
        status: "In Transit",
        address: "123 Main Street, Apt 4B, New York, NY 10001",
        orderId: "ORD-7654321",
        orderDate: "March 10, 2025",
        items: [
          { id: 1, name: "Handcrafted Vase", price: 89.99 },
          { id: 2, name: "Wooden Bowl", price: 59.99 }
        ],
        amount: 149.98,
        estimatedDelivery: "March 18, 2025",
        trackingNumber: "TRK-9876543210"
      });
      setLoading(false);
    }, 1000);
  }, [deliveryId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!delivery) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <XCircle className="mx-auto text-red-500 mb-4" size={48} />
        <h3 className="text-xl font-semibold text-gray-800">Delivery Not Found</h3>
        <p className="text-gray-600 mt-2">The delivery information you're looking for couldn't be found.</p>
        <Link to="/dashboard/deliveries" className="mt-6 inline-block px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
          Return to Deliveries
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="p-6 max-w-6xl mx-auto"
    >
      <div className="flex items-center justify-between mb-6">
        <Link to="/dashboard/deliveries" className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors">
          <ArrowLeft className="mr-2" size={20} />
          <span>Back to Deliveries</span>
        </Link>
        <StatusBadge status={delivery.status} />
      </div>

      <h2 className="text-3xl font-bold text-gray-800 mb-8">Delivery #{delivery.id}</h2>

      {/* Delivery Progress Tracker */}
      <div className="mb-8 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold mb-6 text-gray-800 flex items-center">
          <Truck className="mr-2 text-indigo-600" size={20} />
          Shipment Progress
        </h3>
        
        <div className="relative">
          <div className="absolute top-0 left-0 ml-5 h-full border-l-2 border-gray-200"></div>
          
          <div className="mb-8 relative">
            <div className="flex items-start">
              <div className="flex items-center justify-center bg-green-500 rounded-full h-10 w-10 text-white z-10">
                <CheckCircle size={20} />
              </div>
              <div className="ml-4">
                <h4 className="text-md font-medium text-gray-800">Order Confirmed</h4>
                <p className="text-sm text-gray-600">{delivery.orderDate}</p>
                <p className="text-sm text-gray-500 mt-1">Your order has been confirmed and processed</p>
              </div>
            </div>
          </div>
          
          <div className="mb-8 relative">
            <div className="flex items-start">
              <div className={`flex items-center justify-center ${delivery.status === "In Transit" || delivery.status === "Delivered" ? "bg-blue-500" : "bg-gray-300"} rounded-full h-10 w-10 text-white z-10`}>
                <Package size={20} />
              </div>
              <div className="ml-4">
                <h4 className="text-md font-medium text-gray-800">Package Prepared</h4>
                <p className="text-sm text-gray-600">March 12, 2025</p>
                <p className="text-sm text-gray-500 mt-1">Your package has been prepared and packaged</p>
              </div>
            </div>
          </div>
          
          <div className="mb-8 relative">
            <div className="flex items-start">
              <div className={`flex items-center justify-center ${delivery.status === "In Transit" ? "bg-blue-500" : "bg-gray-300"} rounded-full h-10 w-10 text-white z-10`}>
                <Truck size={20} />
              </div>
              <div className="ml-4">
                <h4 className="text-md font-medium text-gray-800">In Transit</h4>
                <p className="text-sm text-gray-600">March 15, 2025</p>
                <p className="text-sm text-gray-500 mt-1">Your package is on its way</p>
                {delivery.status === "In Transit" && (
                  <div className="mt-2 text-sm">
                    <span className="font-medium">Tracking: </span>
                    <a href="#" className="text-indigo-600 hover:underline">{delivery.trackingNumber}</a>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="flex items-start">
              <div className={`flex items-center justify-center ${delivery.status === "Delivered" ? "bg-green-500" : "bg-gray-300"} rounded-full h-10 w-10 text-white z-10`}>
                <CheckCircle size={20} />
              </div>
              <div className="ml-4">
                <h4 className="text-md font-medium text-gray-800">Delivered</h4>
                <p className="text-sm text-gray-600">Expected: {delivery.estimatedDelivery}</p>
                <p className="text-sm text-gray-500 mt-1">Estimated delivery time</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customer Information */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
            <User className="mr-2 text-indigo-600" size={20} />
            Customer Information
          </h3>
          
          <div className="space-y-3">
            <div className="flex items-start">
              <span className="text-gray-500 min-w-24">Name:</span>
              <span className="text-gray-800 font-medium">{delivery.customer}</span>
            </div>
            <div className="flex items-start">
              <span className="text-gray-500 min-w-24">Email:</span>
              <span className="text-gray-800">{delivery.email}</span>
            </div>
            <div className="flex items-start">
              <span className="text-gray-500 min-w-24">Order ID:</span>
              <Link to={`/dashboard/orders/${delivery.orderId}`} className="text-indigo-600 hover:underline">
                {delivery.orderId}
              </Link>
            </div>
            <div className="flex items-start">
              <span className="text-gray-500 min-w-24">Order Date:</span>
              <span className="text-gray-800">{delivery.orderDate}</span>
            </div>
          </div>
        </div>

        {/* Delivery Information */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
            <MapPin className="mr-2 text-indigo-600" size={20} />
            Delivery Information
          </h3>
          
          <div className="space-y-3">
            <div className="flex items-start">
              <span className="text-gray-500 min-w-24">Status:</span>
              <StatusBadge status={delivery.status} />
            </div>
            <div className="flex items-start">
              <span className="text-gray-500 min-w-24">Ship Date:</span>
              <span className="text-gray-800">{delivery.date}</span>
            </div>
            <div className="flex items-start">
              <span className="text-gray-500 min-w-24">Expected:</span>
              <span className="text-gray-800">{delivery.estimatedDelivery}</span>
            </div>
            <div className="flex items-start">
              <span className="text-gray-500 min-w-24">Tracking:</span>
              <a href="#" className="text-indigo-600 hover:underline">{delivery.trackingNumber}</a>
            </div>
          </div>
        </div>

        {/* Address Information */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
            <MapPin className="mr-2 text-indigo-600" size={20} />
            Shipping Address
          </h3>
          
          <p className="text-gray-800 whitespace-pre-line">{delivery.address}</p>
          
          <div className="mt-4">
            <a href={`https://maps.google.com/?q=${encodeURIComponent(delivery.address)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-700">
              <MapPin size={16} className="mr-1" />
              View on map
            </a>
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="mt-6 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
          <Package className="mr-2 text-indigo-600" size={20} />
          Order Items
        </h3>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Item
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {delivery.items.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-800">
                    ${item.price.toFixed(2)}
                  </td>
                </tr>
              ))}
              <tr className="bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                  Total
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-right text-gray-800">
                  ${delivery.amount.toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex justify-end space-x-4">
        <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors">
          Print Details
        </button>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
          Contact Customer
        </button>
      </div>
    </motion.div>
  );
};

export default DeliveryDetails;