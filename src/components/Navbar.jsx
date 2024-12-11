// src/components/Navbar.js
import React from "react";
import { LogIn, LogOut } from "lucide-react";

const Navbar = ({ isLoggedIn, handleLogin, handleLogout }) => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <div className="flex items-center">
          {/* <img src="/api/placeholder/50/50" alt="Logo" className="h-10 w-10 mr-3" /> */}
          <span className="text-2xl font-semibold text-indigo-600">
            ForumPro
          </span>
        </div>
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-6 py-2 rounded-full font-medium hover:bg-red-700 transition duration-300 flex items-center"
          >
            <LogOut className="mr-2" size={18} />
            Logout
          </button>
        ) : (
          <button
            onClick={handleLogin}
            className="bg-indigo-600 text-white px-6 py-2 rounded-full font-medium hover:bg-indigo-700 transition duration-300 flex items-center"
          >
            <LogIn className="mr-2" size={18} />
            Login / Sign Up
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
