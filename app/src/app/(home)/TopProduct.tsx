"use client";

import ImageKit from "@/packages/@ui-kit/Image";

import ImageTopProduct from "@/assets/images/top_san_pham.svg";
import ImageTopProductMobile from "@/assets/images/top-san-pham-mobile.svg";
import ImageHoaHong from "@/assets/images/hh_cao_nhat.svg";
import ImageHoaHongMobile from "@/assets/images/hh_cao_nhat_mobile.svg";
import ImageLive from "@/assets/images/top_ban_chay.svg";
import ImageLiveMobile from "@/assets/images/top_ban_chay.svg";
import ImageAff from "@/assets/images/hot_deal_live.svg";
import ImageAffMobile from "@/assets/images/hot_deal_live.svg";
import ProductCard from "@/components/ProductCard";
import Button from "@/packages/@ui-kit/Button";
import { use, useEffect, useRef, useState } from "react";
import { useGetAllProduct } from "@/services/api/product/useGetAllProduct";
import { ProductType } from "../../types/product.type";
import { useGetProductBrand } from "@/services/api/product/useGetProductBrand";
import { useRouter } from "next/navigation";
import { ConfigProvider, Slider } from "antd";
import { useProductsContext } from "./ProductProvider";
import DropdownV2 from "@/packages/@ui-kit/Dropdown2";
import DropdownItem from "@/packages/@ui-kit/Dropdown2/DropdownItem";
import ProductCardSkeleton from "@/components/Skeleton/ProductCardSkeleton";

