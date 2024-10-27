"use client";
import VideoCard from "@/components/VideoCard";
import { useGetAllVideo } from "@/services/api/video/useGetAllVideo";
import { VideoTiktokType } from "@/types/tiktok.type";
import { useEffect, useState } from "react";
import { useContentVideoContext } from "./ContentVideoProvider";

const VideoList = () => {
  const { videos } = useContentVideoContext();

  return (
    <div className="grid grid-cols-6 gap-4 max-xl:grid-cols-5 max-lg:grid-cols-4 max-md:grid-cols-3 max-[500px]:grid-cols-2">
      {videos.map((_, i) => (
        <VideoCard key={i} video={_} />
      ))}
    </div>
  );
};

export default VideoList;
