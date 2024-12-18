import Image from "next/image";
import BannerDemo from "@/assets/images/banner.jpg";

const CampaignCard = () => {
  return (
    <div className="relative">
      <Image src={BannerDemo} alt="" className="rounded-lg" />

      <div className="absolute inset-0 flex flex-col justify-end gap-2 rounded-lg bg-gradient-to-t from-white via-white/20 p-4">
        <p className="font-semibold text-primary">
          Sale khủng ngày vàng, da xinh mịn màng 29.11
        </p>
      </div>
    </div>
  );
};

export default CampaignCard;
