import Input from "@/packages/@ui-kit/Input";
import { useRegisterProductContext } from "./RegisterProductProvider";

const Step1 = () => {
  const { formData, onSetFormData } = useRegisterProductContext();

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
        <Input
          title="Tên của bạn"
          className="grid-cols-1"
          placeholder="Nhập tên của bạn"
          value={formData?.name || ""}
          onChange={(e: any) => onSetFormData("name", e.target.value)}
        />
        <Input
          title="Shopee Affiliate Username"
          placeholder="Nhập shopee affiliate username"
          value={formData?.shopeeAffiliateAccount || ""}
          onChange={(e: any) =>
            onSetFormData("shopeeAffiliateAccount", e.target.value)
          }
        />
        <Input
          title="Số điện thoại"
          className="grid-cols-1"
          placeholder="Nhập số điện thoại"
          value={formData?.phone || ""}
          onChange={(e: any) => onSetFormData("phone", e.target.value)}
        />
        <Input
          title="Email"
          placeholder="Nhập email của bạn"
          value={formData?.email || ""}
          onChange={(e: any) => onSetFormData("email", e.target.value)}
        />
      </div>

      <p className="mt-4 text-sm font-bold">
        Your social links used for promoting products
      </p>

      <div className="mt-2 flex flex-col gap-2">
        <div className="flex w-full gap-8 gap-y-2 max-sm:flex-col sm:items-center">
          <div className="flex min-w-[152px] sm:justify-end">
            <p className="text-sm font-bold">Facebook</p>
          </div>
          <Input
            classContainer="w-full"
            value={formData?.facebookLink || ""}
            onChange={(e: any) => onSetFormData("facebookLink", e.target.value)}
          />
        </div>
        <div className="flex w-full gap-8 gap-y-2 max-sm:flex-col sm:items-center">
          <div className="flex min-w-[152px] sm:justify-end">
            <p className="text-sm font-bold">Instagram</p>
          </div>
          <Input
            classContainer="w-full"
            value={formData?.instargramLink || ""}
            onChange={(e: any) =>
              onSetFormData("instargramLink", e.target.value)
            }
          />
        </div>
        <div className="flex w-full gap-8 gap-y-2 max-sm:flex-col sm:items-center">
          <div className="flex min-w-[152px] sm:justify-end">
            <p className="text-sm font-bold">Threads</p>
          </div>
          <Input
            classContainer="w-full"
            value={formData?.threadsLink || ""}
            onChange={(e: any) => onSetFormData("threadsLink", e.target.value)}
          />
        </div>
        <div className="flex w-full gap-8 gap-y-2 max-sm:flex-col sm:items-center">
          <div className="flex min-w-[152px] sm:justify-end">
            <p className="text-sm font-bold">Tiktok</p>
          </div>
          <Input
            classContainer="w-full"
            value={formData?.tiktokLink || ""}
            onChange={(e: any) => onSetFormData("tiktokLink", e.target.value)}
          />
        </div>
        <div className="flex w-full gap-8 gap-y-2 max-sm:flex-col sm:items-center">
          <div className="flex min-w-[152px] sm:justify-end">
            <p className="text-sm font-bold">Youtube</p>
          </div>
          <Input
            classContainer="w-full"
            value={formData?.youtubeLink || ""}
            onChange={(e: any) => onSetFormData("youtubeLink", e.target.value)}
          />
        </div>
        <div className="flex w-full gap-8 gap-y-2 max-sm:flex-col sm:items-center">
          <div className="flex min-w-[152px] sm:justify-end">
            <p className="text-sm font-bold">Website/App/Others</p>
          </div>
          <Input
            classContainer="w-full"
            value={formData?.websiteLink || ""}
            onChange={(e: any) => onSetFormData("websiteLink", e.target.value)}
          />
        </div>
      </div>

      {/* <p className="mt-4 text-sm font-bold">
        Shopee link used for promoting products
      </p>

      <div className="mt-2 flex flex-col gap-2">
        <div className="flex w-full gap-8 gap-y-2 max-sm:flex-col sm:items-center">
          <div className="flex min-w-[152px] sm:justify-end">
            <p className="text-sm font-bold">Shopee Live</p>
          </div>
          <Input
            classContainer="w-full"
            value={formData?.shopeeLiveLink || ""}
            onChange={(e: any) =>
              onSetFormData("shopeeLiveLink", e.target.value)
            }
          />
        </div>
        <div className="flex w-full gap-8 gap-y-2 max-sm:flex-col sm:items-center">
          <div className="flex min-w-[152px] sm:justify-end">
            <p className="text-sm font-bold">Shopee Video</p>
          </div>
          <Input
            classContainer="w-full"
            value={formData?.shopeeVideoLink || ""}
            onChange={(e: any) =>
              onSetFormData("shopeeVideoLink", e.target.value)
            }
          />
        </div>
      </div> */}
    </div>
  );
};

export default Step1;
