import Tracking from "@/components/Tracking";
import CampaignDetailPageDetail from "@/views/campaign/[id]/CampaignPage";

const CampaignDetailPage = () => {
  return (
    <div className="max-w-app flex flex-col gap-20 pb-20 pt-16">
      <CampaignDetailPageDetail />
      <Tracking />

    </div>
  );
};

export default CampaignDetailPage;
