import React from "react";
import AddShop from "../components/AddShop";

const AddShopPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Add New Shop</h1>
        <AddShop />
      </div>
    </div>
  );
};

export default AddShopPage;
