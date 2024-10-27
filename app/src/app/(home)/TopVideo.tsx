"use client";
import ImageKit from "@/packages/@ui-kit/Image";

import ImageTopVideo from "@/assets/images/video_2.svg";
import VideoCard from "@/components/VideoCard";
import { useGetAllVideo } from "@/services/api/video/useGetAllVideo";
import { useEffect, useState, useRef } from "react";
import { VideoTiktokType } from "@/types/tiktok.type";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import Button from "@/packages/@ui-kit/Button";

const TopVideo = () => {
  const [videos, setVideos] = useState<VideoTiktokType[]>([]);
  const _getAllVideo = useGetAllVideo();
  const router = useRouter();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleGetData = async () => {
    const body = {
      limit: 100,
      page: 1,
      name: "",
    };
    try {
      const res = await _getAllVideo.mutateAsync(body);
      const arr = res.data.slice(0, 6);

      setVideos(arr);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetData();
  }, []);

  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300,
        behavior: "smooth",
      });
    }
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        if (scrollContainerRef.current.scrollLeft === 0) {
          setScrollPosition(0);
        } else if (
          scrollContainerRef.current.scrollLeft >=
          scrollContainerRef.current.scrollWidth -
            scrollContainerRef.current.clientWidth
        ) {
          setScrollPosition(1);
        } else {
          setScrollPosition(-1);
        }
      }
    };

    scrollContainerRef.current?.addEventListener("scroll", handleScroll);
    return () => {
      scrollContainerRef.current?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="mt-[100px] flex w-full gap-8 max-md:mt-20 max-md:flex-col max-md:gap-2">
      <ImageKit
        src="/decor/decor_homepage_2.svg"
        className="absolute left-0 -z-[1] w-1/3"
      />

      <div className="flex h-fit w-[185px] flex-col max-md:hidden">
        <ImageKit
          src={ImageTopVideo}
          className="h-full w-[185px] min-w-[185px] cursor-pointer"
          onClick={() => {
            router.push("/content-library");
          }}
        />
      </div>
      <div className="md:hidden">
        <p className="text-2xl font-bold">Video highlight</p>
      </div>

      <div className="max-w-full overflow-auto">
        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="grid w-full flex-1 grid-flow-col grid-rows-1 gap-4 overflow-auto p-1"
          >
            <div
              onClick={handleScrollLeft}
              className={`${scrollPosition == 0 && "opacity-0"} absolute left-1 top-1/2 z-10 grid -translate-y-1/2 cursor-pointer place-items-center rounded-full border border-line bg-[#eff3fb] text-4xl font-bold text-primary opacity-100 transition-all hover:brightness-110 active:scale-95`}
            >
              <IoIosArrowBack className="relative -translate-x-0.5" />
            </div>

            {videos?.map((video, i) => <VideoCard key={i} video={video} />)}

            <div
              onClick={handleScrollRight}
              className={`${scrollPosition == 1 && "opacity-0"} absolute right-1 top-1/2 z-10 grid -translate-y-1/2 cursor-pointer place-items-center rounded-full border border-line bg-[#eff3fb] text-4xl font-bold text-primary opacity-100 transition-all hover:brightness-110 active:scale-95`}
            >
              <IoIosArrowForward className="relative translate-x-0.5" />
            </div>
          </div>
        </div>
        <div className="mx-auto mt-4 w-fit">
          <Button
            title="View All"
            className="min-w-[200px] !rounded-full"
            onClick={() => router.push("/content-library")}
          />
        </div>
      </div>
    </div>
  );
};

export default TopVideo;
