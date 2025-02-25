import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const [meals, setMeals] = useState([]);
  const [progress, setProgress] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const headers = { Authorization: `Bearer ${token}` };

        const usersRes = await axios.get("/api/admin/users", { headers });
        const workoutsRes = await axios.get("/api/admin/workouts", { headers });
        const mealsRes = await axios.get("/api/admin/meals", { headers });
        const progressRes = await axios.get("/api/admin/progress", { headers });

        setUsers(usersRes.data);
        setWorkouts(workoutsRes.data);
        setMeals(mealsRes.data);
        setProgress(progressRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`/api/admin/users/${id}`);
      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>

      {/* Users Section */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-2">Users</h2>
        <ul>
          {users.map((user) => (
            <li key={user._id} className="flex justify-between p-2 border-b">
              {user.name} ({user.email})
              <button
                onClick={() => handleDeleteUser(user._id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Workouts Section */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-2">Workouts</h2>
        <ul>
          {workouts.map((workout) => (
            <li key={workout._id} className="p-2 border-b">
              {workout.name} - {workout.duration} mins
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
