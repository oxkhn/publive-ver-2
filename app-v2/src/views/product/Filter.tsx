"use client";
import Input from "@/components/@core/Input";
import { useIsMobile } from "@/hooks/useIsMobile";
import Dropdown from "@/packages/@ui-kit/Dropdown";
import DropdownV2 from "@/packages/@ui-kit/Dropdown2";
import DropdownItem from "@/packages/@ui-kit/Dropdown2/DropdownItem";
import { FormControlLabel, Slider } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { useState } from "react";
import { IoClose, IoFilter } from "react-icons/io5";

const Filter = () => {
  const [isShow, setIsShow] = useState(false);
  const isMobile = useIsMobile();

  function valuetext(value: number) {
    return `${value}%`;
  }

  const marks = [
    {
      value: 2,
      label: "2%",
    },
    {
      value: 10,
      label: "10%",
    },
    {
      value: 30,
      label: "30%",
    },
  ];

  return (
    <>
      {!isShow && isMobile && (
        <div
          className="absolute right-4 top-16 z-50 rounded-full bg-white p-2 shadow-md"
          onClick={() => setIsShow(true)}
        >
          <IoFilter className="text-xl text-primary" />
        </div>
      )}

      {(!isMobile || (isMobile && isShow)) && (
        <div className="flex h-full w-[286px] flex-col gap-8 bg-white px-6 py-6 shadow-md">
          <div className="flex items-center justify-between">
            <p className="text-lg font-semibold">Bộ lọc</p>
            <div className="flex items-center gap-2">
              <p className="text-xs text-primary">Xoá bộ lọc</p>
              {isMobile && (
                <div
                  className="cursor-pointer rounded-lg p-2 hover:bg-gray-200"
                  onClick={() => {
                    setIsShow(false);
                  }}
                >
                  <IoClose className="text-2xl" />
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold">Tìm sản phẩm</p>
            <Input />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold">Phân loại</p>

            <DropdownV2 onSelected={() => {}} className="w-full">
              <DropdownItem title="Hoa hồng cao nhất" />
              <DropdownItem title="Hot deal Livestream" />
              <DropdownItem title="Top bán chạy" />
            </DropdownV2>
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold">Sàn</p>
            <div className="flex items-center gap-2">
              <Checkbox />
              <p>Shopee</p>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox />
              <p>Lazada</p>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox />
              <p>Unilever</p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold">Commission</p>
            <Slider
              className="text-sm"
              aria-label=""
              defaultValue={10}
              getAriaValueText={valuetext}
              valueLabelDisplay="auto"
              shiftStep={2}
              step={2}
              marks={marks}
              min={0}
              max={30}
            />
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold">Ngành hàng</p>

            <DropdownV2 onSelected={() => {}} className="w-full">
              <DropdownItem title="s" />
            </DropdownV2>
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold">Thương hiệu</p>

            <DropdownV2 onSelected={() => {}} className="w-full">
              <DropdownItem title="s" />
            </DropdownV2>
          </div>
        </div>
      )}
    </>
  );
};

export default Filter;
