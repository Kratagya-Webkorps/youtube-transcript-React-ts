import React, { ChangeEvent, useEffect, useState } from "react";
import InputField from "../utils/InputField";
import VideoList from "../utils/VideoList";
import { VideoCardProps } from "../interfaces/interfaces";
import { useDebounce } from "../hooks/Debounce";

const CaptionsList: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [searchHistory, setSearchHistory] = useState<VideoCardProps[]>([]);
  const debouncedInputValue = useDebounce(inputValue, 300);

  useEffect(() => {
    const storedHistory = localStorage.getItem("youtubeSearchHistory");
    if (storedHistory) {
      setSearchHistory(JSON.parse(storedHistory));
    }
  }, []);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="flex flex-col justify-center items-center space-x-2 mt-10">
      <h1 className="m-4 text-center text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-4xl">
        Search the text you want to find in the Selected Videos
      </h1>
      <InputField
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Search any word"
      />
      {searchHistory.length > 0 && (
        <div className="w-2/3">
          <h2 className="text-2xl font-bold mt-5">Search History</h2>
          <VideoList videos={searchHistory.map(video => ({ ...video, inputValue: debouncedInputValue }))} />
        </div>
      )}
    </div>
  );
};

export default CaptionsList;
