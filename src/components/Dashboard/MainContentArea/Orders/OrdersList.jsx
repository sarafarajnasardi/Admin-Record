import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Package, 
  CheckCircle, 
  Clock, 
  XCircle, 
  Search, 
  Filter, 
  ChevronDown, 
  Download, 
  Plus,
  ArrowUpDown
} from 'lucide-react';

const StatusBadge = ({ status }) => {
  const getStatusConfig = () => {
    switch(status) {
      case 'Completed':
        return { 
          icon: <CheckCircle size={16} />, 
          bgColor: 'bg-green-100',
          textColor: 'text-green-700',
          borderColor: 'border-green-200'
        };
      case 'Pending':
        return { 
          icon: <Clock size={16} />, 
          bgColor: 'bg-yellow-100',
          textColor: 'text-yellow-700',
          borderColor: 'border-yellow-200'
        };
      case 'Processing':
        return { 
          icon: <Package size={16} />, 
          bgColor: 'bg-blue-100',
          textColor: 'text-blue-700',
          borderColor: 'border-blue-200'
        };
      case 'Cancelled':
        return { 
          icon: <XCircle size={16} />, 
          bgColor: 'bg-red-100',
          textColor: 'text-red-700',
          borderColor: 'border-red-200'
        };
      default:
        return { 
          icon: <Clock size={16} />, 
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-700',
          borderColor: 'border-gray-200'
        };
    }
  };

  const { icon, bgColor, textColor, borderColor } = getStatusConfig();

  return (
    <span className={`inline-flex items-center ${textColor} ${bgColor} ${borderColor} border px-2 py-1 rounded-full text-xs font-medium`}>
      {icon}
      <span className="ml-1">{status}</span>
    </span>
  );
};

