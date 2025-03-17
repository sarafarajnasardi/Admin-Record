import React, { useState } from 'react';
import { 
  CreditCard, 
  Package, 
  Truck, 
  Users, 
  TrendingUp, 
  Calendar, 
  ArrowUpRight, 
  ArrowDownRight
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Overview = () => {
  
  const [timePeriod, setTimePeriod] = useState('month');

  const salesData = [
    { name: 'Jan', sales: 4000, orders: 240 },
    { name: 'Feb', sales: 3000, orders: 198 },
    { name: 'Mar', sales: 5000, orders: 305 },
    { name: 'Apr', sales: 2780, orders: 189 },
    { name: 'May', sales: 6890, orders: 409 },
    { name: 'Jun', sales: 7390, orders: 480 },
    { name: 'Jul', sales: 9490, orders: 570 }
  ];

  const categoryData = [
    { name: 'Weaving', value: 35 },
    { name: 'Pottery', value: 25 },
    { name: 'Bamboo', value: 15 },
    { name: 'Textiles', value: 15 },
    { name: 'Jewelry', value: 10 }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  // Stats cards data with growth indicators
  const statsCards = [
    {
      title: 'Total Orders',
      value: '1,234',
      growth: 12.5,
      icon: <Package className="text-indigo-600" size={24} />,
      bgColor: 'bg-indigo-50'
    },
    {
      title: 'Completed Deliveries',
      value: '1,000',
      growth: 8.2,
      icon: <Truck className="text-green-600" size={24} />,
      bgColor: 'bg-green-50'
    },
    {
      title: 'Total Revenue',
      value: '$50,000',
      growth: -3.5,
      icon: <CreditCard className="text-blue-600" size={24} />,
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Active Artisans',
      value: '150',
      growth: 5.7,
      icon: <Users className="text-amber-600" size={24} />,
      bgColor: 'bg-amber-50'
    }
  ];

  // Recent orders dummy data
  const recentOrders = [
    { id: '#OR-7891', customer: 'Emma Thompson', status: 'Completed', amount: '$234.50', date: '15 Mar 2025' },
    { id: '#OR-7892', customer: 'Michael Chen', status: 'Processing', amount: '$129.99', date: '14 Mar 2025' },
    { id: '#OR-7893', customer: 'Sarah Williams', status: 'Shipped', amount: '$349.00', date: '13 Mar 2025' },
    { id: '#OR-7894', customer: 'John Martinez', status: 'Pending', amount: '$89.75', date: '12 Mar 2025' }
  ];

  // Status color mapping
  const statusColors = {
    Completed: 'bg-green-100 text-green-800',
    Processing: 'bg-blue-100 text-blue-800',
    Shipped: 'bg-purple-100 text-purple-800',
    Pending: 'bg-amber-100 text-amber-800'
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Dashboard Overview</h2>
        
        <div className="flex bg-white rounded-lg shadow-sm p-1 space-x-1">
          <button 
            onClick={() => setTimePeriod('week')}
            className={`px-3 py-1.5 rounded-md text-sm font-medium ${timePeriod === 'week' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:bg-gray-100'}`}
          >
            Weekly
          </button>
          <button 
            onClick={() => setTimePeriod('month')}
            className={`px-3 py-1.5 rounded-md text-sm font-medium ${timePeriod === 'month' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:bg-gray-100'}`}
          >
            Monthly
          </button>
          <button 
            onClick={() => setTimePeriod('year')}
            className={`px-3 py-1.5 rounded-md text-sm font-medium ${timePeriod === 'year' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:bg-gray-100'}`}
          >
            Yearly
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((card, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${card.bgColor}`}>
                  {card.icon}
                </div>
                <span className={`flex items-center text-sm font-medium ${card.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {card.growth >= 0 ? <ArrowUpRight size={16} className="mr-1" /> : <ArrowDownRight size={16} className="mr-1" />}
                  {Math.abs(card.growth)}%
                </span>
              </div>
              <h3 className="text-lg font-medium text-gray-500">{card.title}</h3>
              <p className="text-3xl font-bold mt-1 text-gray-800">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Trend Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-800">Sales Trend</h3>
            <div className="flex items-center text-gray-500">
              <TrendingUp size={16} className="mr-1" />
              <span className="text-sm">+12.5% from last period</span>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip />
                <Line type="monotone" dataKey="sales" stroke="#6366F1" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Distribution Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">Product Categories</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Orders Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-800">Recent Orders</h3>
            <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="text-left text-gray-500 text-sm">
                  <th className="pb-3 font-medium">Order ID</th>
                  <th className="pb-3 font-medium">Customer</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentOrders.map((order, index) => (
                  <tr key={index} className="text-gray-800">
                    <td className="py-3 pr-4">{order.id}</td>
                    <td className="py-3 pr-4">{order.customer}</td>
                    <td className="py-3 pr-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[order.status]}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3">{order.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Orders by Month */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-800">Orders by Month</h3>
            <div className="flex items-center text-gray-500">
              <Calendar size={16} className="mr-1" />
              <span className="text-sm">Last 6 months</span>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData.slice(-6)} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip />
                <Bar dataKey="orders" fill="#6366F1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;