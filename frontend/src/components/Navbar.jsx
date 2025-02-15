import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 bg-opacity-75 text-white p-4 flex justify-between items-center px-8">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold">
        <span className="text-white">TRAINING</span>
        <span className="text-red-500"> STUDIO</span>
      </Link>

      {/* Navigation Links */}
      <div className="flex space-x-6">
        <Link to="/" className="text-red-400 hover:text-white">Home</Link>
        <Link to="/about" className="hover:text-red-400">About</Link>
        <Link to="/classes" className="hover:text-red-400">Classes</Link>
        <Link to="/schedules" className="hover:text-red-400">Schedules</Link>
        <Link to="/contact" className="hover:text-red-400">Contact</Link>
      </div>

      {/* Sign Up Button */}
      <Link to="/">
        <button className="bg-red-500 cursor-pointer px-4 py-1 rounded-full hover:bg-red-600">
          Logout
        </button>
      </Link>
    </nav>
  );
};

export default Navbar;
