"use client";
import ImageKit from "@/packages/@ui-kit/Image";
import Button from "@/packages/@ui-kit/Button";
import DatePickup from "@/packages/@ui-kit/DatePickup";
import Dropdown from "@/packages/@ui-kit/Dropdown";
import DropdownV2 from "@/packages/@ui-kit/Dropdown2";
import DropdownItem from "@/packages/@ui-kit/Dropdown2/DropdownItem";
import { useState } from "react";
import dayjs from "dayjs";
import { BiLogoTiktok } from "react-icons/bi";
import { IoSearchOutline } from "react-icons/io5";

import utc from "dayjs/plugin/utc";
import { toast } from "react-toastify";
import Input from "@/packages/@ui-kit/Input";
import CategoryAndChanel from "./CategoryAndChanel";

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
    value: 1,
    title: "1 ngày qua",
  },
  {
    value: 2,
    title: "7 ngày qua",
  },
  {
    value: 3,
    title: "1 tháng qua",
  },
  {
    value: 4,
    title: "Tất cả",
  },
];

const Filter = () => {
  const [platform, setPlatform] = useState(platformItems[0]);
  const [filterDateActive, setFilterDateActive] = useState(filterDate[0]);

  const [timeEnd, setTimeEnd] = useState(dayjs().utc().add(30, "day"));

  const handleDateChange = (date: any) => {
    if (date) {
      setTimeEnd(date.utc());
    }
  };

  const tabs = ["Chiến Thần Doanh Số", "BXH Chiến Dịch"];
  const [tabActive, setTabActive] = useState(tabs[0]);

  return (
    <div className="rounded-lg bg-white px-2 py-4 shadow-card">
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
      <div className="mt-4 flex gap-4 max-sm:flex-col">
        {tabActive == tabs[0] && <CategoryAndChanel />}
      </div>
    </div>
  );
};

export default Filter;
