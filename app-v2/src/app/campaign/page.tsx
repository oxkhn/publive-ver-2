import Breadcrumb from "@/packages/@ui-kit/Breadcrumb";
import CampaignFilter from "@/views/campaign/CampaignFilter";
import CampaignList from "@/views/campaign/CampaignList";

const CampaignPage = () => {
  return (
    <div className="max-w-app relative flex flex-col gap-20 pt-16">
      <div className="-mb-[74px]">
        <Breadcrumb title="Campaign" />
      </div>

      <div className="relative flex gap-10 max-sm:flex-col">
        <CampaignFilter />
        <CampaignList />
      </div>
    </div>
  );
};

export default CampaignPage;
