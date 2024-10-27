"use client";

import ImageKit from "@/packages/@ui-kit/Image";
import { useRouter } from "next/navigation";
import { GrView } from "react-icons/gr";
import { FcLike } from "react-icons/fc";

import PyramidIcon from "@/assets/images/pyramids.svg";
import Button from "@/packages/@ui-kit/Button";
import TiktokIcon from "@/assets/images/tiktok_icon.svg";
import { VideoTiktokType } from "@/types/tiktok.type";
import { formatNumberToK } from "@/utils/string";
import { useState } from "react";
import ModalProfile from "../Modal/ModalProfile";

interface VideoProps {
  video?: VideoTiktokType;
}

const VideoCard: React.FC<VideoProps> = (props) => {
  const { video } = props;
  const router = useRouter();
  const [showProfileTiktoker, setShowProfileTiktoker] = useState(false);

  const navigateProductDetail = () => {
    // router.push("/product/1");
    setShowProfileTiktoker(true);
  };

  return (
    <>
      <ModalProfile
        isShow={showProfileTiktoker}
        setIsShow={setShowProfileTiktoker}
        video={video}
      />
      <div
        className="relative flex h-[270px] w-[185px] cursor-pointer flex-col rounded-lg shadow-card transition-all"
        onClick={navigateProductDetail}
        // href={"https://www.tiktok.com/@/video/" + video?.id}
        // target="_blank"
      >
        <ImageKit
          src={video?.video.cover}
          className="h-[185px] w-full rounded-lg"
        />

        <div className="flex flex-1 flex-col justify-between px-3 py-[10px]">
          <div className="flex gap-1">
            <ImageKit src={TiktokIcon} className="h-4 w-4" />
            <p className="line-clamp-2 text-xs font-bold text-primary">
              {video?.desc}
            </p>
          </div>

          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1">
              <GrView className="text-primary" />
              <p className="text-grays/50">
                {formatNumberToK(video?.stats.playCount)}
              </p>
            </div>
            <div className="flex items-center gap-1">
              <FcLike className="text-primary" />
              <p className="text-grays/50">
                {formatNumberToK(video?.stats.diggCount)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoCard;
