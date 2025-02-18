// import React, {useState, useContext } from "react"; // ✅ Import useContext
// import { Link, useNavigate } from "react-router-dom"; // ✅ Import useNavigate
// import { AuthContext } from "../AuthContext"; // ✅ Import AuthContext
// import { Toast  } from "flowbite-react";
// import { HiCheck } from "react-icons/hi";

// const Navbar = () => {

//   const [showMessage, setShowMessage] = useState(false);
//   const { logout } = useContext(AuthContext); // ✅ Now useContext is correctly imported
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout(); // ✅ Clears authentication state
//     setShowMessage(true);
//     setTimeout(() => setShowMessage(false), 1000);
//  navigate("/"); // ✅ Redirects to login/signup page
//   };

//   return (
//     <nav className="bg-black bg-opacity-75 text-white p-4 flex justify-between items-center px-8">
//       {/* Logo */}
//       <Link to="/" className="text-2xl font-bold">
//         <span className="text-white">FITNESS</span>
//         <span className="text-red-500"> CLUB</span>
//       </Link>

//       {/* Navigation Links */}
//       <div className="flex space-x-6">
//         <Link to="/" className="text-red-400 hover:text-white">
//           Home
//         </Link>
//         <Link to="/about" className="hover:text-red-400">
//           About
//         </Link>
//         <Link to="/classes" className="hover:text-red-400">
//           Classes
//         </Link>
//         <Link to="/schedules" className="hover:text-red-400">
//           Schedules
//         </Link>
//         <Link to="/contact" className="hover:text-red-400">
//           Contact
//         </Link>
//       </div>

//       <div>
//       {/* Logout Button */}
//       <button
//         onClick={handleLogout}
//         className="bg-red-500 cursor-pointer px-4 py-1 rounded-full hover:bg-red-600"
//       >
//         Logout
//       </button>

//       {/* Success Toast Message */}
//       {showMessage && (
//   <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50">
//     <Toast>
//       <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-500 text-red-500 dark:bg-red-500 dark:text-green-200">
//         <HiCheck className="h-5 w-5 text-black-500" /> {/* Applied red color to the icon */}
//       </div>
//       <div className="text-sm font-normal text-white">Logged out successfully.</div>
//       <Toast.Toggle />
//     </Toast>
//   </div>
// )}


//     </div>
//     </nav>
//   );
// };

// export default Navbar;



import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
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

        {/* Navigation Links */}
        <div
          className={`${
            menuOpen ? "block" : "hidden"
          } md:flex md:space-x-6 absolute md:static top-14 left-0 w-full md:w-auto bg-black md:bg-transparent p-4 md:p-0`}
        >
          <Link to="/" className="block md:inline text-red-400 hover:text-white px-2 py-1">
            Home
          </Link>
          <Link to="/about" className="block md:inline hover:text-red-400 px-2 py-1">
            About
          </Link>
          <Link to="/classes" className="block md:inline hover:text-red-400 px-2 py-1">
            Classes
          </Link>
          <Link to="/schedules" className="block md:inline hover:text-red-400 px-2 py-1">
            Schedules
          </Link>
          <Link to="/contact" className="block md:inline hover:text-red-400 px-2 py-1">
            Contact
          </Link>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="hidden md:block bg-red-500 px-4 py-2 rounded-full hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      {/* Mobile Logout Button */}
      {menuOpen && (
        <div className="md:hidden mt-4 text-center">
          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2 rounded-full hover:bg-red-600 transition"
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

