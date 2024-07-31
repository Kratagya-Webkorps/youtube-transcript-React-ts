import React from "react";

interface CaptionSearchButtonProps {
  isLoading: boolean;
  onClick: () => void;
}

const CaptionSearchButton: React.FC<CaptionSearchButtonProps> = ({ isLoading, onClick }) => (
  <button
    onClick={onClick}
    className="h-14 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
  >
    {isLoading ? "Searching" : "Fetch Captions for All Videos"}
  </button>
);

export default CaptionSearchButton;
