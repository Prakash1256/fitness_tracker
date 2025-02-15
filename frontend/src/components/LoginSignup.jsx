import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
  
    try {
      const url = isLogin
        ? "http://localhost:3000/api/v1/users/login"
        : "http://localhost:3000/api/v1/users/register";
  
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      console.log("Full Response:", response);
      console.log("Response Data:", response.data);
  
      const token = response.data?.message?.token; // ✅ Fix: Extract token from the correct path
  
      if (token) {
        localStorage.setItem("authToken", token);
        console.log("Token stored:", token);
        navigate("/Home");
      } else {
        throw new Error("Token not received.");
      }
       
    } catch (err) {
      console.error("Error response:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Something went wrong");
    }
  };
  
  
  
  

  return (
    <div
    className="flex justify-center items-center min-h-screen bg-gray-900 px-4"
    style={{
      backgroundImage: `url('https://images.unsplash.com/photo-1605296867304-46d5465a13f1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
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
        {success && <p className="text-green-500 text-center mb-4">{success}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
     {!isLogin && (
    <>
      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={formData.name}
        onChange={handleChange}
        className="border p-3 rounded-lg w-full  text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
        required
      />
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
        className="border p-3 rounded-lg w-full  text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
    className="border p-3 rounded-lg w-full  text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
    required
  />
  <input
    type="password"
    name="password"
    placeholder="Password"
    value={formData.password}
    onChange={handleChange}
    className="border p-3 rounded-lg w-full  text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
    required
  />
  <button
    type="submit"
    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition duration-300"
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