const TopProduct = () => {
  const router = useRouter();

  const {
    products,
    filterBrand,
    setFilterBrand,
    filterBu,
    setFilterBu,
    filterCommission,
    setFilterCommission,
    filterName,
    setFilterName,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    reloadAll,
    brands,
    setBrands,
    categorys,
    setCategorys,
    publisher,
    setPublisher,
    sku,
    setSku,
    resetFilters,
    type,
    setType,
  } = useProductsContext();

  const [commisionValue, setCommisionValue] = useState(25);
  const [minMaxCommision, setMinMaxCommision] = useState([2, 30]);
  const gridContainer = useRef<HTMLDivElement>(null);
  const [productCount, setProductCount] = useState(9);

  const calculateProductCount = () => {
    if (gridContainer.current) {
      const gridCols = getComputedStyle(
        gridContainer.current,
      ).gridTemplateColumns.split(" ").length;

      const maxRows = 3;
      const maxProducts = gridCols * maxRows;
      setProductCount(maxProducts);
      // setProductCount(Math.min(products.length, maxProducts));
    }
  };
  useEffect(() => {
    calculateProductCount();
    window.addEventListener("resize", calculateProductCount);

    return () => {
      window.removeEventListener("resize", calculateProductCount);
    };
  }, []);

  return (
    <div className="flex w-full gap-8 max-md:flex-col max-md:gap-2 md:mt-[50px]">
      {/* -- Desktop -- */}
      <div className="sticky top-[90px] flex h-fit w-[185px] flex-col max-md:hidden">
        <div className="w-[185px]"></div>
        <ImageKit src={ImageTopProduct} className="w-[185px]" />
        <div>
          <ImageKit
            className={`cursor-pointer ${type == 1 ? "opacity-100" : "opacity-50"}`}
            src={ImageHoaHong}
            onClick={() => {
              setType(1);
            }}
          />
        </div>
        <div>
          <ImageKit
            src={ImageAff}
            className={`cursor-pointer ${type == 2 ? "opacity-100" : "opacity-50"}`}
            onClick={() => {
              setType(2);
            }}
          />
        </div>
        <div>
          <ImageKit
            src={ImageLive}
            className={`cursor-pointer ${type == 3 ? "opacity-100" : "opacity-50"}`}
            onClick={() => {
              setType(3);
            }}
          />
        </div>
      </div>
      {/* -- Desktop -- */}

      {/* -- Mobile -- */}
      <div className="flex h-[124px] items-center md:hidden">
        <ImageKit src={ImageTopProductMobile} className="h-full w-[185px]" />
        <div className="-mt-2 grid h-full grid-flow-row grid-rows-3">
          <ImageKit src={ImageHoaHongMobile} className="w-auto" />
          <ImageKit src={ImageAffMobile} className="w-auto" />
          <ImageKit src={ImageLiveMobile} className="w-auto" />
        </div>
      </div>
      {/* -- Mobile -- */}

      <div
        style={{ width: "calc(100% - 185px - 8px)" }}
        className="flex flex-1 flex-col max-md:!w-full md:gap-4"
      >
        <div className="sticky top-[90px] z-30 flex h-fit flex-col gap-1 rounded-lg bg-white px-4 pt-3 shadow-card max-md:py-2 max-sm:gap-2 max-sm:text-xs">
          <div className="flex items-center gap-4">
            <p className="text-sm font-bold max-sm:text-xs">Ngành hàng</p>
            <div
              className={`h-fit cursor-pointer rounded-[124px] border px-3 py-1 text-sm leading-4 max-sm:text-xs ${filterBu == "" ? "border-primary text-primary" : "border-grays/15 text-grays/15"}`}
              onClick={() => setFilterBu("")}
            >
              Tất cả
            </div>
            <div className="flex flex-1 gap-4 overflow-auto">
              {categorys.map((item: any, i) => (
                <div
                  key={i}
                  className={`h-fit cursor-pointer whitespace-nowrap rounded-[124px] border px-3 py-1 text-sm leading-4 max-sm:text-xs ${filterBu == item ? "border-primary text-primary" : "border-grays/15 text-grays/15"}`}
                  onClick={() => setFilterBu(item)}
                >
                  {item == "BW" && "Chăm sóc sắc đẹp"}
                  {item == "PC" && "Chăm sóc cơ thể"}
                  {item == "HC" && "Chăm sóc nhà cửa"}
                </div>
              ))}
            </div>
          </div>
          <div className="flex w-full items-center gap-4">
            <div className="flex items-center gap-4">
              <p className="text-sm font-bold max-sm:text-xs">Thương hiệu</p>

              {/* <div
              className={`h-fit cursor-pointer rounded-[124px] border px-3 py-1 leading-4 max-sm:text-xs ${filterBrand == "all" ? "border-primary text-primary" : "border-grays/15 text-grays/15"}`}
              onClick={() => setFilterBrand("all")}
            >
              Tất cả
            </div> */}
              <div className="flex max-w-[900px] flex-1 gap-4">
                {/* {brands?.map((item: any, i: number) => (
                <div
                  key={i}
                  className={`h-fit cursor-pointer whitespace-nowrap rounded-[124px] border px-3 py-1 leading-4 max-sm:text-xs ${filterBrand == item ? "border-primary text-primary" : "border-grays/15 text-grays/15"}`}
                  onClick={() => setFilterBrand(item)}
                >
                  {item}
                </div>
              ))} */}

                <DropdownV2
                  className="text-primary"
                  onSelected={(index) => {
                    setFilterBrand(brands[index]);
                  }}
                  value={filterBrand}
                >
                  {brands.map((_, i) => (
                    <DropdownItem key={i} title={_} />
                  ))}
                </DropdownV2>
              </div>
            </div>
            <div className="flex flex-1 items-center justify-end gap-4">
              <p className="text-sm font-bold max-sm:text-xs">%Commission</p>
              <div className="max-w-[200px] flex-1">
                <ConfigProvider
                  theme={{
                    components: {
                      Slider: {
                        colorPrimary: "#3067F2",
                      },
                    },
                  }}
                >
                  <Slider
                    value={filterCommission}
                    onChange={(e) => setFilterCommission(e)}
                    min={minMaxCommision[0]}
                    max={minMaxCommision[1]}
                    marks={{
                      [minMaxCommision[0]]: `${minMaxCommision[0]}%`,
                      [minMaxCommision[1]]: `${minMaxCommision[1]}%`,
                    }}
                    className="mt-1.5 w-full max-w-[95%]"
                  />
                </ConfigProvider>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full">
          <div
            ref={gridContainer}
            className="grid grid-cols-6 gap-x-4 gap-y-8 py-4 max-xl:grid-cols-4 max-[1100px]:grid-cols-3 max-[950px]:grid-cols-2 max-md:grid-cols-3 max-md:gap-x-3 max-md:gap-y-4 max-sm:grid-cols-2"
          >
            {products.length > 0
              ? products
                  .slice(0, productCount)
                  .map((item, i) => <ProductCard key={i} product={item} />)
              : Array.from({ length: productCount }).map((_, index) => {
                  return <ProductCardSkeleton key={index} />;
                })}
          </div>
          <div className="mx-auto mt-4 w-fit">
            <Button
              title="View All"
              className="min-w-[200px] !rounded-full"
              onClick={() => router.push("/product")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopProduct;
