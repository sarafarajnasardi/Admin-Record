import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Truck, CheckCircle, Clock, XCircle, Search, Filter, ArrowUpDown, Package } from 'lucide-react';

const DeliveriesList = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });

  // Simulate fetching deliveries from an API
  useEffect(() => {
    const fetchDeliveries = async () => {
      try {
        // For demonstration, using setTimeout with mock data
        // Replace with your actual API call
        setTimeout(() => {
          const mockData = [
            { id: 'DEL-9874', customer: 'Rahul Sharma', date: '2025-03-12', status: 'Delivered', location: 'Mumbai', items: 3 },
            { id: 'DEL-8765', customer: 'Priya Singh', date: '2025-03-10', status: 'In Transit', location: 'Delhi', items: 2 },
            { id: 'DEL-7654', customer: 'Amit Kumar', date: '2025-03-08', status: 'Processing', location: 'Bangalore', items: 1 },
            { id: 'DEL-6543', customer: 'Neha Gupta', date: '2025-03-05', status: 'Delivered', location: 'Kolkata', items: 4 },
            { id: 'DEL-5432', customer: 'Vikram Patel', date: '2025-03-02', status: 'Failed', location: 'Chennai', items: 2 },
          ];
          setDeliveries(mockData);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching deliveries:', error);
        setLoading(false);
      }
    };

    fetchDeliveries();
  }, []);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedDeliveries = [...deliveries].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const filteredDeliveries = sortedDeliveries.filter(delivery => {
    const matchesSearch = 
      delivery.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || delivery.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Delivered':
        return <CheckCircle className="inline mr-1" size={16} />;
      case 'In Transit':
        return <Clock className="inline mr-1" size={16} />;
      case 'Processing':
        return <Package className="inline mr-1" size={16} />;
      default:
        return <XCircle className="inline mr-1" size={16} />;
    }
  };

  const getStatusClass = (status) => {
    switch(status) {
      case 'Delivered':
        return 'bg-green-100 text-green-700';
      case 'In Transit':
        return 'bg-yellow-100 text-yellow-700';
      case 'Processing':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-red-100 text-red-700';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-6"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Deliveries</h2>
        <Link 
          to="/dashboard/deliveries/new"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <Truck className="mr-2" size={18} />
          New Delivery
        </Link>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search by ID, customer or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center">
            <Filter size={18} className="text-gray-400 mr-2" />
            <select
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="Delivered">Delivered</option>
              <option value="In Transit">In Transit</option>
              <option value="Processing">Processing</option>
              <option value="Failed">Failed</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-500">Loading deliveries...</p>
          </div>
        ) : filteredDeliveries.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-gray-500">
            <Package size={64} className="text-gray-300 mb-4" />
            <p className="text-xl font-medium mb-2">No deliveries found</p>
            <p>Try adjusting your search or filter to find what you're looking for.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th 
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('id')}
                  >
                    <div className="flex items-center">
                      Delivery ID
                      <ArrowUpDown size={14} className="ml-1" />
                    </div>
                  </th>
                  <th 
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('customer')}
                  >
                    <div className="flex items-center">
                      Customer
                      <ArrowUpDown size={14} className="ml-1" />
                    </div>
                  </th>
                  <th 
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('date')}
                  >
                    <div className="flex items-center">
                      Delivery Date
                      <ArrowUpDown size={14} className="ml-1" />
                    </div>
                  </th>
                  <th 
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('location')}
                  >
                    <div className="flex items-center">
                      Location
                      <ArrowUpDown size={14} className="ml-1" />
                    </div>
                  </th>
                  <th 
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('status')}
                  >
                    <div className="flex items-center">
                      Status
                      <ArrowUpDown size={14} className="ml-1" />
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredDeliveries.map((delivery) => (
                  <motion.tr 
                    key={delivery.id} 
                    className="hover:bg-gray-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{delivery.id}</div>
                      <div className="text-xs text-gray-500">{delivery.items} items</div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm font-medium text-gray-900">{delivery.customer}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(delivery.date).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{delivery.location}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusClass(delivery.status)}`}
                      >
                        {getStatusIcon(delivery.status)}
                        {delivery.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                      <Link
                        to={`/dashboard/deliveries/${delivery.id}`}
                        className="text-blue-600 hover:text-blue-800 hover:underline mr-4"
                      >
                        View Details
                      </Link>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Delivery Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-blue-700">Total Deliveries</h4>
              <Package className="text-blue-500" size={20} />
            </div>
            <p className="text-2xl font-bold text-gray-800">{deliveries.length}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border border-green-100">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-green-700">Delivered</h4>
              <CheckCircle className="text-green-500" size={20} />
            </div>
            <p className="text-2xl font-bold text-gray-800">
              {deliveries.filter(d => d.status === 'Delivered').length}
            </p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-yellow-700">In Transit</h4>
              <Clock className="text-yellow-500" size={20} />
            </div>
            <p className="text-2xl font-bold text-gray-800">
              {deliveries.filter(d => d.status === 'In Transit').length}
            </p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg border border-red-100">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-red-700">Issues</h4>
              <XCircle className="text-red-500" size={20} />
            </div>
            <p className="text-2xl font-bold text-gray-800">
              {deliveries.filter(d => d.status === 'Failed').length}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DeliveriesList;