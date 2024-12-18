import Button from "@/packages/@ui-kit/Button";
import ModalRegister from "./ModalRegister";
import Image from "next/image";
import { useModal } from "@/packages/@ui-kit/Modal/useModal";
import Input from "@/packages/@ui-kit/Input";
import Modal from "@/packages/@ui-kit/Modal";
import BannerDemo from "@/assets/images/banner.png";

type Props = {
  isShow: boolean;
  hide: () => void;
  switchToRegister: () => void;
};

const ModalLogin = (props: Props) => {
  const { isShow, hide, switchToRegister } = props;
  const { isShow: isShowRegister, toggle: toggleRegister } = useModal();

  return (
    <>
      <Modal
        isShow={isShow}
        hide={() => {
          hide();
        }}
        className=""
      >
        <div className="flex gap-8">
          <div className="flex-1">
            <Image src={BannerDemo} alt="" />
          </div>
          <div className="flex w-[375px] min-w-[300px] flex-1 flex-col gap-10 p-2 max-sm:w-full">
            <p className="text-center text-2xl font-semibold">Đăng Nhập</p>
            <div className="flex flex-col gap-4">
              <Input title="Email" />
              <Input title="Mật Khẩu" type="password" />
              <span className="cursor-pointer text-end text-sm text-primary">
                Quên mật khẩu?
              </span>
            </div>
            <div className="text-center">
              <Button title="Đăng nhập" className="w-full" />
              <p className="mt-2 text-sm">
                Bạn chưa có tài khoản?{" "}
                <span
                  className="cursor-pointer text-primary"
                  onClick={() => {
                    switchToRegister();
                  }}
                >
                  Đăng ký
                </span>
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ModalLogin;
