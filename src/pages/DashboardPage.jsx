import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Dashboard/Sidebar';
import Header from '../components/Dashboard/Header';
import axios from 'axios';
import { AdminContext } from '../utils/admin_context';
axios.defaults.withCredentials = true;
const DashboardPage = () => {
  const [admin, setAdmin] = useState({});

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/admin/auth/admin-check-auth");
        if (!response.data.success) {
          window.location.href = "/auth/login";
        } else {
          setAdmin(response.data.admin);
        }
      } catch (err) {
        window.location.href = "/auth/login";
      }
    };

    fetchAdmin();
  }, []);

  return (
    <AdminContext.Provider value={{ admin, setAdmin }}>
      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <Header />

          {/* Main Content Area */}
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
            <div className="container mx-auto px-6 py-8">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </AdminContext.Provider>
  );
};

export default DashboardPage;
