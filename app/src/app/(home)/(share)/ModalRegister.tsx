import Button from "@/packages/@ui-kit/Button";
import Image from "next/image";
import BannerDemo from "@/assets/images/banner.png";
import ModalLogin from "./ModalLogin";
import { useModal } from "@/packages/@ui-kit/Modal/useModal";
import Modal from "@/packages/@ui-kit/Modal";
import Input from "@/packages/@ui-kit/Input";

type Props = {
  isShow: boolean;
  hide: () => void;
  switchToLogin: () => void;
};

const ModalRegister = (props: Props) => {
  const { isShow, hide, switchToLogin } = props;

  const { isShow: isShowLogin, toggle: toggleLogin } = useModal();

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
            <div>
              <p className="text-center text-2xl font-semibold">Đăng ký</p>
              <p className="mt-2 text-center text-sm">
                Bạn đã có tài khoản?{" "}
                <span
                  className="cursor-pointer text-primary"
                  onClick={switchToLogin}
                >
                  Đăng nhập
                </span>
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex gap-4">
                <Input title="Tên" />
                <Input title="Sđt" />
              </div>
              <Input title="Email" />

              <Input title="Mật khẩu" type="password" />
              <Input title="Nhập lại mật khẩu" type="password" />
            </div>
            <div className="text-center">
              <Button title="Đăng ký" className="w-full" />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ModalRegister;
