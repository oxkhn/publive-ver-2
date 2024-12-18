import Input from "@/components/@core/Input";

const Step3 = () => {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <Input title="Tên của bạn" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Input title="Số điện thoại" className="!w-full flex-1" />
        <Input title="Email" className="w-full" />
      </div>

      <div>
        <p className="text-sm font-bold">Địa chỉ nhận hàng </p>

        <textarea
          //   value={formData?.address || ""}
          //   onChange={(e: any) => onSetFormData("address", e.target.value)}
          className="mt-2 w-full rounded-lg border border-line bg-transparent p-2 text-sm outline-none hover:border-primary focus:border-primary"
        ></textarea>
      </div>

      <p className="text-sm font-semibold">
        Your social links used for promoting products
      </p>

      <div className="mt-2 flex flex-col gap-2">
        <div className="flex w-full gap-8 gap-y-2 max-sm:flex-col sm:items-center">
          <div className="flex min-w-[152px] sm:justify-end">
            <p className="text-sm font-bold">Facebook</p>
          </div>
          <Input
            classContainer="w-full"
            // value={formData?.facebookLink || ""}
            // onChange={(e: any) => onSetFormData("facebookLink", e.target.value)}
          />
        </div>
        <div className="flex w-full gap-8 gap-y-2 max-sm:flex-col sm:items-center">
          <div className="flex min-w-[152px] sm:justify-end">
            <p className="text-sm font-bold">Instagram</p>
          </div>
          <Input
            classContainer="w-full"
            // value={formData?.instargramLink || ""}
            // onChange={(e: any) =>
            //   onSetFormData("instargramLink", e.target.value)
            // }
          />
        </div>
        <div className="flex w-full gap-8 gap-y-2 max-sm:flex-col sm:items-center">
          <div className="flex min-w-[152px] sm:justify-end">
            <p className="text-sm font-bold">Threads</p>
          </div>
          <Input
            classContainer="w-full"
            // value={formData?.threadsLink || ""}
            // onChange={(e: any) => onSetFormData("threadsLink", e.target.value)}
          />
        </div>
        <div className="flex w-full gap-8 gap-y-2 max-sm:flex-col sm:items-center">
          <div className="flex min-w-[152px] sm:justify-end">
            <p className="text-sm font-bold">Tiktok</p>
          </div>
          <Input
            classContainer="w-full"
            // value={formData?.tiktokLink || ""}
            // onChange={(e: any) => onSetFormData("tiktokLink", e.target.value)}
          />
        </div>
        <div className="flex w-full gap-8 gap-y-2 max-sm:flex-col sm:items-center">
          <div className="flex min-w-[152px] sm:justify-end">
            <p className="text-sm font-bold">Youtube</p>
          </div>
          <Input
            classContainer="w-full"
            // value={formData?.youtubeLink || ""}
            // onChange={(e: any) => onSetFormData("youtubeLink", e.target.value)}
          />
        </div>
        {/* <div className="flex w-full gap-8 gap-y-2 max-sm:flex-col sm:items-center">
          <div className="flex min-w-[152px] sm:justify-end">
            <p className="text-sm font-bold">Website/App/Others</p>
          </div>
          <Input
            classContainer="w-full"
            // value={formData?.websiteLink || ""}
            // onChange={(e: any) => onSetFormData("websiteLink", e.target.value)}
          />
        </div> */}
      </div>
    </div>
  );
};

export default Step3;
