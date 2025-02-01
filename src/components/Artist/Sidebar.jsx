// src/components/Sidebar.js
import React from "react";
import { Link } from "react-router-dom";
import { HiHome, HiSearch, HiUser, HiOutlineCog } from "react-icons/hi";
import { BiLibrary } from "react-icons/bi";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import logo from "../../images/logos/Logo.svg";

const Sidebar = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-800 text-white !w-64 p-4">
      {/* Logo */}
      <div className="flex justify-center mb-6">
        <img src={logo} alt="DOT-Music Logo" className="w-20 h-auto" />
      </div>

      {/* Navigation */}
      <nav className="flex flex-col space-y-3 flex-grow">
        <Link
          to="/ArtistAdminPanel/home"
          className="flex items-center space-x-3 text-base hover:bg-orange-700 p-2 rounded-md transition-all duration-300"
        >
          <HiHome size={20} />
          <span>Home</span>
        </Link>

        <Link
          to="/ArtistAdminPanel/search"
          className="flex items-center space-x-3 text-base hover:bg-orange-700 p-2 rounded-md transition-all duration-300"
        >
          <HiSearch size={20} />
          <span>Search</span>
        </Link>

        <Link
          to="/ArtistAdminPanel/library"
          className="flex items-center space-x-3 text-base hover:bg-orange-700 p-2 rounded-md transition-all duration-300"
        >
          <BiLibrary size={20} />
          <span>Your Library</span>
        </Link>

        <div className="border-t border-gray-700 my-3"></div>

        <Link
          to="/ArtistAdminPanel/profile"
          className="flex items-center space-x-3 text-base hover:bg-orange-700 p-2 rounded-md transition-all duration-300"
        >
          <HiUser size={20} />
          <span>Profile</span>
        </Link>

        <Link
          to="/ArtistAdminPanel/settings"
          className="flex items-center space-x-3 text-base hover:bg-orange-700 p-2 rounded-md transition-all duration-300"
        >
          <HiOutlineCog size={20} />
          <span>Settings</span>
        </Link>
      </nav>

      {/* Social Media */}
      <div className="mt-4">
        <div className="border-t border-gray-700 my-3"></div>
        <h4 className="text-xs font-semibold uppercase tracking-wide mb-3">
          Follow Us
        </h4>
        <div className="flex justify-center space-x-3">
          <a href="#" className="hover:text-gray-400 transition duration-300">
            <FaFacebookF size={18} />
          </a>
          <a href="#" className="hover:text-gray-400 transition duration-300">
            <FaTwitter size={18} />
          </a>
          <a href="#" className="hover:text-gray-400 transition duration-300">
            <FaInstagram size={18} />
          </a>
          <a href="#" className="hover:text-gray-400 transition duration-300">
            <FaYoutube size={18} />
          </a>
        </div>
        <div className="text-center text-xs text-gray-500 mt-4">
          &copy; 2024 DOT-Music. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
