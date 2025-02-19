import React, { useState, useEffect } from "react";
import axios from "axios";
import { Trash2 } from "lucide-react";

export default function MealTracker() {
  const [meals, setMeals] = useState([]);
  const [formData, setFormData] = useState({ name: "", calories: "", protein: "", carbs: "", fats: "" });
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) fetchMeals();
  }, [userId]);

  const fetchMeals = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3000/api/meals?userId=${userId}`);
      setMeals(data);
    } catch (error) {
      console.error("Error fetching meals", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:3000/api/meals", { ...formData, userId });
      setMeals([...meals, data]);
      setFormData({ name: "", calories: "", protein: "", carbs: "", fats: "" });
    } catch (error) {
      console.error("Error adding meal", error);
    }
  };

  const deleteMeal = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/meals/${id}`, { data: { userId } });
      setMeals(meals.filter((meal) => meal._id !== id));
    } catch (error) {
      console.error("Error deleting meal", error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-6 relative">
    {/* Background Image */}
    <div className="absolute inset-0 bg-top  bg-center opacity-40" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1554344728-77cf90d9ed26?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")' }}></div>
  
    {/* Main Content */}
    <div className="relative z-10 w-full max-w-8xl flex flex-col md:flex-row justify-center">
  
      {/* Left: Meal Input Form */}
      <div className="w-full md:w-1/2 p-6 rounded-xl shadow-xl relative overflow-hidden bg-opacity-50">
        {/* Background Image for the Form */}
        <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: 'url("your-form-image-url-here.jpg")' }}></div>
  
        {/* Content on top of the image */}
        <div className="relative z-10">
          <h2 className="text-xl font-bold text-gray-100 mb-4">Add Your Meal Here</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              name="name"
              placeholder="Meal Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="bg-transparent text-white placeholder-opacity-75 p-3 rounded-lg focus:outline-none"
            />
            <input
              type="number"
              name="calories"
              placeholder="Calories"
              value={formData.calories}
              onChange={handleChange}
              required
              className="bg-transparent text-white placeholder-opacity-75 p-3 rounded-lg focus:outline-none"
            />
            <input
              type="number"
              name="protein"
              placeholder="Protein (g)"
              value={formData.protein}
              onChange={handleChange}
              required
              className="bg-transparent text-white placeholder-opacity-75 p-3 rounded-lg focus:outline-none"
            />
            <input
              type="number"
              name="carbs"
              placeholder="Carbs (g)"
              value={formData.carbs}
              onChange={handleChange}
              required
              className="bg-transparent text-white placeholder-opacity-75 p-3 rounded-lg focus:outline-none"
            />
            <input
              type="number"
              name="fats"
              placeholder="Fats (g)"
              value={formData.fats}
              onChange={handleChange}
              required
              className="bg-transparent text-white placeholder-opacity-75 p-3 rounded-lg focus:outline-none"
            />
            <button 
  type="submit" 
  className="bg-gray-100 text-black cursor-pointer border border-gray-600 p-3 rounded-lg mt-4 backdrop-blur-sm hover:bg-gradient-to-l hover:bg-opacity-40 transition duration-300"
>
  Add Meal
</button>

          </form>
        </div>
      </div>
  
      {/* Right: Meal Table */}
      <div className="w-full md:w-1/2 overflow-x-auto bg-cover bg-center bg-opacity-50">
        <table className="w-full table-auto text-gray-300 bg-transparent">
          <thead className="bg-opacity-50">
            <tr>
              <th className="text-gray-300 px-4 py-2 text-left">Meal Name</th>
              <th className="px-4 py-2 text-left">Calories</th>
              <th className="px-4 py-2 text-left">Protein (g)</th>
              <th className="px-4 py-2 text-left">Carbs (g)</th>
              <th className="px-4 py-2 text-left">Fats (g)</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
  
          <tbody className="divide-y divide-gray-700 bg-opacity-60">
            {meals.map((meal) => (
              <tr key={meal._id} className="hover:bg-gray-800">
                <td className="px-4 py-2 text-gray-300 font-bold">{meal.name}</td>
                <td className="px-4 py-2">{meal.calories} kcal</td>
                <td className="px-4 py-2">{meal.protein}g</td>
                <td className="px-4 py-2">{meal.carbs}g</td>
                <td className="px-4 py-2">{meal.fats}g</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => deleteMeal(meal._id)}
                    className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  
    </div>
  </div>
  
  );
}
