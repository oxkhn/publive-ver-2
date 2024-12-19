"use client";

import Image from "next/image";
import { useState } from "react";
import { BsCreditCard2Front } from "react-icons/bs";
import { FaRegUserCircle } from "react-icons/fa";
import { IoLinkSharp } from "react-icons/io5";
import Demo from "@/assets/images/banner.jpg";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useProfileContext } from "@/services/ProfileProvider";

const Drawer = () => {
  const { tabActive, setTabActive } = useProfileContext();
  const isMobile = useIsMobile();
  const [isShow, setIsShow] = useState(false);

  return (
    <>
      {((isMobile && isShow) || !isMobile) && (
        <div className="sticky flex h-fit w-[350px] flex-shrink-0 flex-col p-2">
          <div className="flex items-center gap-4">
            <Image
              src={Demo}
              className="h-[52px] w-[52px] rounded-full"
              alt=""
            />
            <div>{/* <p className="font-bold">{user?.name}</p> */}</div>
          </div>

          <div className="mt-8">
            <div
              className="flex items-center gap-2"
              onClick={() => setTabActive(1)}
            >
              <FaRegUserCircle className="text-red-500 text-xl" />
              <p
                className={`cursor-pointer ${tabActive == 1 ? "font-bold text-primary" : ""}`}
              >
                Tài khoản của tôi
              </p>
            </div>
          </div>

          <div
            className="mt-5 flex cursor-pointer items-center gap-2"
            onClick={() => {
              setTabActive(2);
            }}
          >
            <BsCreditCard2Front className="text-green-500 text-xl text-green" />
            <p
              className={`cursor-pointer ${tabActive == 2 ? "font-bold text-primary" : ""}`}
            >
              Đơn đăng ký sản phẩm thử
            </p>
          </div>
          <div
            className="mt-5 flex cursor-pointer items-center gap-2"
            onClick={() => {
              // showToastUpdateSoon();
            }}
          >
            <IoLinkSharp className="text-xl font-bold text-blue-500" />
            <p className="">Affiliate links</p>
          </div>
          <div
            className="mt-5 flex cursor-pointer items-center gap-2"
            onClick={() => {
              // showToastUpdateSoon();
            }}
          >
            <IoLinkSharp className="text-xl text-orange-500" />
            <p className="">Thông báo</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Drawer;
