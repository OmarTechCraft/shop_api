import React, { useState } from "react";
import axios from "axios";

const AddShop = () => {
  const [shopData, setShopData] = useState({
    title: "",
    description: "",
    categoryId: "",
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShopData({ ...shopData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("https://front-end-task.koyeb.app/api/Shop", shopData);
      setSuccessMessage("Shop added successfully!");
      setShopData({ title: "", description: "", categoryId: "" });
    } catch (error) {
      alert("Failed to add shop.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Add a New Shop
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="title"
            >
              Shop Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={shopData.title}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={shopData.description}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              rows="4"
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="categoryId"
            >
              Category ID
            </label>
            <input
              type="number"
              id="categoryId"
              name="categoryId"
              value={shopData.categoryId}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {loading ? "Adding..." : "Add Shop"}
          </button>
          {successMessage && (
            <p className="text-green-600 mt-4 text-center">{successMessage}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddShop;
