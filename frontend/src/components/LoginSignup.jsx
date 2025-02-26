import React, { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../AuthContext";

const LoginSignup = () => {
  const [message, setMessage] = useState("");
  const [isLogin, setIsLogin] = useState(false); // Toggle Login/Signup
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  // const navigate = useNavigate();
  const { login } = useContext(AuthContext); // Access login function from AuthContext

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submission
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError(null);


  //   try {
  //     const url = isLogin
  //       ? "http://localhost:3000/api/v1/users/login"
  //       : "http://localhost:3000/api/v1/users/register";

  //        const response = await axios.post(url, formData, {
  //         headers: { "Content-Type": "application/json" },
  //     });

  //     if (response.data.success && response.data.token) {
  //       console.log("Login Successful");
  //       localStorage.setItem("token", response.data.token);
  //       localStorage.setItem("userId", response.data.user._id); // Store user ID
  //       login(response.data.token, response.data.user._id);
  //       login(response.data.token);
  //       // navigate("/home");
  //     }
  //   } catch (err) {
  //     console.error("Login/Signup Error:", err.response?.data?.message || err.message);
  //     setError(err.response?.data?.message || "Something went wrong!");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
  
    try {
      const url = isLogin
        ? "http://localhost:3000/api/v1/users/login"
        : "http://localhost:3000/api/v1/users/register";
  
      const response = await axios.post(url, formData, {
        headers: { "Content-Type": "application/json" },
      });
  
      console.log(response.data); // Log the full response to inspect
  
      if (response.data.success && response.data.token) {
        console.log("Login Successful");
        localStorage.setItem("token", response.data.token);
  
        // Check if user data exists and if _id (or userId) is available
        if (response.data.data && response.data.data._id) {
          localStorage.setItem("userId", response.data.data._id);
          login(response.data.token, response.data.data._id);
        } else {
          console.error("User data or _id is missing in the response");
          setError("User data is missing.");
        }
      }
    } catch (err) {
      console.error("Login/Signup Error:", err.response?.data?.message || err.message);
      setError(err.response?.data?.message || "Something went wrong!");
    }
  };
  
  

  return (
    <div className="flex justify-center items-center  bg-[#222924] min-h-screen px-4"
    style={{
      backgroundImage: `url('https://images.unsplash.com/photo-1723117417817-a122a6d202d5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }} 

    >
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-semibold text-center text-white mb-6">
          {isLogin ? "Welcome Back!" : "Create an Account"}
        </h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4"
       

        >
          {!isLogin && (
            <>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="border border-gray-300 p-3 rounded-lg w-full text-white placeholder-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-400"
                required
              />
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                className="border border-gray-300 p-3 rounded-lg w-full text-white placeholder-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-400"
                required
              />
            </>
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-lg w-full text-white placeholder-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-400"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-lg w-full text-white placeholder-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-400"
            required
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-[#007BFF] to-[#0056B3] text-white hover:bg-red-700 cursor-pointer text-black font-bold py-3 rounded-lg transition duration-300"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        <p className="text-white text-center mt-4">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-400 cursor-pointer hover:underline"
          >
            {isLogin ? "Register" : "Login"}
          </span>
        </p>
      </div>
    </div>
    
  );
};

export default LoginSignup;

