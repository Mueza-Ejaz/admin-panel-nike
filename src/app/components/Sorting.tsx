import React from "react";

// Define the valid sorting criteria keys
type SortCriteria = "productName" | "category" | "price" | "status";

interface SortingProps {
  onSort: (criteria: SortCriteria) => void; // Make sure it's expecting SortCriteria
}

const Sorting: React.FC<SortingProps> = ({ onSort }) => {
  return (
    <div>
      <button onClick={() => onSort("productName")} className="bg-gray-200 px-4 py-2 rounded">
        Sort by Product Name
      </button>
      <button onClick={() => onSort("category")} className="bg-gray-200 px-4 py-2 rounded ml-2">
        Sort by Category
      </button>
      <button onClick={() => onSort("price")} className="bg-gray-200 px-4 py-2 rounded ml-2">
        Sort by Price
      </button>
      <button onClick={() => onSort("status")} className="bg-gray-200 px-4 py-2 rounded ml-2">
        Sort by Status
      </button>
    </div>
  );
};

export default Sorting;
