"use client";
import { useParams } from "next/navigation";
import CampaignBanner from "./CampaignBanner";
import CampaignInfo from "./CampaignInfo";
import CampaignProductList from "./CampaignProductList";
import CampaignRule from "./CampaignRule";
import { useEffect } from "react";
import Breadcrumb from "@/packages/@ui-kit/Breadcrumb";
import { useCampaignContext } from "@/services/CampaignProvider";

const CampaignDetailPageDetail = () => {
  const { id } = useParams();

  const { campaignDetail, getCampaign } = useCampaignContext();
  useEffect(() => {
    if (id) getCampaign(id as string);
  }, [id]);
  return (
    <>
      <div className="-mb-[74px]">
        <Breadcrumb title={campaignDetail?.name} />
      </div>

      <div className="flex flex-col gap-8 max-sm:gap-4">
        <CampaignBanner />
        <CampaignInfo />
        <div className="flex max-h-[800px] flex-wrap gap-8">
          <CampaignRule />
          <CampaignProductList />
        </div>
      </div>
    </>
  );
};

export default CampaignDetailPageDetail;
