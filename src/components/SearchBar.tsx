import React, { useState, ChangeEvent, useEffect } from "react";
import youtube from "../apis/youtube";
import { VideoCardProps } from "../interfaces/interfaces";
import axios from "axios";
import SearchTypeSelector from "../utils/SearchTypeSelector";
import InputField from "../utils/InputField";
import SearchButton from "../utils/SearchButton";
import LanguageSelector from "../utils/LanguageSelector";
import ErrorDisplay from "../utils/ErrorDisplay";
import VideoList from "../utils/VideoList";

const SearchBar: React.FC = () => {
  const [searchType, setSearchType] = useState<string>("Select Link Type");
  const [inputValue, setInputValue] = useState<string>("");
  const [allVideoData, setAllVideoData] = useState<VideoCardProps[]>([]);
  const [responseData, setResponseData] = useState<VideoCardProps | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("en");
  const [searchHistory, setSearchHistory] = useState<VideoCardProps[]>([]);

  const storedHistory = localStorage.getItem("youtubeSearchHistory");
  useEffect(() => {
    if (storedHistory) {
      setSearchHistory(JSON.parse(storedHistory));
    }
  }, [storedHistory]);

  const handleSearchTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSearchType(event.target.value);
    setError(null);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setError(null);
  };

  const handleLanguageChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(event.target.value);
  };

  const extractYouTubeVideoID = (url: string): string | null => {
    const pattern = /(?:v=|\/)([0-9A-Za-z_-]{11}).*/;
    const match = url.match(pattern);
    return match ? match[1] : null;
  };

  const fetchCaptions = async (videoID: string) => {
    try {
      const videoCaptions = await axios.get("http://localhost:5000/subtitles", {
        params: { videoID, lang: selectedLanguage },
      });
      return videoCaptions.data;
    } catch (error) {
      console.error(`Error fetching subtitles for video ${videoID}:`, error);
      return null;
    }
  };
  function convertDuration(duration: string) {
    const regex = /PT(\d+H)?(\d+M)?(\d+S)?/;
    const matches = duration.match(regex);
    if (!matches) return;
    const hours = matches[1] ? parseInt(matches[1]) : 0;
    const minutes = matches[2] ? parseInt(matches[2]) : 0;
    const seconds = matches[3] ? parseInt(matches[3]) : 0;

    return `0${hours}:${minutes}:${seconds}`;
  }

  const handleSearch = async () => {
    setIsLoading(true);
    setError(null);
    setInputValue("")

    try {
      if (searchType === "Select Link Type") {
        setIsLoading(false);
        setError("Please select a link type from the dropdown.");
        return;
      }

      const isValidInput =
        (searchType === "Youtube URL" && inputValue) ||
        (searchType === "Youtube Channel" && inputValue.includes("com/@"));

      if (!isValidInput) {
        setIsLoading(false);
        setError("Please enter a valid detail for the selected link type.");
        return;
      }


      if (searchType === "Youtube URL") {
        const videoID = extractYouTubeVideoID(inputValue);
        if (!videoID) return;
        const mydata = await youtube.get("/videos", {
          params: {
            id: videoID,
            part: "contentDetails,snippet",
          },
        });
        console.log(mydata);
        const videoData = mydata.data.items[0].snippet;
        const videoDuration = convertDuration(
          mydata.data.items[0].contentDetails.duration
        );

        const captions = await fetchCaptions(videoID);
        if (!captions || !videoDuration) {
          setIsLoading(false);
          return setError(
            `No captions Found for "${selectedLanguage}" language`
          );
        }
        const newVideo: VideoCardProps = {
          thumbnail: videoData.thumbnails.medium.url,
          channelTitle: videoData.channelTitle,
          title: videoData.title,
          videoID: videoID,
          duration: videoDuration,
          captions: captions || [],
          inputValue: inputValue,
        };

        setResponseData(newVideo);
        setAllVideoData([]);

        const existingHistory = [...searchHistory];
        const isAlreadyStored = existingHistory.some(
          (video) =>
            video.channelTitle === newVideo.channelTitle &&
            video.videoID === newVideo.videoID
        );

        if (!isAlreadyStored) {
          const updatedHistory = [...existingHistory, newVideo];
          setSearchHistory(updatedHistory);
          localStorage.setItem(
            "youtubeSearchHistory",
            JSON.stringify(updatedHistory)
          );
        }
      } else if (searchType === "Youtube Channel") {
        const response = await youtube.get("/search", {
          params: {
            q: inputValue,
          },
        });
        const channelId = response.data.items[0].snippet.channelId;
        const videoDataResponse = await youtube.get("/search", {
          params: {
            channelId,
            order: "date",
            part: "snippet",
            maxResults: 20,
          },
        });
        const videoDataArray = videoDataResponse.data.items.map(
          (item: any) => ({
            thumbnail: item.snippet.thumbnails.medium.url,
            channelTitle: item.snippet.channelTitle,
            title: item.snippet.title,
          })
        );
        setAllVideoData(videoDataArray);
        setResponseData(null);
      }

      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
      setError("Youtube Video Not Found. Please Check the URL");
    }
  };

  return (
    <>
      <h1 className="m-4 text-center text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-4xl">
        Search the video link or video channel from youtube.
      </h1>
      <div className="flex justify-center items-center space-x-2 mt-6">
        <SearchTypeSelector
          searchType={searchType}
          onSearchTypeChange={handleSearchTypeChange}
        />
        <InputField
          value={inputValue}
          onChange={handleInputChange}
          placeholder={`Search in ${searchType}`}
        />
        <SearchButton isLoading={isLoading} onClick={handleSearch} />
        <LanguageSelector
          selectedLanguage={selectedLanguage}
          onLanguageChange={handleLanguageChange}
        />
      </div>
      <ErrorDisplay error={error} />
      {!isLoading && (
        <>
          {searchType === "Youtube URL" && responseData && (
            <VideoList videos={[responseData]} />
          )}
          {searchType === "Youtube Channel" && allVideoData.length > 0 && (
            <VideoList videos={allVideoData} />
          )}
          {searchType === "Select Link Type" && searchHistory.length > 0 && (
            <>
              <h2 className=" p-4 text-2xl font-bold mt-5">Search History</h2>
              <VideoList videos={searchHistory} />
            </>
          )}
        </>
      )}
    </>
  );
};

export default SearchBar;
