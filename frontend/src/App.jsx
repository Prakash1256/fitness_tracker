import React, { useContext } from "react";
 import { Routes, Route } from "react-router-dom";
 import { AuthContext } from "./AuthContext"; 
 import Navbar from "./components/Navbar";
 import Footer from "./components/Footer";
 import LoginSignup from "./components/LoginSignup";
 import Home1 from "./pages/Home1";
 import About from "./pages/About";
import ActivityForm from "./pages/ActivityForm";
import ServicesSection from "./pages/ServiceSection";
import ProgressTracker from "./pages/ProgressTracker";

import MealTracker from "./pages/MealTracker";

 function App() {
    // Extract isAuthenticated properly
      const { isAuthenticated } = useContext(AuthContext);

     return (
     <div className="flex flex-col min-h-screen">
       <Navbar />
    
      <Routes>
                {/* Correct way to conditionally render based on authentication */}
         <Route path="/" element={isAuthenticated() ? <><Home1 /><ActivityForm/><ServicesSection/><ProgressTracker/> <MealTracker/>   </> : <LoginSignup />} />
        {/* <Route path="/home" element={<Home />} /> */}
       <Route path="/about" element={<About />} />
       <Route path="*" element={<LoginSignup />} />

      </Routes> 
       
       <Footer />

     </div>
   );
 }

export default App;



// In App.js
// import React, { useContext } from "react";
// import { Routes, Route } from "react-router-dom";
// import { AuthContext } from "./AuthContext"; 
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
// import LoginSignup from "./components/LoginSignup";
// import Home from "./pages/Home";
// import About from "./pages/About";

// function App() {
//   const { isAuthenticated } = useContext(AuthContext); // Assuming isAuthenticated is a boolean

//   return (
//     <div className="flex flex-col min-h-screen">
//       <Navbar />
    
//       <Routes>
//         {/* Conditionally render based on isAuthenticated */}
//         <Route path="/" element={isAuthenticated ? <Home /> : <LoginSignup />} />
//         {/* <Route path="/home" element={<Home />} /> */}
//         <Route path="/about" element={<About />} />
//       </Routes> 
    
//       <Footer />
//     </div>
//   );
// }

// export default App;
