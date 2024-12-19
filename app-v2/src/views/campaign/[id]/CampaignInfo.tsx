import { useCampaignContext } from "@/services/CampaignProvider";
import { LuCalendarRange } from "react-icons/lu";

const CampaignInfo = () => {
  const { campaignDetail } = useCampaignContext();

  const fotmatDate = (date: string | undefined): string => {
    if (!date) return "";
    const dateRes = new Date(date);

    return (
      dateRes.getDate() +
      "/" +
      (dateRes.getMonth() + 1) +
      "/" +
      dateRes.getFullYear()
    );
  };

  return (
    <div className="flex flex-wrap gap-4 rounded-lg border bg-white p-4 max-sm:flex-col-reverse">
      <div className="flex flex-1 flex-col gap-2">
        <p className="text-2xl font-semibold text-primary">
          {campaignDetail?.name}
        </p>
        <p className="text-sm">
          Số sản phẩm: {campaignDetail?.productSKUs?.length}
        </p>
      </div>

      <div className="flex flex-1 flex-col items-end gap-2 max-sm:items-start">
        <div className="flex items-center gap-2">
          <div className="w-fit rounded-lg bg-secondary px-2 py-1 text-sm font-semibold italic text-white">
            <p>
              Chiến thần {campaignDetail?.type == 1 ? "livestream" : "đu đơn"}
            </p>
          </div>
          <div
            className={`w-fit rounded-lg border ${campaignDetail?.status == "active" ? "border-green bg-green/20 text-green" : "border-grays/50 bg-grays/10 text-grays/50"} px-2 py-1 text-sm font-semibold`}
          >
            <p>
              {campaignDetail?.status == "active"
                ? "Đang chạy"
                : "Ngoài khung giờ"}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 text-xs">
          <LuCalendarRange />
          <p>
            {fotmatDate(campaignDetail?.startDate)}-
            {fotmatDate(campaignDetail?.endDate)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CampaignInfo;
