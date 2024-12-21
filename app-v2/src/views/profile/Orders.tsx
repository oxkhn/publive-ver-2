"use client";
import ImageKit from "@/packages/@ui-kit/Image";
import Input from "@/packages/@ui-kit/Input";
import { toast } from "react-toastify";
import { IoMdSearch } from "react-icons/io";
import { useEffect, useState } from "react";
import OrderCard from "@/components/OrderCard/OrderCard";
import { useProfileContext } from "@/services/ProfileProvider";
import { useProductContext } from "@/services/ProductProvider";
import { useAuthContext } from "@/services/AuthProvider";

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
      value: -1,
    },
    {
      title: "Chờ xác nhận",
      value: 0,
    },
    {
      title: "Vận chuyển",
      value: 1,
    },
    {
      title: "Chờ giao hàng",
      value: 2,
    },
    {
      title: "Hoàn thành",
      value: 3,
    },
    {
      title: "Đã hủy",
      value: 4,
    },
  ];

  const [activeTab, setActiveTab] = useState(0);
  const { registerProducts } = useAuthContext();

  const [orderFiltered, setOrderFiltered] = useState(registerProducts);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (search) {
      setOrderFiltered(
        registerProducts.filter(
          (order) =>
            order._id.includes(search) ||
            order.products.some((product) =>
              product.productName.toLowerCase().includes(search.toLowerCase()),
            ),
        ),
      );
      return;
    }

    if (activeTab == -1) {
      setOrderFiltered(registerProducts);
      return;
    }
    setOrderFiltered(
      registerProducts.filter((order) => order.status == activeTab),
    );
  }, [activeTab, search]);

  return (
    <div className="flex flex-1 flex-col">
      <div className="shadow-card sticky top-[80px] z-30 flex h-fit w-full flex-col gap-4 rounded-lg bg-white px-4 py-6 max-md:py-2">
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
        {/* <div className="flex items-center gap-4">
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
        </div> */}
        <Input
          placeholder="Tìm kiếm sản phẩm hoặc mã đơn hàng"
          classContainer="flex-1 shadow-card rounded-[124px]"
          icon={<IoMdSearch className="text-grays" />}
          onChange={(e: any) => {
            setSearch(e.target.value);
          }}
        />
      </div>
      <div className="mt-6 flex flex-col gap-4">
        {orderFiltered.map((_, i) => (
          <OrderCard order={_} key={i} />
        ))}
      </div>
    </div>
  );
};

export default Orders;
