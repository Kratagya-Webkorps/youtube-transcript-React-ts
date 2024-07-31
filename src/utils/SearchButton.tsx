import React from "react";

interface SearchButtonProps {
  isLoading: boolean;
  onClick: () => void;
}

const SearchButton: React.FC<SearchButtonProps> = ({ isLoading, onClick }) => (
  <button
    onClick={onClick}
    className="h-14 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
  >
    {isLoading ? "Adding" : "Add"}
  </button>
);

export default SearchButton;
