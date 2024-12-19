"use client";
import Image from "next/image";
import BannerDemo from "@/assets/images/banner.jpg";
import CampaignCard from "./CampaignCard";
import { useCampaignContext } from "@/services/CampaignService";

const CampaignList = () => {
  const { campaigns } = useCampaignContext();

  return (
    <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
      {campaigns.map((_, index) => {
        return <CampaignCard campaign={_} key={index} />;
      })}
    </div>
  );
};

export default CampaignList;
