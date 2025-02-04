"use client";

import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import { Product } from "@/sanity/lib/types";
import SearchBar from "./SearchBar";
import Sorting from "../Sorting";
import EditProductModal from "../EditProductModal";
import Image from "next/image";

type SortCriteria = "productName" | "category" | "price" | "status";

const ProductTable = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const query = `*[_type == "product"]{
        colors,
        _id,
        status,
        category,
        price,
        description,
        "image": image.asset->url,
        inventory,
        productName
      }`;
      try {
        const data = await client.fetch(query);
        setProducts(data);
        setFilteredProducts(data); // Default filtering
      } catch (error) {
        console.error("Error fetching data from Sanity:", error);
      }
    };

    fetchData();
  }, []);

  // Search Function
  const handleSearch = (query: string) => {
    const filtered = products.filter((product) =>
      product.productName.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  // Sorting Function
  const handleSort = (criteria: SortCriteria) => {
    const sorted = [...filteredProducts].sort((a, b) => {
      if (criteria === "price") {
        return a.price - b.price; // Price is a number, so direct comparison
      } else {
        return a[criteria].localeCompare(b[criteria]); // For strings, use localeCompare
      }
    });
    setFilteredProducts(sorted);
  };

  // Edit Product Handler
  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setShowEditModal(true);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      
      {/* Flexbox Layout for Search and Sorting */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
        <SearchBar onSearch={handleSearch} />
        <Sorting onSort={handleSort} />
      </div>

      {/* Table Layout */}
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Image</th>
            <th className="border border-gray-300 px-4 py-2">Product Name</th>
            <th className="border border-gray-300 px-4 py-2">Category</th>
            <th className="border border-gray-300 px-4 py-2">Price</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product._id} className="text-center">
              <td className="border border-gray-300 px-4 py-2">
              <Image 
  src={product.image} 
  alt={product.productName} 
  width={64}  // 16 * 4 to match w-16 (16px * 4 = 64px)
  height={64} // 16 * 4 to match h-16 (16px * 4 = 64px)
  className="object-cover" 
/>
              </td>
              <td className="border border-gray-300 px-4 py-2">{product.productName}</td>
              <td className="border border-gray-300 px-4 py-2">{product.category}</td>
              <td className="border border-gray-300 px-4 py-2">${product.price}</td>
              <td className="border border-gray-300 px-4 py-2">{product.status}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => handleEdit(product)}
                  className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button className="bg-red-500 text-white px-2 py-1 rounded ml-2 hover:bg-red-600">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Product Modal */}
      {showEditModal && selectedProduct && (
        <EditProductModal
          product={selectedProduct}
          onClose={() => setShowEditModal(false)}
          onUpdate={() => {} /* Refresh products after update */}
        />
      )}
    </div>
  );
};

export default ProductTable;
