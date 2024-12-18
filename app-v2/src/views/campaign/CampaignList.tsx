import Image from "next/image";
import BannerDemo from "@/assets/images/banner.jpg";
import CampaignCard from "./CampaignCard";

const CampaignList = () => {
  return (
    <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
      {[...Array(130)].map((_, index) => {
        return <CampaignCard key={index} />;
      })}
    </div>
  );
};

export default CampaignList;
