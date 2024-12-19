"use client";

import ProductCard from "@/components/ProductCard";
import Image from "next/image";
import TopSanPhamIcon from "@/assets/images/top_san_pham.svg";
import TopSanPhamMobileIcon from "@/assets/images/top_san_pham_mobile.svg";
import HotDealLiveIcon from "@/assets/images/hot_deal_livestream.svg";
import HoaHongCaoNhatIcon from "@/assets/images/hoa_hong_cao_nhat.svg";
import TopBanChay from "@/assets/images/top_ban_chay.svg";
import Button from "@/packages/@ui-kit/Button2";
// import DropdownItem from "@/packages/@ui-kit/Dropdown/DropdownItem";
import LazadaLogo from "@/assets/images/logo-lazada.webp";
import ShopeeLogo from "@/assets/images/logo-shopee.webp";
import UnileverLogo from "@/assets/images/unilever.png";
import { Slider } from "@mui/material";
import DropdownV2 from "@/packages/@ui-kit/Dropdown2";
import DropdownItem from "@/packages/@ui-kit/Dropdown2/DropdownItem";
import { useRouter } from "next/navigation";
import {
  FilterTypeEnum,
  MarketplaceEnum,
  useProductContext,
} from "@/services/ProductProvider";
import DropdownHor from "@/packages/@ui-kit/Dropdown3";
import { useEffect } from "react";

