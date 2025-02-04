"use client";

import { useState} from "react";
import { client } from "@/sanity/lib/client";
import { Product } from "@/sanity/lib/types";

interface EditProductModalProps {
  product: Product;
  onClose: () => void;
  onUpdate: () => void;
}

const EditProductModal: React.FC<EditProductModalProps> = ({ product, onClose, onUpdate }) => {
  const [formData, setFormData] = useState<Product>({ ...product });

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Save Changes
  const handleSave = async () => {
    try {
      await client.patch(product._id).set(formData).commit();
      onUpdate(); // Refresh data after update
      onClose(); // Close modal
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Edit Product</h2>
        <input type="text" name="productName" value={formData.productName} onChange={handleChange} className="w-full p-2 border rounded mb-2" placeholder="Product Name"/>
        <input type="number" name="price" value={formData.price} onChange={handleChange} className="w-full p-2 border rounded mb-2" placeholder="Price"/>
        <select name="status" value={formData.status} onChange={handleChange} className="w-full p-2 border rounded mb-2">
          <option value="Available">Available</option>
          <option value="Out of Stock">Out of Stock</option>
        </select>
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="bg-gray-400 text-white px-3 py-1 rounded">Cancel</button>
          <button onClick={handleSave} className="bg-blue-500 text-white px-3 py-1 rounded">Save Changes</button>
        </div>
      </div>
    </div>
  );
};

export default EditProductModal;
