import { useCampaignContext } from "@/services/CampaignService";
import { LuCalendarRange } from "react-icons/lu";

const CampaignInfo = () => {
  const { campaignDetail } = useCampaignContext();

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
            <p>Chiến thần livestream</p>
          </div>
          <div className="w-fit rounded-lg border border-green bg-green/20 px-2 py-1 text-sm font-semibold text-green">
            <p>Running</p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 text-xs">
          <LuCalendarRange />
          <p>09/10/2024 - 08/12/2024</p>
        </div>
      </div>
    </div>
  );
};

export default CampaignInfo;
