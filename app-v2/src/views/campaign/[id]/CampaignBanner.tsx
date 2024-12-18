import BannerDemo from "@/assets/images/banner.jpg";
import Image from "next/image";

const CampaignBanner = () => {
  return (
    <div className="h-[300px] w-full max-sm:h-[100px]">
      <Image src={BannerDemo} alt="" className="h-full w-full rounded-lg" />
    </div>
  );
};

export default CampaignBanner;
