"use client" 

import React, { useState, useEffect, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch } from 'react-icons/fa';
import { client } from '@/sanity/lib/client';


// Product interface (description, colors & status exclude kiye gaye hain)
interface Product {
  productName: string;
  price: number;
  category: string;
  inventory: number;
  _id: string;
  image: string;
}

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const query = `*[_type == 'product']{
      productName,
      price,
      category,
      _id,
      inventory,
      "image": image.asset->url
    }`;

    client
      .fetch(query)
      .then((data: Product[]) => {
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      })
      .catch((error: Error) => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, []);

  // Search filter function
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term.trim() === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) =>
        product.productName.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:ml-64">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-4xl font-bold text-center text-indigo-600">
          Products
        </h1>
      </header>

      {/* Search Bar */}
      <div className="max-w-4xl mx-auto mb-6 px-4">
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
        </div>
      </div>

      {/* Products Table */}
      <div className="max-w-6xl mx-auto overflow-x-auto bg-white rounded-lg shadow">
        {loading ? (
          <p className="p-4 text-center text-gray-600">Loading products...</p>
        ) : (
          <table className="w-full border-collapse">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="px-4 py-2 text-left">Image</th>
                <th className="px-4 py-2 text-left">Product</th>
                <th className="px-4 py-2 text-left">Category</th>
                <th className="px-4 py-2 text-right">Price</th>
                <th className="px-4 py-2 text-right">Inventory</th>
              </tr>
            </thead>
            <AnimatePresence>
              <tbody>
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <motion.tr
                      key={product._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="border-b hover:bg-gray-50"
                    >
                      {/* Image */}
                      <td className="px-4 py-2">
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.productName}
                            className="w-12 h-12 object-cover rounded"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-gray-300 rounded" />
                        )}
                      </td>

                      {/* Product Name */}
                      <td className="px-4 py-2 font-medium">
                        {product.productName}
                      </td>

                      {/* Category */}
                      <td className="px-4 py-2">{product.category}</td>

                      {/* Price */}
                      <td className="px-4 py-2 text-right font-semibold">
                        ₹{product.price}
                      </td>

                      {/* Inventory */}
                      <td className="px-4 py-2 text-right">
                        {product.inventory}
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <motion.tr
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td className="px-4 py-2 text-center text-gray-600" colSpan={5}>
                      No products found.
                    </td>
                  </motion.tr>
                )}
              </tbody>
            </AnimatePresence>
          </table>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
