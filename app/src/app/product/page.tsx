"use client";
import ImageKit from "@/packages/@ui-kit/Image";

import ImageTopProduct from "@/assets/images/top_san_pham.svg";
import ImageTopProductMobile from "@/assets/images/top-san-pham-mobile.svg";
import ImageHoaHong from "@/assets/images/hh_cao_nhat.svg";
import ImageHoaHongMobile from "@/assets/images/hh_cao_nhat_mobile.svg";
import ImageLive from "@/assets/images/top_ban_chay.svg";
import ImageLiveMobile from "@/assets/images/live_thinh_hanh_mobile.svg";
import ImageAff from "@/assets/images/hot_deal_live.svg";
import ImageAffMobile from "@/assets/images/affi_noi_bat_mobile.svg";
import ProductCard from "@/components/ProductCard";
import { useEffect, useRef, useState } from "react";
import { useGetAllProduct } from "@/services/api/product/useGetAllProduct";
import { ProductType } from "../../types/product.type";
import { toast } from "react-toastify";
import Breadcrumb from "@/packages/@ui-kit/Breadcrumb";
import { IoMdSearch } from "react-icons/io";
import Input from "@/packages/@ui-kit/Input";
import { useGetProductBrand } from "@/services/api/product/useGetProductBrand";
import { ConfigProvider, Slider } from "antd";
import DropdownV2 from "@/packages/@ui-kit/Dropdown2";
import DropdownItem from "@/packages/@ui-kit/Dropdown2/DropdownItem";

