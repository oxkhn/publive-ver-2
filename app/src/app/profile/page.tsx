"use client";

import { useAuth } from "@/services/provider/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ProfileInfor from "./ProfileInfor";
import NotFound from "./NotFound";
import Orders from "./Orders";
import { toast } from "react-toastify";
import ImageKit from "@/packages/@ui-kit/Image";
import { FaRegUserCircle } from "react-icons/fa";
import { BsCreditCard2Front } from "react-icons/bs";
import { IoLinkSharp } from "react-icons/io5";

const ProfilePage = () => {
  const [tabActive, setTabActive] = useState(1);
  const { user } = useAuth();

  const showToastUpdateSoon = () => {
    toast.info("Update soon.");
  };

  return (
    <div className="mx-auto flex w-full max-w-[1280px] gap-8 px-8 py-10 max-md:flex-col">
      <div className="sticky top-40 mt-6 flex h-fit w-[280px] flex-col">
        <div className="flex items-center gap-4">
          <ImageKit src="" className="h-[52px] w-[52px] rounded-full" />
          <div>
            <p className="font-bold">{user?.name}</p>
          </div>
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
            showToastUpdateSoon();
          }}
        >
          <IoLinkSharp className="text-xl font-bold text-blue-500" />
          <p className="">Affiliate links</p>
        </div>
        <div
          className="mt-5 flex cursor-pointer items-center gap-2"
          onClick={() => {
            showToastUpdateSoon();
          }}
        >
          <IoLinkSharp className="text-xl text-orange-500" />
          <p className="">Thông báo</p>
        </div>
      </div>

      <div className="flex-1">
        {tabActive == 1 && <ProfileInfor />}
        {tabActive == 2 && <Orders />}
      </div>
    </div>
  );
};

export default ProfilePage;
