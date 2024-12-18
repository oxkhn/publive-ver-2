import Modal from "@/components/@core/Modal";
import ProductCard from "@/components/ProductCard";
import { useState } from "react";
import { IoChevronForwardOutline, IoClose } from "react-icons/io5";
import Step1 from "./Step1";
import Button from "@/packages/@ui-kit/Button2";
import Step2 from "./Step2";
import Step3 from "./Step3";

type Props = {
  isShow: boolean;
  hide: () => void;
};

const RegisterReceiveModal = (props: Props) => {
  const { isShow, hide } = props;
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <Modal
      isShow={isShow}
      hide={() => {
        hide();
      }}
      className="max-w-none"
    >
      <div className="flex h-[70vh] w-[40vw] flex-col gap-4 max-xl:w-[60vw] max-sm:w-[85vw]">
        <div className="flex items-center justify-between">
          <p className="text-xl font-semibold">Đăng ký sản phẩm thử</p>
          <div
            className="cursor-pointer rounded-lg p-2 hover:bg-gray-200"
            onClick={hide}
          >
            <IoClose className="text-2xl" />
          </div>
        </div>

        <div className="flex items-center gap-2 font-bold max-sm:text-xs">
          <div className="cursor-pointer" onClick={() => setCurrentStep(1)}>
            <p
              className={`${currentStep >= 1 ? "text-primary" : "text-grays/50"}`}
            >
              1. Chọn sản phẩm
            </p>
          </div>
          <IoChevronForwardOutline />
          <div className="cursor-pointer" onClick={() => setCurrentStep(2)}>
            <p
              className={`${currentStep >= 2 ? "text-primary" : "text-grays/50"}`}
            >
              2. Quy định nhận hàng mẫu
            </p>
          </div>
          <IoChevronForwardOutline />

          <div className="cursor-pointer" onClick={() => setCurrentStep(3)}>
            <p
              className={`${currentStep >= 3 ? "text-primary" : "text-grays/50"}`}
            >
              3. Thông tin nhận hàng
            </p>
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          {currentStep == 1 && <Step1 />}
          {currentStep == 2 && <Step2 />}
          {currentStep == 3 && <Step3 />}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="ml-auto flex items-center justify-end gap-4 max-sm:pb-5">
            {currentStep > 1 && (
              <Button
                title="Trở lại"
                variant="outline"
                className="!border-primary !px-[60px]"
                onClick={() => {}}
              />
            )}

            {currentStep < 3 && (
              <Button
                title="Tiếp tục"
                className="!px-[60px]"
                onClick={() => {}}
              />
            )}

            {currentStep == 3 && (
              <Button
                title="Đăng ký"
                className="!px-[60px]"
                onClick={() => {}}
              />
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default RegisterReceiveModal;