const ProductSection = () => {
  function valuetext(value: number) {
    return `${value}%`;
  }

  const router = useRouter();

  const {
    products,
    brands,
    brandList,
    buSelected,
    brandSelected,
    commissionValue,
    marketplaceChecked,
    filterType,
    setCommissionValue,
    setBuSelected,
    setBrandSelected,
    setBrandList,
    setFilterType,
    toggleMarketplace,
    clearData,
  } = useProductContext();

  const marks = [
    {
      value: 2,
      label: "2%",
    },

    {
      value: 30,
      label: "30%",
    },
  ];

  const navigateProductPage = () => {
    router.push("/product");
  };

  return (
    <div className="relative flex gap-8 max-sm:flex-col max-sm:gap-2">
      <div className="sticky top-20 z-30 flex h-full w-[185px] flex-col gap-4 max-sm:hidden">
        <Image src={TopSanPhamIcon} alt="" width={185} height={200} />
        <Image
          onClick={() => setFilterType(FilterTypeEnum.HOT_DEAL_LIVESTREAM)}
          src={HotDealLiveIcon}
          alt=""
          width={185}
          height={200}
          className={`cursor-pointer transition-all hover:opacity-100 ${FilterTypeEnum.HOT_DEAL_LIVESTREAM == filterType ? "opacity-100" : "opacity-50"}`}
        />
        <Image
          onClick={() => setFilterType(FilterTypeEnum.HOA_HONG_CAO_NHAT)}
          src={HoaHongCaoNhatIcon}
          alt=""
          width={185}
          height={200}
          className={`cursor-pointer transition-all hover:opacity-100 ${FilterTypeEnum.HOA_HONG_CAO_NHAT == filterType ? "opacity-100" : "opacity-50"}`}
        />
        <Image
          onClick={() => setFilterType(FilterTypeEnum.TOP_BAN_CHAY)}
          src={TopBanChay}
          alt=""
          width={185}
          height={200}
          className={`cursor-pointer transition-all hover:opacity-100 ${FilterTypeEnum.TOP_BAN_CHAY == filterType ? "opacity-100" : "opacity-50"}`}
        />
      </div>

      <div className="sticky top-16 z-20 flex h-full flex-col gap-2 sm:hidden">
        <div className="flex gap-2">
          <Image src={TopSanPhamMobileIcon} alt="" className="flex-1" />
          <div className="flex w-full flex-1 flex-col gap-2">
            <Image
              onClick={() => setFilterType(FilterTypeEnum.HOT_DEAL_LIVESTREAM)}
              src={HotDealLiveIcon}
              alt=""
              width={185}
              height={36}
              className="h-9 w-full cursor-pointer rounded-lg object-cover"
            />
            <Image
              onClick={() => setFilterType(FilterTypeEnum.HOA_HONG_CAO_NHAT)}
              src={HoaHongCaoNhatIcon}
              alt=""
              width={185}
              height={36}
              className="h-9 w-full cursor-pointer rounded-lg object-cover"
            />
            <Image
              onClick={() => setFilterType(FilterTypeEnum.TOP_BAN_CHAY)}
              src={TopBanChay}
              alt=""
              width={185}
              height={36}
              className="h-9 w-full cursor-pointer rounded-lg object-cover"
            />
          </div>
        </div>

        <div className="sticky top-20 z-50 rounded-md bg-white p-4 shadow-md">
          <div>
            <div className="flex items-center gap-4">
              <p className="text-sm font-bold max-sm:text-xs">Ngành hàng</p>
              <div
                className={`h-fit cursor-pointer rounded-[124px] border px-3 py-1 text-sm leading-4 max-sm:text-xs`}
                onClick={() => {}}
              >
                Tất cả
              </div>
              <div className="flex flex-1 gap-4 overflow-auto"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-10">
        <div className="sticky top-20 z-50 flex flex-col gap-4 rounded-md bg-white px-4 py-1 shadow-md max-sm:hidden">
          <div className="flex flex-wrap justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-4">
                <p className="text-sm font-bold max-sm:text-xs">Ngành hàng</p>
                <DropdownV2
                  value={buSelected}
                  onSelected={() => {}}
                  className="!h-6 min-w-[150px]"
                >
                  <DropdownItem
                    onClick={() => {
                      setBuSelected("Tất cả");
                      setBrandList([]);
                      setBrandSelected("");
                    }}
                    title="Tất cả"
                  />
                  {brands.map((bu, index) => {
                    return (
                      <DropdownItem
                        onClick={() => {
                          setBuSelected(bu.bu);
                          setBrandList(bu.brand);
                          setBrandSelected(bu.brand?.[0] || "");
                        }}
                        key={index}
                        title={bu.bu}
                      />
                    );
                  })}
                </DropdownV2>
                <div className="flex flex-1 gap-4 overflow-auto"></div>
              </div>
              <div className="flex items-center gap-4">
                <p className="text-sm font-bold max-sm:text-xs">Thương hiệu</p>
                <DropdownHor
                  value={brandSelected}
                  onSelected={() => {}}
                  className="!h-6 min-w-[150px] !text-black"
                >
                  {brandList.map((brand, index) => {
                    return (
                      <DropdownItem
                        onClick={() => setBrandSelected(brand)}
                        key={index}
                        title={brand}
                      />
                    );
                  })}
                </DropdownHor>
                <div className="flex flex-1 gap-4 overflow-auto"></div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <p className="text-sm font-bold max-sm:text-xs">Sàn</p>

                <div
                  className={`h-6 w-6 cursor-pointer rounded-full border bg-white p-0.5 ${marketplaceChecked.includes(MarketplaceEnum.LAZADA) && "border-green"}`}
                >
                  <Image
                    onClick={() => toggleMarketplace(MarketplaceEnum.LAZADA)}
                    src={LazadaLogo}
                    alt=""
                    className="rounded-full"
                  />
                </div>
                <div
                  className={`h-6 w-6 cursor-pointer rounded-full border bg-white p-0.5 ${marketplaceChecked.includes(MarketplaceEnum.SHOPEE) && "border-green"}`}
                >
                  <Image
                    onClick={() => toggleMarketplace(MarketplaceEnum.SHOPEE)}
                    src={ShopeeLogo}
                    alt=""
                    className="rounded-full"
                  />
                </div>
                <div
                  className={`h-6 w-6 cursor-pointer rounded-full border bg-white p-0.5 ${marketplaceChecked.includes(MarketplaceEnum.UNILEVER) && "border-green"}`}
                >
                  <Image
                    onClick={() => toggleMarketplace(MarketplaceEnum.UNILEVER)}
                    src={UnileverLogo}
                    alt=""
                    className="rounded-full"
                  />
                </div>
              </div>
              <div className="flex w-[200px] items-center gap-4">
                <p className="text-sm font-semibold">Commission</p>
                <Slider
                  value={commissionValue}
                  onChange={(e: any) => setCommissionValue(e.target.value)}
                  className="text-xs"
                  aria-label=""
                  defaultValue={10}
                  getAriaValueText={valuetext}
                  valueLabelDisplay="auto"
                  shiftStep={2}
                  step={2}
                  marks={marks}
                  min={2}
                  max={30}
                  color="primary"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-[repeat(auto-fill,_minmax(158px,_1fr))] justify-between gap-x-8 gap-y-12 max-sm:gap-x-4">
          {products.length > 0 ? (
            products
              .slice(0, 15)
              .map((_, index) => <ProductCard product={_} key={index} />)
          ) : (
            <p className="text-sm text-grays/50">Không có sản phẩm nào</p>
          )}
        </div>

        <div className="mx-auto">
          <Button
            title="Xem thêm"
            onClick={navigateProductPage}
            className="px-10"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductSection;
