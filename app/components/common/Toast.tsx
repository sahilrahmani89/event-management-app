// Toast.tsx
import React from 'react';
import { Toast as ToastType } from '@/app/utils/ToastContext';
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle } from 'react-icons/fa';

const Toast: React.FC<{ toast: ToastType }> = ({ toast }) => {
  const getIcon = (type: ToastType['type']) => {
    switch (type) {
      case 'success':
        return <FaCheckCircle className="text-green-500" />;
      case 'error':
        return <FaExclamationCircle className="text-red-500" />;
      case 'info':
        return <FaInfoCircle className="text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className={`flex items-center p-4 mb-2 border rounded-lg shadow-md ${getBackgroundColor(toast.type)}`}>
      {getIcon(toast.type)}
      <span className="ml-2 text-white">{toast.message}</span>
    </div>
  );
};

const getBackgroundColor = (type: ToastType['type']) => {
  switch (type) {
    case 'success':
      return 'bg-green-600 border-green-800';
    case 'error':
      return 'bg-red-600 border-red-800';
    case 'info':
      return 'bg-orange-500 border-orange-500';
    default:
      return 'bg-gray-600 border-gray-800';
  }
};

export default Toast;
