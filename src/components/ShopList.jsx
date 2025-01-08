import React, { useEffect, useState } from "react";
import axios from "axios";

const ShopList = () => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedShop, setSelectedShop] = useState(null);
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({
    title: "",
    parentCategoryId: "",
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [categoriesLoading, setCategoriesLoading] = useState(false);

  // Fetch all shops
  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await axios.get(
          "https://front-end-task.koyeb.app/api/Shop"
        );
        setShops(response.data);
      } catch (error) {
        console.error("Error fetching shops:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchShops();
  }, []);

  // Fetch categories for a specific shop
  const fetchCategories = async (shopId) => {
    setCategoriesLoading(true);
    try {
      const response = await axios.get(
        `https://front-end-task.koyeb.app/api/ShopCategory`
      );
      const filteredCategories = response.data.filter(
        (category) => category.shopId === shopId
      );
      setCategories(filteredCategories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setCategoriesLoading(false);
    }
  };

  // Handle shop click
  const handleShopClick = (shop) => {
    setSelectedShop(shop);
    fetchCategories(shop.id);
    setModalOpen(true);
  };

  // Handle form submission to add a new category
  const handleAddCategory = async (e) => {
    e.preventDefault();

    if (!selectedShop) {
      alert("No shop selected. Please select a shop first.");
      return;
    }

    try {
      const payload = {
        title: newCategory.title,
        parentCategoryId: newCategory.parentCategoryId
          ? parseInt(newCategory.parentCategoryId, 10)
          : null, // Set to null if no parentCategoryId is provided
        shopId: selectedShop.id,
      };

      // Exclude parentCategoryId if it is null
      if (!payload.parentCategoryId) {
        delete payload.parentCategoryId;
      }

      await axios.post(
        "https://front-end-task.koyeb.app/api/ShopCategory",
        payload
      );

      alert("Category added successfully!");

      // Refresh the categories list for the current shop
      fetchCategories(selectedShop.id);

      // Reset the form
      setNewCategory({ title: "", parentCategoryId: "" });
    } catch (error) {
      console.error("Error adding shop category:", error);
      alert("Failed to add category. Please check your input or try again.");
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-20 text-xl font-medium">
        Loading shops...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Shop List
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {shops.map((shop) => (
            <div
              key={shop.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => handleShopClick(shop)}
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {shop.title}
              </h3>
              <p className="text-gray-600 mb-2">{shop.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Categories */}
      {modalOpen && selectedShop && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4">
              Categories for {selectedShop.title} (Shop ID: {selectedShop.id})
            </h2>

            {/* Display existing categories */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">
                Existing Categories:
              </h3>
              {categoriesLoading ? (
                <p>Loading categories...</p>
              ) : categories.length > 0 ? (
                <ul className="list-disc pl-5">
                  {categories.map((category) => (
                    <li key={category.id} className="text-gray-700">
                      {category.title}
                      {category.subCategories &&
                        category.subCategories.length > 0 && (
                          <ul className="list-circle pl-5">
                            {category.subCategories.map((sub) => (
                              <li key={sub.id} className="text-gray-600">
                                {sub.title}
                              </li>
                            ))}
                          </ul>
                        )}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">
                  No categories available for this shop.
                </p>
              )}
            </div>

            {/* Add new category form */}
            <form onSubmit={handleAddCategory}>
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-gray-700 font-medium mb-2"
                >
                  New Category Title
                </label>
                <input
                  type="text"
                  id="title"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                  value={newCategory.title}
                  onChange={(e) =>
                    setNewCategory({ ...newCategory, title: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="parentCategoryId"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Parent Category ID
                </label>
                <input
                  type="number"
                  id="parentCategoryId"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                  value={newCategory.parentCategoryId}
                  onChange={(e) =>
                    setNewCategory({
                      ...newCategory,
                      parentCategoryId: e.target.value,
                    })
                  }
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Add Category
              </button>
            </form>

            {/* Close Modal */}
            <button
              className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 mt-4"
              onClick={() => setModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopList;
