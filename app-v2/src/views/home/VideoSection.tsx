"use client";

import Image from "next/image";
import VideoIcon from "@/assets/images/video_highlight.svg";
import VideoMobileIcon from "@/assets/images/video_highlight_mobile.svg";
import VideoCard from "@/components/VideoCard";
import { useContentContext } from "@/services/ContentProvider";

const VideoSection = () => {
  const { videos } = useContentContext();
  return (
    <div className="relative flex gap-8 max-sm:flex-col max-sm:items-center max-sm:gap-4">
      <div className="z-20 h-full w-[185px] gap-4 max-sm:w-full">
        <Image
          src={VideoIcon}
          alt=""
          //   width={185}
          //   height={200}
          className="min-w-[185px] max-sm:hidden"
        />

        <Image
          src={VideoMobileIcon}
          alt=""
          width={400}
          height={200}
          className="h-[48px] w-full rounded-lg object-cover sm:hidden"
        />
      </div>

      <div className="flex w-full items-center gap-4 overflow-auto">
        {videos.slice(0, 15).map((_, index) => {
          return <VideoCard videoData={_} key={index} />;
        })}
      </div>
    </div>
  );
};

export default VideoSection;
