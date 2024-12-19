"use client";

import Button from "@/packages/@ui-kit/Button2";
import { useModal } from "@/components/@core/Modal/useModal";
import Image from "next/image";
import ModalLogin from "./ModalLogin";
import LogoIcon from "@/assets/images/logo.svg";
import { useRouter } from "next/navigation";
import UserMenu from "./UserMenu";
import RegisterReceiveModal from "./RegisterReceiveProduct";
import ModalRegister from "./ModalRegister";
import { ModalManager } from "./ModalManager";
import { useAuthContext } from "@/services/AuthProvider";
import { toast } from "react-toastify";

const Header = () => {
  const router = useRouter();
  const { user } = useAuthContext();
  const { isShow: isShowRegisterReceive, toggle: toggleRegisterReceive } =
    useModal();

  const navHome = () => {
    router.push("/");
  };

  const triggerRegister = () => {
    if (!user) {
      toast.warning("Vui lòng đăng nhập!");
      return;
    }
    toggleRegisterReceive();
  };

  return (
    <div className="fixed left-0 right-0 z-50 flex h-14 items-center bg-white shadow-md">
      <RegisterReceiveModal
        isShow={isShowRegisterReceive}
        hide={toggleRegisterReceive}
      />
      <div className="max-w-app flex w-full items-center justify-between">
        <Image
          src={LogoIcon}
          alt=""
          width={100}
          height={100}
          onClick={navHome}
          className="cursor-pointer"
        />

        <div className="flex gap-4">
          <Button
            title="Đăng ký nhận sản phẩm"
            onClick={() => {
              triggerRegister();
            }}
            variant="outline"
          />
          <div className="flex max-sm:hidden">
            {!user ? <ModalManager /> : <UserMenu />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