const ProductPage = () => {
  const [productCount, setProductCount] = useState(0);
  const gridContainer = useRef<HTMLDivElement>(null);
  const filterContainer = useRef<HTMLDivElement>(null);

  const listBrand = [
    {
      src: "/logoBrands/axe.svg",
    },
    {
      src: "/logoBrands/cif.svg",
    },
    {
      src: "/logoBrands/clear.svg",
    },
    {
      src: "/logoBrands/closeup.svg",
    },
    {
      src: "/logoBrands/comfort.svg",
    },
    {
      src: "/logoBrands/cornetto.svg",
    },
    {
      src: "/logoBrands/dove.svg",
    },
    {
      src: "/logoBrands/hazeline.svg",
    },
    {
      src: "/logoBrands/lux.svg",
    },
    {
      src: "/logoBrands/pond.svg",
    },
    {
      src: "/logoBrands/vaseline.svg",
    },
    {
      src: "/logoBrands/tresemme.svg",
    },
  ];

  // const categorys = [
  //   {
  //     title: "Body care",
  //   },
  //   {
  //     title: "Face care",
  //   },
  //   {
  //     title: "Shampoo",
  //   },
  //   {
  //     title: "Organic",
  //   },
  // ];

  const [commisionValue, setCommisionValue] = useState(25);
  const [minMaxCommision, setMinMaxCommision] = useState([2, 30]);

  const [products, setProducts] = useState<ProductType[]>([]);

  const [categorys, setCategorys] = useState([]);
  const [activedCategory, setActivedCategory] = useState("all");

  const [brands, setBrands] = useState([]);
  const [activedBrand, setActivedBrand] = useState("all");

  const [filterType, setFilterType] = useState(1);
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    const calculateProductCount = () => {
      if (gridContainer.current) {
        const gridCols = getComputedStyle(
          gridContainer.current,
        ).gridTemplateColumns.split(" ").length;

        const maxRows = 3;
        const maxProducts = gridCols * maxRows;

        setProductCount(Math.min(products.length, maxProducts));
      }
    };

    calculateProductCount();
    window.addEventListener("resize", calculateProductCount);

    return () => {
      window.removeEventListener("resize", calculateProductCount);
    };
  }, [products.length]);

  const _getCategory = useGetProductBrand();

  const handleGetCategory = async () => {
    try {
      const res = await _getCategory.mutateAsync();

      setCategorys(res.data);
    } catch (error) {}
  };

  useEffect(() => {
    if (activedCategory != "all") {
      const arr: any = categorys.filter((_: any) => _.bu == activedCategory);
      if (arr.length > 0) setBrands(arr[0].brand);
    }
    setActivedBrand("all");
  }, [activedCategory]);

  const _getProduct = useGetAllProduct();

  const handleGetData = async () => {
    const body = {
      page: 1,
      limit: 100,
      name: searchName,
      cat: "",
      commission: commisionValue / 100,
      bu: activedCategory,
      brand: activedBrand,
      filterType: filterType,
    };

    const res = await _getProduct.mutateAsync(body);
    if (res) {
      const _products = res.data;

      setProducts(_products);
    }
  };

  const handleFilter = (type: number) => {
    switch (type) {
      case 1: {
        let _products = [...products].sort(
          (a, b) => b.commission - a.commission,
        );

        setProducts(_products);
        break;
      }
      case 2: {
        let _products = [...products].sort(() => Math.random() - 0.5);

        setProducts(_products);
        break;
      }
      case 3: {
        let _products = [...products].sort(() => Math.random() - 0.5);

        setProducts(_products);
        break;
      }
      default: {
      }
    }

    setFilterType(type);
  };

  useEffect(() => {
    handleGetData();
  }, [activedBrand, activedCategory, searchName, commisionValue]);

  useEffect(() => {
    handleGetCategory();
  }, []);

  return (
    <div className="mx-auto flex min-h-screen max-w-[1440px] flex-col gap-6 px-20 pb-20 pt-6 max-md:gap-3 max-md:px-4">
      <Breadcrumb />
      <p className="text-2xl font-bold text-grays max-sm:text-xl">Sản phẩm</p>
      <div
        ref={filterContainer}
        className="sticky top-20 z-20 flex w-full items-center gap-8 rounded-lg bg-white px-2 shadow-card max-md:flex-col max-md:gap-2"
      >
        <div className="sticky top-[90px] flex h-fit w-[185px] min-w-[185px] items-center gap-3 max-md:w-full md:flex-col">
          <div>
            <ImageKit
              className={`h-7 cursor-pointer !rounded-lg ${filterType == 1 ? "opacity-100" : "opacity-50"}`}
              src={ImageHoaHong}
              onClick={() => {
                handleFilter(1);
              }}
            />
          </div>
          <div>
            <ImageKit
              src={ImageAff}
              className={`h-7 cursor-pointer ${filterType == 2 ? "opacity-100" : "opacity-50"}`}
              onClick={() => {
                handleFilter(2);
              }}
            />
          </div>
          <div>
            <ImageKit
              src={ImageLive}
              className={`h-7 cursor-pointer ${filterType == 3 ? "opacity-100" : "opacity-50"}`}
              onClick={() => {
                handleFilter(3);
              }}
            />
          </div>
        </div>

        <div
          style={{ width: "calc(100% - 185px - 8px)" }}
          className="flex flex-1 flex-col max-md:!w-full md:gap-4"
        >
          <div className="sticky top-[90px] z-30 flex h-fit flex-col gap-2 rounded-lg bg-white px-3 py-3 max-md:py-2">
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
                      setActivedCategory(item.bu);
                    }}
                    className={`cursor-pointer rounded-[124px] border border-grays/15 px-3 py-1 text-sm transition-all hover:border-primary hover:text-primary ${activedCategory == item.bu ? "border-primary text-primary" : "border-grays/15 text-grays/15"}`}
                  >
                    <p className="whitespace-nowrap leading-[14px]">
                      {item.bu == "BW" && "Chăm sóc sắc đẹp"}
                      {item.bu == "PC" && "Chăm sóc cơ thể"}
                      {item.bu == "HC" && "Chăm sóc nhà cửa"}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className={`flex items-center gap-4`}>
              <p className="w-[110px] text-sm font-bold">Thương hiệu</p>

              {/* <div
                className={`h-fit cursor-pointer whitespace-nowrap rounded-[124px] border px-3 py-1 text-sm leading-4 ${"all" == activedBrand ? "border-primary text-primary" : "border-grays/15 text-grays/15"}`}
                onClick={() => {
                  setActivedBrand("all");
                }}
              >
                Tất cả
              </div> */}
              <div className="flex flex-1 items-center gap-4">
                {/* {brands.map((_, i) => (
                  <div
                    onClick={() => {
                      setActivedBrand(_);
                    }}
                    key={i}
                    className={`cursor-pointer rounded-[124px] border border-grays/15 px-3 py-1 text-sm transition-all hover:border-primary hover:text-primary ${activedBrand == _ ? "border-primary text-primary" : "border-grays/15 text-grays/15"}`}
                  >
                    <p className="line-clamp-1 truncate whitespace-nowrap leading-[14px]">
                      {_}
                    </p>
                  </div>
                ))} */}
                <DropdownV2
                  className="text-primary"
                  onSelected={(index) => {
                    setActivedBrand(brands[index]);
                  }}
                  value={activedBrand}
                >
                  {brands.map((_, i) => (
                    <DropdownItem key={i} title={_} />
                  ))}
                </DropdownV2>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex flex-1 gap-10">
                <p className="min-w-[100px] text-sm font-bold">%Commission</p>

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
                      value={commisionValue}
                      onChange={(e) => setCommisionValue(e)}
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
              <Input
                placeholder="Tìm kiếm sản phẩm"
                classContainer="flex-1 rounded-[124px] max-w-[300px]"
                onChange={(e: any) => setSearchName(e.target.value)}
                icon={<IoMdSearch className="text-grays" />}
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="w-full">
          <div
            ref={gridContainer}
            className="max-md :grid-cols-3 grid grid-cols-6 gap-x-4 gap-y-8 py-4 max-xl:grid-cols-4 max-[1100px]:grid-cols-3 max-[950px]:grid-cols-2 max-md:gap-x-3 max-md:gap-y-4 max-sm:grid-cols-2"
          >
            {products.map((item, i) => (
              <ProductCard key={i} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
