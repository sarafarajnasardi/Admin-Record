import React from 'react';
import { CheckCircle, Clock, XCircle } from 'lucide-react';

const StatusBadge = ({ status }) => {
  let badgeColor, icon;

  switch (status) {
    case 'Completed':
      badgeColor = 'bg-green-100 text-green-700';
      icon = <CheckCircle className="inline mr-1" size={16} />;
      break;
    case 'Pending':
      badgeColor = 'bg-yellow-100 text-yellow-700';
      icon = <Clock className="inline mr-1" size={16} />;
      break;
    case 'Failed':
      badgeColor = 'bg-red-100 text-red-700';
      icon = <XCircle className="inline mr-1" size={16} />;
      break;
    default:
      badgeColor = 'bg-gray-100 text-gray-700';
      icon = null;
  }

  return (
    <span className={`px-2 py-1 rounded-full text-sm ${badgeColor}`}>
      {icon}
      {status}
    </span>
  );
};

export default StatusBadge;