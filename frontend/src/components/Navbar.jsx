import React, { useState, useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import { Toast } from "flowbite-react";
import { HiCheck } from "react-icons/hi";

const Navbar = () => {
  const [showMessage, setShowMessage] = useState(false);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 1000);
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-black bg-opacity-90 shadow-md text-white p-4 px-8 z-50 transition-all duration-300">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">
          <span className="text-white">FITNESS</span>
          <span className="text-red-500"> CLUB</span>
        </Link>
        {/* Mobile Menu Toggle Button */}
        <button
          className="block md:hidden text-white focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
    
        <div
          className={`${
            menuOpen ? "block" : "hidden"
          } md:flex md:space-x-6 absolute md:static top-14 left-0 w-full md:w-auto bg-black md:bg-transparent p-4 md:p-0`}
        >
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "block md:inline text-red-500 px-2 py-1 text-red-500" // Active class
                : "block md:inline text-white hover:text-white px-2 py-1"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "block md:inline text-red-500 px-2 py-1 text-red-500"
                : "block md:inline text-white hover:text-white px-2 py-1"
            }
          >
            About
          </NavLink>
          <NavLink
            to="/classes"
            className={({ isActive }) =>
              isActive
                ? "block md:inline text-red-500 px-2 py-1 text-red-500"
                : "block md:inline text-white hover:text-white px-2 py-1"
            }
          >
            Classes
          </NavLink>
          <NavLink
            to="/schedules"
            className={({ isActive }) =>
              isActive
                ? "block md:inline text-red-500 px-2 py-1 text-red-500"
                : "block md:inline text-white hover:text-white px-2 py-1"
            }
          >
            Schedules
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive
                ? "block md:inline text-red-400 px-2 py-1 text-red-500"
                : "block md:inline text-white hover:text-white px-2 py-1"
            }
          >
            Contact
          </NavLink>
        </div>
        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="hidden md:block cursor-pointer bg-red-500 text-white px-6 py-1 rounded-full hover:bg-gray-100  hover:text-black transition"
        >
          Logout
        </button>
      </div>

      {/* Mobile Logout Button */}
      {menuOpen && (
        <div className="md:hidden mt-4 text-center">
          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2  rounded-full hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      )}

      {/* Success Toast Message */}
      {showMessage && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50">
          <Toast>
            <div className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-green-500 text-white">
              <HiCheck className="h-5 w-5" />
            </div>
            <div className="text-sm font-normal text-white">
              Logged out successfully.
            </div>
            <Toast.Toggle />
          </Toast>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
