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
      const { data } = await axios.get(`https://fitness-tracker-8.onrender.com/api/meals?userId=${userId}`);
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
      const { data } = await axios.post("https://fitness-tracker-8.onrender.com/api/meals", { ...formData, userId });
      setMeals([...meals, data]);
      setFormData({ name: "", calories: "", protein: "", carbs: "", fats: "" });
    } catch (error) {
      console.error("Error adding meal", error);
    }
  };

  const deleteMeal = async (id) => {
    try {
      await axios.delete(`https://fitness-tracker-8.onrender.com/api/meals/${id}`, { data: { userId } });
      setMeals(meals.filter((meal) => meal._id !== id));
    } catch (error) {
      console.error("Error deleting meal", error);
    }
  };

  const currentDate = new Date().toLocaleDateString();
  const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  
  return (
    <div className="min-h-screen bg-[#222924] text-white flex flex-col items-center p-6 relative">
      <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: 'url("")' }}></div>
      
      <div className="relative z-10 w-full max-w-8xl flex flex-col md:flex-row justify-center">
        
      <div className="w-full md:w-1/2 p-6 relative overflow-hidden bg-opacity-50">
  <h2 className="text-4xl font-bold text-gray-100 mb-4">Add Your Meal Here</h2>
  
  <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <input type="text" name="name" placeholder="Meal Name" value={formData.name} onChange={handleChange} required className="bg-transparent text-white p-3 rounded-lg focus:outline-none col-span-2" />
    <input type="number" name="calories" placeholder="Calories" value={formData.calories} onChange={handleChange} required className="bg-transparent text-white p-3 rounded-lg focus:outline-none" />
    <input type="number" name="protein" placeholder="Protein (g)" value={formData.protein} onChange={handleChange} required className="bg-transparent text-white p-3 rounded-lg focus:outline-none" />
    <input type="number" name="carbs" placeholder="Carbs (g)" value={formData.carbs} onChange={handleChange} required className="bg-transparent text-white p-3 rounded-lg focus:outline-none" />
    <input type="number" name="fats" placeholder="Fats (g)" value={formData.fats} onChange={handleChange} required className="bg-transparent text-white p-3 rounded-lg focus:outline-none" />
    <button type="submit" className="w-full cursor-pointer bg-gradient-to-r from-[#007BFF] to-[#0056B3] text-white p-3 rounded-lg mt-4 backdrop-blur-sm hover:bg-opacity-40 transition duration-300">
    Add Meal
  </button>
  </form>

 
</div>

        
        <div className="w-full md:w-1/2 overflow-x-auto bg-cover bg-center bg-opacity-50">
          <h3 className="text-lg font-bold text-gray-100 mb-2">{currentDay}, {currentDate}</h3>
          <table className="w-full table-auto text-gray-300 bg-transparent">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Meal Name</th>
                <th className="px-4 py-2 text-left">Calories</th>
                <th className="px-4 py-2 text-left">Protein (g)</th>
                <th className="px-4 py-2 text-left">Carbs (g)</th>
                <th className="px-4 py-2 text-left">Fats (g)</th>
                <th className="px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {meals.map((meal) => (
                <tr key={meal._id} className="hover:bg-gray-800">
                  <td className="px-4 py-2 font-bold">{meal.name}</td>
                  <td className="px-4 py-2">{meal.calories} kcal</td>
                  <td className="px-4 py-2">{meal.protein}g</td>
                  <td className="px-4 py-2">{meal.carbs}g</td>
                  <td className="px-4 py-2">{meal.fats}g</td>
                  <td className="px-4 py-2">
                    <button onClick={() => deleteMeal(meal._id)} className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700">
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
