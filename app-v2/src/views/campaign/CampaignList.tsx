"use client";
import Image from "next/image";
import BannerDemo from "@/assets/images/banner.jpg";
import CampaignCard from "./CampaignCard";
import { ActiveEnum, useCampaignContext } from "@/services/CampaignProvider";
import DropdownV2 from "@/packages/@ui-kit/Dropdown2";
import DropdownItem from "@/packages/@ui-kit/Dropdown/DropdownItem";
import DropdownHor from "@/packages/@ui-kit/Dropdown3";
import Input from "@/packages/@ui-kit/Input";
import { useEffect } from "react";

const CampaignList = () => {
  const { campaigns, filterValue, handleFilterChange } = useCampaignContext();

  const mappingValue = (value: number) => {
    if (value == 0) return "Tất cả";
    if (value == 1) return "Đang chạy";
    if (value == 2) return "Ngoài khung giờ";
  };

  useEffect(() => {
    console.log(filterValue);
  }, [filterValue]);

  return (
    <div className="flex flex-1 flex-col gap-10">
      <div className="sticky top-20 z-[1] flex flex-col gap-4 rounded-md bg-white p-4 shadow-md max-sm:hidden">
        <div className="flex flex-wrap justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-4">
              <p className="text-sm font-bold max-sm:text-xs">Trạng thái</p>
              <DropdownV2
                value={mappingValue(filterValue.status)}
                onSelected={() => {}}
                className="!h-6 min-w-[150px]"
              >
                <DropdownItem
                  onClick={() => handleFilterChange(ActiveEnum.ALL, "status")}
                  title="Tất cả"
                />
                <DropdownItem
                  onClick={() =>
                    handleFilterChange(ActiveEnum.ACTIVE, "status")
                  }
                  title="Đang chạy"
                />
                <DropdownItem
                  onClick={() =>
                    handleFilterChange(ActiveEnum.INACTIVE, "status")
                  }
                  title="Ngoài khung giờ"
                />
              </DropdownV2>
            </div>
          </div>

          <div className="flex flex-1 gap-4 overflow-auto">
            <div className="flex items-center gap-2">
              <Input
                value={filterValue.startDate}
                className="!h-7 !rounded-md"
                onChange={(e: any) =>
                  handleFilterChange(e.target.value, "startDate")
                }
                type="date"
              />
              <p> - </p>
              <Input
                value={filterValue.endDate}
                className="!h-7 !rounded-md"
                onChange={(e: any) =>
                  handleFilterChange(e.target.value, "endDate")
                }
                type="date"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="cursor-pointer rounded-md bg-red px-1.5 py-0.5 font-semibold text-white opacity-30 transition-all hover:opacity-100">
              <p>Chiến thần livestream</p>
            </div>
            <div>
              <div className="cursor-pointer rounded-md bg-green px-1.5 py-0.5 font-semibold text-white opacity-30 transition-all hover:opacity-100">
                <p>Chiến thần livestream</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
        {campaigns.map((_, index) => {
          return <CampaignCard campaign={_} key={index} />;
        })}
      </div>
    </div>
  );
};

export default CampaignList;
