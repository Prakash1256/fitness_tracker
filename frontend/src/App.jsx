import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginSignup from "./components/LoginSignup";
import Home from "./pages/Home";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<LoginSignup />} />
          <Route
            path="/Home"
            element={
              <>
                <Navbar />
                <Home />
                <Footer />
              </>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
