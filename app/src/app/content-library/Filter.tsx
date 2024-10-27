"use client";
import ImageKit from "@/packages/@ui-kit/Image";
import Button from "@/packages/@ui-kit/Button";
import DatePickup from "@/packages/@ui-kit/DatePickup";
import Dropdown from "@/packages/@ui-kit/Dropdown";
import DropdownV2 from "@/packages/@ui-kit/Dropdown2";
import DropdownItem from "@/packages/@ui-kit/Dropdown2/DropdownItem";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { BiLogoTiktok } from "react-icons/bi";
import { IoSearchOutline } from "react-icons/io5";

import utc from "dayjs/plugin/utc";
import { toast } from "react-toastify";
import Input from "@/packages/@ui-kit/Input";
import { useContentVideoContext } from "./ContentVideoProvider";
import { useGetProductBrand } from "@/services/api/product/useGetProductBrand";
import Line from "@/packages/@ui-kit/Line";

dayjs.extend(utc);
const platformItems = [
  {
    value: "facebook",
    title: "Facebook",
  },
  {
    value: "tiktok",
    title: "Tiktok",
  },
  {
    value: "youtube",
    title: "Youtube",
  },
  {
    value: "instagram",
    title: "Instagram",
  },
];

const logoSocials = [
  {
    src: "/logoSocials/shoppe.svg",
  },
  {
    src: "/logoSocials/tiktok.svg",
  },
  {
    src: "/logoSocials/youtube.svg",
  },
  {
    src: "/logoSocials/facebook.svg",
  },
];

const filterDate = [
  {
    value: 0, // Tất cả: hiện tại
    title: "Tất cả",
  },
  {
    value: Math.floor(Date.now() / 1000) - 7 * 24 * 3600, // 7 ngày qua
    title: "7 ngày qua",
  },
  {
    value: Math.floor(Date.now() / 1000) - 30 * 24 * 3600, // 30 ngày qua
    title: "30 ngày qua",
  },
  {
    value: Math.floor(Date.now() / 1000) - 6 * 30 * 24 * 3600, // 6 tháng qua (ước tính 1 tháng = 30 ngày)
    title: "6 tháng qua",
  },
];

const hashtags = [
  "Tất cả",
  "#Chamsocda",
  "#SRM",
  "#suaruamat",
  "#PS",
  "#PSetb",
  "#Lankhumui",
  "#xitkhumui",
  "#Dove",
  "#Lifebuoy",
  "#NuocRuaTay",
  "#SuaTamNuocHoa",
  "#Luxe",
  "#CloseUp",
  "#Axe",
  "#Rexona",
  "#Taytebaochet",
];

