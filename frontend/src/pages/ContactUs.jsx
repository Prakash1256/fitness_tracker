import React, { useState } from "react";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    comments: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted", formData);
  };

  return (
     
    <section className="bg-black">
       <section className="max-w-[80%] mx-auto bg-black min-h-screen flex items-center justify-center p-4">
      <div className="flex flex-col md:flex-row justify-center items-center gap-10 w-full">
        {/* Left Side - Contact Info */}
        <div className="w-full md:w-1/2 p-6 text-white">
          <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
          <p className="mb-2"><strong>📍 Address:</strong> 123 Fitness Street, Wellness City, Fitland - 456789</p>
          <p className="mb-2"><strong>📞 Phone:</strong> +1 (555) 123-4567</p>
          <p className="mb-2"><strong>📧 Email:</strong> support@fittrackapp.com</p>
          <p className="mb-2"><strong>🌐 Website:</strong> www.fittrackapp.com</p>
        </div>

        {/* Right Side - Contact Form */}
        <div className="w-full md:w-1/2 p-5">
        <form onSubmit={handleSubmit} className="bg-gradient-to-r from-gray-900 via-black to-gray-800 shadow-lg rounded-lg p-6">




            <h2 className="text-2xl font-bold mb-4 text-center text-gray-100">Contact Us</h2>
            
            <div className="mb-4">
              <label className="block text-gray-100 font-medium mb-2">Name*</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-2 border text-white border-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-100 font-medium mb-2">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-2 border text-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-100 font-medium mb-2">Email Address*</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-2 border text-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-100 font-medium mb-2">Comments*</label>
              <textarea
                name="comments"
                value={formData.comments}
                onChange={handleChange}
                required
                className="w-full p-2 text-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
              ></textarea>
            </div>
            
            <button
              type="submit"
              className="w-full bg-black cursor-pointer text-white py-2 px-4 rounded-lg hover:bg-white hover:text-black transition duration-200"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
    </section>

   
  );
}
