import React, { useState } from 'react';
import { Bell, Check, Trash } from 'lucide-react';

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: 'Your order #12345 has been delivered.',
      read: false,
    },
    {
      id: 2,
      message: 'New payment received for order #12346.',
      read: false,
    },
    {
      id: 3,
      message: 'Order #12347 has been shipped.',
      read: true,
    },
  ]);

  const markAsRead = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const deleteNotification = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id)
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-primary mb-6 flex items-center">
        <Bell className="mr-2" size={24} />
        Notifications
      </h2>

      <div className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 rounded-lg ${
              notification.read ? 'bg-gray-50' : 'bg-primary-50'
            }`}
          >
            <div className="flex justify-between items-center">
              <p className="text-gray-700">{notification.message}</p>
              <div className="flex items-center space-x-4">
                {!notification.read && (
                  <button
                    onClick={() => markAsRead(notification.id)}
                    className="text-green-500 hover:text-green-700"
                  >
                    <Check size={20} />
                  </button>
                )}
                <button
                  onClick={() => deleteNotification(notification.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;