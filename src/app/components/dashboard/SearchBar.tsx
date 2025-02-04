import React from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <div className="flex items-center border border-gray-300 rounded-lg shadow-lg p-2 w-full max-w-md">
      <input
        type="text"
        onChange={handleSearchChange}
        placeholder="Search products..."
        className="w-full p-2 text-gray-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out">
        Search
      </button>
    </div>
  );
};

export default SearchBar;
