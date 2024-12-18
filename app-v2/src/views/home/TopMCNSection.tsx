"use client";
import Image from "next/image";
import MCNIcon from "@/assets/images/top_mcn.svg";
import MCNMobileIcon from "@/assets/images/top_mcn_mobile.svg";

import VideoCard from "@/components/VideoCard";

const TopMCNSection = () => {
  return (
    <div className="relative flex gap-8 max-sm:flex-col max-sm:items-center max-sm:gap-4">
      <div className="z-20 h-full w-[185px] gap-4 max-sm:w-full">
        <Image
          src={MCNIcon}
          alt=""
          width={185}
          height={200}
          className="h-full w-[185px] max-sm:hidden"
        />

        <Image
          src={MCNMobileIcon}
          alt=""
          width={400}
          height={200}
          className="h-[48px] w-full object-cover sm:hidden"
        />
      </div>
    </div>
  );
};

export default TopMCNSection;
