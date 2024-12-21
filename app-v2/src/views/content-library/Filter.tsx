"use client";
import Image from "next/image";
import BannerImage from "@/assets/images/banner_trending.png";
import { useEffect, useState } from "react";
import TiktokLogo from "@/assets/images/tiktok_icon.svg";
import VideoLogo from "@/assets/images/video_library.svg";
import ImageLogo from "@/assets/images/broken_image.svg";
import DropdownV2 from "@/packages/@ui-kit/Dropdown2";
import Input from "@/components/@core/Input";
import { IoSearchOutline } from "react-icons/io5";
import DropdownHor from "@/packages/@ui-kit/Dropdown3";
import DropdownItem from "@/packages/@ui-kit/Dropdown3/DropdownItem";
import { useContentContext } from "@/services/ContentProvider";
import {
  brandHashtags,
  filterDate,
  hashtags,
  tabs,
  trendingHashtags,
} from "./data";
import { FilterTabTrending } from "./FilterTabTrending";
import { FilterTabFootage } from "./FilterTabFootage";
import { FilterTabBrand } from "./FilterTabBrand";
import TrendingList from "./TrendingList";
import BrandList from "./BrandList";
import BrandInspiration from "./BrandInspiration";
import BrandInspiration2 from "./BrandInspiration2";

const Filter = () => {
  const [tabActive, setTabActive] = useState(tabs[0]);
  return (
    <>
      <div className="max-w-app sticky -top-[140px] z-10">
        <div className="">
          <Image
            src={BannerImage}
            alt="banner_trending"
            className="w-full rounded-lg"
          />
        </div>

        <div className="min-h-20 w-full rounded-b-md bg-white px-4 pt-2">
          <div className="flex gap-4 border-b">
            {tabs.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`h-8 cursor-pointer text-grays/50 ${tabActive == item && "border-b border-primary text-primary"} `}
                  onClick={() => setTabActive(item)}
                >
                  <p className="font-bold">{item}</p>
                </div>
              );
            })}
          </div>

          {tabActive == tabs[0] && <FilterTabTrending />}
          {tabActive == tabs[1] && <FilterTabFootage />}
          {tabActive == tabs[2] && <FilterTabBrand />}
        </div>
      </div>

      <div>
        {tabActive == tabs[0] && <TrendingList />}
        {tabActive == tabs[1] && <BrandList />}
        {tabActive == tabs[2] && <BrandInspiration2 />}
      </div>
    </>
  );
};

export default Filter;
