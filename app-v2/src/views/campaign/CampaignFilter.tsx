import Image from "next/image";
import CampaignIcon from "@/assets/images/chien_dich_hot.svg";
import CampaignMobileIcon from "@/assets/images/chien_dich_hot_mobile.svg";
import ChienThanLivestream from "@/assets/images/chien_than_livestream.svg";
import ChienThanDuDon from "@/assets/images/chien_than_du_don.svg";

const CampaignFilter = () => {
  return (
    <div >
      <div className="sticky top-20 z-20 flex h-full w-[185px] flex-col gap-4 max-sm:hidden">
        <Image
          src={CampaignIcon}
          alt=""
          width={185}
          height={200}
          className="w-[185px]"
        />

        <Image
          src={ChienThanLivestream}
          alt=""
          width={185}
          height={200}
          className="w-[185px]"
        />

        <Image
          src={ChienThanDuDon}
          alt=""
          width={185}
          height={200}
          className="w-[185px]"
        />
      </div>

      <div className="sticky top-20 z-20 flex w-full flex-col gap-2 sm:hidden">
        <Image
          src={CampaignMobileIcon}
          alt=""
          width={185}
          height={200}
          className="w-full"
        />

        <div className="flex gap-2">
          <Image
            src={ChienThanLivestream}
            alt=""
            width={185}
            height={200}
            className="w-full"
          />

          <Image
            src={ChienThanDuDon}
            alt=""
            width={185}
            height={200}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default CampaignFilter;
