"use client";

import { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import ProductTable from "./ProductTable";
import AddProductModal from "../AddProductModal";

const ProductsPage = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <DashboardLayout>
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Products</h1>
        <button 
          className="bg-blue-500 text-white px-4 py-2 rounded" 
          onClick={() => setShowModal(true)}
        >
          + Add Product
        </button>
      </div>

      <ProductTable />

      {showModal && <AddProductModal onClose={() => setShowModal(false)} />}
    </DashboardLayout>
  );
};

export default ProductsPage;
