import React from "react";
import Sidebar from "../../components/Artist/Sidebar";
import Navbar from "../../components/Artist/Navbar";
import { Routes, Route } from "react-router-dom";
import HomeMain from "../../components/Artist/HomeMain";
import Search from "../../components/Artist/Search";
import YourLibaray from "../../components/Artist/YourLibaray";
import Profile from "../../components/Artist/Profile";
import Setting from "../../components/Artist/Setting";

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
          <Routes>
            <Route path="/" element={<HomeMain />} />
            <Route path="/search" element={<Search />} />
            <Route path="/library" element={<YourLibaray />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Setting />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
