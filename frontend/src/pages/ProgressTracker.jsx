import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Trash2 } from "lucide-react"; // Import delete icon

export default function ProgressTracker() {
  const [progress, setProgress] = useState([]);
  const [form, setForm] = useState({ weight: "", bodyFatPercentage: "" });
  const userId = localStorage.getItem("userId") || "";

  useEffect(() => {
    if (userId) fetchProgress();
  }, [userId]);

  const fetchProgress = async () => {
    try {
      const { data } = await axios.get(`https://fitness-tracker-8.onrender.com/api/progress/${userId}`);
      setProgress(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching progress", error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newProgress = { userId, ...form, date: new Date().toISOString() };
      await axios.post("https://fitness-tracker-8.onrender.com/api/progress", newProgress);
      fetchProgress();
      setForm({ weight: "", bodyFatPercentage: "" });
    } catch (error) {
      console.error("Error adding progress", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this progress entry?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`https://fitness-tracker-8.onrender.com/api/progress/${id}`);
      fetchProgress();
      // alert("Progress entry deleted successfully!");
    } catch (error) {
      console.error("Error deleting progress", error);
    }
  };

  const handleBarClick = (data) => {
    if (!data || !data._id) return;
    handleDelete(data._id);
  };

  return (
    <div className="min-h-screen bg-[#222924] p-6 flex flex-col lg:flex-row items-center justify-around gap-8">
      {/* Form Section */}
      <form onSubmit={handleSubmit} className="bg-[#222924] p-6 w-full max-w-lg  rounded-lg">
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Workout Progress Tracker
        </h1>
        <div className="mb-4">
          <label className="block text-gray-300">Weight (kg)</label>
          <input
            type="number"
            name="weight"
            placeholder="enter your weight"
            value={form.weight}
            onChange={handleChange}
            className="w-full mt-1 p-2 bg-[#222924] text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300">Body Fat (%)</label>
          <input
            type="number"
            placeholder="enter your Bodyfat"
            name="bodyFatPercentage"
            value={form.bodyFatPercentage}
            onChange={handleChange}
            className="w-full mt-1 p-2 bg-[#222924] text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full  bg-gradient-to-r from-[#007BFF] to-[#0056B3] text-white cursor-pointer  p-2 rounded-lg hover:bg-red-500 hover:text-white transition"
        >
          Add Progress
        </button>
      </form>

      {/* Progress Chart Section */}
      <div className="w-full max-w-3xl">
        <h2 className="text-xl font-semibold text-sky-500 mb-4 text-center lg:text-left">
          Progress History
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={progress}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            onClick={(e) => handleBarClick(e.activePayload?.[0]?.payload)}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey={(entry) => new Date(entry.date).toLocaleDateString()}
              tick={{ fill: "#fff" }}
            />
            <YAxis tick={{ fill: "#fff" }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="weight" fill="#FFA500" barSize={40} />
            <Bar dataKey="bodyFatPercentage" fill="#00BFFF" barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
