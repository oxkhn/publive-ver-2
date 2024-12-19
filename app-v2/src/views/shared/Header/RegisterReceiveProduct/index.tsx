import Modal from "@/components/@core/Modal";
import ProductCard from "@/components/ProductCard";
import { useEffect, useState } from "react";
import {
  IoChevronForwardOutline,
  IoClose,
  IoSearchOutline,
} from "react-icons/io5";
import Step1 from "./Step1";
import Button from "@/packages/@ui-kit/Button2";
import Step2 from "./Step2";
import Step3 from "./Step3";
import {
  registerProductDTO,
  useRegisterProductContext,
} from "@/services/RegisterProductProvider";
import { toast } from "react-toastify";
import DropdownHor from "@/packages/@ui-kit/Dropdown3";
import DropdownItem from "@/packages/@ui-kit/Dropdown/DropdownItem";
import Input from "@/components/@core/Input";
import { useProductContext } from "@/services/ProductProvider";
import DropdownV2 from "@/packages/@ui-kit/Dropdown2";
import { title } from "process";
import { useAuthContext } from "@/services/AuthProvider";

type Props = {
  isShow: boolean;
  hide: () => void;
};

const RegisterReceiveModal = (props: Props) => {
  const { isShow, hide } = props;
  const [currentStep, setCurrentStep] = useState(1);
  const { user } = useAuthContext();

  const { productSelected, registerInfo } = useRegisterProductContext();
  const {
    brands,
    brandSelected,
    brandList,
    buSelected,
    search,
    setBuSelected,
    setBrandList,
    setBrandSelected,
    setSearch,
    clearData,
  } = useProductContext();

  const { signMessage, postProductRegister } = useRegisterProductContext();

  const handleNextStep = () => {
    if (currentStep == 1) {
      nextStep1();
      return;
    }
    if (currentStep == 2) {
      nextStep2();
      return;
    }
  };

  const hanleBackStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const nextStep1 = () => {
    if (productSelected.length == 0) {
      toast.warning("Vui lòng chọn ít nhất 1 sản phẩm");
      return;
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const nextStep2 = () => {
    if (!signMessage) return;
    setCurrentStep(currentStep + 1);
  };

  const handleRegister = async () => {
    if (!user) toast.warning("Vui lòng đăng nhập.");
    if (registerInfo.phone.trim() == "") {
      toast.warning("Vui lòng nhập số điện thoại.");
      return;
    }
    if (registerInfo.address.trim() == "") {
      toast.warning("Vui lòng nhập địa chỉ.");
      return;
    }
    const listSKUs: string[] = productSelected.map((product) => product.sku);
    const bodyRegister: registerProductDTO = {
      name: registerInfo.name,
      phoneNumber: registerInfo.phone,
      email: registerInfo.email,
      address: registerInfo.address,
      productSKUs: listSKUs,
      isSign: true,
    };
    await postProductRegister(bodyRegister);
    hide();
  };

  return (
    <Modal
      isShow={isShow}
      hide={() => {
        hide();
      }}
      className="max-w-none"
    >
      <div className="flex h-[70vh] w-[50vw] flex-col gap-4 max-xl:w-[60vw]">
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

        {currentStep == 1 && (
          <div className="flex items-center justify-between gap-2">
            <div className="flex flex-1 items-center gap-2">
              <div className="flex items-center gap-2">
                <p className="text-sm">Ngành hàng</p>
                <DropdownV2
                  value={buSelected}
                  onSelected={(index) => {}}
                  className="!h-6"
                >
                  <DropdownItem
                    onClick={() => {
                      setBuSelected("Tất cả");
                      setBrandList([]);
                      setBrandSelected("");
                    }}
                    title="Tất cả"
                  />
                  {brands.map((_, i) => (
                    <DropdownItem
                      onClick={() => {
                        setBuSelected(_.bu);
                        setBrandList(_.brand);
                        setBrandSelected(_.brand?.[0] || "");
                      }}
                      key={i}
                      title={_.bu}
                    />
                  ))}
                </DropdownV2>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-sm">Thương hiệu</p>
                <DropdownHor
                  value={brandSelected}
                  defaultValue={""}
                  onSelected={(index) => {}}
                  classElementCustom=""
                  className="!h-6 !text-black"
                >
                  {brandList.map((_, i) => (
                    <DropdownItem
                      onClick={() => setBrandSelected(_)}
                      key={i}
                      title={_}
                    />
                  ))}
                </DropdownHor>
              </div>
            </div>
            <div className="max-w-[40%]">
              <Input
                value={search}
                className="!h-7"
                icon={<IoSearchOutline />}
                placeholder="Tìm nhãn hiệu của bạn"
                onChange={(e: any) => {
                  setSearch(e.target.value);
                }}
              />
            </div>
          </div>
        )}

        <div className="flex-1 overflow-auto">
          {currentStep == 1 && <Step1 />}
          {currentStep == 2 && <Step2 />}
          {currentStep == 3 && <Step3 />}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="ml-auto flex w-full items-center justify-between gap-4 max-sm:pb-5">
            <div>
              <p>Số sản phẩm đã chọn: {productSelected.length}</p>
            </div>
            <div className="flex items-center justify-end gap-4 max-sm:pb-5">
              {currentStep > 1 && (
                <Button
                  title="Trở lại"
                  variant="outline"
                  className="!border-primary !px-[60px]"
                  onClick={() => hanleBackStep()}
                />
              )}

              {currentStep < 3 && (
                <Button
                  title="Tiếp tục"
                  disabled={currentStep == 2 && !signMessage}
                  className={`!px-[60px]`}
                  onClick={() => handleNextStep()}
                />
              )}

              {currentStep == 3 && (
                <Button
                  title="Đăng ký"
                  className="!px-[60px]"
                  onClick={() => handleRegister()}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default RegisterReceiveModal;
