import React from 'react';


const NoItemsToShow = () => {
  return (
    <div className="flex flex-col items-center justify-center  p-4 bg-gray-50">
      <div className="text-center">

        <h2 className="text-2xl font-semibold text-gray-700 mb-2">No Items to Show</h2>
        <p className="text-gray-500 mb-6">
          It seems there are no items to display at the moment.
        </p>
       
      </div>
    </div>
  );
};

export default NoItemsToShow;
