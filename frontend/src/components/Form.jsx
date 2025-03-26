import { useState } from "react";
import axios from "axios";

const Form = ({ setPrediction }) => {
  const [formData, setFormData] = useState({
    quantity: 1,
    pricePerItem: 10.0,
    customerType: "0",
    weather: "0",
    specialEvent: "0",
    dayOfWeek: [],
    foodItems: [],
    category: [],
  });

  const [error, setError] = useState("");

  const dayOptions = ["Monday", "Saturday", "Sunday", "Thursday", "Tuesday", "Wednesday"];
  const foodOptions = ["Coffee", "Ice Cream", "Pasta", "Pizza", "Salad", "Steak", "Sushi", "Tacos", "Tea"];
  const categoryOptions = ["Dessert", "Drink", "Main Course"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e, type) => {
    const { name, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [type]: checked
        ? [...prevState[type], name]
        : prevState[type].filter((item) => item !== name),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.quantity || !formData.pricePerItem) {
      setError("Please fill out all required fields.");
      return;
    }

    setError(""); // Clear previous errors

    const features = [
      parseFloat(formData.quantity),
      parseFloat(formData.pricePerItem),
      parseInt(formData.customerType),
      parseInt(formData.weather),
      parseInt(formData.specialEvent),
      ...dayOptions.map((day) => (formData.dayOfWeek.includes(day) ? 1 : 0)),
      ...foodOptions.map((food) => (formData.foodItems.includes(food) ? 1 : 0)),
      ...categoryOptions.map((category) => (formData.category.includes(category) ? 1 : 0)),
    ];

    try {
      const response = await axios.post("http://127.0.0.1:5000/predict", { features });
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error("Error fetching prediction:", error);
    }
  };

  const handleClear = () => {
    setFormData({
      quantity: 1,
      pricePerItem: 10.0,
      customerType: "0",
      weather: "0",
      specialEvent: "0",
      dayOfWeek: [],
      foodItems: [],
      category: [],
    });
    setError("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6 bg-white rounded-lg shadow-lg w-96">
      <h2 className="text-xl font-semibold text-center">📦 Create Order</h2>

      {error && <p className="text-red-500 text-sm text-center">{error}</p>}

      <label className="flex flex-col">
        Quantity:
        <input
          type="number"
          name="quantity"
          min="1"
          value={formData.quantity}
          onChange={handleChange}
          className="border p-2 rounded"
        />
      </label>

      <label className="flex flex-col">
        Price Per Item:
        <input
          type="number"
          name="pricePerItem"
          min="1"
          value={formData.pricePerItem}
          onChange={handleChange}
          className="border p-2 rounded"
        />
      </label>

      <label className="flex flex-col">
        Customer Type:
        <select name="customerType" value={formData.customerType} onChange={handleChange} className="border p-2 rounded">
          <option value="0">Regular</option>
          <option value="1">Member</option>
          <option value="2">VIP</option>
        </select>
      </label>

      <label className="flex flex-col">
        Weather:
        <select name="weather" value={formData.weather} onChange={handleChange} className="border p-2 rounded">
          <option value="0">Sunny</option>
          <option value="1">Cloudy</option>
          <option value="2">Rainy</option>
          <option value="3">Stormy</option>
          <option value="4">Snowy</option>
        </select>
      </label>

      <label className="flex flex-col">
        Special Event:
        <select name="specialEvent" value={formData.specialEvent} onChange={handleChange} className="border p-2 rounded">
          <option value="0">None</option>
          <option value="1">Holiday</option>
          <option value="2">Festival</option>
          <option value="3">Sports Event</option>
        </select>
      </label>

      <fieldset className="flex flex-col">
        <legend className="font-medium">📅 Day of the Week:</legend>
        <div className="grid grid-cols-2 gap-2">
          {dayOptions.map((day) => (
            <label key={day} className="flex items-center gap-2">
              <input type="checkbox" name={day} onChange={(e) => handleCheckboxChange(e, "dayOfWeek")} />
              {day}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="flex flex-col">
        <legend className="font-medium">🍽️ Food Items:</legend>
        <div className="grid grid-cols-3 gap-2">
          {foodOptions.map((food) => (
            <label key={food} className="flex items-center gap-2">
              <input type="checkbox" name={food} onChange={(e) => handleCheckboxChange(e, "foodItems")} />
              {food}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="flex flex-col">
        <legend className="font-medium">🍛 Category:</legend>
        <div className="grid grid-cols-2 gap-2">
          {categoryOptions.map((category) => (
            <label key={category} className="flex items-center gap-2">
              <input type="checkbox" name={category} onChange={(e) => handleCheckboxChange(e, "category")} />
              {category}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="flex justify-between">
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          🔮 Predict
        </button>
        <button type="button" onClick={handleClear} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">
          🔄 Clear
        </button>
      </div>
    </form>
  );
};

export default Form;
