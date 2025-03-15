import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutDashboard, Package, Truck, CreditCard, Users } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  // Sidebar links with proper icons
  const links = [
    {
      name: 'Overview',
      icon: <LayoutDashboard size={20} />,
      path: '/dashboard/overview',
    },
    {
      name: 'Orders',
      icon: <Package size={20} />,
      path: '/dashboard/orders',
    },
    {
      name: 'Deliveries',
      icon: <Truck size={20} />,
      path: '/dashboard/deliveries',
    },
    {
      name: 'Payments',
      icon: <CreditCard size={20} />,
      path: '/dashboard/payments',
    },
    {
      name: 'Artisans',
      icon: <Users size={20} />,
      path: '/dashboard/artisans',
    },
  ];

  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-4 flex flex-col">
      {/* Sidebar Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>
      
      {/* Sidebar Links */}
      <nav className="flex-1">
        <ul className="space-y-2">
          {links.map((link) => (
            <li key={link.path}>
              <Link 
                to={link.path}
                className={`flex items-center p-3 rounded-lg transition-colors duration-200 ${
                  location.pathname === link.path 
                    ? 'bg-indigo-600 text-white' 
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  className="mr-3 text-gray-300"
                >
                  {link.icon}
                </motion.div>
                <span>{link.name}</span>
                {location.pathname === link.path && (
                  <motion.div 
                    className="ml-auto h-2 w-2 rounded-full bg-white"
                    layoutId="indicator"
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      {/* Sidebar Footer */}
      <div className="mt-auto pt-4 border-t border-gray-700">
        <div className="flex items-center p-2">
          <div className="w-8 h-8 rounded-full bg-indigo-500 mr-2"></div>
          <div>
            <p className="text-sm font-medium">Admin User</p>
            <p className="text-xs text-gray-400">admin@example.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;