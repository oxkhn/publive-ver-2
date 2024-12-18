"use client";

import Image from "next/image";
import ImageDemo from "@/assets/images/demo.jpg";
import { GrView } from "react-icons/gr";
import { FcLike } from "react-icons/fc";
import TiktokIcon from "@/assets/images/tiktok_icon.svg";
import { useState } from "react";
import { ITiktokVideo } from "@/types/tiktok.type";
import { FiDownload } from "react-icons/fi";
import Button from "@/packages/@ui-kit/Button";

type Props = {
  videoData?: ITiktokVideo;
};

const BrandVideo = (props: Props) => {
  const { videoData } = props;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative flex h-[280px] min-w-[185px] cursor-pointer flex-col overflow-hidden rounded-lg border bg-white transition-all duration-200 hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {}}
    >
      <div className="overflow-hidden">
        <Image
          src={videoData?.image || ImageDemo}
          alt=""
          width={185}
          height={185}
          className={`${isHovered && "scale-125"} h-[185px] w-[185px] rounded-lg object-cover transition-all duration-500`}
        />
      </div>

      <div className="flex flex-1 flex-col justify-between px-3 py-[10px]">
        <div className="flex gap-1">
          {/* <Image
            src={TiktokIcon}
            alt=""
            width={16}
            height={16}
            className="h-4 w-4"
          /> */}
          <p className="line-clamp-2 text-xs font-bold text-primary">
            {videoData?.title}
          </p>
        </div>

        <div className="mt-1 flex items-center justify-between">
          <div className="grid h-7 w-7 place-items-center rounded-full bg-gray-200 p-1 transition-all hover:bg-primary hover:text-white">
            <FiDownload className="text-sm" />
          </div>
          <div className="flex items-center justify-end gap-3 text-xs">
            <div className="flex items-center gap-1">
              <GrView className="text-primary" />
              <p className="text-grays/50">2k</p>
            </div>
            <div className="flex items-center gap-1">
              <FiDownload className="text-primary" />
              <p className="text-grays/50">2k</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandVideo;
