import React, { useEffect, useState } from "react";
import axios from "axios";
// import moment from "moment"; // For formatting dates

export default function ProgressTracker() {
  const [progress, setProgress] = useState([]);
  const [form, setForm] = useState({ weight: "", bodyFatPercentage: "" });
  const userId = localStorage.getItem("userId") || ""; // Fetch user ID from local storage

  useEffect(() => {
    if (userId) fetchProgress();
  }, [userId]);

  const fetchProgress = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3000/api/progress/${userId}`);
      console.log("Fetched progress data:", data);
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
      await axios.post("http://localhost:3000/api/progress", newProgress);
      fetchProgress();
      setForm({ weight: "", bodyFatPercentage: "" });
    } catch (error) {
      console.error("Error adding progress", error);
    }
  };

  const handleUpdate = async (id) => {
    try {
      const updatedProgress = { userId, ...form, date: new Date().toISOString() };
      await axios.put(`http://localhost:3000/api/progress/${id}`, updatedProgress);
      fetchProgress();
    } catch (error) {
      console.error("Error updating progress", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/progress/${id}`);
      fetchProgress();
    } catch (error) {
      console.error("Error deleting progress", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-gray-700 mb-6">Workout Progress Tracker</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-lg p-6 rounded-lg w-full max-w-md">
        <div className="mb-4">
          <label className="block text-gray-700">Weight (kg)</label>
          <input
            type="number"
            name="weight"
            value={form.weight}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Body Fat (%)</label>
          <input
            type="number"
            name="bodyFatPercentage"
            value={form.bodyFatPercentage}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-lg"
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600">
          Add Progress
        </button>
      </form>

      <div className="mt-6 w-full max-w-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Progress History</h2>
        <ul className="bg-white shadow-lg rounded-lg p-4">
          {Array.isArray(progress) && progress.length > 0 ? (
            progress.map((entry) => (
              <li key={entry._id} className="flex justify-between items-center border-b p-2">
                <span>
                  {entry.weight} kg - {entry.bodyFatPercentage}% - {entry.date ? new Date(entry.date).toLocaleDateString() : "Unknown"}
                </span>
                <div>
                  <button
                    onClick={() => handleUpdate(entry._id)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 mr-2"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(entry._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))
          ) : (
            <p className="text-gray-500 text-center">No progress records found.</p>
          )}
        </ul>
      </div>
    </div>
  );
}
