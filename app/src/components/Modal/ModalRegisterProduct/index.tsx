import Button from "@/packages/@ui-kit/Button";
import Input from "@/packages/@ui-kit/Input";
import Modal from "@/packages/@ui-kit/Modal";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { IoChevronForwardOutline } from "react-icons/io5";
import Step1 from "./Step1";
import { useRegisterProductContext } from "./RegisterProductProvider";
import Step2 from "./Step2";
import { toast } from "react-toastify";
import Step3 from "./Step3";
import { BsSearch } from "react-icons/bs";
import { ProductsProvider } from "@/app/(home)/ProductProvider";
import Step4 from "./Step4";

interface ModalRegisterProductProps {
  isShow: boolean;
  setIsShow: (_: boolean) => void;
}

const ModalRegisterProduct: React.FC<ModalRegisterProductProps> = (props) => {
  //** state */
  const { isShow, setIsShow } = props;
  const {
    currentStep,
    nextStep,
    preStep,
    setStep,
    setSearchTerm,
    searchTerm,
    onRegister,
  } = useRegisterProductContext();

  return (
    <Modal isShow={isShow} hide={() => setIsShow(false)}>
      <div className="flex h-[80vh] max-w-[800px] flex-col">
        <div className="flex items-center justify-between">
          <p className="text-2xl font-bold">Đăng ký sản phẩm thử</p>
          <Button
            variant="icon"
            icon={<IoClose />}
            onClick={() => setIsShow(false)}
            className="hover:bg-grays/5"
          />
        </div>

        <div className="mt-8 flex items-center gap-2 font-bold">
          <div className="cursor-pointer" onClick={() => setStep(1)}>
            <p
              className={`${currentStep >= 1 ? "text-primary" : "text-grays/50"}`}
            >
              1. Chọn sản phẩm
            </p>
          </div>
          <IoChevronForwardOutline />
          <div className="cursor-pointer" onClick={() => setStep(2)}>
            <p
              className={`${currentStep >= 2 ? "text-primary" : "text-grays/50"}`}
            >
              2. Quy định nhận hàng mẫu
            </p>
          </div>
          <IoChevronForwardOutline />

          <div className="cursor-pointer" onClick={() => setStep(3)}>
            <p
              className={`${currentStep >= 3 ? "text-primary" : "text-grays/50"}`}
            >
              3. Thông tin cá nhân
            </p>
          </div>
          <IoChevronForwardOutline />

          <div className="cursor-pointer" onClick={() => setStep(4)}>
            <p
              className={`${currentStep >= 4 ? "text-primary" : "text-grays/50"}`}
            >
              4. Địa chỉ nhận hàng
            </p>
          </div>
        </div>

        <div className="flex gap-4"></div>

        <div className="mt-4 flex-1 overflow-auto">
          {currentStep == 1 && (
            <ProductsProvider>
              <Step3 />
            </ProductsProvider>
          )}
          {currentStep == 2 && <Step4 />}
          {currentStep == 3 && <Step1 />}
          {currentStep == 4 && <Step2 />}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="ml-auto flex items-center justify-end gap-4 max-sm:pb-5">
            {currentStep > 1 && (
              <Button
                title="Trở lại"
                variant="outline"
                className="!rounded-full !border-primary !px-[60px] !text-primary"
                onClick={preStep}
              />
            )}

            {currentStep < 4 && (
              <Button
                title="Tiếp tục"
                className="!rounded-full !px-[60px]"
                onClick={nextStep}
              />
            )}

            {currentStep == 4 && (
              <Button
                title="Đăng ký"
                className="!rounded-full !px-[60px]"
                onClick={() => {
                  setIsShow(false);
                  onRegister();
                  // toast("Đăng ký thành công");
                }}
              />
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalRegisterProduct;