const OrdersList = () => {
  // Extended sample data
  const ordersData = [
    { 
      id: 'ORD-12345', 
      customer: 'John Doe', 
      email: 'john.doe@example.com',
      date: 'Mar 15, 2025', 
      status: 'Pending', 
      amount: 149.99,
      items: 3
    },
    { 
      id: 'ORD-12346', 
      customer: 'Jane Smith', 
      email: 'jane.smith@example.com',
      date: 'Mar 14, 2025', 
      status: 'Completed', 
      amount: 89.95,
      items: 1
    },
    { 
      id: 'ORD-12347', 
      customer: 'Robert Johnson', 
      email: 'robert.j@example.com',
      date: 'Mar 13, 2025', 
      status: 'Processing', 
      amount: 229.50,
      items: 4
    },
    { 
      id: 'ORD-12348', 
      customer: 'Emily Davis', 
      email: 'emily.davis@example.com',
      date: 'Mar 12, 2025', 
      status: 'Completed', 
      amount: 75.25,
      items: 2
    },
    { 
      id: 'ORD-12349', 
      customer: 'Michael Wilson', 
      email: 'michael.w@example.com',
      date: 'Mar 11, 2025', 
      status: 'Cancelled', 
      amount: 199.99,
      items: 3
    }
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [orders, setOrders] = useState(ordersData);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  // Handle search
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    const filtered = ordersData.filter(order => {
      return (
        order.id.toLowerCase().includes(term.toLowerCase()) ||
        order.customer.toLowerCase().includes(term.toLowerCase()) ||
        order.email.toLowerCase().includes(term.toLowerCase())
      );
    });

    setOrders(filtered);
  };

  // Handle status filter
  const handleStatusFilter = (status) => {
    setStatusFilter(status);
    
    if (status === 'All') {
      setOrders(ordersData);
    } else {
      const filtered = ordersData.filter(order => order.status === status);
      setOrders(filtered);
    }
  };

  // Handle sorting
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    
    setSortConfig({ key, direction });
    
    setOrders(prev => {
      return [...prev].sort((a, b) => {
        if (a[key] < b[key]) {
          return direction === 'ascending' ? -1 : 1;
        }
        if (a[key] > b[key]) {
          return direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    });
  };

  // Calculate summary stats
  const totalOrders = orders.length;
  const totalAmount = orders.reduce((sum, order) => sum + order.amount, 0);
  const pendingOrders = orders.filter(order => order.status === 'Pending').length;
  const completedOrders = orders.filter(order => order.status === 'Completed').length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="p-6"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Orders Management</h2>
        
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 flex items-center hover:bg-gray-50 transition-colors">
            <Download size={16} className="mr-2" />
            Export
          </button>
          
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg flex items-center hover:bg-indigo-700 transition-colors">
            <Plus size={16} className="mr-2" />
            New Order
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <Package size={20} className="text-indigo-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Total Orders</p>
              <p className="text-xl font-bold text-gray-800">{totalOrders}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle size={20} className="text-green-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Completed</p>
              <p className="text-xl font-bold text-gray-800">{completedOrders}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock size={20} className="text-yellow-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Pending</p>
              <p className="text-xl font-bold text-gray-800">{pendingOrders}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <div className="text-blue-600">$</div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Total Revenue</p>
              <p className="text-xl font-bold text-gray-800">${totalAmount.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
          <div className="relative flex-grow mb-4 md:mb-0">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={handleSearch}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          
          <div className="flex space-x-2">
            <div className="relative">
              <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 flex items-center">
                <Filter size={16} className="mr-2 text-gray-500" />
                Filter by Status
                <ChevronDown size={16} className="ml-2 text-gray-500" />
              </button>
              
              <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <ul className="py-1">
                  <li>
                    <button 
                      className={`w-full text-left px-4 py-2 hover:bg-gray-50 ${statusFilter === 'All' ? 'bg-gray-50 text-indigo-600' : ''}`}
                      onClick={() => handleStatusFilter('All')}
                    >
                      All Orders
                    </button>
                  </li>
                  <li>
                    <button 
                      className={`w-full text-left px-4 py-2 hover:bg-gray-50 ${statusFilter === 'Pending' ? 'bg-gray-50 text-indigo-600' : ''}`}
                      onClick={() => handleStatusFilter('Pending')}
                    >
                      Pending
                    </button>
                  </li>
                  <li>
                    <button 
                      className={`w-full text-left px-4 py-2 hover:bg-gray-50 ${statusFilter === 'Processing' ? 'bg-gray-50 text-indigo-600' : ''}`}
                      onClick={() => handleStatusFilter('Processing')}
                    >
                      Processing
                    </button>
                  </li>
                  <li>
                    <button 
                      className={`w-full text-left px-4 py-2 hover:bg-gray-50 ${statusFilter === 'Completed' ? 'bg-gray-50 text-indigo-600' : ''}`}
                      onClick={() => handleStatusFilter('Completed')}
                    >
                      Completed
                    </button>
                  </li>
                  <li>
                    <button 
                      className={`w-full text-left px-4 py-2 hover:bg-gray-50 ${statusFilter === 'Cancelled' ? 'bg-gray-50 text-indigo-600' : ''}`}
                      onClick={() => handleStatusFilter('Cancelled')}
                    >
                      Cancelled
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button 
                  className="flex items-center"
                  onClick={() => requestSort('id')}
                >
                  Order ID
                  <ArrowUpDown size={14} className="ml-1" />
                </button>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button 
                  className="flex items-center"
                  onClick={() => requestSort('customer')}
                >
                  Customer
                  <ArrowUpDown size={14} className="ml-1" />
                </button>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button 
                  className="flex items-center"
                  onClick={() => requestSort('date')}
                >
                  Date
                  <ArrowUpDown size={14} className="ml-1" />
                </button>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button 
                  className="flex items-center"
                  onClick={() => requestSort('status')}
                >
                  Status
                  <ArrowUpDown size={14} className="ml-1" />
                </button>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button 
                  className="flex items-center"
                  onClick={() => requestSort('amount')}
                >
                  Amount
                  <ArrowUpDown size={14} className="ml-1" />
                </button>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Items
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                    {order.id}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                    <div className="font-medium">{order.customer}</div>
                    <div className="text-gray-500 text-xs">{order.email}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                    {order.date}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                    ${order.amount.toFixed(2)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                    {order.items} {order.items === 1 ? 'item' : 'items'}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-right text-sm">
                    <div className="flex justify-end space-x-2">
                      <Link
                        to={`/dashboard/orders/${order.id}`}
                        className="text-indigo-600 hover:text-indigo-800 font-medium hover:underline"
                      >
                        View
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-4 py-8 text-center text-gray-500">
                  No orders found matching your criteria
                </td>
              </tr>
            )}
          </tbody>
        </table>
        
        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6 mt-4">
          <div className="flex-1 flex justify-between sm:hidden">
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Previous
            </button>
            <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to <span className="font-medium">{orders.length}</span> of{" "}
                <span className="font-medium">{orders.length}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">Previous</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-indigo-50 text-sm font-medium text-indigo-600 hover:bg-indigo-100">
                  1
                </button>
                <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">Next</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default OrdersList;