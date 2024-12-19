import BannerDemo from "@/assets/images/banner.jpg";
import { useCampaignContext } from "@/services/CampaignService";
import Image from "next/image";

const CampaignBanner = () => {
  const { campaignDetail } = useCampaignContext();

  return (
    <div className="h-[300px] w-full max-sm:h-[100px]">
      <Image
        src={campaignDetail?.banner || BannerDemo}
        alt=""
        height={300}
        width={800}
        className="h-full w-full rounded-lg"
      />
    </div>
  );
};

export default CampaignBanner;
