import React, { useState } from "react";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    comments: "",
  });

  const [modal, setModal] = useState({ open: false, message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Submitted", formData);

    try {
      const response = await fetch("https://fitness-tracker-8.onrender.com/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setModal({ open: true, message: "Your message has been sent successfully we will connect shortly!" });
        setFormData({ name: "", phone: "", email: "", comments: "" });
      } else {
        setModal({ open: true, message: "There was an error sending your message. Please try again." });
      }
    } catch (error) {
      console.error("Error:", error);
      setModal({ open: true, message: "There was an error sending your message. Please try again." });
    }
  };

  return (
    <section className="bg-[#222924] min-h-screen flex items-center justify-center p-4">
      <div className="flex flex-col md:flex-row justify-center items-center gap-10 w-full max-w-[80%]">
        
        {/* Left Side - Contact Info */}
        <div className="w-full md:w-1/2 p-6 text-white">
          <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
          <p className="mb-2"><strong>📍 Address:</strong> 123 Fitness Street, Gurugram City, India - 2756702</p>
          <p className="mb-2"><strong>📞 Phone:</strong> +91 7985139275</p>
          <p className="mb-2"><strong>📧 Email:</strong> fitnessclub@gmail.com</p>
          <p className="mb-2"><strong>🌐 Website:</strong> www.fitnessclub.com</p>
        </div>

        {/* Right Side - Contact Form */}
        <div className="w-full md:w-1/2 p-5">
          <form onSubmit={handleSubmit} className="bg-[#222924] text-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-center text-gray-100">Contact Us</h2>

            <div className="mb-4">
              <label className="block text-gray-100 font-medium mb-2">Name*</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full p-2 border text-white border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400" />
            </div>

            <div className="mb-4">
              <label className="block text-gray-100 font-medium mb-2">Phone Number</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full p-2 border text-white border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400" />
            </div>

            <div className="mb-4">
              <label className="block text-gray-100 font-medium mb-2">Email Address*</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full p-2 border text-white border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400" />
            </div>

            <div className="mb-4">
              <label className="block text-gray-100 font-medium mb-2">Comments*</label>
              <textarea name="comments" value={formData.comments} onChange={handleChange} required className="w-full p-2 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400" rows="4"></textarea>
            </div>

            <button type="submit" className="w-full bg-gray-100 cursor-pointer text-black py-2 px-4 font-semibold rounded-lg hover:bg-gray-400 hover:text-black transition duration-200">Submit</button>
          </form>
        </div>
      </div>

      {/* Modal Popup */}
      {modal.open && (
        <div className="fixed inset-0 bg-[#222924] bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
            <p className="text-lg font-semibold">{modal.message}</p>
            <button onClick={() => setModal({ open: false, message: "" })} className="mt-4 cursor-pointer bg-[#00AEEF] text-white px-4 py-2 rounded-lg hover:bg-blue-500">OK</button>
          </div>
        </div>
      )}
    </section>
  );
}
