"use client";
import ImageKit from "@/packages/@ui-kit/Image";
import Input from "@/packages/@ui-kit/Input";
import { toast } from "react-toastify";
import { IoMdSearch } from "react-icons/io";
import { useState } from "react";
import OrderCard from "@/components/OrderCard/OrderCard";

const Orders = () => {
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

  const categorys = [
    {
      title: "Body care",
    },
    {
      title: "Face care",
    },
    {
      title: "Shampoo",
    },
    {
      title: "Organic",
    },
  ];

  const tabs = [
    {
      title: "Tất cả",
      value: 1,
    },
    {
      title: "Chờ xác nhận",
      value: 2,
    },
    {
      title: "Vận chuyển",
      value: 3,
    },
    {
      title: "Chờ giao hàng",
      value: 4,
    },
    {
      title: "Hoàn thành",
      value: 5,
    },
    {
      title: "Đã hủy",
      value: 6,
    },
  ];

  const [activeTab, setActiveTab] = useState(1);

  return (
    <div>
      <div className="shadow-card sticky top-[90px] z-30 flex h-fit flex-col gap-4 rounded-lg bg-white px-4 py-6 max-md:py-2">
        <div className="flex gap-8 overflow-auto border-b">
          {tabs.map((tab, i) => (
            <div
              key={i}
              className="cursor-pointer whitespace-nowrap"
              onClick={() => {
                setActiveTab(tab.value);
              }}
            >
              <p
                className={`${activeTab == tab.value ? "border-primary text-primary" : "border-transparent text-grays/50"} border-b-2 pb-4 text-sm font-bold`}
              >
                {tab.title}
              </p>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <p className="w-[80px] text-sm font-bold">Thương hiệu</p>
          <div className="h-fit rounded-[124px] border border-primary px-3 py-1 leading-4 text-primary">
            All
          </div>
          <div
            className="flex flex-1 gap-4 overflow-auto"
            onClick={() => {
              toast.info("Update soon");
            }}
          >
            {listBrand.map((item, i) => (
              <ImageKit
                key={i}
                src={item.src}
                className="aspect-square h-[52px] rounded-full max-md:h-[36px]"
              />
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <p className="w-[80px] text-sm font-bold">Loại</p>

          <div className="h-fit rounded-[124px] border border-primary px-3 py-1 leading-4 text-primary">
            All
          </div>
          <div className="flex flex-1 items-center gap-4 overflow-auto">
            {categorys.map((_, i) => (
              <div
                onClick={() => {
                  toast.info("Update soon");
                }}
                key={i}
                className="cursor-pointer rounded-[124px] border border-grays/15 px-3 py-1 text-sm text-grays/50 transition-all hover:border-black hover:text-black"
              >
                <p className="whitespace-nowrap leading-[14px]">{_.title}</p>
              </div>
            ))}
          </div>
        </div>
        <Input
          placeholder="Tìm kiếm sản phẩm"
          classContainer="flex-1 shadow-card rounded-[124px]"
          icon={<IoMdSearch className="text-grays" />}
        />
      </div>
      <div className="mt-6 flex flex-col gap-4">
        {[...Array(10)].map((_, i) => (
          <OrderCard key={i} />
        ))}
      </div>
    </div>
  );
};

export default Orders;
