import React from 'react';

const Toast = ({ message, type = 'success', onClose }) => {
  if (!message) return null;
  return (
    <div className={`fixed top-6 right-6 z-50 px-4 py-2 rounded shadow-lg text-white ${type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}
         role="alert">
      <span>{message}</span>
      <button className="ml-4 text-white font-bold" onClick={onClose}>&times;</button>
    </div>
  );
};

export default Toast;
