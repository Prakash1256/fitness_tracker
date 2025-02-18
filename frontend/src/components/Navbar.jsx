import React, {useState, useContext } from "react"; // ✅ Import useContext
import { Link, useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import { AuthContext } from "../AuthContext"; // ✅ Import AuthContext
import { Toast  } from "flowbite-react";
import { HiCheck } from "react-icons/hi";

const Navbar = () => {

  const [showMessage, setShowMessage] = useState(false);
  const { logout } = useContext(AuthContext); // ✅ Now useContext is correctly imported
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // ✅ Clears authentication state
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 1000);
 navigate("/"); // ✅ Redirects to login/signup page
  };

  return (
    <nav className="bg-gray-900 bg-opacity-75 text-white p-4 flex justify-between items-center px-8">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold">
        <span className="text-white">TRAINING</span>
        <span className="text-red-500"> STUDIO</span>
      </Link>

      {/* Navigation Links */}
      <div className="flex space-x-6">
        <Link to="/" className="text-red-400 hover:text-white">
          Home
        </Link>
        <Link to="/about" className="hover:text-red-400">
          About
        </Link>
        <Link to="/classes" className="hover:text-red-400">
          Classes
        </Link>
        <Link to="/schedules" className="hover:text-red-400">
          Schedules
        </Link>
        <Link to="/contact" className="hover:text-red-400">
          Contact
        </Link>
      </div>

      <div>
      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="bg-red-500 cursor-pointer px-4 py-1 rounded-full hover:bg-red-600"
      >
        Logout
      </button>

      {/* Success Toast Message */}
      {showMessage && (
  <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50">
    <Toast>
      <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-500 text-red-500 dark:bg-red-500 dark:text-green-200">
        <HiCheck className="h-5 w-5 text-black-500" /> {/* Applied red color to the icon */}
      </div>
      <div className="text-sm font-normal text-white">Logged out successfully.</div>
      <Toast.Toggle />
    </Toast>
  </div>
)}


    </div>
    </nav>
  );
};

export default Navbar;