const Filter = () => {
  const {
    name,
    setName,
    filterDateActive,
    setFilterDateActive,
    category,
    setCategory,
  } = useContentVideoContext();

  const [platform, setPlatform] = useState(platformItems[0]);

  const [timeEnd, setTimeEnd] = useState(dayjs().utc().add(30, "day"));

  const [categorys, setCategorys] = useState([]);
  const [activedCategory, setActivedCategory] = useState("all");

  const [brands, setBrands] = useState([]);
  const [activedBrand, setActivedBrand] = useState("all");

  const handleDateChange = (date: any) => {
    if (date) {
      setTimeEnd(date.utc());
    }
  };

  const tabs = [
    "Trending content",
    "Tư liệu nhãn hàng",
    "Cảm Hứng Thương Hiệu",
  ];
  const [tabActive, setTabActive] = useState(tabs[0]);

  const _getCategory = useGetProductBrand();

  const handleGetCategory = async () => {
    try {
      const res = await _getCategory.mutateAsync();

      setCategorys(res.data);
    } catch (error) {}
  };

  useEffect(() => {
    handleGetCategory();
  }, []);

  useEffect(() => {
    if (activedCategory != "all") {
      const arr: any = categorys.filter((_: any) => _.BU == activedCategory);
      if (arr.length > 0) setBrands(arr[0].brand);
    }

    setActivedBrand("all");
  }, [activedCategory]);

  return (
    <div className="rounded-lg bg-white px-2 py-4">
      <div className="flex gap-8 border-b border-grays/15">
        {tabs.map((_, i) => (
          <div
            key={i}
            className={`grid h-full cursor-pointer place-items-center ${tabActive == _ && "border-b border-primary !text-primary"} text-grays/50`}
            onClick={() => setTabActive(_)}
          >
            <p className="pb-2 text-center font-bold">{_}</p>
          </div>
        ))}
      </div>

      {tabActive == "Product oriented" && (
        <>
          <div className="flex flex-col gap-4 px-4 py-6">
            <div className="flex items-center gap-4">
              <p className="w-[110px] text-sm font-bold">Ngành hàng</p>
              <div
                className={`h-fit cursor-pointer rounded-[124px] border px-3 py-1 text-sm leading-4 ${"all" == activedCategory ? "border-primary text-primary" : "border-grays/15 text-grays/15"}`}
                onClick={() => {
                  setActivedCategory("all");
                }}
              >
                Tất cả
              </div>
              <div className="flex flex-1 gap-4 overflow-auto">
                {categorys.map((item: any, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      setActivedCategory(item.BU);
                    }}
                    className={`cursor-pointer rounded-[124px] border border-grays/15 px-3 py-1 text-sm transition-all hover:border-primary hover:text-primary ${activedCategory == item.BU ? "border-primary text-primary" : "border-grays/15 text-grays/15"}`}
                  >
                    <p className="whitespace-nowrap leading-[14px]">
                      {item.BU == "BW" && "Chăm sóc sắc đẹp"}
                      {item.BU == "PC" && "Chăm sóc cơ thể"}
                      {item.BU == "HC" && "Chăm sóc nhà cửa"}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className={`flex items-center gap-4`}>
              <p className="w-[110px] text-sm font-bold">Thương hiệu</p>

              <div
                className={`h-fit cursor-pointer rounded-[124px] border px-3 py-1 text-sm leading-4 ${"all" == activedBrand ? "border-primary text-primary" : "border-grays/15 text-grays/15"}`}
                onClick={() => {
                  setActivedBrand("all");
                }}
              >
                Tất cả
              </div>
              <div className="flex flex-1 items-center gap-4 overflow-auto">
                {brands.map((_, i) => (
                  <div
                    onClick={() => {
                      setActivedBrand(_);
                    }}
                    key={i}
                    className={`max-w-[84px] cursor-pointer truncate rounded-[124px] border border-grays/15 px-3 py-1 text-sm transition-all hover:border-primary hover:text-primary ${activedBrand == _ ? "border-primary text-primary" : "border-grays/15 text-grays/15"}`}
                  >
                    <p className="line-clamp-1 truncate whitespace-nowrap leading-[14px]">
                      {_}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Line />
        </>
      )}

      <div className="mt-4 flex gap-4 max-sm:flex-col">
        <div className="flex gap-4">
          <div className="flex items-center gap-1">
            {logoSocials.map((item, i) => (
              <button
                className="grid place-items-center rounded-md p-2 hover:bg-grays/5"
                key={i}
              >
                <ImageKit
                  src={item.src}
                  className="h-4 w-4"
                  onClick={() => {
                    toast.info("Không có data", { autoClose: 1000 });
                  }}
                />
              </button>
            ))}
          </div>
          <div className="h-6 w-[1px] bg-grays/15"></div>
          <div className="flex items-center gap-1">
            <button className="grid place-items-center rounded-md p-2 hover:bg-grays/5">
              <ImageKit
                src="/logoSocials/broken_image.svg"
                className="h-4 w-4"
              />
            </button>
            <button className="grid place-items-center rounded-md p-2 hover:bg-grays/5">
              <ImageKit
                src="/logoSocials/video_library.svg"
                className="h-4 w-4"
              />
            </button>
            <button className="grid place-items-center rounded-md p-2 hover:bg-grays/5">
              <ImageKit src="/logoSocials/title.svg" className="h-4 w-4" />
            </button>
          </div>
          <div className="h-6 w-[1px] bg-grays/15 max-sm:hidden"></div>
        </div>

        <div className="flex flex-1 items-center gap-4">
          <p className="text-sm">Thời gian</p>
          <DropdownV2
            defaultValue={filterDateActive}
            onSelected={(index) => {
              setFilterDateActive(filterDate[index]);
            }}
            classContainer="max-sm:flex-1 max-sm:justify-center max-sm:items-center text-primary"
            className="max-sm:w-full"
          >
            {filterDate.map((_, i) => (
              <DropdownItem key={i} title={_.title} />
            ))}
          </DropdownV2>

          <div className="h-6 w-[1px] bg-grays/15"></div>
          <p className="text-sm">Category</p>

          <DropdownV2
            defaultValue={category}
            value={category}
            onSelected={(index) => {
              setCategory(hashtags[index]);
            }}
            classContainer="max-sm:flex-1 max-sm:justify-center max-sm:items-center text-primary"
            className="max-sm:w-full"
          >
            {hashtags.map((_, i) => (
              <DropdownItem key={i} title={_} />
            ))}
          </DropdownV2>

          {/* <DropdownV2
            defaultValue={{ title: "Campaigns" }}
            onSelected={(index) => {
              setPlatform(platformItems[index]);
            }}
            classContainer="max-sm:flex-1 max-sm:justify-center max-sm:items-center !text-grays/50"
            className="!border-grays/15 max-sm:w-full"
          ></DropdownV2>

          <div className="h-6 w-[1px] bg-grays/15"></div>

          <DropdownV2
            defaultValue={{ title: "Tags" }}
            onSelected={(index) => {
              setPlatform(platformItems[index]);
            }}
            classContainer="max-sm:flex-1 max-sm:justify-center max-sm:items-center !text-grays/50"
            className="!border-grays/15 max-sm:w-full"
          ></DropdownV2> */}
        </div>

        <div className="ml-auto">
          <Input
            value={name}
            className="!h-7"
            icon={<IoSearchOutline />}
            placeholder="Search"
            onChange={(e: any) => {
              setName(e.target.value);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Filter;
