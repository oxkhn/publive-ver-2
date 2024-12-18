"use client";
import VideoCard from "@/components/VideoCard";
import { useContentContext } from "@/services/ContentProvider";

const TrendingList = () => {
  const { videos } = useContentContext();
  return (
    <div className="grid grid-cols-[repeat(auto-fill,_minmax(158px,_1fr))] justify-between gap-x-8 gap-y-4 max-sm:gap-x-4">
      {videos.map((item, index) => {
        return <VideoCard videoData={item} key={index} />;
      })}
    </div>
  );
};

export default TrendingList;
