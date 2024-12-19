import Image from "next/image";
import BannerDemo from "@/assets/images/banner.jpg";
import { CampaignTypeWithId } from "@/types/campaign.type";

type Props = {
  campaign: CampaignTypeWithId;
};

const CampaignCard = (props: Props) => {
  const { campaign } = props;
  return (
    <div className="relative h-[200px]">
      <Image
        src={campaign.banner}
        alt=""
        className="h-full w-full rounded-lg object-cover"
        height={200}
        width={800}
      />

      <div className="absolute inset-0 flex flex-col justify-end gap-2 rounded-lg bg-gradient-to-t from-white via-white/20 p-4">
        <p className="font-semibold text-primary">
          Sale khủng ngày vàng, da xinh mịn màng 29.11
        </p>
      </div>
    </div>
  );
};

export default CampaignCard;
