import React, { useState, useEffect } from "react";
import axios from "axios";
import { Alert, Spinner, Button } from "flowbite-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

const ActivityForm = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    userId: "",
    steps: "",
    workoutType: "",
    duration: "",
    calories: "",
    date: new Date().toISOString().split("T")[0], // Default: Today’s date
  });
  const [alert, setAlert] = useState({ type: "", message: "" });

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setFormData((prevData) => ({ ...prevData, userId: storedUserId }));
    }
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/activity/activities"
      );

      // Format data
      const formattedActivities = response.data.map((activity) => ({
        _id: activity._id,
        workoutType: activity.workoutType || "Unknown",
        steps: Number(activity.steps) || 0,
        duration: Number(activity.duration) || 0,
        calories: Number(activity.calories) || 0,
        date: activity.date
          ? new Date(activity.date).toLocaleDateString()
          : "Unknown",
      }));

      setActivities(formattedActivities);
    } catch (error) {
      setAlert({ type: "failure", message: "Error fetching activities" });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.userId) {
      setAlert({ type: "failure", message: "User ID is required!" });
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/activity/activities",
        formData
      );
      if (response.status === 201) {
        setAlert({ type: "success", message: "Activity added successfully!" });
        fetchActivities(); // Refresh activity list
        setFormData({
          userId: formData.userId,
          steps: "",
          workoutType: "",
          duration: "",
          calories: "",
          date: new Date().toISOString().split("T")[0], // Reset to today's date
        });
      }
    } catch (error) {
      setAlert({ type: "failure", message: "Failed to add activity" });
    }
  };

  const handleDelete = async (activityId) => {
    if (!window.confirm("Are you sure you want to delete this activity?"))
      return;
    try {
      await axios.delete(
        `http://localhost:3000/api/v1/activity/activities/${activityId}`
      );

      // Remove from UI after deleting from DB
      setActivities((prev) =>
        prev.filter((activity) => activity._id !== activityId)
      );
      setAlert({ type: "success", message: "Activity deleted successfully!" });
    } catch (error) {
      setAlert({ type: "failure", message: "Failed to delete activity" });
    }
  };

  return (
    <div className="w-full h-[600px] mx-auto p-6 pt-40 bg-black text-white flex flex-col md:flex-row gap-6">
      {/* Left Section - Add Activity Form */}
      <div className="w-full md:w-1/2">
        <h2 className="text-3xl font-bold text-center text-white-400 mb-6">
          Add Your Daily Activity
        </h2>
        {alert.message && (
          <Alert color={alert.type} className="mb-4">
            {alert.message}
          </Alert>
        )}
        <form
          onSubmit={handleSubmit}
          className="bg-black p-6 rounded-lg shadow-md"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input type="hidden" name="userId" value={formData.userId} />
            <input
              type="number"
              name="steps"
              placeholder="Steps"
              value={formData.steps}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md bg-gray-700 text-white"
              required
            />
            <input
              type="text"
              name="workoutType"
              placeholder="Workout Type"
              value={formData.workoutType}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md bg-gray-700 text-white"
              required
            />
            <input
              type="number"
              name="duration"
              placeholder="Duration (min)"
              value={formData.duration}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md bg-gray-700 text-white"
              required
            />
            <input
              type="number"
              name="calories"
              placeholder="Calories Burned"
              value={formData.calories}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md bg-gray-700 text-white"
              required
            />
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md bg-gray-700 text-white"
              required
            />
          </div>
          <button
            type="submit"
            className="mt-4 w-full bg-gray-300 text-black font-medium cursor-pointer py-2 px-4 rounded-lg shadow-md hover:bg-gray-200 transition"
          >
            Add Activity
          </button>
        </form>
      </div>

      {/* Right Section - Activity Chart */}
      <div className="w-full md:w-1/2 bg-black">
        <h3 className="text-xl font-semibold mb-4 text-white-400">
          Activity Overview
        </h3>

        {loading ? (
          <div className="text-center">
            <Spinner size="lg" />
            <p>Loading activities...</p>
          </div>
        ) : activities.length === 0 ? (
          <p className="text-center text-gray-400">No activities found.</p>
        ) : (
          <div className="bg-black p-4">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={activities}>
                <XAxis dataKey="date" stroke="#ffffff" />
                <YAxis stroke="#ffffff" />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="steps"
                  fill="#3b82f6"
                  name="Steps"
                  onClick={(data) => handleDelete(data._id)}
                >
                  {activities.map((activity) => (
                    <Cell key={activity._id} fill="#3b82f6" />
                  ))}
                </Bar>
                <Bar
                  dataKey="duration"
                  fill="#fbbf24"
                  name="Duration (min)"
                  onClick={(data) => handleDelete(data._id)}
                >
                  {activities.map((activity) => (
                    <Cell key={activity._id} fill="#fbbf24" />
                  ))}
                </Bar>
                <Bar
                  dataKey="calories"
                  fill="#ef4444"
                  name="Calories Burned"
                  onClick={(data) => handleDelete(data._id)}
                >
                  {activities.map((activity) => (
                    <Cell key={activity._id} fill="#ef4444" />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityForm;
