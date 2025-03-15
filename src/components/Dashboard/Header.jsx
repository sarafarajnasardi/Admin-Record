import React from 'react';
import { User } from 'lucide-react';

const Header = () => {
  return (
    <div className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-primary">Admin Dashboard</h1>
      <div className="flex items-center">
        <span className="mr-4 text-gray-700">Satyam</span>
        <User className="text-primary" size={24} />
      </div>
    </div>
  );
};

export default Header;