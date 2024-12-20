"use client";

import Image from "next/image";
import VideoIcon from "@/assets/images/video_highlight.svg";
import VideoMobileIcon from "@/assets/images/video_highlight_mobile.svg";
import VideoCard from "@/components/VideoCard";
import { useContentContext } from "@/services/ContentProvider";
import Button from "@/packages/@ui-kit/Button2";
import { useRouter } from "next/navigation";

const VideoSection = () => {
  const router = useRouter();
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

      <div className="flex-1 overflow-auto">
        <div className="relative">
          <div className="flex w-full flex-1 gap-4 overflow-auto px-1 py-2">
            {/* <div
              onClick={handleScrollLeft}
              className="absolute left-1 top-1/2 z-10 grid -translate-y-1/2 cursor-pointer place-items-center rounded-full border border-line bg-[#eff3fb] text-4xl font-bold text-primary transition-all hover:brightness-110 active:scale-95"
            >
              <IoIosArrowBack className="relative -translate-x-0.5" />
            </div> */}
            <div className="flex w-full items-center gap-4 overflow-auto">
              {videos.slice(0, 15).map((_, index) => {
                return <VideoCard videoData={_} key={index} />;
              })}
            </div>
          </div>
          <div className="mx-auto mt-4 w-fit overflow-auto">
            <Button
              title="Xem thêm"
              className=""
              onClick={() => router.push("/content-library")}
            />
          </div>
        </div>
      </div>

      {/* <div className="flex flex-col gap-4">
        <div className="mx-auto mt-4 w-fit overflow-auto">
          <Button
            title="Xem thêm"
            className=""
            onClick={() => router.push("/leaderboard")}
          />
        </div>
      </div> */}
    </div>
  );
};

export default VideoSection;
