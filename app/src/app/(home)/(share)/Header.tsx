"use client";

import Button from "@/packages/@ui-kit/Button";
import { usePathname, useRouter } from "next/navigation";
import { FaBagShopping } from "react-icons/fa6";
import UserMenu from "./UserMenu";
import { useAuth } from "@/services/provider/AuthProvider";
import ModalRegisterProduct from "../../../components/Modal/ModalRegisterProduct";
import { useState } from "react";
import RegisterProductProvider from "@/components/Modal/ModalRegisterProduct/RegisterProductProvider";
import ImageKit from "@/packages/@ui-kit/Image";
import Logo from "@/assets/images/logo_2.svg";
import { ModalManager } from "./ModalManager";

const Header = () => {
  const router = useRouter();
  const pathName = usePathname();
  const { token, user } = useAuth();

  //** State */
  const [isShowModalRegister, setIsShowModalRegister] = useState(false);

  const hidePath = ["/login", "/register", "/admin"];

  const navigateLoginPage = () => {
    router.push("/login");
  };

  if (hidePath.includes(pathName)) {
    return null;
  }

  return (
    <header className="fixed top-0 z-40 w-full bg-white shadow-sm">
      <RegisterProductProvider>
        <ModalRegisterProduct
          isShow={isShowModalRegister}
          setIsShow={(_: boolean) => setIsShowModalRegister(_)}
        />
      </RegisterProductProvider>

      <div className="mx-auto flex h-[70px] max-w-[1280px] items-center justify-between px-8 max-md:px-4">
        <div
          className="flex cursor-pointer items-center gap-4"
          onClick={() => router.push("/")}
        >
          <ImageKit src={Logo} className="h-10 w-36 !object-cover" />
        </div>

        <div className="flex items-center gap-4 max-md:gap-2">
          <Button
            title="Đăng ký sản phẩm thử"
            variant="outline"
            className="!rounded-full !border-primary !text-primary"
            onClick={() => setIsShowModalRegister(true)}
          />

          {!user ? <ModalManager /> : <UserMenu />}
        </div>
      </div>
    </header>
  );
};

export default Header;
