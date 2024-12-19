import { CampaignProvider } from "@/services/CampaignService";

import CampaignDetailPageDetail from "@/views/campaign/[id]/CampaignPage";

const CampaignDetailPage = () => {
  return (
    <CampaignProvider>
      <div className="max-w-app flex flex-col gap-20 pb-20 pt-16">
        <CampaignDetailPageDetail />
      </div>
    </CampaignProvider>
  );
};

export default CampaignDetailPage;
