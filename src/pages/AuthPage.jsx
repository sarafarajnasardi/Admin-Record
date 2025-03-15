import React from 'react';
import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';

const AuthPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-r from-primary to-secondary"
    >
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <Outlet />
      </div>
    </motion.div>
  );
};

export default AuthPage;