"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

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
import ChipRemove from "@/packages/@ui-kit/ChipRemove";

export const FilterTabTrending = () => {
  const [searchValue, setSearchValue] = useState("");
  const [filterDateActive, setFilterDateActive] = useState(filterDate[0]);
  const [hashtagSelect, setHashtagSelect] = useState("");
  const [brandHashtagsSelect, setBrandHashtagsSelect] = useState("");
  const [trendingHashtagsSelect, setTrendingHashtagsSelect] = useState("");
  const { filterTiktok, updateFilterTiktok } = useContentContext();

  // Debounce effect
  useEffect(() => {
    const handler = setTimeout(() => {
      updateFilterTiktok("title", searchValue);
    }, 500); // 500ms sau khi người dùng ngừng gõ

    return () => {
      clearTimeout(handler);
    };
  }, [searchValue]);

  return (
    <div className="sticky top-20">
      <div className="z-10 flex justify-between gap-4 border-b py-2">
        <div className="flex items-center gap-4">
          <div className="cursor-pointer p-1">
            <Image src={TiktokLogo} alt="" />
          </div>

          <div className="h-6 w-[1px] bg-grays/15"></div>

          <div className="flex gap-2">
            <div className="grid cursor-pointer place-items-center p-1">
              <Image src={VideoLogo} alt="" className="h-5" />
            </div>
            <div className="grid cursor-pointer place-items-center p-1">
              <Image src={ImageLogo} alt="" className="h-5" />
            </div>
          </div>

          <div className="h-6 w-[1px] bg-grays/15"></div>

          <div className="item-start flex gap-4 py-2">
            <div className="flex items-center gap-2">
              <p className="text-sm">Thời gian</p>
              <DropdownHor
                defaultValue={filterDateActive}
                onSelected={(index) => {
                  updateFilterTiktok("createAt", filterDate[index].value);
                  setFilterDateActive(filterDate[index]);
                }}
                classElementCustom=""
                className="!h-6"
              >
                {filterDate.map((_, i) => (
                  <DropdownItem key={i} title={_.title} />
                ))}
              </DropdownHor>
            </div>
            <div className="h-6 w-[1px] bg-grays/15"></div>
            <div className="flex items-center gap-2">
              <p className="text-sm">Hashtag</p>
              <DropdownHor
                defaultValue={hashtags[0]}
                value={hashtagSelect}
                onSelected={(index) => {
                  updateFilterTiktok("hashtags", [
                    ...filterTiktok.hashtags,
                    hashtags[index],
                  ]);
                  setHashtagSelect(hashtags[index]);
                }}
                classContainer=""
                className="!h-6"
              >
                {hashtags.map((_, i) => (
                  <DropdownItem key={i} title={_} />
                ))}
              </DropdownHor>
            </div>
            <div className="h-6 w-[1px] bg-grays/15"></div>
            <div className="flex items-center gap-2">
              <p className="text-sm">Brand hashtag</p>
              <DropdownHor
                defaultValue={brandHashtags[0]}
                value={brandHashtagsSelect}
                onSelected={(index) => {
                  updateFilterTiktok("hashtags", [
                    ...filterTiktok.hashtags,
                    brandHashtags[index],
                  ]);
                  setBrandHashtagsSelect(brandHashtags[index]);
                }}
                classContainer=""
                className="!h-6"
              >
                {brandHashtags.map((_, i) => (
                  <DropdownItem key={i} title={_} />
                ))}
              </DropdownHor>
            </div>
            <div className="h-6 w-[1px] bg-grays/15"></div>
            <div className="flex items-center gap-2">
              <p className="text-sm">Trending topic</p>
              <DropdownHor
                defaultValue={trendingHashtags[0]}
                value={trendingHashtagsSelect}
                onSelected={(index) => {
                  updateFilterTiktok("hashtags", [
                    ...filterTiktok.hashtags,
                    trendingHashtags[index],
                  ]);
                  setTrendingHashtagsSelect(trendingHashtags[index]);
                }}
                classContainer=""
                className="!h-6"
              >
                {trendingHashtags.map((_, i) => (
                  <DropdownItem key={i} title={_} />
                ))}
              </DropdownHor>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between gap-10 py-2">
        <div className="flex flex-wrap">
          {filterTiktok.hashtags.map((item, index) => {
            return (
              <ChipRemove
                title={item}
                key={index}
                onClick={() => {
                  const newList = filterTiktok.hashtags.filter(
                    (_, i) => _ !== item,
                  );
                  updateFilterTiktok("hashtags", newList);
                }}
              ></ChipRemove>
            );
          })}
          {filterTiktok.hashtags && filterTiktok.hashtags.length > 0 && (
            <ChipRemove
              title="Reset"
              onClick={() => {
                updateFilterTiktok("hashtags", []);
              }}
            ></ChipRemove>
          )}
        </div>
        <Input
          value={searchValue}
          className="!h-7"
          icon={<IoSearchOutline />}
          placeholder="Tìm hashtag của bạn"
          onChange={(e: any) => {
            setSearchValue(e.target.value);
          }}
        />
      </div>
    </div>
  );
};
