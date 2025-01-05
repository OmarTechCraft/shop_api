import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const ShopList = () => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);

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
            <motion.div
              key={shop.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {shop.title}
              </h3>
              <p className="text-gray-600 mb-2">{shop.description}</p>
              <p className="text-gray-800 font-medium">
                <strong>Category:</strong> {shop.category.title}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopList;
