import Breadcrumb from "@/packages/@ui-kit/Breadcrumb";
import CampaignBanner from "@/views/campaign/[id]/CampaignBanner";
import CampaignInfo from "@/views/campaign/[id]/CampaignInfo";
import CampaignProductList from "@/views/campaign/[id]/CampaignProductList";
import CampaignRule from "@/views/campaign/[id]/CampaignRule";

const CampaignDetailPage = () => {
  return (
    <div className="max-w-app flex flex-col gap-20 pb-20 pt-16">
      <div className="-mb-[74px]">
        <Breadcrumb title="Sale khủng ngày vàng, da xinh mịn màng 29.11" />
      </div>

      <div className="flex flex-col gap-8 max-sm:gap-4">
        <CampaignBanner />
        <CampaignInfo />
        <div className="flex max-h-[800px] flex-wrap gap-8">
          <CampaignRule />
          <CampaignProductList />
        </div>
      </div>
    </div>
  );
};

export default CampaignDetailPage;
