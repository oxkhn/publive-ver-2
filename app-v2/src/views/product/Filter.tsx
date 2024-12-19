"use client";
import Input from "@/components/@core/Input";
import { useIsMobile } from "@/hooks/useIsMobile";
import DropdownV2 from "@/packages/@ui-kit/Dropdown2";
import DropdownItem from "@/packages/@ui-kit/Dropdown2/DropdownItem";
import DropdownHor from "@/packages/@ui-kit/Dropdown3";
import {
  FilterTypeEnum,
  MarketplaceEnum,
  useProductContext,
} from "@/services/ProductProvider";
import { Slider } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { useEffect, useState } from "react";
import { IoClose, IoFilter } from "react-icons/io5";
import { useDebounce } from "use-debounce";

const Filter = () => {
  const [isShow, setIsShow] = useState(false);
  const isMobile = useIsMobile();
  const {} = useProductContext();

  const {
    brands,
    marketplaceChecked,
    setMarketplaceChecked,
    setBrandList,
    brandList,
    filterType,
    setFilterType,
    search,
    setSearch,
    commissionValue,
    setCommissionValue,
    buSelected,
    setBuSelected,
    brandSelected,
    setBrandSelected,
    toggleMarketplace,
    clearData,
  } = useProductContext();
  // internal
  const [filterTitle, setFilterTitle] = useState<string>();

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
              <p onClick={() => clearData()} className="text-xs text-primary">
                Xoá bộ lọc
              </p>
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
            <Input
              value={search}
              onChange={(e: any) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold">Ngành hàng</p>

            <DropdownV2
              onSelected={() => {}}
              className="w-full"
              value={buSelected}
            >
              <DropdownItem
                onClick={() => {
                  setBuSelected("Tất cả");
                  setBrandList([]);
                  setBrandSelected("");
                }}
                title="Tất cả"
              />
              {brands?.map((brand, index) => (
                <DropdownItem
                  key={index}
                  title={brand.bu}
                  onClick={() => {
                    setBuSelected(brand.bu);
                    setBrandList(brand.brand);
                    setBrandSelected(brand.brand?.[0] || "");
                  }}
                />
              ))}
            </DropdownV2>
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold">Thương hiệu</p>

            <DropdownHor
              // defaultValue={brandSelected}
              onSelected={() => {}}
              className="w-full !text-black"
              value={brandSelected}
            >
              {brandList?.map((brand) => {
                return (
                  <DropdownItem
                    title={brand}
                    onClick={() => setBrandSelected(brand)}
                  />
                );
              })}
            </DropdownHor>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold">Phân loại</p>

            <DropdownV2
              value={filterTitle}
              onSelected={() => {}}
              className="w-full"
            >
              <DropdownItem
                onClick={() => {
                  setFilterTitle("Hoa hồng cao nhất");
                  setFilterType(FilterTypeEnum.HOA_HONG_CAO_NHAT);
                }}
                title="Hoa hồng cao nhất"
              />
              <DropdownItem
                onClick={() => {
                  setFilterTitle("Hot deal Livestream");
                  setFilterType(FilterTypeEnum.HOT_DEAL_LIVESTREAM);
                }}
                title="Hot deal Livestream"
              />
              <DropdownItem
                onClick={() => {
                  setFilterTitle("Top bán chạy");
                  setFilterType(FilterTypeEnum.TOP_BAN_CHAY);
                }}
                title="Top bán chạy"
              />
            </DropdownV2>
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold">Sàn</p>
            <div
              onClick={() => toggleMarketplace(MarketplaceEnum.SHOPEE)}
              className="flex items-center gap-2"
            >
              <Checkbox
                checked={marketplaceChecked.includes(MarketplaceEnum.SHOPEE)}
              />
              <p>Shopee</p>
            </div>
            <div
              onClick={() => toggleMarketplace(MarketplaceEnum.LAZADA)}
              className="flex items-center gap-2"
            >
              <Checkbox
                checked={marketplaceChecked.includes(MarketplaceEnum.LAZADA)}
              />
              <p>Lazada</p>
            </div>
            <div
              onClick={() => toggleMarketplace(MarketplaceEnum.UNILEVER)}
              className="flex items-center gap-2"
            >
              <Checkbox
                checked={marketplaceChecked.includes(MarketplaceEnum.UNILEVER)}
              />
              <p>Unilever</p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold">Commission</p>
            <Slider
              className="text-sm"
              value={commissionValue}
              onChange={(e: any) => setCommissionValue(e.target.value)}
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
        </div>
      )}
    </>
  );
};

export default Filter;
