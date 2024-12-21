"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import ContentLibraryIcon from "@/assets/images/content_library.svg";
import AffiliateIcon from "@/assets/images/affiliate_leaderboard.svg";
import HoaHongIcon from "@/assets/images/hh_icon.svg";
import ChienDichDacBiet from "@/assets/images/special-campaign.png";
import FeaturedVideo from "@/assets/images/featured-video.png";
import Ranking from "@/assets/images/ranking.png";

const Title = () => {
  const router = useRouter();

  return (
    <div className="w-full overflow-hidden rounded-md bg-white px-2 py-4 shadow-md max-md:-mt-10">
      <div className="flex items-center justify-around gap-4 max-sm:flex-col max-sm:gap-2">
        <Image
          className="flex-1 cursor-pointer transition-all hover:scale-105"
          src={ContentLibraryIcon}
          alt=""
          onClick={() => {
            router.push("/content-library");
          }}
        />

        <Image
          className="flex-1 cursor-pointer transition-all hover:scale-105"
          src={AffiliateIcon}
          alt=""
          onClick={() => {
            router.push("/leaderboard");
          }}
        />
      </div>

      <div className="mt-4 flex justify-between gap-4 max-sm:grid max-sm:grid-cols-2">
        <button
          className="flex flex-1 flex-col items-center justify-center gap-3 hover:text-primary"
          onClick={() => {
            router.push("/product");
          }}
        >
          <Image
            src={HoaHongIcon}
            className="h-[72px] w-[72px] max-sm:h-[30px] max-sm:w-[30px]"
            alt=""
          />
          <p className="text-sm font-bold max-sm:text-xs">Hoa hồng cực cao</p>
        </button>
        <button
          className="flex flex-1 flex-col items-center justify-center gap-3 hover:text-primary"
          onClick={() => {
            router.push("/campaign");
          }}
        >
          <Image
            src={ChienDichDacBiet}
            className="h-[72px] w-[72px] max-sm:h-[30px] max-sm:w-[30px]"
            alt=""
          />
          <p className="text-sm font-bold max-sm:text-xs">
            Chiến dịch đặc biệt
          </p>
        </button>
        <button
          className="flex flex-1 flex-col items-center justify-center gap-3 hover:text-primary"
          onClick={() => router.push("/content-library")}
        >
          <Image
            src={FeaturedVideo}
            className="h-[72px] w-[72px] max-sm:h-[30px] max-sm:w-[30px]"
            alt=""
          />
          <p className="text-sm font-bold max-sm:text-xs">Video nổi bật</p>
        </button>
        <button
          className="flex flex-1 flex-col items-center justify-center gap-3 hover:text-primary"
          // onClick={() => scrollToSection(topMCNRef)}
          onClick={() => {
            router.push("/leaderboard");
          }}
        >
          <Image
            src={Ranking}
            className="h-[72px] w-[72px] max-sm:h-[30px] max-sm:w-[30px]"
            alt=""
          />
          <p className="text-sm font-bold max-sm:text-xs">Bảng Xếp Hạng</p>
        </button>
      </div>
    </div>
  );
};

export default Title;
