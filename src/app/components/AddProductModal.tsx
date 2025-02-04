import { useState } from "react";
import { client } from "@/sanity/lib/client";

const AddProductModal = ({ onClose }: { onClose: () => void }) => {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [status, setStatus] = useState("Available");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await client.create({
        _type: "product",
        productName,
        category,
        price: Number(price),
        status,
      });
      alert("Product added successfully!");
      onClose(); // Close modal after adding
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Add Product</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Product Name"
            className="w-full border p-2 mb-2"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Category"
            className="w-full border p-2 mb-2"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Price"
            className="w-full border p-2 mb-2"
            value={price}
            onChange={(e) => setPrice(e.target.value ? Number(e.target.value) : "")}
            required
          />
          <select
            className="w-full border p-2 mb-2"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Available">Available</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>
          <div className="flex justify-end">
            <button type="button" className="mr-2 px-4 py-2 bg-gray-400 text-white rounded" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
