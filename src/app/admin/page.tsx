"use client"
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaDollarSign, FaBoxOpen, FaListAlt, FaChartBar, FaFire } from 'react-icons/fa';
import { client } from '@/sanity/lib/client';

// Product interface ke hisaab se
interface Product {
  productName: string;
  price: number;
  category: string;
  status: string;
  inventory: number;
  colors: string[];
  _id: string;
  description: string;
  image: string;
}

const Dashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const query = `*[_type == 'product']{
      productName,
      price,
      category,
      _id,
      status,
      inventory,
      colors,
      "image": image.asset->url,
      description
    }`;

    client
      .fetch(query)
      .then((data: Product[]) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error: Error) => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, []);

  // Aggregated Metrics
  const totalProducts = products.length;
  const totalInventory = products.reduce((acc, product) => acc + product.inventory, 0);
  const totalStockValue = products.reduce((acc, product) => acc + product.price * product.inventory, 0);

  // Unique Categories Count
  const uniqueCategories = Object.keys(
    products.reduce((acc, product) => {
      acc[product.category] = true;
      return acc;
    }, {} as Record<string, boolean>)
  ).length;

  // Trending Products Count (Status equals "Trending", case-insensitive)
  const trendingProducts = products.filter(
    (product) => product.status.toLowerCase() === 'trending'
  ).length;

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:ml-64">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-center text-indigo-600">Dashboard</h1>
        <p className="text-center text-gray-600 mt-2">
          Overview: Stock, Value, Categories &amp; Trending Products
        </p>
        <p className="text-center text-gray-500 text-sm mt-1">
          Data updated in real-time
        </p>
      </header>

      {/* Summary Metrics Section */}
      {loading ? (
        <p className="text-center text-gray-600">Loading dashboard...</p>
      ) : (
        <section className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Total Products */}
          <motion.div
            className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5 }}
          >
            <FaListAlt className="text-4xl text-indigo-600 mb-2" />
            <h2 className="text-xl font-semibold">Products</h2>
            <p className="text-2xl font-bold">{totalProducts}</p>
          </motion.div>

          {/* Total Inventory */}
          <motion.div
            className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6 }}
          >
            <FaBoxOpen className="text-4xl text-orange-600 mb-2" />
            <h2 className="text-xl font-semibold">Inventory</h2>
            <p className="text-2xl font-bold">{totalInventory}</p>
          </motion.div>

          {/* Total Stock Value */}
          <motion.div
            className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.7 }}
          >
            <FaDollarSign className="text-4xl text-green-600 mb-2" />
            <h2 className="text-xl font-semibold">Stock Value</h2>
            <p className="text-2xl font-bold">₹{totalStockValue.toLocaleString()}</p>
          </motion.div>

          {/* Unique Categories Count */}
          <motion.div
            className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.8 }}
          >
            <FaChartBar className="text-4xl text-purple-600 mb-2" />
            <h2 className="text-xl font-semibold">Categories</h2>
            <p className="text-2xl font-bold">{uniqueCategories}</p>
          </motion.div>

          {/* Trending Products */}
          <motion.div
            className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.9 }}
          >
            <FaFire className="text-4xl text-red-600 mb-2" />
            <h2 className="text-xl font-semibold">Trending</h2>
            <p className="text-2xl font-bold">{trendingProducts}</p>
          </motion.div>
        </section>
      )}
    </div>
  );
};

export default Dashboard;
