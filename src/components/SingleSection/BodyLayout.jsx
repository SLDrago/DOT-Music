import React from 'react';
import BodyLeftLayout from './BodyLeftLayout';
import BodyRightLayout from './BodyRightLayout';

const BodyLayout = () => {
  return (
    <div className="grid grid-cols-12 gap-4 dark:bg-black h-screen">
      {/* Left Sidebar */}
      <div className="col-start-1 col-end-5 bg-gray-900 rounded-lg ml-2 h-screen sticky top-0">
        <BodyLeftLayout />
      </div>

      {/* Main Content */}
      <div className="col-start-5 col-end-13 text-white bg-gray-900 rounded-lg mr-2 mb-8 overflow-y-auto h-screen scrollable-content">
        <BodyRightLayout />
      </div>
    </div>
  );
};

export default BodyLayout;
