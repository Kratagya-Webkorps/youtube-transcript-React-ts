import React, { useEffect, useState } from "react";
import { CaptionProp, VideoCardProps } from "../interfaces/interfaces";
import CaptionTimeline from "./CaptionTimeLine";
import { FaMinus } from "react-icons/fa6";
import { Link } from "react-router-dom";

const VideoCard: React.FC<VideoCardProps> = ({
  thumbnail,
  title,
  channelTitle,
  duration,
  captions,
  inputValue,
  videoID,
}) => {
  const [filteredCaptions, setFilteredCaptions] = useState<CaptionProp[]>();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isHidden, setIsHidden] = useState<string>("");
  const [key, setKey] = useState<boolean>(true);
  const path = window.location.pathname;
  console.log({
    thumbnail,
    title,
    channelTitle,
    duration,
    captions,
    inputValue,
    videoID,
  });
  useEffect(() => {
    if (inputValue) {
      const result = captions?.filter((caption) =>
        caption.text.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredCaptions(result);
    } else {
      setFilteredCaptions(undefined);
    }
  }, [inputValue, captions]);

  useEffect(() => {
    if (path === "/searchCaptions") setKey(false);
  }, [path]);

  const handleRemove = (videoID: string) => {
    const storedHistory = localStorage.getItem("youtubeSearchHistory");
    if (!storedHistory) return;

    const storedData = JSON.parse(storedHistory);

    const updatedData = storedData.filter(
      (data: VideoCardProps) => data.videoID !== videoID
    );
    localStorage.setItem("youtubeSearchHistory", JSON.stringify(updatedData));
    setIsHidden("hidden");
  };

  const toggleDropdown = async () => {
    console.log(captions);
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <div
        onClick={toggleDropdown}
        className={
          key
            ? `relative m-4 ${isHidden} flex-row bg-white border border-gray-200 rounded-lg shadow`
            : `relative m-4 ${isHidden} flex bg-white border border-gray-200 rounded-lg shadow`
        }
      >
        <button
          onClick={() => handleRemove(videoID)}
          className="absolute -top-2 -right-4 p-2 bg-red-600 text-white rounded-full focus:outline-none"
        >
          <FaMinus />
        </button>
        <img
          className={
            key
              ? "rounded-t-lg object-cover w-full"
              : "rounded-t-lg object-cover w-96"
          }
          src={thumbnail}
          alt=""
        />

        <div className="p-4 justify-between">
          <div>
            <h5 className="text-xl font-bold tracking-tight text-gray-900 ">
              {title}
            </h5>
            <div className="flex-col lg:flex-row lg:flex lg:items-end gap-1 mt-2 text-gray-700">
              <p className="mb-3 font-medium ">{duration}</p>
              <Link to={`https://www.youtube.com/embed/${videoID}`}>
                {" "}
                <p className="mb-3 font-extrabold mx-5 underline">
                  {channelTitle}
                </p>
              </Link>
            </div>
            {inputValue.length > 0 &&
              filteredCaptions &&
              filteredCaptions.length > 0 && (
                <div className="mt-2">
                  <h6 className="font-bold text-red-700 ">
                    Captions containing "{inputValue}" found
                  </h6>
                </div>
              )}
          </div>
        </div>
      </div>
      {isDropdownOpen && filteredCaptions && filteredCaptions.length > 0 && (
        <div className="mt-2 p-2 rounded-lg">
          <CaptionTimeline captions={filteredCaptions} videoId={videoID} />
        </div>
      )}
    </>
  );
};

export default VideoCard;

//https://api.mymemory.translated.net/get?q=salary&langpair=hi|en
//this api can be used to translate one lang to another
