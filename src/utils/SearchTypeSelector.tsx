import React, { ChangeEvent } from "react";

interface SearchTypeSelectorProps {
  searchType: string;
  onSearchTypeChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const SearchTypeSelector: React.FC<SearchTypeSelectorProps> = ({ searchType, onSearchTypeChange }) => (
  <select
    value={searchType}
    onChange={onSearchTypeChange}
    className="border rounded p-2 h-14 "
  >
    <option value="Select Link Type">Select Link Type</option>
    <option value="Youtube URL">Youtube URL</option>
    <option value="Youtube Channel">Youtube Channel</option>
  </select>
);

export default SearchTypeSelector;
