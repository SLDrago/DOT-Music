import React from "react";
import Sidebar from "../../components/Artist/Sidebar";
import Navbar from "../../components/Artist/Navbar";
import { Outlet } from "react-router-dom"; // To render the nested routes

const AdminHome = () => {
  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex flex-col flex-grow">
        {/* Navbar */}
        <Navbar />

        {/* Content */}
        <div className="flex-grow overflow-y-auto p-6">
          {/* The nested routes will be rendered here */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
