import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import { useState } from "react";
import DropdownItem from "@/packages/@ui-kit/Dropdown/DropdownItem";
import { usePathname, useRouter } from "next/navigation";
import Line from "@/packages/@ui-kit/Line";
import { FaRegUser } from "react-icons/fa";
import Button from "@/packages/@ui-kit/Button";
import { LuLogOut } from "react-icons/lu";
import Image from "next/image";
import ImageDemo from "@/assets/images/demo.jpg";
import { useAuthContext } from "@/services/AuthProvider";

const UserMenu = () => {
  const { user, onLogout } = useAuthContext();
  const [isShowDropdown, setIsShowDropdown] = useState(false);
  const dropdownRef = useRef<any>(null);

  const hiddenDropdown = () => {
    setIsShowDropdown(false);
  };

  const handleClickOutside = (event: any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // * Navigate to
  const router = useRouter();
  const pathName = usePathname();
  const navigateProfilePage = () => {
    router.push("/profile");
  };

  const navigateAdminPage = () => {
    router.push("/admin");
  };

  // * Hide dropdown when navigate to other page
  useEffect(() => {
    hiddenDropdown();
  }, [pathName]);

  const defaultCSS =
    "relative inline-flex bg-white rounded-full h-10 gap-2 font-bold cursor-pointer items-center justify-center whitespace-nowrap hover:bg-white/80 px-3 py-2 text-sm ring-offset-background transition-colors disabled:pointer-events-none disabled:opacity-50";
  const classes = clsx(defaultCSS);

  const defaultCSSElement =
    "z-50 absolute top-10 right-0 flex flex-col gap-4 mt-1 bg-white transition-all rounded-md p-4 anni-item-show border border-line shadow-lg w-[250px]";
  const animationClass = isShowDropdown ? "anni-item-show" : "anni-item-hide";
  const classesElement = clsx(defaultCSSElement, animationClass);

  return (
    <div className="relative">
      <button
        className={classes}
        onClick={() => setIsShowDropdown(!isShowDropdown)}
      >
        <Image alt="" src={ImageDemo} className="h-6 w-6 rounded-full" />

        <p>{user?.name}</p>
      </button>

      {isShowDropdown && (
        <div ref={dropdownRef} className={classesElement}>
          <div className="flex items-center gap-4">
            <Image src={ImageDemo} alt="" className="h-8 w-8 rounded-full" />
            <div>
              <p className="font-bold">{user?.name}</p>
              <p className="text-xs text-grays">{user?.role}</p>
            </div>
          </div>

          <div className="flex flex-col">
            <DropdownItem
              icon={<FaRegUser />}
              title="Thông tin cá nhân"
              onClick={() => {
                navigateProfilePage();
              }}
            />

            <Line className="my-4" />

            <Button
              className="bg-red-500 hover:bg-red-500/80 !h-8 w-full !text-sm"
              title="Đăng xuất"
              onClick={() => {
                onLogout();
              }}
            >
              <LuLogOut />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
