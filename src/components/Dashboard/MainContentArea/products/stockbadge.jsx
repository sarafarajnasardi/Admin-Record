import React from 'react';

const getBadgeColor = (stock) => {
  if (stock === 0) return 'bg-red-500';       // Out of Stock
  if (stock < 10) return 'bg-yellow-500';     // Low Stock
  return 'bg-green-500';                      // In Stock
};

const getLabel = (stock) => {
  if (stock === 0) return 'Out of Stock';
  if (stock < 10) return 'Low Stock';
  return 'In Stock';
};

const StockBadge = ({ stock }) => {
  const color = getBadgeColor(stock);
  const label = getLabel(stock);

  return (
    <span className={`text-white text-xs font-semibold px-3 py-1 rounded-full ${color}`}>
      {label}
    </span>
  );
};

export default StockBadge;
