import React from 'react';

const LoadingPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 w-full">
      <div className="flex items-center space-x-2">
        <div className="w-10 h-10 border-4 border-t-4 border-blue-500 rounded-full animate-spin"></div>
        <div className="text-xl font-semibold text-gray-700">Loading...</div>
      </div>
    </div>
  );
};

export default LoadingPage;
