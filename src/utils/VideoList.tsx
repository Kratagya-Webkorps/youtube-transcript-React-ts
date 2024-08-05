import React, { useEffect, useState } from "react";
import { VideoCardProps } from "../interfaces/interfaces";
import VideoCard from "./VideoCard";

interface VideoListProps {
  videos?: VideoCardProps[];
}

const VideoList: React.FC<VideoListProps> = ({ videos = [] }) => {
  const [key, setKey] = useState<boolean>(true);
  const path = window.location.pathname;

  useEffect(() => {
    if (path === "/searchCaptions") setKey(false);
  }, [path]);
console.log("object");
  return (
    <div
      className={
        key
          ? " p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
          : "flex flex-col"
      }
    >

      {videos.map((video) => (
        <VideoCard
          key={video.title}
          thumbnail={video.thumbnail}
          title={video.title}
          channelTitle={video.channelTitle}
          duration={video.duration}
          captions={video.captions}
          inputValue={video.inputValue}
          videoID={video.videoID}
        />
      ))}
    </div>
  );
};

export default VideoList;
