import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Edit, Plus, Trash, Loader, AlertCircle } from 'lucide-react';

const ArtisansManagement = () => {
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Simulate fetching artisans from an API
  useEffect(() => {
    const fetchArtisans = async () => {
      try {
        // Replace with your API call
        const response = await fetch('https://api.example.com/artisans');
        if (!response.ok) {
          throw new Error('Failed to fetch artisans');
        }
        const data = await response.json();
        setArtisans(data);
      } catch (error) {
        console.error('Error fetching artisans:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArtisans();
  }, []);

  const handleDeleteArtisan = (id) => {
    // Simulate deleting an artisan
    setArtisans((prevArtisans) => prevArtisans.filter((artisan) => artisan.id !== id));
    console.log(`Artisan with ID ${id} deleted`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center space-y-4">
          <Loader className="w-12 h-12 text-primary animate-spin" />
          <p className="text-gray-600">Loading artisans...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
        <h3 className="text-xl font-semibold mb-2">Error Loading Artisans</h3>
        <p className="text-gray-600 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-6"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Artisans Management</h2>
        <Link
          to="/dashboard/artisans/new"
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors flex items-center"
        >
          <Plus className="mr-2" size={18} />
          Add New Artisan
        </Link>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        {artisans.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-gray-500">
            <User size={64} className="text-gray-300 mb-4" />
            <p className="text-xl font-medium mb-2">No Artisans Found</p>
            <p>Start by adding a new artisan to the platform.</p>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Artisan ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Craft
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {artisans.map((artisan) => (
                <motion.tr
                  key={artisan.id}
                  className="hover:bg-gray-50 transition-colors"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{artisan.id}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{artisan.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{artisan.craft}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{artisan.location}</td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex items-center space-x-4">
                      <Link
                        to={`/dashboard/artisans/${artisan.id}`}
                        className="text-blue-600 hover:text-blue-700 hover:underline"
                      >
                        <Edit className="inline" size={18} />
                      </Link>
                      <button
                        onClick={() => handleDeleteArtisan(artisan.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash className="inline" size={18} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </motion.div>
  );
};

export default ArtisansManagement;