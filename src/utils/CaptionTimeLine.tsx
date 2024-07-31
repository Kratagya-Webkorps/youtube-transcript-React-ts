import React, { useState } from "react";
import { CaptionProp } from "../interfaces/interfaces";
import VideoModal from "./VideoModal";
import { FaDotCircle } from "react-icons/fa";

interface CaptionTimelineProps {
  captions: CaptionProp[];
  videoId: string;
}

const CaptionTimeline: React.FC<CaptionTimelineProps> = ({
  captions,
  videoId,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");

  const totalCaptions = captions.length;

  function removeAfterDot(str: string): string {
    return str.split(".")[0];
  }

  const handleClick = (caption: CaptionProp) => {
    const startTime = removeAfterDot(caption.start);
    const url = `https://www.youtube.com/embed/${videoId}?start=${startTime}`;

    setVideoUrl(url);
    setIsModalOpen(true);
  };

  const formatTime = (seconds: string): string => {
    const totalSeconds = parseInt(removeAfterDot(seconds), 10);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    if (hours > 0) {
      return `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    } else {
      return `${minutes.toString().padStart(2, "0")}:${secs
        .toString()
        .padStart(2, "0")}`;
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="mt-4 p-4 bg-red-50 rounded-lg">
      <div className="relative w-full h-8">
        <div className="absolute top-1/2 w-full h-1 bg-red-200 rounded-full transform -translate-y-1/2">
          {captions.map((caption, index) => {
            const position = (index / totalCaptions) * 100;
            return (
              <FaDotCircle
                className="absolute  cursor-pointer -translate-y-1/3	 text-red-500"
                title={caption.text}
                style={{ left: `${position}%` }}
                key={index}
                onClick={() => handleClick(caption)}
              />
            );
          })}
        </div>
      </div>
      <div className="overflow-x-auto mt-4 ">
        <div className="whitespace-nowrap divide-x-[3px] 	 ">
          {captions.map((caption, index) => (
            <div
              onClick={() => handleClick(caption)}
              key={index}
              className="inline-block px-4 py-2 cursor-pointer"
            >
              <p className="text-red-600 font-semibold">
                From {formatTime(caption.start)} sec
              </p>
              <p className="text-gray-600">{caption.text}</p>

            </div>
          ))}
        </div>
      </div>
      <VideoModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        videoUrl={videoUrl}
      />
    </div>
  );
};

export default CaptionTimeline;
