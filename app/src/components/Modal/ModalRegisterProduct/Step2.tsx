import Input from "@/packages/@ui-kit/Input";
import { useRegisterProductContext } from "./RegisterProductProvider";

const Step2 = () => {
  const { formData, onSetFormData } = useRegisterProductContext();

  return (
    <div>
      <div className="mt-6 grid grid-cols-2 gap-4">
        <Input
          title="Tên người nhận"
          className="grid-cols-1"
          placeholder="Tên người nhận hàng"
          value={formData?.receiveName || ""}
          onChange={(e: any) => onSetFormData("receiveName", e.target.value)}
        />
        <Input
          title="Số điện thoại nhận hàng"
          placeholder="Input your shopee affiliate username"
          value={formData?.receivePhoneNumber || ""}
          onChange={(e: any) =>
            onSetFormData("receivePhoneNumber", e.target.value)
          }
        />
      </div>

      <p className="mt-4 text-sm font-bold">Địa chỉ nhận hàng </p>

      <textarea
        value={formData?.address || ""}
        onChange={(e: any) => onSetFormData("address", e.target.value)}
        className="mt-2 w-full rounded-lg border border-line bg-transparent p-2 text-sm outline-none hover:border-primary focus:border-primary"
      ></textarea>
    </div>
  );
};

export default Step2;
