import Input from "@/components/@core/Input";
import { useRegisterProductContext } from "@/services/RegisterProductProvider";
import Image from "next/image";
import { useEffect } from "react";

const Step3 = () => {
  const { registerInfo, setRegisterInfo, productSelected } =
    useRegisterProductContext();

  const onSetFormData = (tagname: string, value: string) => {
    const updatedRegisterInfo = registerInfo;
    updatedRegisterInfo;
    setRegisterInfo((prev) => ({
      ...prev,
      [tagname]: value,
    }));
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <Input
          disabled
          title="Tên của bạn"
          value={registerInfo?.name}
          onChange={(e: any) => onSetFormData("name", e.target.value)}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Input
          title="Số điện thoại"
          className="!w-full flex-1"
          value={registerInfo?.phone}
          onChange={(e: any) => onSetFormData("phone", e.target.value)}
        />
        <Input
          disabled
          title="Email"
          className="w-full"
          value={registerInfo?.email}
          onChange={(e: any) => onSetFormData("email", e.target.value)}
        />
      </div>

      <div>
        <p className="text-xs font-bold">Địa chỉ nhận hàng</p>

        <textarea
          value={registerInfo?.address}
          onChange={(e: any) => onSetFormData("address", e.target.value)}
          className="mt-2 w-full rounded-lg border border-line bg-transparent p-2 text-xs outline-none hover:border-primary focus:border-primary"
        ></textarea>
      </div>

      <p className="font-semibold">Danh sách sản phẩm đã chọn:</p>

      <div className="mt-2 flex flex-col gap-2">
        {productSelected.map((productSelected, index) => {
          return (
            <div key={index} className="flex items-center gap-2">
              <Image
                width={100}
                height={100}
                alt=""
                className="aspect-square h-12 w-12 rounded-md"
                src={productSelected?.imageList?.[0]}
              />
              <p className="line-clamp-1 text-sm">
                {productSelected?.productName}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Step3;
