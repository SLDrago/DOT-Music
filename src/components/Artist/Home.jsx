import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { Routes, Route } from 'react-router-dom';
import HomeMain from './HomeMain';
import Search from './Search';
import YourLibaray from './YourLibaray';
import Profile from './Profile';
import Setting from './Setting';

const Home = () => {
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

export default Home;
