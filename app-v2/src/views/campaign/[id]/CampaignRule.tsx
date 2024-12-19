import { useCampaignContext } from "@/services/CampaignProvider";

const CampaignRule = () => {
  const { campaignDetail } = useCampaignContext();

  return (
    <div className="flex-1 rounded-lg border p-4">
      <p className="text-center text-lg font-semibold text-gray-700">
        Thể lệ tham gia
      </p>

      <div
        dangerouslySetInnerHTML={{ __html: campaignDetail?.description || "" }}
        className="mt-8 flex flex-col gap-2"
      ></div>
    </div>
  );
};

export default CampaignRule;
